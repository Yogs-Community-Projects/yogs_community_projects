import { ParentComponent } from 'solid-js'
import { InternalYcDBProvider } from './internal_db_provider'
import {
  ConfigDummyDB,
  CreatorDummyDB,
  NewsDummyDB,
  PodcastDummyDB,
  ScheduleDummyDB,
  TwitchDummyDB,
  YoutubeDummyDB
} from './database_dummy'

const YcDBDummyProvider: ParentComponent = props => {
  return (
    <InternalYcDBProvider
      creator={new CreatorDummyDB()}
      twitch={new TwitchDummyDB()}
      youtube={new YoutubeDummyDB()}
      podcast={new PodcastDummyDB()}
      schedule={new ScheduleDummyDB()}
      news={new NewsDummyDB()}
      config={new ConfigDummyDB()}
    >
      {props.children}
    </InternalYcDBProvider>
  )
}
export default YcDBDummyProvider
