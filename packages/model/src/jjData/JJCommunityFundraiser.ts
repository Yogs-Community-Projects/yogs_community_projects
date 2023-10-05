export interface JJCommunityFundraiser {
  date: string
  avgConversionRate: number
  campaigns: Campaign[]
}

export interface Campaign {
  name: string
  description: string
  slug: string
  url: string
  startTime: string
  raised: number
  goal: number
  livestream: Livestream
  isLive?: boolean
  twitch_data?: TwitchData
  user: User
  causeId?: number
}

export interface Livestream {
  channel: string
  type: string
}

export interface TwitchData {
  display_name: string
  login: string
  profile_image_url: string
}

export interface User {
  id: number
  name: string
  slug: string
  avatar: string
  url: string
}
