import { RemoteData, useCreatorDB, useTwitchDB } from '@ycapp/common'
import { Slot, TwitchChannelData } from '@ycapp/model'
import { batch, Component, createEffect, createRoot, For, Match, Switch } from 'solid-js'
import { TwitchTile } from '../../components/tiles/TwitchTile'
import { createStore } from 'solid-js/store'
import { useRelatedChannel } from '../useRelatedChannel'

interface RelatedChannelProps {
  data: TwitchChannelData[]
}

const RelatedChannel: Component<RelatedChannelProps> = props => {
  return (
    <div class={'grid grid-cols-3 gap-1'}>
      <For each={props.data}>{channel => <TwitchTile data={channel} />}</For>
    </div>
  )
}

interface RelatedChannelsProps {
  slot: Slot
}

const RelatedChannels: Component<RelatedChannelsProps> = props => {
  const relatedTwitchChannel = useRelatedChannel(props.slot)
  return (
    <>
      <Switch>
        <Match when={relatedTwitchChannel.data}>
          <p class={'text-2xl'}>Related Channel</p>
          <RelatedChannel data={relatedTwitchChannel.data} />
        </Match>
        <Match when={relatedTwitchChannel.loading}>
          <p>Loading Related Channels...</p>
        </Match>
        <Match when={relatedTwitchChannel.error}>
          <p>{JSON.stringify(relatedTwitchChannel.error)}</p>
        </Match>
      </Switch>
    </>
  )
}

export default RelatedChannels
