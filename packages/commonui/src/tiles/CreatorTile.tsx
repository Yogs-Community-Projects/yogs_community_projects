import { Component, Match, Switch } from 'solid-js'
import { Creator, CreatorStyle } from '@ycapp/model'
import { getTextColor } from '@ycapp/common'

// import yogs from '../assets/yogs.svg'

interface CreatorTileProps {
  creator: Creator
  style: CreatorStyle
}

export const CreatorTile: Component<CreatorTileProps> = props => {
  const { creator, style } = props
  const imageUrl = style.images.small.profileUrl ?? style.images.large.profileUrl

  function primaryColor(): string {
    return '#' + style.primaryColor.substring(2) //  + c.substring(0, 2)
  }

  function accentColor(): string {
    return '#' + style.accentColor.substring(2) //  + c.substring(0, 2)
  }

  return (
    <div
      class={
        'hover:scale-102 hover:brightness-102 flex aspect-square flex-col items-center overflow-hidden rounded-3xl p-1 transition-all'
      }
      style={{
        background: primaryColor(),
        color: getTextColor(primaryColor())
      }}
    >
      <div class={'grow object-contain'}>
        <CreatorImage creator={creator} style={style} />
      </div>
      <div class={'w-full'}>
        <p class={'text-md truncate overflow-ellipsis p-1 text-center'}>{creator.name}</p>
      </div>
    </div>
  )
}

interface CreatorImageProps {
  style: CreatorStyle
  creator: Creator

  placeholder?: any
}

export const CreatorImage: Component<CreatorImageProps> = props => {
  const { style, creator } = props
  const imageUrl = style.images.small.profileUrl ?? style.images.large.profileUrl
  const alt = `Profile image of ${creator.name}`

  return (
    <Switch>
      <Match when={imageUrl == '' || !imageUrl}>
        <img class={'aspect-square h-full rounded-full border-2 object-fill'} src={props.placeholder} alt={alt} />
      </Match>
      <Match when={imageUrl !== ''}>
        <img
          class={'aspect-square h-full rounded-full border-2 object-fill'}
          style={
            {
              //  'border-color': accentColor()
            }
          }
          src={imageUrl}
          alt={'alt'}
          onError={e => {
            console.error(e)
            e.currentTarget.onerror = null
            // e.currentTarget.src = yogs
          }}
        />
      </Match>
    </Switch>
  )
}

/*
          <img class={'aspect-square rounded-full self-center grow'}
               src={imageUrl}
               alt={alt}/>
          <p class={'text-md truncate overflow-ellipsis'}>{name}</p>

*/
