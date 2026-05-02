import type { HAMMER_MODES } from './buttonWithHammer.constants'

export type HammerMode = (typeof HAMMER_MODES)[keyof typeof HAMMER_MODES]
