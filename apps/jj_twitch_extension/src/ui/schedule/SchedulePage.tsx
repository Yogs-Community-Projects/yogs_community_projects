import { Component, lazy, Match, Show, Suspense, Switch } from 'solid-js'
import { ScheduleDataProvider } from './JJScheduleProvider'
import { DayIndexProvider } from './DayIndexProvider'
import { useJJConfig } from '@ycapp/common'
import { CreatorFilterProvider } from './CreatorFilterProvider'
import { InvisibleBody } from '../InvisibleBody'
import { useData } from '../dataProvider'
import { LoadingSchedule } from '../components/LoadingPage'

const ScheduleBody = lazy(() => import('./ScheduleBody'))

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
      <Match when={scheduleData.data}>
        <ScheduleDataProvider scheduleData={scheduleData.data}>
          <DayIndexProvider>
            <CreatorFilterProvider>
              <Suspense fallback={<LoadingSchedule />}>
                <ScheduleBody />
              </Suspense>
            </CreatorFilterProvider>
          </DayIndexProvider>
        </ScheduleDataProvider>
      </Match>
      <Match when={scheduleData.error}>
        <p>{scheduleData.error.message}</p>
      </Match>
      <Match when={scheduleData.loading}>
        <LoadingSchedule />
      </Match>
    </Switch>
  )
}
export default SchedulePage
