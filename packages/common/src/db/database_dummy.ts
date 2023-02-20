import { createEffect, createResource } from 'solid-js'
import { RemoteData } from './local_store'
import { ConfigDB, YcDBImpl, YcNewsDB, YcScheduleDB } from './database'
import {
  CreatorData,
  JJExtensionConfig,
  News,
  Podcast,
  ScheduleData,
  TwitchChannelData,
  YoutubeChannelData
} from '@ycapp/model'
import { createStore } from 'solid-js/store'

abstract class DummyDB<T> extends YcDBImpl<T> {
  read(id: string) {
    const all = this.readAll()
    const [state, setState] = createStore<RemoteData<T | null>>({
      loading: true,
      data: null,
      error: null
    })
    createEffect(() => {
      if (all.error) {
        setState({
          loading: false,
          error: all.error,
          data: null
        })
      } else if (all.loading) {
        setState({
          loading: true,
          error: null,
          data: null
        })
      } else if (all.data) {
        setState({
          loading: false,
          error: null,
          data: this.find(all.data, id)
        })
      }
    })
    return state
  }

  readAll() {
    const fetch = () => this.fetch()
    const [resource] = createResource(fetch)
    const [state, setState] = createStore<RemoteData<T[] | null>>({
      loading: true,
      data: null,
      error: null
    })
    createEffect(() => {
      if (resource()) {
        setState({
          loading: false,
          error: null,
          data: resource()
        })
      }
    })
    return state
  }

  abstract fetch(): Promise<T[]>

  abstract find(t: T[], id: string): T | undefined
}

export class CreatorDummyDB extends DummyDB<CreatorData> {
  get name(): string {
    return 'CreatorDummyDB'
  }

  fetch(): Promise<CreatorData[]> {
    return import('./dummy_data/creator_data').then(a => a.fetchLocal())
  }

  find(t: CreatorData[], id: string) {
    return t.find(c => c.creator.creatorId == id)
  }
}

export class TwitchDummyDB extends DummyDB<TwitchChannelData> {
  get name(): string {
    return 'TwitchDummyDB'
  }

  fetch(): Promise<TwitchChannelData[]> {
    return import('./dummy_data/twitch_channel_data').then(a => a.fetchDummyTwitchChannels())
  }

  find(t: TwitchChannelData[], id: string) {
    return t.find(c => c.channel.id == id)
  }
}

export class YoutubeDummyDB extends DummyDB<YoutubeChannelData> {
  get name(): string {
    return 'YoutubeDummyDB'
  }

  fetch(): Promise<YoutubeChannelData[]> {
    return import('./dummy_data/youtube_dummy_data').then(a => a.fetchDummyData())
  }

  find(t: YoutubeChannelData[], id: string) {
    return t.find(c => c.channel.id == id)
  }
}

export class PodcastDummyDB extends DummyDB<Podcast> {
  get name(): string {
    return 'PodcastDummyDB'
  }

  fetch(): Promise<Podcast[]> {
    return import('./dummy_data/podcast_dummy_data').then(a => a.fetchDummyData())
  }

  find(t: Podcast[], id: string) {
    return t.find(c => c.id == id)
  }
}

export class ScheduleDummyDB implements YcScheduleDB {
  read(id: string) {
    console.log(this.name, id)
    if (id.includes('jinglejam') || id.includes('jj')) {
      return this.readJJ()
    }
    return this.readYogs()
  }

  readYogs(): RemoteData<ScheduleData | null> {
    const fetch = () => import('./dummy_data/test_schedule_data').then(a => a.fetchDummySchedule())
    const [resource] = createResource(fetch)
    const [state, setState] = createStore<RemoteData<ScheduleData | null>>({
      loading: true,
      data: null,
      error: null
    })
    createEffect(() => {
      if (resource()) {
        setState({
          loading: false,
          error: null,
          data: resource()
        })
      }
    })
    return state
  }

  readJJ(): RemoteData<ScheduleData | null> {
    const fetch = () => import('./dummy_data/test_schedule_data').then(a => a.fetchDummyJJSchedule())
    const [resource] = createResource(fetch)
    const [state, setState] = createStore<RemoteData<ScheduleData | null>>({
      loading: true,
      data: null,
      error: null
    })
    createEffect(() => {
      if (resource()) {
        setState({
          loading: false,
          error: null,
          data: resource()
        })
        console.log(resource())
      }
    })
    return state
  }

  get name(): string {
    return 'ScheduleDummyDB'
  }
}

export class NewsDummyDB implements YcNewsDB {
  get name(): string {
    return 'NewsDummyDB'
  }

  read(display: string[]): RemoteData<News[] | null> {
    return {
      loading: true,
      data: null,
      error: null
    }
  }
}

export class ConfigDummyDB implements ConfigDB {
  private readonly jjExtensionConfig: JJExtensionConfig

  constructor(jjExtensionConfig: JJExtensionConfig = { scheduleId: 'jinglejam2022_2', visible: true }) {
    this.jjExtensionConfig = jjExtensionConfig
  }

  get name(): string {
    return 'ConfigDummyDB'
  }

  readJJExtensionConfig() {
    return {
      data: this.jjExtensionConfig,
      loading: false,
      error: null
    }
  }
}
