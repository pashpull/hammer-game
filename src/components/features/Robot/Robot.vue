<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { ROBOT_IMAGES, ROBOT_MODES } from './robot.constants'
import type { RobotMode } from './robot.types'
import { changeImage, setImage } from './robot.utils'
import { preloadImages } from '@/utils/preloadImages'

const props = withDefaults(
  defineProps<{
    mode?: RobotMode
  }>(),
  {
    mode: ROBOT_MODES.DEFAULT,
  },
)

const imgRef = ref<HTMLDivElement | null>(null)
let cleanupAnimation: (() => void) | null = null

onMounted(() => {
  preloadImages(Object.values(ROBOT_IMAGES))
  const imgEl = imgRef.value
  if (!imgEl) return
  setImage(imgEl, props.mode)
})

watch(
  () => props.mode,
  (mode) => {
    const imgEl = imgRef.value
    if (!imgEl) return

    cleanupAnimation?.()
    cleanupAnimation = changeImage(imgEl, mode)
  },
)

onBeforeUnmount(() => {
  cleanupAnimation?.()
})
</script>

<template>
  <div class="robot">
    <div :class="['picture', `picture_${mode}`]" ref="imgRef"></div>
  </div>
</template>

<style scoped lang="scss">
.robot {
  aspect-ratio: 1 / 1;
  width: 100%;
  border: 1px solid var(--white);
  background-color: var(--dark);
  border-radius: var(--radius-4);
  position: relative;
  display: flex;
  justify-content: center;
}

.picture {
  position: absolute;
  bottom: 0;
  height: 87px;
  width: 120%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
