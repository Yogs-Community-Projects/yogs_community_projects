export interface JJExtensionConfig {
  scheduleId: string
  visible: boolean
  channels: string[]
  excludeChannels?: string[]
}

export interface YogsExtensionConfig {
  scheduleId: string
  visible: boolean
  streamerTabName?: string
  scheduleTabName?: string
}
