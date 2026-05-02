<script setup lang="ts">
import { ROBOT_MODES } from './robot.constants'
import type { RobotMode } from './robot.type'
// todo поправить анимацию из HAPPY на SMILE
const { mode = ROBOT_MODES.DEFAULT } = defineProps<{
  mode?: RobotMode
}>()
</script>

<template>
  <div class="robot">
    <div :class="['picture', `picture_${mode}`]"></div>
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

  &_default {
    animation: toDefault 0.5s ease-in-out forwards;
  }

  &_smile {
    animation: toSmile 0.5s ease-in-out forwards;
  }

  &_happy {
    animation: toHappy 0.5s ease-in-out forwards;
  }

  @keyframes toDefault {
    0% {
      background-image: url('@/assets/images/robot-3.png');
      transform: rotateY(0);
    }
    75% {
      background-image: url('@/assets/images/robot-1.png');
    }
    100% {
      background-image: url('@/assets/images/robot-1.png');
      transform: rotateY(360deg);
    }
  }

  @keyframes toSmile {
    0% {
      background-image: url('@/assets/images/robot-1.png');
      transform: rotateY(0);
    }
    75% {
      background-image: url('@/assets/images/robot-2.png');
    }
    100% {
      background-image: url('@/assets/images/robot-2.png');
      transform: rotateY(360deg);
    }
  }

  @keyframes toHappy {
    0% {
      background-image: url('@/assets/images/robot-2.png');
      transform: rotateY(0);
    }
    75% {
      background-image: url('@/assets/images/robot-3.png');
    }
    100% {
      background-image: url('@/assets/images/robot-3.png');
      transform: rotateY(360deg);
    }
  }
}
</style>
