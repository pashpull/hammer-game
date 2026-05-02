import type { BUTTON_VARIANTS } from './button.constants'

export type ButtonVariant = (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS]
