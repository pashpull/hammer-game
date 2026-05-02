import type { HammerMode } from '@/components/features/ButtonWithHammer/buttonWithHammer.types'
import { GAME_PHASES, type GAME_PHASE_NAME } from './gamePhases'
import { HAMMER_MODES } from '@/components/features/ButtonWithHammer/buttonWithHammer.constants'

export const HAMMER_MODES_MAP: Record<GAME_PHASE_NAME, HammerMode> = {
  [GAME_PHASES.WELCOME]: HAMMER_MODES.WAITING,
  [GAME_PHASES.IN_GAME]: HAMMER_MODES.READY,
  [GAME_PHASES.STRIKE_WAITING]: HAMMER_MODES.PRESSED,
  [GAME_PHASES.TOWER_WAITING]: HAMMER_MODES.PRESSED,
  [GAME_PHASES.FAIL]: HAMMER_MODES.PRESSED,
  [GAME_PHASES.WIN]: HAMMER_MODES.PRESSED,
}
