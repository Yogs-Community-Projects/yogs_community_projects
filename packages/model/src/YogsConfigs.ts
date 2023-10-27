export interface JJExtensionConfig {
  scheduleId: string
  jjDonationTrackerDoc?: string
  fundraiserDoc?: string
  visible: boolean
  showCharities: boolean
  showCommunityFundraiser: boolean
  channels: string[]
  excludeChannels?: string[]
  donationTrackerUrl?: string
}

export interface YogsExtensionConfig {
  scheduleId: string
  visible: boolean
  streamerTabName?: string
  scheduleTabName?: string
}
