import { TwitchChannelData } from '@ycapp/model'
import { Component, createContext, Match, ParentComponent, Switch, useContext } from 'solid-js'
import { DateTime } from 'luxon'

const TwitchChannelDataContext = createContext<TwitchChannelData>()

interface TwitchChannelDataProps {
  data: TwitchChannelData
}

const TwitchChannelDataProvider: ParentComponent<TwitchChannelDataProps> = props => {
  return <TwitchChannelDataContext.Provider value={props.data}>{props.children}</TwitchChannelDataContext.Provider>
}
const useTwitchChannelData = () => useContext(TwitchChannelDataContext)!

interface TwitchCardProps {
  data: TwitchChannelData
}

export const TwitchCard: Component<TwitchCardProps> = props => {
  return (
    <TwitchChannelDataProvider data={props.data}>
      <TwitchChannelCardBody />
    </TwitchChannelDataProvider>
  )
}

export const TwitchOfflineCard: Component<TwitchCardProps> = props => {
  return (
    <TwitchChannelDataProvider data={props.data}>
      <LastStreamCard />
    </TwitchChannelDataProvider>
  )
}

const TwitchChannelCardBody: Component = () => {
  const { stream } = useTwitchChannelData()
  const isLive = () => stream !== undefined
  return (
    <Switch>
      <Match when={!isLive()}>
        <LastStreamCard />
      </Match>
      <Match when={isLive()}>
        <StreamCard />
      </Match>
    </Switch>
  )
}

const LastStreamCard: Component = () => {
  const { channel, lastStream } = useTwitchChannelData()
  return (
    <a
      class="bg-twitch hover:scale-101 my-auto flex aspect-[8/1] w-full flex-row rounded-2xl p-2 text-white transition-all hover:brightness-105"
      href={`https://www.twitch.tv/${channel.login}`}
    >
      <img class="mx-auto h-16 w-16 rounded-full" src={channel.profile_image_url.replace('300x300', '70x70')} alt="" />
      <div class="my-auto ml-2 flex-1">
        <div class="text-lg font-medium">{channel.display_name}</div>
        <div class="text-sm">
          Last Live {DateTime.fromISO(lastStream!.endedAt).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
        </div>
      </div>
    </a>
  )
}

const StreamCard: Component = () => {
  const { channel, stream } = useTwitchChannelData()
  return (
    <a
      class="bg-twitch hover:scale-101 my-auto flex aspect-[8/1] w-full rounded-2xl p-2 text-white transition-all hover:brightness-105"
      href={`https://www.twitch.tv/${channel.login}`}
    >
      <img class="mx-auto h-full rounded-full" src={channel.profile_image_url.replace('300x300', '70x70')} alt="" />
      <div class=" my-auto ml-2 w-full">
        <div class=" font-medium">{channel.display_name}</div>
        <div class=" text-sm">{stream!.stream.title}</div>
        <div class=" text-sm">
          Live for {DateTime.fromISO(stream!.stream.started_at).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
        </div>
      </div>
    </a>
  )
}
