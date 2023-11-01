import { Slot, SlotUtils } from '@ycapp/model'
import { Component, JSX, Show, Suspense } from 'solid-js'
import { createModalSignal, getTextColor, useNow } from '@ycapp/common'
import { DateTime } from 'luxon'
import { FaSolidHeart } from 'solid-icons/fa'
import SlotDialog from './slotDialog/SlotDialog'
import { BsPeopleFill } from 'solid-icons/bs'

interface SlotCardProps {
  slot: Slot
  showCountdown?: boolean
  showTime?: boolean
}

export const SlotCard: Component<SlotCardProps> = props => {
  const { slot } = props
  const now = useNow()

  function textColor(background: string) {
    return getTextColor(background)
  }

  function _parseColor(c: string): string {
    return '#' + c.substring(2) //  + c.substring(0, 2)
  }

  /*  function _parseColorWithOpacity(c: string): string {
    return '#' + c.substring(2) + 'BB' //  + c.substring(0, 2)
  }*/

  const background = () => {
    let gradientStyle: JSX.CSSProperties | undefined
    if (slot.style.linearGradient) {
      const linearGradient = slot.style.linearGradient
      gradientStyle = {
        background: `linear-gradient(180deg, ${linearGradient.colors.map(_parseColor).join(', ')})`,
        color: textColor(_parseColor(slot.style.background ?? linearGradient.colors[0] ?? 'ffff0000')),
        // height: '100%',
      }
    } else {
      if (slot.style.background) {
        gradientStyle = {
          background: `${_parseColor(slot.style.background ?? 'ffff0000')}`,
          // background: _parseColor(slot.style.background)
          color: textColor(_parseColor(slot.style.background ?? 'ffff0000')),
          // height: '100%',
        }
      }
    }
    return gradientStyle
  }
  /*
  const backgroundImg = () => {
    let gradientStyle: JSX.CSSProperties | undefined
    if (slot.style.linearGradient) {
      const linearGradient = slot.style.linearGradient
      gradientStyle = {
        background: `linear-gradient(180deg, ${linearGradient.colors.map(_parseColorWithOpacity).join(', ')})`,
        color: textColor(_parseColor(slot.style.background ?? linearGradient.colors[0] ?? 'ffff0000')),
      }
    } else {
      if (slot.style.background) {
        gradientStyle = {
          background: `${_parseColorWithOpacity(slot.style.background ?? 'ffff0000')}`,
          // background: _parseColor(slot.style.background)
          color: textColor(_parseColor(slot.style.background ?? 'ffff0000')),
        }
      }
    }

    return gradientStyle
  }
  */

  const isLive = () => {
    return SlotUtils.isLive(props.slot, now())
  }
  const isBefore = () => {
    return SlotUtils.isBefore(props.slot, now())
  }

  const start = () => {
    return SlotUtils.start(props.slot)
  }

  const underline = () => {
    if (isLive()) {
      return 'underline'
    }
    return ''
  }

  const nextStream = () => {
    return SlotUtils.nextStream(props.slot, now())
  }

  const isOver = () => {
    return SlotUtils.isOver(props.slot, now())
  }

  const countdownFormat = () => {
    if (SlotUtils.start(slot).diff(now()).as('day') > 14) {
      return SlotUtils.start(slot).diff(now()).toFormat("dd 'days'")
    }
    if (SlotUtils.start(slot).diff(now()).as('day') < 7) {
      return SlotUtils.start(slot).diff(now()).toFormat('hh:mm:ss')
    }
    return SlotUtils.start(slot).diff(now()).toFormat("dd 'days,' hh:mm:ss")
  }

  const modalSignal = createModalSignal()

  return (
    <>
      <div
        class={
          'hover:scale-102 flex h-[64px] cursor-pointer flex-col items-center justify-center rounded-2xl p-2 shadow-2xl transition-all hover:brightness-105'
        }
        style={{
          ...background(),
        }}
        onclick={modalSignal.toggle}
      >
        <p class={'text-sm font-bold md:text-base' + underline()}>{props.slot.title}</p>
        <Show when={props.showTime && !isLive()}>
          <p class={'font-mono text-xs md:text-sm'}>
            {nextStream().toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)}
          </p>
        </Show>
        <Show when={props.showCountdown && isBefore()}>
          <p class={'text-xs md:text-sm'}>
            Starts in <span class={'font-mono'}>{countdownFormat()}</span>
          </p>
        </Show>
        <Show when={isLive()}>
          <p class={'text-xs md:text-sm'}>LIVE</p>
        </Show>
        <div class={'flex w-full flex-row justify-center gap-4'}>
          <Show when={(slot.showTwitchIcon || slot.showHighlightIcon) && isOver()}>
            <p class={'text-xxs font-bold'}>VOD</p>
          </Show>
          <Show when={slot.relations.creators.length > 0}>
            <BsPeopleFill size={12} />
          </Show>
        </div>
      </div>
      <Suspense>
        <SlotDialog slot={slot} modalSignal={modalSignal} />
      </Suspense>
    </>
  )
}
