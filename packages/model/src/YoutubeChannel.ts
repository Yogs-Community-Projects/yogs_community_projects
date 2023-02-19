import { Relations } from './Relations'

export interface YoutubeChannelData {
  channel: YoutubeChannel
  video: Video
  relations: Relations
  subRelations: Relations
}

export interface YoutubeChannel {
  snippet: ChannelSnippet
  kind: string
  statistics: any
  etag: string
  id: string
  contentDetails: any
}

export interface ChannelSnippet {
  defaultLanguage: any
  thumbnails: ChannelThumbnails
  description: string
  publishedAt: string
  localized: any
  customUrl: any
  title: string
  country: any
}

export interface ChannelThumbnails {
  default: ChannelThumbnailDefault
  high: ChannelThumbnailHigh
  medium: ChannelThumbnailMedium
}

export interface ChannelThumbnailDefault {
  height: any
  width: any
  url: string
}

export interface ChannelThumbnailHigh {
  url: string
  width: any
  height: any
}

export interface ChannelThumbnailMedium {
  url: string
  height: any
  width: any
}

export interface Video {
  etag: string
  statistics: any
  contentDetails: any
  snippet: VideoSnippet
  kind: string
  id: string
}

export interface VideoSnippet {
  thumbnails: VideoThumbnails
  defaultLanguage: any
  country: any
  publishedAt: string
  localized: any
  customUrl: any
  description: string
  title: string
}

export interface VideoThumbnails {
  medium: VideoThumbnailMedium
  standard: any
  high: VideoThumbnailHigh
  default: VideoThumbnailDefault
  maxres: any
}

export interface VideoThumbnailMedium {
  width: any
  url: string
  height: any
}

export interface VideoThumbnailHigh {
  width: any
  height: any
  url: string
}

export interface VideoThumbnailDefault {
  height: any
  width: any
  url: string
}
