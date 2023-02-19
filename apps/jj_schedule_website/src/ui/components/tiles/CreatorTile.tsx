import { Component, Match, Switch } from 'solid-js'
import { Creator, CreatorStyle } from '@ycapp/model'
import { getTextColor, useDivDimension } from '@ycapp/common'
import yogs from '../../../assets/yogs.svg'

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
      <div class={'h-[75%] object-contain'}>
        <img
          class={'aspect-square h-full rounded-full border-2 object-fill'}
          style={{
            'border-color': accentColor()
          }}
          src={imageUrl}
          alt={'alt'}
          onError={e => {
            e.currentTarget.onerror = null
            e.currentTarget.src = yogs
          }}
        />
      </div>
      <div class={'h-[25%] w-full'}>
        <p class={'text-md truncate overflow-ellipsis p-1 text-center'}>{creator.name}</p>
      </div>
    </div>
  )
  /*
  function primaryColor(): string {
    return '#' + style.primaryColor.substring(2);//  + c.substring(0, 2)
  }

  return (
    <div class={'aspect-square'}>
      <div
        class={`h-full w-full rounded-3xl overflow-hidden shadow-xl hover:scale-102 hover:brightness-102 transition-all cursor-pointer`}
        style={{
          'background': primaryColor(),
          'color': getTextColor(primaryColor()),
        }}>
        <div class={'w-full h-full flex flex-col p-2'}>
          <div class={'flex-1 grid place-items-center'}>
            <CreatorImage style={style} tiles={tiles}/>
          </div>
          <div class={'flex-none w-full h-[20px]'}>
            <p class={'px-2 text-center text-md truncate overflow-ellipsis'}>{props.tiles.name}</p>
          </div>
        </div>
      </div>
    </div>
  );*/
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
  const [size, setRef] = useDivDimension()
  const imageSize = () => size().width - 20 + 'px'

  return (
    <div class={'h-full w-full'} ref={setRef}>
      <Switch>
        <Match when={imageUrl == '' || !imageUrl}>
          <img
            class={'mx-auto aspect-square h-[72px] w-[72px] rounded-full object-cover'}
            src={props.placeholder}
            alt={alt}
          />
        </Match>
        <Match when={imageUrl !== ''}>
          <img
            class={'mx-auto my-auto aspect-square rounded-full object-cover'}
            style={{
              width: imageSize(),
              height: imageSize()
            }}
            src={imageUrl}
            alt={alt}
            onError={e => {
              e.currentTarget.onerror = null
              e.currentTarget.src = yogs
            }}
          />
        </Match>
      </Switch>
    </div>
  )
}

/*
          <img class={'aspect-square rounded-full self-center grow'}
               src={imageUrl}
               alt={alt}/>
          <p class={'text-md truncate overflow-ellipsis'}>{name}</p>

*/
