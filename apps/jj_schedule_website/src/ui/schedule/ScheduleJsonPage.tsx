import { Component, Match, Switch } from 'solid-js'
import { useScheduleRouteData } from './ScheduleRouteData'

const ScheduleJsonPage: Component = () => {
  const schedule = useScheduleRouteData()
  return (
    <Switch>
      <Match when={schedule.data}>
        <p>{JSON.stringify(schedule.data, null, 2)}</p>
      </Match>
      <Match when={schedule.error}>
        <p>{JSON.stringify(schedule.error, null, 2)}</p>
      </Match>
      <Match when={schedule.loading}>
        <p>loading</p>
      </Match>
    </Switch>
  )
}

export default ScheduleJsonPage
