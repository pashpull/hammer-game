import type { ButtonVariant } from '@/components/ui/Button/button.types'
import { GAME_PHASES, type GAME_PHASE_NAME } from './gamePhases'
import { BUTTON_VARIANTS } from '@/components/ui/Button/button.constants'

export const BUTTON_TITLES_MAP: Record<GAME_PHASE_NAME, string> = {
  [GAME_PHASES.WELCOME]: 'НОВАЯ ИГРА',
  [GAME_PHASES.IN_GAME]: 'УДАР!',
  [GAME_PHASES.STRIKE_WAITING]: '',
  [GAME_PHASES.TOWER_WAITING]: '',
  [GAME_PHASES.FAIL]: 'НОВАЯ ИГРА',
  [GAME_PHASES.WIN]: 'НОВАЯ ИГРА',
}

export const BUTTON_VARIANT_MAP: Record<GAME_PHASE_NAME, ButtonVariant> = {
  [GAME_PHASES.WELCOME]: BUTTON_VARIANTS.DEFAULT,
  [GAME_PHASES.IN_GAME]: BUTTON_VARIANTS.ACCENT,
  [GAME_PHASES.STRIKE_WAITING]: BUTTON_VARIANTS.DEFAULT,
  [GAME_PHASES.TOWER_WAITING]: BUTTON_VARIANTS.DEFAULT,
  [GAME_PHASES.FAIL]: BUTTON_VARIANTS.DEFAULT,
  [GAME_PHASES.WIN]: BUTTON_VARIANTS.DEFAULT,
}
