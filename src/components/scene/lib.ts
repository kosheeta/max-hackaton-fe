export function getElementImageSource(challengeId: string, elementId: string) {
  return `images/challenges/${challengeId}/elements/${elementId}.png`
}

export function getSceneImageSource(challengeId: string) {
  return `images/challenges/${challengeId}/scene.png`
}
