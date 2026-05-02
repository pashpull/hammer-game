<script setup lang="ts">
import { MARK_COUNT } from './powerMeter.constants'

const marks = Array.from({ length: MARK_COUNT }, (_, i) => i)

const props = defineProps<{
  powerPercent: number
}>()
</script>

<template>
  <div class="power-meter" :style="{ '--progress': powerPercent }">
    <div class="plate"></div>

    <div class="scale">
      <div v-for="mark in marks" :key="mark" class="scale__mark"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$root-height: 147px;
$root-padding: 2px;
$root-border-width: 1px;

.power-meter {
  --progress: 0;
  width: 40px;
  height: $root-height;
  padding: 0 $root-padding $root-padding;
  background-color: var(--bg-light);
  border: $root-border-width solid var(--dark);
  border-radius: var(--radius-4);
  display: flex;
  justify-content: center;
  position: relative;
}

.plate {
  $height: 3px;
  $range: $root-height - $root-border-width * 2 - $height;
  top: 0px;
  transform: translateY(calc($range - var(--progress) * ($range / 100)));
  position: absolute;
  z-index: 1;
  width: calc(100% + 10px);
  height: $height;
  background-color: var(--white);
  border-radius: var(--radius-2);
}

.scale {
  border-radius: var(--radius-2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ($root-padding + 4px) 7px 4px;
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;

  &__mark {
    position: relative;
    width: 100%;
    height: 1px;
    background-color: var(--blue-light);
  }

  &::before,
  &::after {
    content: ' ';
    position: absolute;
  }

  &::before {
    width: 100%;
    height: 100%;
    background-color: var(--green);
    inset: 0;
    transform: translateY(calc(100% - var(--progress) * 1%));
    border-radius: var(--radius-2);
  }

  &::after {
    width: 14px;
    inset: ($root-padding + 1px) auto 1px 1px;
    background-color: var(--white-40);
    border-radius: var(--radius-1);
  }
}
</style>
