import { onBeforeUnmount, readonly, ref } from 'vue'

interface UsePowerMeterConfig {
  max: number
  min: number
  speed: number
  redirectChance: number
}
export const usePowerMeter = ({ max, min, speed, redirectChance }: UsePowerMeterConfig) => {
  const power = ref(min)
  const direction = ref(1)

  let animationId: null | number = null
  let lastTimestamp = 0

  function update(timestamp: number) {
    const deltaTime = lastTimestamp ? (timestamp - lastTimestamp) / 1000 : 0
    lastTimestamp = timestamp

    if (Math.random() < redirectChance) {
      direction.value *= -1
    }

    const delta = speed * deltaTime * direction.value

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
    lastTimestamp = 0
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
