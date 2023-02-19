import { Relations } from './Relations'

export interface TwitchChannelData {
  channel: TwitchChannel
  relations: Relations
  subRelations: Relations
  stream?: Stream
  lastStream?: LastStream
  type: string
}

export interface TwitchChannel {
  id: string
  login: string
  display_name: string
  type: string
  broadcaster_type: string
  description: string
  profile_image_url: string
  offline_image_url: string
  created_at: string
}

export interface Stream {
  stream: Stream2
}

export interface Stream2 {
  id: string
  user_id: string
  user_login: string
  user_name: string
  game_id: string
  game_name: string
  type: string
  viewer_count: number
  started_at: string
  thumbnail_url: string
  title: string
}

export interface LastStream {
  stream: Stream3
  endedAt: string
}

export interface Stream3 {
  id: string
  user_id: string
  user_login: string
  user_name: string
  game_id: string
  game_name: string
  type: string
  viewer_count: number
  started_at: string
  thumbnail_url: string
  title: string
}
