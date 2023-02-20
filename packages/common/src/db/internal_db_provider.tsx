import { ConfigDB, YcDBImpl, YcNewsDB, YcScheduleDB } from './database'
import { createContext, ParentComponent, useContext } from 'solid-js'
import { CreatorData, Podcast, TwitchChannelData, YoutubeChannelData } from '@ycapp/model'

interface YcDBContextProps {
  creator: YcDBImpl<CreatorData>
  twitch: YcDBImpl<TwitchChannelData>
  youtube: YcDBImpl<YoutubeChannelData>
  podcast: YcDBImpl<Podcast>
  schedule: YcScheduleDB
  news: YcNewsDB
  config: ConfigDB
}

interface YcDBProps {
  creator: YcDBImpl<CreatorData>
  twitch: YcDBImpl<TwitchChannelData>
  youtube: YcDBImpl<YoutubeChannelData>
  podcast: YcDBImpl<Podcast>
  schedule: YcScheduleDB
  news: YcNewsDB
  config: ConfigDB
}

const YcDBContext = createContext<YcDBContextProps>()
export const InternalYcDBProvider: ParentComponent<YcDBProps> = props => {
  return (
    <YcDBContext.Provider
      value={{
        creator: props.creator,
        twitch: props.twitch,
        youtube: props.youtube,
        podcast: props.podcast,
        schedule: props.schedule,
        news: props.news,
        config: props.config,
      }}
    >
      {props.children}
    </YcDBContext.Provider>
  )
}
const useYcDB = () => useContext(YcDBContext)!
export const useCreatorDB = () => useYcDB().creator
export const useTwitchDB = () => useYcDB().twitch
export const useYoutubeDB = () => useYcDB().youtube
export const usePodcastDB = () => useYcDB().podcast
export const useScheduleDB = () => useYcDB().schedule
export const useNewsDB = () => useYcDB().news
export const useConfigDB = () => useYcDB().config
