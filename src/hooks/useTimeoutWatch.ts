import { onBeforeUnmount, toValue, watch, type MaybeRefOrGetter, type Ref } from 'vue'

export const useTimeoutWatch = <T>(
  source: (() => T) | Ref<T>,
  callback: () => void,
  delay: MaybeRefOrGetter<number>,
  check?: (val: T) => boolean,
) => {
  let timerId: null | number = null

  watch(source, (val) => {
    if (check?.(val) ?? true) {
      if (timerId) clearTimeout(timerId)

      timerId = setTimeout(() => {
        callback()
        timerId = null
      }, toValue(delay))
    }
  })

  onBeforeUnmount(() => {
    if (timerId) clearTimeout(timerId)
  })
}
