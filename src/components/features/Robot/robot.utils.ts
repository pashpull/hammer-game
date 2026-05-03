import { ANIMATION_DURATION, ROBOT_IMAGES } from './robot.constants'
import type { RobotMode } from './robot.types'

export const changeImage = (el: HTMLElement, newMode: RobotMode): (() => void) => {
  let animation: Animation | null = null
  let timer: ReturnType<typeof setTimeout> | null = null

  el.getAnimations().forEach((a) => a.cancel())

  animation = el.animate([{ transform: 'rotateY(0)' }, { transform: 'rotateY(360deg)' }], {
    duration: ANIMATION_DURATION,
    fill: 'forwards',
  })

  timer = setTimeout(() => {
    setImage(el, newMode)
  }, ANIMATION_DURATION * 0.75)

  return () => {
    animation?.cancel()
    if (timer) clearTimeout(timer)
  }
}

export const setImage = (el: HTMLElement, mode: RobotMode) => {
  el.style.backgroundImage = `url(${ROBOT_IMAGES[mode]})`
}
