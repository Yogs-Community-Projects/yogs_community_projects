import { Component, Match, Switch } from 'solid-js'
import { ScheduleComponent } from './ScheduleComponent'
import { useScheduleRouteData } from './ScheduleRouteData'
import { Loading } from '../components/loading/Loading'

const SchedulePage: Component = () => {
  const schedule = useScheduleRouteData()
  return (
    <div class={'flex min-h-screen flex-col'}>
      <Switch>
        <Match when={schedule.error}>
          <p>An error occurred</p>
        </Match>
        <Match when={schedule.loading}>
          <Loading />
        </Match>
        <Match when={schedule.data}>
          <ScheduleComponent schedule={schedule.data} />
        </Match>
      </Switch>
    </div>
  )
}

export default SchedulePage
