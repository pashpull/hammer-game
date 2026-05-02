<script setup lang="ts">
import { computed, watch } from 'vue'
import { EVENT_IS_FILLED, LEVELS_CONFIG, TOTAL_LEVELS } from './tower.constants'
import { useTimeoutWatch } from '@/hooks/useTimeoutWatch'
import { getFilledLevelsCount, getLevelStyles, getTotalAnimationDuration } from './tower.utils'

const props = withDefaults(
  defineProps<{
    filledPercent?: number
  }>(),
  { filledPercent: 0 },
)

const filledLevelsCount = computed(() => getFilledLevelsCount(props.filledPercent))
const totalAnimationDuration = computed(() => getTotalAnimationDuration(filledLevelsCount.value))

const scaleStyles = {
  '--base-height': `${LEVELS_CONFIG.BASE_LEVEL_HEIGHT}px`,
  '--step': `${LEVELS_CONFIG.STEP}px`,
}

const emit = defineEmits([EVENT_IS_FILLED])

useTimeoutWatch(
  totalAnimationDuration,
  () => emit(EVENT_IS_FILLED),
  () => totalAnimationDuration.value,
  (val) => !!val,
)
</script>

<template>
  <div
    class="tower"
    :class="{ tower_filled: filledLevelsCount === TOTAL_LEVELS }"
    :style="{ '--filling-duration': `${totalAnimationDuration}ms` }"
  >
    <div class="head">
      <div class="rubin"></div>
    </div>
    <div class="scale" :style="scaleStyles">
      <div
        class="scale__level"
        v-for="({ color, colorActive }, index) in LEVELS_CONFIG.LEVELS_LIST"
        :key="index"
        :style="getLevelStyles(color, colorActive, index, filledLevelsCount)"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tower {
  background-image: url('@/assets/images/tower.png');
  height: 324px;
  width: 170px;
  background-size: cover;
  padding: 23px 48px 0;
  gap: 7px;

  &_filled {
    .head {
      &::before {
        transition-delay: var(--filling-duration);
        opacity: 0;
      }

      &::after {
        transition-delay: var(--filling-duration);
        opacity: 1;
      }
    }

    .rubin {
      &::before {
        transition-delay: var(--filling-duration);
        animation-delay: var(--filling-duration);
        animation: pulse-rotation 6s linear infinite;
        opacity: 1;
      }

      &::after {
        animation-delay: var(--filling-duration);
        animation: pulse 1.5s ease-in-out infinite;
      }
    }
  }
}

.tower,
.scale {
  display: flex;
  flex-direction: column;
}

.head {
  position: relative;
  height: 47px;
  flex-shrink: 0;

  &::before,
  &::after {
    content: ' ';
    position: absolute;
    inset: 0;
    transition: opacity 0.3s ease;
    border-radius: var(--radius-4);
  }

  &::before {
    opacity: 1;
    background: linear-gradient(180deg, var(--pink-light) 0%, var(--white-00) 100%);
  }

  &::after {
    opacity: 0;
    background: linear-gradient(180deg, var(--red-light) 0%, var(--red) 100%);
  }
}

.rubin {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  &::before,
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    transition: opacity 0.3s ease;
  }

  &::before {
    background-image: url('@/assets/images/star.png');
    background-size: contain;
    width: 115px;
    height: 115px;
    transition: opacity 0.3s ease;
    opacity: 0;
  }

  &::after {
    margin-top: 5px;
    background-image: url('@/assets/images/rubin.png');
    width: 46px;
    height: 46px;
    background-size: contain;
    animation: shake 1.5s ease-in-out infinite;
  }
}
.scale {
  --base-height: 18px;
  --step: 5px;
  gap: 2px;
  flex-grow: 1;
  min-height: 0;

  &__level {
    $padding: 2px;
    --index: 1;

    position: relative;
    height: calc(var(--base-height) + var(--index) * var(--step));
    transition: background-color ease;

    &:first-child {
      border-radius: var(--radius-4) var(--radius-4) 0 0;
    }

    &::before,
    &::after {
      position: absolute;
      content: ' ';
      display: block;
      background-color: var(--white-30);
    }

    &::before {
      height: 3px;
      inset: $padding $padding auto $padding;
    }

    &::after {
      width: 3px;
      inset: $padding $padding $padding auto;
    }
  }
}
</style>
