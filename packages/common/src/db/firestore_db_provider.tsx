import { initializeFirestore } from 'firebase/firestore'
import { ParentComponent } from 'solid-js'
import { InternalYcDBProvider } from './internal_db_provider'
import {
  ConfigFirestoreDB,
  CreatorFirestoreDB,
  NewsFirestoreDB,
  PodcastFirestoreDB,
  ScheduleFirestoreDB,
  TwitchFirestoreDB,
  YoutubeFirestoreDB,
} from './database_firestore'
import { initializeApp } from 'firebase/app'
import { initializeAnalytics } from '@firebase/analytics'

interface YcDBFirebaseProps {
  config: any
  initAnalytics: boolean
}

const YcDBFirebaseProvider: ParentComponent<YcDBFirebaseProps> = props => {
  const { config } = props
  const app = initializeApp(config)
  const db = initializeFirestore(app, {})
  let analytics = undefined
  if (props.initAnalytics) {
    analytics = initializeAnalytics(app)
  }
  return (
    <InternalYcDBProvider
      app={app}
      db={db}
      analytics={analytics}
      creator={new CreatorFirestoreDB(db)}
      twitch={new TwitchFirestoreDB(db)}
      youtube={new YoutubeFirestoreDB(db)}
      podcast={new PodcastFirestoreDB(db)}
      schedule={new ScheduleFirestoreDB(db)}
      news={new NewsFirestoreDB(db)}
      config={new ConfigFirestoreDB(db)}
    >
      {props.children}
    </InternalYcDBProvider>
  )
}
export default YcDBFirebaseProvider
