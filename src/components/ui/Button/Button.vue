<script setup lang="ts">
import { BUTTON_VARIANTS } from './button.constants'
import type { ButtonVariant } from './button.types'

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant
  }>(),
  {
    variant: BUTTON_VARIANTS.DEFAULT,
  },
)
</script>

<template>
  <button v-bind="$attrs" :class="['button', `button_${props.variant}`]">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button {
  --color: unset;
  --color-border: unset;
  --color-bg: unset;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 36px;
  background-color: var(--color-bg);
  border-radius: var(--radius-4);
  border: 1px solid var(--color-border);
  color: var(--color);
  transition:
    color 0.3s ease,
    border-color 0.3s ease,
    background-color 0.3s ease;

  &_default {
    --color: var(--white);
    --color-border: var(--white);
    --color-bg: var(--pink);
  }

  &_accent {
    --color: var(--pink-dark);
    --color-border: var(--pink-dark);
    --color-bg: var(--yellow);
  }
}
</style>
