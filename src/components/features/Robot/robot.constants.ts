import robotDefault from '@/assets/images/robot-1.png'
import robotSmile from '@/assets/images/robot-2.png'
import robotHappy from '@/assets/images/robot-3.png'

export const ROBOT_MODES = {
  DEFAULT: 'default',
  SMILE: 'smile',
  HAPPY: 'happy',
} as const

export const ROBOT_IMAGES = {
  [ROBOT_MODES.DEFAULT]: robotDefault,
  [ROBOT_MODES.SMILE]: robotSmile,
  [ROBOT_MODES.HAPPY]: robotHappy,
}

export const ANIMATION_DURATION = 500
