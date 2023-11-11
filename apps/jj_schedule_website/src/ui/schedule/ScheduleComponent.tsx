import { Component, Match, Switch } from 'solid-js'
import { ScheduleData } from '@ycapp/model'
import { ScheduleMobileProviderContainer, ScheduleProviderContainer } from './providers/ScheduleProviderContainer'
import { ScheduleFrame } from './desktop/ScheduleFrame'
import { MobileSchedule } from './mobile/MobileSchedule'
import { useScheduleData } from './providers/ScheduleDataProvider'
import { DateTime } from 'luxon'
import { useDivDimension } from '@ycapp/common'

export const ScheduleComponent: Component<{ schedule: ScheduleData }> = props => {
  const [size, setRef] = useDivDimension()
  const mobile = () => size().width < 768
  const desktop = () => !mobile()

  return (
    <div class={'mx-16'}>
      <div class={'flex min-h-screen w-full flex-col items-center'} ref={setRef}>
        <Switch>
          <Match when={desktop()} keyed>
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
        This Jingle Jam schedule is maintained <strong>by the community</strong>. If you find errors or see that a
        stream is missing use the contact info below. Streams that appear here are not guaranteed to happen or might be
        delayed. For more information visit the Jingle Jam Twitter page.
        <strong>
          This schedule is a fan Project and not associated with the Jingle Jam, the Yogscast or their partners.
        </strong>
      </p>
    </div>
  )
}

/*

 <Switch>
          <Match when={!mobile()} keyed>
            <ScheduleProviderContainer size={size} scheduleData={props.schedule}>
              <ScheduleFrame/>
            </ScheduleProviderContainer>
          </Match>
          <Match when={mobile()}>
            <ScheduleMobileProviderContainer size={size} scheduleData={props.schedule}>
              <MobileSchedule/>
            </ScheduleMobileProviderContainer>
          </Match>
        </Switch>-
 */
