import { Slot, TwitchChannelData } from '@ycapp/model'
import { Component, For, Show } from 'solid-js'
import { TwitchTile } from '../../components/tiles/TwitchTile'
import { useData } from '../../dataProvider'

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
  const { useTwitchWithCreators } = useData()
  const relatedTwitchChannel = useTwitchWithCreators(() => props.slot.relations.creators)
  return (
    <Show when={relatedTwitchChannel().length > 0}>
      <p class={'text-2xl'}>Related Channel</p>
      <RelatedChannel data={relatedTwitchChannel()} />
    </Show>
  )
}

export default RelatedChannels
