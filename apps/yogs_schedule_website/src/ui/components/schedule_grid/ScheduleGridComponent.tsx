import { Component, Match, Switch } from 'solid-js'
import { Loading } from '../loading/Loading'
import { useDivDimension, useScheduleDB } from '@ycapp/common'
import { ScheduleMobileProviderContainer, ScheduleProviderContainer } from './providers/ScheduleProviderContainer'
import { ScheduleFrame } from './desktop/ScheduleFrame'
import { MobileSchedule } from './mobile/MobileSchedule'
import { useScheduleData } from './providers/ScheduleDataProvider'
import { DateTime } from 'luxon'
import { ScheduleData } from '@ycapp/model'
import './schedule_grid.css'
const ScheduleGridComponent: Component<{ scheduleId: string }> = props => {
  const schedule = useScheduleDB().read(props.scheduleId)

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

const ScheduleComponent: Component<{ schedule: ScheduleData }> = props => {
  const [size, setRef] = useDivDimension()
  const mobile = () => size().width < 768

  return (
    <div class={'mx-4'}>
      <div class={'flex min-h-screen w-full flex-col items-center'} ref={setRef}>
        <Switch>
          <Match when={!mobile()} keyed>
            <ScheduleProviderContainer size={size} scheduleData={props.schedule}>
              <ScheduleFrame />
              <ScheduleDisclaimer />
            </ScheduleProviderContainer>
          </Match>
          <Match when={mobile()}>
            <ScheduleMobileProviderContainer size={size} scheduleData={props.schedule}>
              <MobileSchedule />
              <ScheduleDisclaimer />
            </ScheduleMobileProviderContainer>
          </Match>
        </Switch>
      </div>
    </div>
  )
}

const ScheduleDisclaimer: Component = () => {
  const schedule = useScheduleData()
  return (
    <div class={'max-w-[90%] text-center text-white md:max-w-[50%]'}>
      <p class={'font-bold'}>
        Last updated, {DateTime.fromISO(schedule.updatedAt).toLocaleString(DateTime.DATETIME_FULL)}
      </p>
      <p>
        This Schedule is maintained <strong>by the community</strong>. If you find errors or see that a stream is
        missing use the contact info below. Streams that appear here are not guaranteed to happen or might be delayed.
        <strong>This schedule is a fan Project and not associated with the Yogscast or their partners.</strong>
      </p>
    </div>
  )
}

export default ScheduleGridComponent
