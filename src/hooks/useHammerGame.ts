import { BUTTON_TITLES_MAP, BUTTON_VARIANT_MAP } from '@/constants/buttonMap'
import { GAME_CONFIG, POWER_CONFIG, POWER_RANGE } from '@/constants/gameConfig'
import { GAME_PHASES, type GAME_PHASE_NAME } from '@/constants/gamePhases'
import { HAMMER_MODES_MAP } from '@/constants/hammerModesMap'
import { ROBOT_MODES_MAP } from '@/constants/robotModesMap'
import { TITLES } from '@/constants/titlesMap'
import { computed, ref } from 'vue'
import { usePowerMeter } from './usePowerMeter'

export const useHammerGame = () => {
  // Текущая фаза игры
  const currentGamePhase = ref<GAME_PHASE_NAME>(GAME_PHASES.WELCOME)

  // Вычисление силы удара
  const {
    power,
    start: powerStart,
    stop: powerStop,
  } = usePowerMeter({
    max: POWER_CONFIG.MAX,
    min: POWER_CONFIG.MIN,
    speed: POWER_CONFIG.SPEED,
    redirectChance: POWER_CONFIG.REDIRECT_CHANCE,
  })

  // Изменение фазы игры
  const setNextPhase = (isWin: boolean) => {
    switch (currentGamePhase.value) {
      case GAME_PHASES.WELCOME:
        currentGamePhase.value = GAME_PHASES.IN_GAME
        break
      case GAME_PHASES.IN_GAME:
        currentGamePhase.value = GAME_PHASES.STRIKE_WAITING
        break
      case GAME_PHASES.STRIKE_WAITING:
        currentGamePhase.value = GAME_PHASES.TOWER_WAITING
        break
      case GAME_PHASES.TOWER_WAITING:
        currentGamePhase.value = isWin ? GAME_PHASES.WIN : GAME_PHASES.FAIL
        break
      case GAME_PHASES.FAIL:
        currentGamePhase.value = GAME_PHASES.IN_GAME
        break
      case GAME_PHASES.WIN:
        currentGamePhase.value = GAME_PHASES.IN_GAME
        break
    }
  }

  // Производные состояния
  const powerPercent = computed(() => ((power.value - GAME_CONFIG.POWER_MIN) * 100) / POWER_RANGE)
  const hammerMode = computed(() => HAMMER_MODES_MAP[currentGamePhase.value])
  const title = computed(() => TITLES[currentGamePhase.value])
  const buttonTitle = computed(() => BUTTON_TITLES_MAP[currentGamePhase.value])
  const buttonVariant = computed(() => BUTTON_VARIANT_MAP[currentGamePhase.value])
  const robotMode = computed(() => ROBOT_MODES_MAP[currentGamePhase.value])

  const isWaiting = computed(
    () =>
      currentGamePhase.value === GAME_PHASES.STRIKE_WAITING ||
      currentGamePhase.value === GAME_PHASES.TOWER_WAITING,
  )

  const towerPercent = computed(() => {
    if (
      currentGamePhase.value === GAME_PHASES.TOWER_WAITING ||
      currentGamePhase.value === GAME_PHASES.FAIL ||
      currentGamePhase.value === GAME_PHASES.WIN
    ) {
      if (power.value > GAME_CONFIG.WIN_THRESHOLD) {
        return 100
      }

      return ((power.value - GAME_CONFIG.POWER_MIN) * 100) / POWER_RANGE
    }
    return 0
  })

  // Обработчики событий

  const handleButtonClick = () => {
    setNextPhase(false)

    if (currentGamePhase.value === GAME_PHASES.IN_GAME) {
      powerStart()
    } else {
      powerStop()
    }
  }

  const handleHammerStrikeEnd = () => {
    setNextPhase(false)
  }

  const handleTowerFilled = () => {
    setNextPhase(power.value > GAME_CONFIG.WIN_THRESHOLD)
  }

  return {
    towerPercent,
    powerPercent,
    hammerMode,
    title,
    buttonTitle,
    buttonVariant,
    robotMode,
    isWaiting,
    handleHammerStrikeEnd,
    handleButtonClick,
    handleTowerFilled,
  }
}
