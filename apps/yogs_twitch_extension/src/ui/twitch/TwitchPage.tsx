import { Component, For, Match, Switch } from 'solid-js'
import { DateTime } from 'luxon'
import { TwitchTile } from '../components/tiles/TwitchTile'
import { TwitchChannelData } from '@ycapp/model'
import { useTwitchDB } from '@ycapp/common'
import { NewsComponent } from '../components/NewsComponent'

const TwitchPage: Component = () => {
  const result = useTwitchDB().readAll()
  return (
    <div class={''}>
      <Switch>
        <Match when={result.data}>
          <Body channels={result.data} />
        </Match>
        <Match when={result.error}>
          <p>{JSON.stringify(result.error)}</p>
        </Match>
        <Match when={result.loading}>
          <p>Loading</p>
        </Match>
      </Switch>
    </div>
  )
}

interface BodyProps {
  channels: TwitchChannelData[]
}

const Body: Component<BodyProps> = props => {
  const channels = () => props.channels
  const live = () => {
    return (
      channels()
        .filter(data => data.stream)
        .sort((a, b) => {
          const aStart = DateTime.fromISO(a.stream.stream.started_at)
          const bStart = DateTime.fromISO(b.stream.stream.started_at)
          return bStart.diff(aStart).as('seconds')
        }) ?? []
    )
  }
  const offline = () => {
    return (
      channels()
        .filter(data => !data.stream)
        .filter(data => data.lastStream)
        .filter(channel => {
          const end = DateTime.fromISO(channel.lastStream.endedAt)
          return DateTime.now().diff(end).as('day') < 60
        })
        .sort((a, b) => {
          const aEnd = DateTime.fromISO(a.lastStream.endedAt)
          const bEnd = DateTime.fromISO(b.lastStream.endedAt)
          return bEnd.diff(aEnd).as('seconds')
        }) ?? []
    )
  }

  return (
    <div class={'flex flex-col pb-4'}>
      <NewsComponent />
      <p class={'text-center text-xl text-white'}>Live</p>
      <div class={'grid grid-cols-3 gap-1 p-1'}>
        <For each={live()}>
          {channel => {
            return <TwitchTile data={channel} />
          }}
        </For>
      </div>
      <p class={'text-center text-xl text-white'}>Offline</p>
      <div class={'grid grid-cols-3 gap-1 p-1'}>
        <For each={offline()}>
          {channel => {
            return <TwitchTile data={channel} />
          }}
        </For>
      </div>
    </div>
  )
}

export default TwitchPage
