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
  donationLink: {
    visible: boolean
    url: string
    text: string
    allowCustomLinks: boolean
  }
  jingleJamRegistrationUrl: string
}

export interface YogsExtensionConfig {
  scheduleId: string
  visible: boolean
  streamerTabName?: string
  scheduleTabName?: string
}
