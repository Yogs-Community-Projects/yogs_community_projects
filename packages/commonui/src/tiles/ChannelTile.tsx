import { TwitchChannelData } from '@ycapp/model'
import { Component } from 'solid-js'
import yogs from '../assets/yogs.svg'

interface TwitchTileProps {
  data: TwitchChannelData
}

export const TwitchTile: Component<TwitchTileProps> = props => {
  const { data } = props
  const imageUrl = () => data.channel.profile_image_url.replace('300x300', '70x70')

  return (
    <a
      href={`https://twitch.tv/${data.channel.login}`}
      class={
        'hover:scale-102 hover:brightness-102 bg-twitch-500 flex aspect-square flex-col items-center overflow-hidden rounded-3xl p-1 text-white transition-all'
      }
    >
      <div class={'h-[75%] object-contain'}>
        <img
          class={'border-twitch-300 aspect-square h-full rounded-full border-2 object-fill'}
          src={imageUrl()}
          alt={'alt'}
          onError={e => {
            e.currentTarget.onerror = null
            e.currentTarget.src = yogs
          }}
        />
      </div>
      <div class={'h-[25%] w-full'}>
        <p class={'p -1 text-md truncate overflow-ellipsis text-center'}>{data.channel.display_name}</p>
      </div>
    </a>
  )
}
