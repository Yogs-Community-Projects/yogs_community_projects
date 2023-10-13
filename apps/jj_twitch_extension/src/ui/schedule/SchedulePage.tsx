import { Component, Match, Show, Switch } from 'solid-js'
import { ScheduleDataProvider } from './JJScheduleProvider'
import { DayIndexProvider } from './DayIndexProvider'
import { ScheduleBody } from './ScheduleBody'
import { useJJConfig, useScheduleDB } from '@ycapp/common'
import { CreatorFilterProvider } from './CreatorFilterProvider'
import { InvisibleBody } from '../InvisibleBody'

const SchedulePage: Component = () => {
  const visible = () => useJJConfig().visible
  return (
    <>
      <Show when={visible()}>
        <VisibleSchedule />
      </Show>
      <Show when={!visible()}>
        <InvisibleBody text={'The Yogscast Jingle Jam Schedule Page will be live soon.'} />
      </Show>
    </>
  )
}

const VisibleSchedule = () => {
  const scheduleId = () => useJJConfig().scheduleId
  const schedule = useScheduleDB().read(scheduleId())
  return (
    <>
      <Switch>
        <Match when={schedule.data} keyed={true}>
          <ScheduleDataProvider scheduleData={schedule.data}>
            <DayIndexProvider>
              <CreatorFilterProvider>
                <ScheduleBody />
              </CreatorFilterProvider>
            </DayIndexProvider>
          </ScheduleDataProvider>
        </Match>
        <Match when={schedule.error} keyed={false}>
          <p>{JSON.parse(schedule.error)}</p>
        </Match>
        <Match when={schedule.loading} keyed={false}>
          <p>Loading...</p>
        </Match>
      </Switch>
    </>
  )
}
export default SchedulePage
