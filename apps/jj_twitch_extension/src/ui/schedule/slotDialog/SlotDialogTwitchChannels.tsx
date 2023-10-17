import { useTwitchDB } from '@ycapp/common'
import { Slot } from '@ycapp/model'
import { Component, For, Match, Switch } from 'solid-js'
import { TwitchTile } from '../../components/tiles/TwitchTile'

interface SlotDialogTwitchChannelsProps {
  slot: Slot
}

const SlotDialogTwitchChannels: Component<SlotDialogTwitchChannelsProps> = props => {
  const liveChannel = useTwitchDB().readSome(props.slot.relations.twitchChannels)
  return (
    <Switch>
      <Match when={liveChannel.data}>
        <p class={'text-2xl'}>Twitch Channel</p>
        <div class={'grid grid-cols-3 gap-1'}>
          <For each={liveChannel.data}>{channel => <TwitchTile data={channel} />}</For>
        </div>
      </Match>
      <Match when={liveChannel.loading}>
        <p>Loading Live Channels...</p>
      </Match>
      <Match when={liveChannel.error}>
        <p>{JSON.stringify(liveChannel.error)}</p>
      </Match>
    </Switch>
  )
}
export default SlotDialogTwitchChannels
