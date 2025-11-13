export function preloadImages(images: string[]): Promise<HTMLImageElement[]> {
  const promises = images.map(
    (image) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image()
        img.src = image
        img.onload = () => {
          resolve(img)
        }
        img.onerror = () => {
          reject()
        }
      }),
  )

  return Promise.all(promises)
}
