import { Slot, SlotUtils } from '@ycapp/model'
import { Component, For, JSX, Show } from 'solid-js'
import { useSearchParams } from '@solidjs/router'
import { useOverlayNow } from './overlay_signals'
import { getTextColor } from '@ycapp/common'

const useParam = (key: string) => {
  const [params] = useSearchParams()
  return params[key]
}

const useStyle = () => {
  return useParam('style') ?? '1'
}
interface SlotListProps {
  slots: Slot[]
}
export const OverlaySlotList: Component<SlotListProps> = props => {
  if (useStyle() == '1') {
    return <For each={props.slots}>{slot => <OverlayScheduleSlot slot={slot} />}</For>
  }
  return <For each={props.slots}>{slot => <OverlayScheduleSlotV2 slot={slot} />}</For>
}

interface MobileScheduleSlotProps {
  slot: Slot
}

const OverlayScheduleSlotV2: Component<MobileScheduleSlotProps> = props => {
  const slot = props.slot

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
        height: '100%',
      }
    } else {
      if (slot.style.background) {
        gradientStyle = {
          background: `${_parseColor(slot.style.background ?? 'ffff0000')}`,
          // background: _parseColor(slot.style.background)
          color: textColor(_parseColor(slot.style.background ?? 'ffff0000')),
          height: '100%',
        }
      }
    }
    return gradientStyle
  }

  const countdown = () => {
    return SlotUtils.start(slot).diff(useOverlayNow()).toFormat('hh:mm:ss')
  }

  return (
    <>
      <div class={'p-2'}>
        <div
          class={'flex flex-col justify-around rounded-2xl p-2 text-center shadow-2xl'}
          style={{
            ...background(),
          }}
        >
          <div>
            <p class={'text-2xl font-bold'}>{props.slot.title}</p>
            <p class={'text-xl'}>{props.slot.subtitle}</p>
          </div>
          <Show when={!SlotUtils.isLive(slot, useOverlayNow())}>
            <p class={'text-xl'}>{countdown()}</p>
          </Show>
          <Show when={SlotUtils.isLive(slot, useOverlayNow())}>
            <p class={'font-mono text-xl'}>Live</p>
          </Show>
        </div>
      </div>
    </>
  )
}

const OverlayScheduleSlot: Component<MobileScheduleSlotProps> = props => {
  const slot = props.slot

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
        height: '100%',
      }
    } else {
      if (slot.style.background) {
        gradientStyle = {
          background: `${_parseColor(slot.style.background ?? 'ffff0000')}`,
          // background: _parseColor(slot.style.background)
          color: textColor(_parseColor(slot.style.background ?? 'ffff0000')),
          height: '100%',
        }
      }
    }
    return gradientStyle
  }

  const countdown = () => {
    if (SlotUtils.start(slot).diff(useOverlayNow()).as('day') < 7) {
      return SlotUtils.start(slot).diff(useOverlayNow()).toFormat('hh:mm:ss')
    }
    return SlotUtils.start(slot).diff(useOverlayNow()).toFormat("dd 'days'")
  }

  const showDate = () => {
    return SlotUtils.start(slot).diff(useOverlayNow()).as('day') > 1
  }

  return (
    <>
      <div class={'p-2'}>
        <div
          class={'flex flex-col rounded-2xl text-center shadow-2xl'}
          style={{
            ...background(),
          }}
        >
          <div
            class={
              'bg-primary text-md flex w-full flex-row justify-between rounded-t-2xl p-1 px-4 text-center text-white'
            }
          >
            <Show when={SlotUtils.isLive(slot, useOverlayNow())}>
              <>
                <p class={'w-full text-center font-bold'}>LIVE</p>
              </>
            </Show>
            <Show when={!SlotUtils.isLive(slot, useOverlayNow())}>
              <>
                <p class={'text-lg'}>
                  {SlotUtils.start(slot).toLocaleString(
                    {
                      weekday: 'short',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                      timeZone: 'GMT',
                    },
                    {
                      locale: 'en-EN',
                    },
                  )}
                </p>
                <p class={'font-mono text-lg'}>{countdown()}</p>
              </>
            </Show>
          </div>
          <div class={'flex h-full flex-col justify-center p-2'}>
            <p class={'line-clamp-2 text-2xl font-bold'}>{props.slot.title}</p>
            <p class={'text-1xl line-clamp-2'}>{props.slot.subtitle}</p>
            <Show when={showDate()}>
              <p class={'text-lg'}>
                {SlotUtils.start(slot).toLocaleString(
                  {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    timeZone: 'GMT',
                  },
                  {
                    locale: 'en-EN',
                  },
                )}
              </p>
            </Show>
          </div>
        </div>
      </div>
    </>
  )
}
