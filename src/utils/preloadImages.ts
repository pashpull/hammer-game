export const preloadImages = (urls: string[]): Promise<void[]> => {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image()
          const timeout = setTimeout(() => resolve(), 5000)

          img.onload = () => {
            clearTimeout(timeout)
            resolve()
          }
          img.onerror = () => {
            clearTimeout(timeout)
            resolve()
          }
          img.src = url
        }),
    ),
  )
}
