export interface ChallengeElementResponse {
  id: string
  name: string
  width: number
}

export interface ChallengeResponse {
  elements: ChallengeElementResponse[]
  id: string
  name: string
  scene_height: number
  scene_width: number
}

export interface CompleteChallengeRequest {
  placed_elements: PlacedElementRequest[]
}

export interface PlacedElementRequest {
  id: string
  x: number
  y: number
}
