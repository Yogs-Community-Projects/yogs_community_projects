import { Component, Match, Show, Switch } from 'solid-js'
import { Loading } from '../../ui/components/loading/Loading'
import { useScheduleDB } from '@ycapp/common'
import { ScheduleDataProvider, useSlots } from '../../ui/schedule/providers/ScheduleDataProvider'
import '../overlay.css'
import { SlotUtils } from '@ycapp/model'
import { OverlaySlotList } from './OverlaySlotList'
import {
  background,
  useHeader,
  useHeaderTheme,
  useNext,
  useOverlayNow,
  useShowTimezone,
  useTheme,
} from '../overlay_signals'
import { OverlayHeader } from './OverlayHeader'
import { DateTime } from 'luxon'
import { ScheduleOverlayDateProviderProvider } from './ScheduleOverlayDateProvider'
import { twMerge } from 'tailwind-merge'
import { useConfig } from '../../ui/configProvider/ConfigProvider'

export const ScheduleOverlay: Component<{ date?: DateTime }> = props => {
  return (
    <ScheduleOverlayDateProviderProvider debug={false} date={props.date}>
      <ScheduleOverlayComponent
        header={useHeader()}
        next={useNext()}
        background={background()}
        headerTheme={useHeaderTheme()}
        theme={useTheme()}
        showTimezone={useShowTimezone()}
      />
    </ScheduleOverlayDateProviderProvider>
  )
}

interface Props {
  next: number
  background: string
  header: string[]
  theme: string
  headerTheme: string
  showTimezone: boolean
}

export const ScheduleOverlayComponent: Component<Props> = props => {
  const config = useConfig()

  return (
    <Switch>
      <Match when={config.overlay.yogsSchedule}>
        <Body
          next={props.next}
          background={props.background}
          header={props.header}
          theme={props.theme}
          headerTheme={props.headerTheme}
          showTimezone={props.showTimezone}
        />
      </Match>
      <Match when={!config.overlay.yogsSchedule}>
        <p class={'rounded bg-white p-2 text-black'}>The Yogs schedule is not available yet</p>
      </Match>
    </Switch>
  )
}

const Body: Component<Props> = props => {
  const config = useConfig()

  const schedule = useScheduleDB().read(config.overlay.yogsScheduleId)
  const slots = () =>
    useSlots()
      .filter(slot => {
        return SlotUtils.isLive(slot, useOverlayNow()) || SlotUtils.isBefore(slot, useOverlayNow())
      })
      .slice(0, props.next)

  const timezone = () => {
    const t = DateTime.fromISO(slots()[0].start, { setZone: true }).toFormat('ZZZZ')
    if (t === 'UTC') {
      return 'GMT'
    }
    return t
  }
  const nextGrid = () => {
    switch (props.next) {
      case 2:
        return 'grid-rows-2'
      case 3:
        return 'grid-rows-3'
      default:
        return 'grid-rows-4'
    }
  }

  return (
    <div
      style={{
        background: props.background,
      }}
      class={`max-w-screen flex h-full flex-col rounded-2xl uppercase`}
    >
      <Switch>
        <Match when={schedule.error}>
          <p>An error occurred</p>
        </Match>
        <Match when={schedule.loading}>
          <Loading />
        </Match>
        <Match when={schedule.data}>
          <ScheduleDataProvider scheduleData={schedule.data}>
            <div class={'flex h-full flex-col'}>
              <Show when={props.header}>
                <OverlayHeader header={props.header} theme={props.headerTheme} />
              </Show>
              <div class={'grid h-full flex-1 ' + nextGrid()}>
                <Show when={slots().length > 0}>
                  <OverlaySlotList slots={slots()} theme={props.theme} />
                  <Show when={props.showTimezone}>
                    <Timezone next={props.next} theme={props.theme} />
                  </Show>
                </Show>
                <Show when={slots().length == 0}>
                  <p>No Streams found {useOverlayNow().toFormat('dd.MM.yyyy')}</p>
                </Show>
              </div>
            </div>
          </ScheduleDataProvider>
        </Match>
      </Switch>
    </div>
  )
}

const Timezone: Component<{
  theme: string
  next: number
}> = props => {
  const slots = () =>
    useSlots()
      .filter(slot => {
        return SlotUtils.isLive(slot, useOverlayNow()) || SlotUtils.isBefore(slot, useOverlayNow())
      })
      .slice(0, props.next)

  const timezone = () => {
    const t = DateTime.fromISO(slots()[0].start, { setZone: true }).toFormat('ZZZZ')
    if (t === 'UTC') {
      return 'GMT'
    }
    return t
  }
  const countdownBackground = () => {
    if (props.theme === 'blue' || props.theme === 'blue_img') {
      return 'bg-accent'
    }
    return 'bg-primary'
  }

  return (
    <div class={'w-full p-2'}>
      <div
        class={twMerge(
          `flex h-6 w-full flex-col items-center justify-center rounded-2xl text-center`,
          countdownBackground(),
        )}
      >
        <p class={'text-center text-sm text-white'}>TIMES IN {timezone()}</p>
      </div>
    </div>
  )
}
