import { Component } from 'solid-js'
import { getTextColor, useDivDimension } from '@ycapp/common'
import yogs from '../../assets/yogs.svg'

interface TileProps {
  color: string
  name: string
  imageUrl: string
  alt: string
}

export const Tile: Component<TileProps> = props => {
  function primaryColor(): string {
    return '#' + props.color.substring(2) //  + c.substring(0, 2)
  }

  // 'color': textColor(_parseColor(slot.style.background ?? 'ffff0000')),
  // return (<pre>{JSON.stringify(style.primaryColor, null, 2)}</pre>);
  return (
    <div class={'aspect-square'}>
      <div
        class={`h-full w-full cursor-pointer overflow-hidden rounded-3xl shadow-xl transition-all hover:scale-105 hover:brightness-105`}
        style={{
          background: primaryColor(),
          color: getTextColor(primaryColor())
        }}
      >
        <div class={'flex h-full w-full flex-col p-2'}>
          <div class={'grid flex-1 place-items-center'}>
            <Image color={props.color} alt={props.alt} imageUrl={props.alt} />
          </div>
          <div class={'h-[20px] w-full flex-none'}>
            <p class={'text-md truncate overflow-ellipsis px-2 text-center'}>{props.name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ImageProps {
  color: string
  imageUrl: string
  alt: string

  placeholder?: any
}

const Image: Component<ImageProps> = props => {
  const [size, setRef] = useDivDimension()
  const imageSize = () => size().width - 20 + 'px'

  return (
    <div class={'h-full w-full'} ref={setRef}>
      <img
        class={'mx-auto my-auto aspect-square rounded-full object-cover'}
        style={{
          width: imageSize(),
          height: imageSize()
        }}
        src={props.imageUrl}
        alt={props.alt}
        onError={e => {
          e.currentTarget.onerror = null
          e.currentTarget.src = yogs
        }}
      />
    </div>
  )
  /*
  return (
    <div class={'w-full h-full'} ref={setRef}>
      <Switch>
        <Match when={props.imageUrl == '' || !props.imageUrl}>
          <img class={'mx-auto aspect-square rounded-full object-cover h-[72px] w-[72px]'}
               src={props.placeholder}
               alt={'alt'}
               style={{
                 'width': imageSize(),
                 'height': imageSize(),
               }}
          />
        </Match>
        <Match when={props.imageUrl !== ''}>
          <img class={'mx-auto my-auto aspect-square rounded-full object-cover'}
               style={{
                 'width': imageSize(),
                 'height': imageSize(),
               }}
               src={props.imageUrl}
               alt={props.alt}
               onError={(e) => {
                 e.currentTarget.onerror = null;
                 e.currentTarget.src = yogs
               }}
          />
        </Match>
      </Switch>
    </div>
)
  ;
*/
}
