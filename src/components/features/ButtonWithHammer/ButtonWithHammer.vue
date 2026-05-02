<script setup lang="ts">
import { useTimeoutWatch } from '@/hooks/useTimeoutWatch'
import {
  STRIKE_ANIMATION_DURATION,
  EVENT_STRIKE_ENDED,
  HAMMER_MODES,
} from './buttonWithHammer.constants'
import type { HammerMode } from './buttonWithHammer.types'

const props = withDefaults(
  defineProps<{
    mode?: HammerMode
  }>(),
  {
    mode: HAMMER_MODES.READY,
  },
)

const emit = defineEmits([EVENT_STRIKE_ENDED])

useTimeoutWatch(
  () => props.mode,
  () => emit(EVENT_STRIKE_ENDED),
  STRIKE_ANIMATION_DURATION,
  (val) => val === HAMMER_MODES.PRESSED,
)
</script>
<template>
  <div
    :class="['button-with-hammer', `button-with-hammer_${mode}`]"
    :style="{ '--strike-animation-duration': `${STRIKE_ANIMATION_DURATION}ms` }"
  >
    <div class="base"></div>
    <div class="button"></div>
    <div class="hammer-wrapper">
      <div class="hammer"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.button-with-hammer {
  --strike-animation-duration: 300ms;
  width: 124px;
  height: 60px;
  position: relative;
  display: flex;
  justify-content: center;

  &_waiting .hammer {
    transform: rotate(-43deg) translateY(15px) translateX(-30px);
  }

  &_ready {
    .button::before {
      transition: transform 0.3s ease;
    }
    .hammer-wrapper {
      animation: sway 3s ease-in-out infinite 0.3s;

      .hammer {
        transition: transform 0.3s ease-out;
      }
    }
  }

  &_pressed {
    .button::before {
      $transition-duration: 0.1s;
      --transition-delay: calc(var(--strike-animation-duration) - #{$transition-duration} * 0.5);
      transition: transform #{$transition-duration} ease var(--transition-delay);
      transform: translateY(15px);
    }
    .hammer {
      transform: rotate(-90deg) translateY(-58px) translateX(-10px);
      transition: transform var(--strike-animation-duration) ease-in;
    }
  }
}

.base {
  height: 100%;
  width: 100%;
  background-image: url('@/assets/images/base.png');
  background-size: cover;
}

.button {
  top: -8px;
  position: absolute;
  width: 83px;
  height: 35px;
  border-radius: 0 0 58% 58%;
  overflow: hidden;
  display: flex;
  justify-content: center;

  &::before {
    background-size: cover;
    content: ' ';
    width: 67px;
    height: 100%;
    display: block;
    background-image: url('@/assets/images/button.png');
  }
}

.hammer-wrapper {
  top: -70px;
  right: -67px;
  position: absolute;
  height: 110px;
  width: 100px;
  transform-origin: bottom center;
}

.hammer {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: url('@/assets/images/hammer.png');
}
</style>
