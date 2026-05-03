import type { RobotMode } from '@/components/features/Robot/robot.types'
import { GAME_PHASES, type GAME_PHASE_NAME } from './gamePhases'
import { ROBOT_MODES } from '@/components/features/Robot/robot.constants'

export const ROBOT_MODES_MAP: Record<GAME_PHASE_NAME, RobotMode> = {
  [GAME_PHASES.WELCOME]: ROBOT_MODES.DEFAULT,
  [GAME_PHASES.IN_GAME]: ROBOT_MODES.SMILE,
  [GAME_PHASES.STRIKE_WAITING]: ROBOT_MODES.SMILE,
  [GAME_PHASES.TOWER_WAITING]: ROBOT_MODES.SMILE,
  [GAME_PHASES.FAIL]: ROBOT_MODES.SMILE,
  [GAME_PHASES.WIN]: ROBOT_MODES.HAPPY,
}
