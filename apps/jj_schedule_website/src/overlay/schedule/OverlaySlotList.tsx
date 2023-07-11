import { Component, For, JSX, Show } from 'solid-js'
import { useSearchParams } from '@solidjs/router'
import { useOverlayNow } from '../overlay_signals'
import { Slot, SlotUtils } from '@ycapp/model'
import { getTextColor } from '@ycapp/common'
import { DateTime } from 'luxon'

const useParam = (key: string) => {
  const [params] = useSearchParams()
  return params[key]
}

const useStyle = () => {
  return useParam('style') ?? '1'
}

interface SlotListProps {
  slots: Slot[]
  theme: string
}

export const OverlaySlotList: Component<SlotListProps> = props => {
  if (useStyle() == '1') {
    return <For each={props.slots}>{slot => <OverlayScheduleSlot slot={slot} theme={props.theme} />}</For>
  }
  return <For each={props.slots}>{slot => <OverlayScheduleSlotV2 slot={slot} theme={props.theme} />}</For>
}

interface MobileScheduleSlotProps {
  slot: Slot
  theme: string
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

  const start = () => DateTime.fromISO(slot.start, { setZone: true })

  function textColor(background: string) {
    return getTextColor(background)
  }

  function _parseColor(c: string): string {
    return '#' + c.substring(2) //  + c.substring(0, 2)
  }

  const primary = {
    DEFAULT: '#E21350',
    50: '#F9B4C8',
    100: '#F7A1BA',
    200: '#F47B9F',
    300: '#F15683',
    400: '#EE3068',
    500: '#E21350',
    600: '#AE0F3E',
    700: '#7B0A2B',
    800: '#470619',
    900: '#130207',
  }

  const accent = {
    DEFAULT: '#3484BF',
    50: '#BDD9ED',
    100: '#ADD0E9',
    200: '#8DBDE0',
    300: '#6DAAD7',
    400: '#4D98CF',
    500: '#3484BF',
    600: '#286693',
    700: '#1C4767',
    800: '#10293B',
    900: '#040A0F',
  }

  const background = () => {
    let gradientStyle: JSX.CSSProperties | undefined
    if (props.theme === 'default') {
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
    } else {
      gradientStyle = {
        height: '100%',
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
    return SlotUtils.start(slot).diff(useOverlayNow()).as('day') > 2
  }

  const timeOfDay = () => {
    if (props.theme !== 'timeofday') {
      return ''
    }
    if (start().hour >= 11 && start().hour < 14) {
      return 'bg-gradient-to-b from-blue-100 to-blue-300'
    }
    if (start().hour >= 14 && start().hour < 17) {
      return 'bg-gradient-to-b from-yellow-100 to-yellow-300'
    }
    if (start().hour >= 17 && start().hour < 20) {
      return 'bg-gradient-to-b from-green-100 to-green-300'
    }
    if (start().hour >= 20 && start().hour < 23) {
      return 'bg-gradient-to-b from-pink-100 to-pink-300'
    }
    if (start().hour >= 23 || start().hour < 11) {
      return 'bg-gradient-to-b from-gray-100 to-gray-300'
    }
    return ''
  }
  const red = () => {
    if (props.theme !== 'red' && props.theme !== 'pink') {
      return ''
    }
    if (start().hour >= 11 && start().hour < 14) {
      return 'bg-gradient-to-b from-primary-200 to-primary-300 text-white'
    }
    if (start().hour >= 14 && start().hour < 17) {
      return 'bg-gradient-to-b from-primary-300 to-primary-400 text-white'
    }
    if (start().hour >= 17 && start().hour < 20) {
      return 'bg-gradient-to-b from-primary-400 to-primary-500 text-white'
    }
    if (start().hour >= 20 && start().hour < 23) {
      return 'bg-gradient-to-b from-primary-500 to-primary-600 text-white'
    }
    if (start().hour >= 23 || start().hour < 11) {
      return 'bg-gradient-to-b from-primary-600 to-primary-700 text-white'
    }
    return ''
  }
  const blue = () => {
    if (props.theme !== 'blue') {
      return ''
    }
    if (start().hour >= 11 && start().hour < 14) {
      return 'bg-gradient-to-b from-accent-200 to-accent-300 text-white'
    }
    if (start().hour >= 14 && start().hour < 17) {
      return 'bg-gradient-to-b from-accent-300 to-accent-400 text-white'
    }
    if (start().hour >= 17 && start().hour < 20) {
      return 'bg-gradient-to-b from-accent-400 to-accent-500 text-white'
    }
    if (start().hour >= 20 && start().hour < 23) {
      return 'bg-gradient-to-b from-accent-500 to-accent-600 text-white'
    }
    if (start().hour >= 23 || start().hour < 11) {
      return 'bg-gradient-to-b from-accent-600 to-accent-700 text-white'
    }
    return ''
  }

  const countdownBackground = () => {
    if (props.theme === 'blue') {
      return 'bg-accent'
    }
    return 'bg-primary'
  }
  return (
    <>
      <div class={'p-2'}>
        <div
          class={`flex flex-col rounded-2xl text-center shadow-2xl ${timeOfDay()} ${red()} ${blue()}`}
          style={{
            ...background(),
          }}
        >
          <div
            class={`${countdownBackground()} text-md flex w-full flex-row justify-between rounded-t-2xl p-1 px-4 text-center text-white`}
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
