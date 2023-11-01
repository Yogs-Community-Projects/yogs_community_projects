import { Slot } from '@ycapp/model'
import { Component, For, Show } from 'solid-js'
import { TwitchTile } from '../../components/tiles/TwitchTile'
import { useData } from '../../dataProvider'

interface SlotDialogTwitchChannelsProps {
  slot: Slot
}

const SlotDialogTwitchChannels: Component<SlotDialogTwitchChannelsProps> = props => {
  const { useTwitchChannels } = useData()

  const liveChannel = useTwitchChannels(() => props.slot.relations.twitchChannels)
  const show = () => liveChannel().length > 0
  return (
    <Show when={show()}>
      <p class={'text-2xl'}>Twitch Channel</p>
      <div class={'grid grid-cols-3 gap-1'}>
        <For each={liveChannel()}>{channel => <TwitchTile data={channel} />}</For>
      </div>
    </Show>
  )
}
export default SlotDialogTwitchChannels
