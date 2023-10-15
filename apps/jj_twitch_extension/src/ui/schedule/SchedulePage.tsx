import { Component, Match, Show, Switch } from 'solid-js'
import { ScheduleDataProvider } from './JJScheduleProvider'
import { DayIndexProvider } from './DayIndexProvider'
import { ScheduleBody } from './ScheduleBody'
import { useJJConfig } from '@ycapp/common'
import { CreatorFilterProvider } from './CreatorFilterProvider'
import { InvisibleBody } from '../InvisibleBody'
import { useData } from '../dataProvider'

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
  // const scheduleId = () => useJJConfig().scheduleId
  // const schedule = useScheduleDB().read(scheduleId())
  const { scheduleData } = useData()
  return (
    <Switch>
      <Match when={scheduleData.data} keyed={true}>
        <ScheduleDataProvider scheduleData={scheduleData.data}>
          <DayIndexProvider>
            <CreatorFilterProvider>
              <ScheduleBody />
            </CreatorFilterProvider>
          </DayIndexProvider>
        </ScheduleDataProvider>
      </Match>
      <Match when={scheduleData.error} keyed={false}>
        <p>{scheduleData.error.message}</p>
      </Match>
      <Match when={scheduleData.loading} keyed={false}>
        <div class={'flex h-full w-full flex-col items-center justify-center text-center text-white'}>
          <p>Loading Schedule...</p>
        </div>
      </Match>
    </Switch>
  )
}
export default SchedulePage
