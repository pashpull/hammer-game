import type { StyleValue } from 'vue'
import { STEP_DURATION, TOTAL_LEVELS } from './tower.constants'
import type { LevelProps } from './tower.types'

export const getFilledLevelsCount = (filledPercent: number): number => {
  if (filledPercent <= 0) return 0
  return Math.max(Math.floor((TOTAL_LEVELS * filledPercent) / 100), 1)
}

export const getTotalAnimationDuration = (filledLevelsCount: number): number => {
  return filledLevelsCount * STEP_DURATION
}

export const getLevelStyles = (
  color: LevelProps['color'],
  colorActive: LevelProps['colorActive'],
  index: number,
  filledLevelsCount: number,
): StyleValue => {
  const isFilled = index >= TOTAL_LEVELS - filledLevelsCount
  const delay = (TOTAL_LEVELS - 1 - index) * STEP_DURATION

  return {
    backgroundColor: isFilled ? colorActive : color,
    transitionDuration: `${STEP_DURATION}ms`,
    transitionDelay: filledLevelsCount ? `${delay}ms` : '0ms',
    '--index': index,
  }
}
