import { CreatorData, Podcast, TwitchChannelData, YoutubeChannelData } from '@ycapp/model'
import { YcDBImpl, YcScheduleDB } from './database'

export type CreatorDB = YcDBImpl<CreatorData>
export type TwitchDB = YcDBImpl<TwitchChannelData>
export type YoutubeDB = YcDBImpl<YoutubeChannelData>
export type PodcastDB = YcDBImpl<Podcast>
export type ScheduleDB = YcScheduleDB
