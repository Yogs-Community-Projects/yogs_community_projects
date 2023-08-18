import { Component, createSignal, Match, onCleanup, Show, Switch } from 'solid-js'
import { ScheduleDataProvider } from './JJScheduleProvider'
import { DayIndexProvider } from './DayIndexProvider'
import { ScheduleBody } from './ScheduleBody'
import { useJJConfig, useScheduleDB } from '@ycapp/common'
import { CreatorFilterProvider } from './CreatorFilterProvider'
import { Accessor } from 'solid-js/types/reactive/signal'
import { DateTime, Duration } from 'luxon'

const visible = () => useJJConfig().visible
const scheduleId = () => useJJConfig().scheduleId
const SchedulePage: Component = () => {
  return (
    <>
      <Show when={visible()}>
        <VisibleSchedule />
      </Show>
      <Show when={!visible()}>
        <CountDown />
      </Show>
    </>
  )
}

const VisibleSchedule = () => {
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

const CountDown = () => {
  return (
    <div class={'mx-auto flex w-fit flex-col items-center p-1 text-center text-base text-white md:w-[50%] md:text-2xl'}>
      <p class={'p-1 text-2xl font-bold md:p-2 md:text-4xl'}>Jingle Jam Countdown</p>
      <p class={'text-xl md:text-3xl'}>{useNextJJStartDate().toLocal().toFormat('DDDD')}</p>
      <p class={'text-xl md:text-3xl'}>{useNextJJStartDate().toLocal().toFormat('ttt')}</p>
      <p class={''}>{useNextJJStartDate().toFormat('DDDD')}</p>
      <p class={''}>{useNextJJStartDate().toFormat('ttt')}</p>
      <div class={'flex flex-col items-center p-1 text-white md:p-4'}>
        <p class={'text-2xl md:text-4xl'}>Jingle Jam {useNextJJStartDate().year} starts</p>
        <p class={'font-mono text-2xl md:text-4xl'}>{useJJStartCountdown().toFormat("dd 'Days' hh:mm:ss")}</p>
      </div>
      <p>The Yogscast Jingle Jam Schedule Page will be live soon.</p>
    </div>
  )
}

const london = 'Europe/London'
export const useDatetimeLondonNow: Accessor<DateTime> = (init?: DateTime) => {
  const [date, setDate] = createSignal(init ?? DateTime.now().setZone(london))
  const interval = setInterval(() => setDate(init ?? DateTime.now().setZone(london)), 1000)
  onCleanup(() => clearInterval(interval))
  return date()
}
export const useDatetimeNow: Accessor<DateTime> = () => {
  const [date, setDate] = createSignal(DateTime.now())
  const interval = setInterval(() => setDate(DateTime.now()), 1000)
  onCleanup(() => clearInterval(interval))
  return date()
}
export const useNextJJStartDate: Accessor<DateTime> = () => {
  if (!useIsAfterJJEnd()) {
    return DateTime.fromObject(
      {
        year: useDatetimeLondonNow().year,
        month: 12,
        day: 1,
        hour: 17,
      },
      {
        zone: london,
      },
    )
  }
  return DateTime.fromObject(
    {
      year: useDatetimeLondonNow().year + 1,
      month: 12,
      day: 1,
      hour: 17,
    },
    {
      zone: london,
    },
  )
}
export const useIsAfterJJEnd: Accessor<boolean> = () => {
  const end = DateTime.fromObject(
    {
      year: useDatetimeLondonNow().year,
      month: 12,
      day: 14,
      hour: 23,
      minute: 59,
      second: 59,
    },
    {
      zone: london,
    },
  )
  return end < useDatetimeLondonNow()
}

export const useJJStartCountdown: Accessor<Duration> = () => {
  return useNextJJStartDate().diff(useDatetimeNow())
}
export default SchedulePage
