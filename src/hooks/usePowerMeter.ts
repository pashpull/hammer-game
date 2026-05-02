import { onBeforeUnmount, readonly, ref, toValue, watch, type MaybeRefOrGetter } from 'vue'

interface UsePowerMeterConfig {
  max: number
  min: number
  frameDuration: number
  redirectChance: number
}

export const usePowerMeter = ({ max, min, frameDuration, redirectChance }: UsePowerMeterConfig) => {
  const power = ref(min)
  const direction = ref(1)

  let animationId: null | number = null
  let lastFrameTime = 0

  const step = (max - min) / 100

  function update(timestamp: number) {
    if (timestamp - lastFrameTime < frameDuration) {
      animationId = requestAnimationFrame(update)
      return
    }

    lastFrameTime = timestamp

    if (Math.random() < redirectChance) {
      direction.value *= -1
    }

    const delta = step * direction.value

    power.value += delta

    if (power.value >= max) {
      power.value = max
      direction.value = -1
    } else if (power.value <= min) {
      power.value = min
      direction.value = 1
    }

    animationId = requestAnimationFrame(update)
  }

  function start() {
    power.value = min
    direction.value = 1
    lastFrameTime = performance.now()
    animationId = requestAnimationFrame(update)
  }

  function stop() {
    if (animationId === null) return
    cancelAnimationFrame(animationId)
    animationId = null
  }

  onBeforeUnmount(stop)

  return { power: readonly(power), start, stop }
}
