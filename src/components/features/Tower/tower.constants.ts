import type { LevelsConfig } from './tower.types'

export const LEVELS_CONFIG: LevelsConfig = {
  LEVELS_LIST: [
    { color: '#D1DEFB', colorActive: '#F65A5A' },
    { color: '#B7C8ED', colorActive: '#FF784E' },
    { color: '#94AADC', colorActive: '#FFAE4E' },
    { color: '#7593D6', colorActive: '#FFDF35' },
    { color: '#5878BE', colorActive: '#91E508' },
    { color: '#3A5CA5', colorActive: '#00D355' },
    { color: '#254B9D', colorActive: '#00B047' },
  ],
  BASE_LEVEL_HEIGHT: 18,
  LEVELS_HEIGHT_DELTA: 5.4,
  STEP_ANIMATION_DURATION: 70,
}

export const EVENT_IS_FILLED = 'isTowerFilled'
export const TOTAL_LEVELS = LEVELS_CONFIG.LEVELS_LIST.length
export const STEP_DURATION = LEVELS_CONFIG.STEP_ANIMATION_DURATION
