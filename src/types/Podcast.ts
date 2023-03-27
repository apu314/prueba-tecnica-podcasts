import { PodcastDetail } from './PodcastDetailResponse'

export interface PodcastInfo {
  author: string
  title: string
  description: string
  image: string
}

export interface PodcastEpisodes {
  collectionId: number
  episodes: PodcastDetail[]
}
