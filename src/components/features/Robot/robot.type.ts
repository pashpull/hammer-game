import type { ROBOT_MODES } from './robot.constants'

export type RobotMode = (typeof ROBOT_MODES)[keyof typeof ROBOT_MODES]
