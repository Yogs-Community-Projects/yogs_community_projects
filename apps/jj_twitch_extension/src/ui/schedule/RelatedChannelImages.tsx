import { Slot } from '@ycapp/model'
import { Component, For, Match, Show, Switch } from 'solid-js'
import { useRelatedChannel } from './useRelatedChannel'
import './slot.css'

interface RelatedChannelImagesProps {
  slot: Slot
}

export const RelatedChannelImages: Component<RelatedChannelImagesProps> = props => {
  const relatedChannel = useRelatedChannel(props.slot)
  const allImages = () => {
    return relatedChannel.data.map(c => c.channel.profile_image_url)
  }
  const img = (url: string) => (
    <div class={'inline-block h-8 w-8 items-center justify-center'}>
      <img
        class={'border-twitch-500 aspect-square h-full w-full rounded-full border-2 object-fill'}
        src={url}
        alt={'alt'}
        loading={'lazy'}
      />
    </div>
  )

  return (
    <Switch>
      <Match when={relatedChannel.data}>
        <Show when={allImages().length > 2}>
          <div class="relative flex h-8 w-20 overflow-x-hidden px-1">
            <div
              style={{
                animation: `marquee ${allImages().length * 2}s linear infinite`,
              }}
              class="flex flex-row gap-1 whitespace-nowrap"
            >
              <For each={allImages()}>
                {d => {
                  return img(d)
                }}
              </For>
            </div>
            <div
              style={{
                animation: `marquee2 ${allImages().length * 2}s linear infinite`,
              }}
              class="absolute top-0 flex flex-row gap-1 whitespace-nowrap"
            >
              <For each={allImages()}>
                {d => {
                  return img(d)
                }}
              </For>
            </div>
          </div>
        </Show>
      </Match>
    </Switch>
  )
}
