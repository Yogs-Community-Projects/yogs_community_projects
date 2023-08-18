import { Component } from 'solid-js'
import { TwitchChannelData } from '@ycapp/model'

interface TwitchTileProps {
  data: TwitchChannelData
}

export const TwitchTile: Component<TwitchTileProps> = props => {
  const { data } = props
  const imageUrl = () => data.channel.profile_image_url.replace('300x300', '70x70')

  return (
    <a
      href={`https://twitch.tv/${data.channel.login}`}
      target={'_blank'}
      class={
        'hover:scale-102 hover:brightness-102 bg-twitch-500 flex aspect-square flex-col items-center overflow-hidden rounded-3xl p-1 text-white transition-all'
      }
    >
      <div class={'h-[75%] object-contain'}>
        <img
          class={'border-twitch-300 aspect-square h-full rounded-full border-2 object-fill'}
          src={imageUrl()}
          alt={'alt'}
          loading={'lazy'}
        />
      </div>
      <div class={'flex h-[25%] w-full flex-col items-center justify-center'}>
        <p class={'m-auto truncate overflow-ellipsis text-center text-xs'}>{data.channel.display_name}</p>
      </div>
    </a>
  )
}
