import { Component, Match, Switch } from 'solid-js'
import { ScheduleDataProvider } from './YogsScheduleProvider'
import { DayIndexProvider } from './DayIndexProvider'
import { ScheduleBody } from './ScheduleBody'
import { useScheduleDB } from '@ycapp/common'

const SchedulePage: Component = () => {
  const schedule = useScheduleDB().readYogs()

  return (
    <Switch>
      <Match when={schedule.data} keyed={true}>
        <ScheduleDataProvider scheduleData={schedule.data}>
          <DayIndexProvider>
            <ScheduleBody />
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
  )
}

export default SchedulePage
