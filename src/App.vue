<script setup lang="ts">
import Tower from './components/features/Tower/Tower.vue'
import PowerMeter from './components/features/PowerMeter/PowerMeter.vue'
import ButtonWithHammer from './components/features/ButtonWithHammer/ButtonWithHammer.vue'
import Button from './components/ui/Button/Button.vue'
import Robot from './components/features/Robot/Robot.vue'

import { useHammerGame } from './composables/useHammerGame'

const {
  towerPercent,
  powerPercent,
  hammerMode,
  title,
  buttonTitle,
  buttonVariant,
  robotMode,
  isWaiting,
  handleHammerStrikeEnd,
  handleButtonClick,
  handleTowerFilled,
} = useHammerGame()
</script>

<template>
  <div class="hammer-game">
    <div class="top">
      <Tower :filled-percent="towerPercent" @is-tower-filled="handleTowerFilled" />
    </div>

    <div class="bottom">
      <div class="left">
        <PowerMeter :power-percent="powerPercent" />
      </div>

      <div class="middle">
        <ButtonWithHammer @hammer-strike-ended="handleHammerStrikeEnd" :mode="hammerMode" />
        <p class="title" v-show="!isWaiting" v-html="title"></p>
        <Button
          @click="handleButtonClick"
          class="hammer-game__button"
          :variant="buttonVariant"
          v-show="!isWaiting"
        >
          {{ buttonTitle }}
        </Button>
      </div>

      <div class="right">
        <Robot :mode="robotMode" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.hammer-game {
  background-image: url('@/assets/images/bg-game.jpg');
  background-size: cover;
  background-position: bottom;
  min-width: 320px;
  max-width: 360px;
  width: 100vw;
  flex-shrink: 0;
  min-height: fit-content;
  max-height: 640px;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  padding: 28px 13px 28px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  &__button {
    margin-top: auto;
  }
}

.top {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: end;
}

.bottom {
  display: grid;
  width: 100%;
  grid-template-columns: 70px 1fr 70px;
  gap: 8px 11px;
  justify-content: center;
}

.left,
.right {
  justify-items: center;
  align-content: end;
}

.middle {
  position: relative;
  max-width: 172px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  position: absolute;
  text-align: center;
  bottom: 43px;
  color: var(--white);
  font-size: 14px;

  & span {
    color: var(--accent);
  }
}
</style>
