import { Relations } from './Relations'
import { YcLink } from './YcLink'

export interface Creator {
  creatorId: string
  name: string
  type: string
  relations: Relations
  subRelations: Relations
  visible: boolean
}

export interface AppBarStyle {}

export interface Small {
  profileUrl: string
}

export interface Large {
  profileUrl: string
}

export interface Images {
  small: Small
  large: Large
}

export interface CreatorStyle {
  creatorId: string
  primaryColor: string
  accentColor: string
  appBarStyle: AppBarStyle
  images: Images
  blendLevel: number
  colors: string[]
}

export interface CreatorLinks {
  creatorId: string
  links: YcLink[]
}

export interface CreatorData {
  creator: Creator
  style: CreatorStyle
  links: CreatorLinks
}
