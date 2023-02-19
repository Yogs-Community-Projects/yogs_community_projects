import { YcLink } from './YcLink'
import { Relations } from './Relations'

export interface Podcast {
  id: string
  imageUrl: string
  xmlUrl: string
  name: string
  episode: Episode
  links: YcLink[]
  url: string
  relations: Relations
}

export interface Episode {
  pubDate: string
  id: string
  url: string
  duration: number
  title: string
}
