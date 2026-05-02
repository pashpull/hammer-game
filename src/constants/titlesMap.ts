import { GAME_PHASES, type GAME_PHASE_NAME } from './gamePhases'

export const TITLES: Record<GAME_PHASE_NAME, string> = {
  [GAME_PHASES.WELCOME]: 'Привет!<br>Проверим твою силу!',
  [GAME_PHASES.IN_GAME]: 'Жми на кнопку<br>в нужный момент!',
  [GAME_PHASES.STRIKE_WAITING]: '',
  [GAME_PHASES.TOWER_WAITING]: '',
  [GAME_PHASES.FAIL]: 'Неплохо!<br>Попробуй ещё раз.',
  [GAME_PHASES.WIN]: 'ВОТ ЭТО СИЛА!<br>Ты выбил главный приз!<br><span class="accent">Рубин</span>',
}
