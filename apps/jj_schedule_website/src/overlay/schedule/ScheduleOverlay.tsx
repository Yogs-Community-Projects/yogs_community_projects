import { Component, Match, Show, Switch } from 'solid-js'
import { Loading } from '../../ui/components/loading/Loading'
import { useScheduleDB } from '@ycapp/common'
import { ScheduleDataProvider, useSlots } from '../../ui/schedule/providers/ScheduleDataProvider'
import '../overlay.css'
import { SlotUtils } from '@ycapp/model'
import { OverlaySlotList } from './OverlaySlotList'
import { background, useHeader, useNext, useOverlayNow } from '../overlay_signals'
import { OverlayHeader } from './OverlayHeader'
import { DateTime } from 'luxon'
import { ScheduleOverlayDateProviderProvider } from './ScheduleOverlayDateProvider'

export const ScheduleOverlay: Component<{ date?: DateTime }> = props => {
  return (
    <ScheduleOverlayDateProviderProvider debug={false} date={props.date}>
      <ScheduleOverlayComponent header={useHeader()} next={useNext()} background={background()} />
    </ScheduleOverlayDateProviderProvider>
  )
}

export const ScheduleOverlayComponent: Component<{
  next: number
  background: string
  header: string[]
}> = props => {
  const schedule = useScheduleDB().read('jinglejam2023')
  const slots = () =>
    useSlots()
      .filter(slot => {
        return SlotUtils.isLive(slot, useOverlayNow()) || SlotUtils.isBefore(slot, useOverlayNow())
      })
      .slice(0, props.next)

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
      class={`max-w-screen flex h-screen flex-col rounded-2xl uppercase`}
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
                <OverlayHeader header={props.header} />
              </Show>
              <div class={'grid h-full flex-1 ' + nextGrid()}>
                <Show when={slots().length > 0}>
                  <OverlaySlotList slots={slots()} />
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
