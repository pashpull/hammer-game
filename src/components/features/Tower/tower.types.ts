export interface LevelProps {
  color: string
  colorActive: string
}

export interface LevelsConfig {
  LEVELS_LIST: LevelProps[]
  BASE_LEVEL_HEIGHT: number
  STEP: number
  STEP_ANIMATION_DURATION: number
}
