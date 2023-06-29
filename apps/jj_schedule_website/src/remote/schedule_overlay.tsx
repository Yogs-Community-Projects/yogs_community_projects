import { Component, For, JSX, Match, Switch } from 'solid-js'
import { useParams } from '@solidjs/router'
import { Loading } from '../ui/components/loading/Loading'
import { getTextColor, useNow, useScheduleDB } from '@ycapp/common'
import { ScheduleDataProvider, useCurrentDay } from '../ui/schedule/providers/ScheduleDataProvider'
import './overlay.css'
import { Slot, SlotUtils } from '@ycapp/model'
import { DayIndexProvider } from '../ui/schedule/providers/DayIndexProvider'

const useParam = (key: string) => {
  const params = useParams()
  return params[key]
}

const useColor = () => {
  return useParam('color')
}
const useShowDay = () => {
  return useParam('day')
}
const useNext = () => {
  return useParam('next')
}

export const ScheduleOverlay: Component = () => {
  const schedule = useScheduleDB().read('jinglejam2022')

  return (
    <div class={'max-w-screen bg-accent-50 flex h-screen flex-col rounded-2xl shadow-2xl'}>
      <Switch>
        <Match when={schedule.error}>
          <p>An error occurred</p>
        </Match>
        <Match when={schedule.loading}>
          <Loading />
        </Match>
        <Match when={schedule.data}>
          <ScheduleDataProvider scheduleData={schedule.data}>
            <DayIndexProvider>
              <div class={'flex h-full flex-col'}>
                <Header />
                <div class={'grid h-full flex-1 grid-rows-4'}>
                  <SlotList slots={useCurrentDay().slots} />
                </div>
              </div>
            </DayIndexProvider>
          </ScheduleDataProvider>
        </Match>
      </Switch>
    </div>
  )
}

interface SlotListProps {
  slots: Slot[]
}

const SlotList: Component<SlotListProps> = props => {
  return <For each={props.slots}>{slot => <MobileScheduleSlotV2 slot={slot} />}</For>
}

interface MobileScheduleSlotProps {
  slot: Slot
}

const MobileScheduleSlot: Component<MobileScheduleSlotProps> = props => {
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
    return SlotUtils.start(slot).diff(useNow()).toFormat('dd hh:mm:ss')
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
          <p class={'font-mono text-xl'}>{countdown()}</p>
        </div>
      </div>
    </>
  )
}

const MobileScheduleSlotV2: Component<MobileScheduleSlotProps> = props => {
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
    return SlotUtils.start(slot).diff(useNow()).toFormat('dd hh:mm:ss')
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
          <div class={'bg-primary text-md flex w-full flex-row justify-between rounded-t-2xl p-1 px-4 text-white'}>
            <p>
              {SlotUtils.start(slot).toLocaleString({
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
                timeZone: 'GMT',
              })}
            </p>
            <p class={'font-mono'}>{countdown()}</p>
          </div>
          <div class={'flex h-full flex-col justify-center p-2'}>
            <p class={'line-clamp-2 text-2xl font-bold'}>{props.slot.title}</p>
            <p class={'line-clamp-2 text-2xl'}>{props.slot.subtitle}</p>
          </div>
        </div>
      </div>
    </>
  )
}

const Header: Component = () => {
  return (
    <div class={'p-2'}>
      <div class={'flex flex-row items-center justify-center rounded-2xl bg-white p-2 text-4xl font-bold shadow-xl'}>
        <p>
          <span class={'text-accent-500'}>Up</span> <span class={'text-primary-500'}>Next</span>
        </p>
      </div>
    </div>
  )
}
