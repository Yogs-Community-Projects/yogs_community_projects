import { Slot, SlotUtils } from '@ycapp/model'
import { Component, JSX, Show, Suspense } from 'solid-js'
import { createModalSignal, getTextColor, useNow } from '@ycapp/common'
import SlotDialog from './slotDialog/SlotDialog'
import { BsPeopleFill } from 'solid-icons/bs'
import { useAnalytics } from '../../AnalyticsProvider'

interface SlotCardProps {
  slot: Slot
  showCountdown?: boolean
  showTime?: boolean
}

export const SlotCard: Component<SlotCardProps> = props => {
  const { slot } = props
  const now = useNow()
  const { logSlotClick } = useAnalytics()

  function textColor(background: string) {
    return getTextColor(background)
  }

  function _parseColor(c: string): string {
    return '#' + c.substring(2) //  + c.substring(0, 2)
  }

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

  const isLive = () => {
    return SlotUtils.isLive(props.slot, now())
  }
  const isBefore = () => {
    return SlotUtils.isBefore(props.slot, now())
  }

  const nextStream = () => {
    return SlotUtils.nextStream(props.slot, now())
  }

  const isOver = () => {
    return SlotUtils.isOver(props.slot, now())
  }

  const countdownFormat = () => {
    if (SlotUtils.start(slot).diff(now()).as('day') < 1) {
      return SlotUtils.start(slot).diff(now()).toFormat("hh'h' mm'm' ss's'")
    }
    return SlotUtils.start(slot).diff(now()).toFormat("dd'd' hh'h' mm'm' ss's'")
  }

  const modalSignal = createModalSignal()
  const hasSubtitle = () => props.slot.subtitle && props.slot.subtitle?.length > 0

  return (
    <>
      <div
        class={
          'hover:scale-102 relative flex h-[68px] cursor-pointer flex-col items-center justify-between rounded-2xl p-2 shadow-2xl transition-all hover:brightness-105'
        }
        style={{
          ...background(),
        }}
        onclick={() => {
          logSlotClick(slot)
          modalSignal.toggle()
        }}
      >
        <div class={'absolute top-0 flex h-full w-full flex-col items-center justify-center px-4 py-2'}>
          <Show when={!hasSubtitle()}>
            <p class={'line-clamp-2 w-full text-center text-sm font-bold uppercase'}>{props.slot.title}</p>
          </Show>
          <Show when={hasSubtitle()}>
            <p class={'line-clamp-1 w-full text-center text-sm font-bold uppercase'}>{props.slot.title}</p>
          </Show>
          <Show when={props.slot.subtitle && props.slot.subtitle.length > 0}>
            <p class={'line-clamp-1 text-center text-xs uppercase'}>{props.slot.subtitle}</p>
          </Show>
          <Show when={props.showTime && isOver()}>
            <p class={'line-clamp-1 text-center text-xs'}>
              {nextStream().toLocaleString({
                hour: 'numeric',
                minute: 'numeric',
                timeZoneName: 'short',
              })}
            </p>
          </Show>
          <Show when={props.showCountdown && isBefore()}>
            <p class={'line-clamp-1 text-center text-xs'}>
              <span class={'font-mono'}>{countdownFormat()}</span>,{' '}
              {nextStream().toLocaleString({
                hour: 'numeric',
                minute: 'numeric',
                timeZoneName: 'short',
              })}
            </p>
          </Show>
          <Show when={isLive()}>
            <p class={'text-xs'}>LIVE</p>
          </Show>
        </div>
        <div class={'absolute bottom-0 right-0 p-2'}>
          <Show when={slot.relations.creators.length > 0}>
            <BsPeopleFill size={12} />
          </Show>
        </div>
        <div class={'absolute bottom-0 left-0 p-2'}>
          <Show when={(slot.showTwitchIcon || slot.showHighlightIcon) && isOver()}>
            <p class={'text-xxs font-bold'}>VOD</p>
          </Show>
        </div>
      </div>
      <Suspense>
        <SlotDialog slot={slot} modalSignal={modalSignal} />
      </Suspense>
    </>
  )

  /*
  return (
    <>
      <div
        class={
          'hover:scale-102 flex h-[68px] cursor-pointer flex-col items-center justify-center rounded-2xl p-2 shadow-2xl transition-all hover:brightness-105'
        }
        style={{
          ...background(),
        }}
        onclick={modalSignal.toggle}
      >
        <div class={'flex flex-col items-center justify-center'}>
          <p class={'text-center text-sm font-bold uppercase'}>{props.slot.title}</p>
          <Show when={props.showTime && isOver()}>
            <p class={'text-center text-xs'}>
              {nextStream().toLocaleString({
                hour: 'numeric',
                minute: 'numeric',
                timeZoneName: 'short',
              })}
            </p>
          </Show>
          <Show when={props.showCountdown && isBefore()}>
            <p class={'line-clamp-1 text-center text-xs'}>
              <span class={'font-mono'}>{countdownFormat()}</span>,{' '}
              {nextStream().toLocaleString({
                hour: 'numeric',
                minute: 'numeric',
                timeZoneName: 'short',
              })}
            </p>
          </Show>
          <Show when={isLive()}>
            <p class={'text-xs'}>LIVE</p>
          </Show>
        </div>
        <div class={'mb-0 flex w-full flex-row justify-center gap-4'}>
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
  )*/
}
