import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  Firestore,
  Query,
  query,
  where,
} from 'firebase/firestore'
import { YcFirebaseConverter } from './YcFirebaseConverter'
import { loadLocalAndRemote } from './local_store'
import { ConfigDB, YcFirestoreDB, YcNewsDB, YcScheduleDB } from './database'
import {
  CreatorData,
  JJExtensionConfig,
  JJWebsiteConfig,
  News,
  Podcast,
  ScheduleData,
  TwitchChannelData,
  YogsExtensionConfig,
  YoutubeChannelData,
} from '@ycapp/model'

export class CreatorFirestoreDB extends YcFirestoreDB<CreatorData> {
  get name(): string {
    return 'CreatorFirestoreDB'
  }

  read(id: string) {
    return loadLocalAndRemote<CreatorData>('creator_' + id, this.getDocRef(id), {
      forceRemote: false,
      ageInHours: 48,
    })
  }

  readAll() {
    const q = query<CreatorData>(this.getCollectionRef(), where('creator.type', '==', 'Yogs'))
    return loadLocalAndRemote<CreatorData>('all_creator_data', q, {
      forceRemote: false,
      ageInHours: 24,
    })
  }

  get collectionName(): string {
    return 'CreatorAndData'
  }
}

export class TwitchFirestoreDB extends YcFirestoreDB<TwitchChannelData> {
  get name(): string {
    return 'TwitchFirestoreDB'
  }

  read(id: string) {
    return loadLocalAndRemote<TwitchChannelData>('twitch_' + id, this.getDocRef(id), {
      forceRemote: true,
      ageInHours: 24,
    })
  }

  readAll() {
    const q = query<TwitchChannelData>(this.getCollectionRef(), where('type', '==', 'Yogs')).withConverter(
      new YcFirebaseConverter<TwitchChannelData>(),
    ) as Query<TwitchChannelData>
    return loadLocalAndRemote<TwitchChannelData>('twitch_channels', q, {
      forceRemote: true,
      ageInHours: 24,
    })
  }

  get collectionName(): string {
    return 'TwitchChannelData'
  }
}

export class YoutubeFirestoreDB extends YcFirestoreDB<YoutubeChannelData> {
  get name(): string {
    return 'YoutubeFirestoreDB'
  }

  read(id: string) {
    return loadLocalAndRemote<YoutubeChannelData>('youtube_' + id, this.getDocRef(id), {
      forceRemote: true,
      ageInHours: 24,
    })
  }

  readAll() {
    return loadLocalAndRemote<YoutubeChannelData>('youtubeChannels', this.getCollectionRef(), {
      forceRemote: true,
      ageInHours: 24,
    })
  }

  get collectionName(): string {
    return 'YoutubeChannelData'
  }
}

export class PodcastFirestoreDB extends YcFirestoreDB<Podcast> {
  get name(): string {
    return 'PodcastFirestoreDB'
  }

  read(id: string) {
    return loadLocalAndRemote<Podcast>('podcast_' + id, this.getDocRef(id), {
      forceRemote: true,
      ageInHours: 24,
    })
  }

  readAll() {
    const q = this.getCollectionRef()
    return loadLocalAndRemote<Podcast>('podcasts', q, {
      forceRemote: true,
      ageInHours: 24,
    })
  }

  get collectionName(): string {
    return 'Podcast'
  }
}

export class ScheduleFirestoreDB implements YcScheduleDB {
  protected db: Firestore

  constructor(db: Firestore) {
    this.db = db
  }

  get name(): string {
    return 'ScheduleFirestoreDB'
  }

  read(id: string) {
    return loadLocalAndRemote<ScheduleData>('schedule_' + id, this.getDocRef(id), { forceRemote: true, ageInHours: 0 })
  }

  readYogs() {
    return this.read('yogscaststreamteam')
  }

  protected getCollectionRef() {
    return collection(this.db, 'ScheduleData') as CollectionReference<ScheduleData>
  }

  protected getDocRef(id: string): DocumentReference<ScheduleData> {
    return doc<ScheduleData>(this.getCollectionRef(), id)
  }
}

export class NewsFirestoreDB implements YcNewsDB {
  protected db: Firestore

  constructor(db: Firestore) {
    this.db = db
  }

  get name(): string {
    return 'NewsFirestoreDB'
  }

  read(display: string[]) {
    const q = query(
      collection(this.db, 'News'),
      where('show', '==', true),
      where('display', 'array-contains-any', display),
    ).withConverter(new YcFirebaseConverter<News>()) as Query<News>
    return loadLocalAndRemote<News>('news', q, {
      forceRemote: true,
      ageInHours: 6,
    })
  }
}

export class ConfigFirestoreDB implements ConfigDB {
  protected db: Firestore

  constructor(db: Firestore) {
    this.db = db
  }

  get name(): string {
    return 'ConfigFirestoreDB'
  }

  readJJExtensionConfig() {
    const coll = collection(this.db, 'Config') as CollectionReference<JJExtensionConfig>
    const ref = doc<JJExtensionConfig>(coll, 'TwitchExtensionConfig')
    return loadLocalAndRemote<JJExtensionConfig>('jj_extension_config', ref, {
      forceRemote: false,
      ageInHours: 3,
    })
  }

  readYogsExtensionConfig() {
    const coll = collection(this.db, 'Config') as CollectionReference<YogsExtensionConfig>
    const ref = doc<YogsExtensionConfig>(coll, 'YogsTwitchExtension')
    return loadLocalAndRemote<YogsExtensionConfig>('yogs_extension_config', ref, {
      forceRemote: false,
      ageInHours: 3,
    })
  }

  readJJWebsiteConfig() {
    const coll = collection(this.db, 'Config') as CollectionReference<JJWebsiteConfig>
    const ref = doc(coll, 'JJConfig')
    return loadLocalAndRemote('jj_website_config', ref, {
      forceRemote: false,
      ageInHours: 3,
    })
  }
}
