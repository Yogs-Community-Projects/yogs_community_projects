import { Component, For } from 'solid-js'

import { useMaxDayCount, useTimes } from '../providers/ScheduleDataProvider'
import { Time } from '@ycapp/model'
import { DateTime, Duration } from 'luxon'
import { useNextJJStartDate } from '@ycapp/common'

export const ScheduleTimes: Component = () => {
  return (
    <div class={'w-data h-schedule-body'}>
      <Timezone />
      <For each={useTimes()}>{time => <ScheduleTime time={time} />}</For>
    </div>
  )
}

interface ScheduleTimeProps {
  time: Time
}

const ScheduleTime: Component<ScheduleTimeProps> = props => {
  const time = props.time
  const start = DateTime.fromISO(time.start)
  const duration = Duration.fromMillis(time.duration / 1000)
  const end = DateTime.fromISO(time.start).plus(duration)

  return (
    <div class={'p-schedule w-data h-slot text-[1vw]'}>
      <div class={'schedule-card-white flex h-full flex-col place-content-around items-center'}>
        <p>
          {start.toLocaleString({
            timeStyle: 'short',
          })}
        </p>
        <p>
          {end.toLocaleString({
            timeStyle: 'short',
          })}
        </p>
      </div>
    </div>
  )
}

const Timezone: Component = () => {
  const nextJJStartDate = useNextJJStartDate()
  return (
    <div class={'w-data h-data p-schedule text-[1.1vw]'}>
      <div class={'schedule-card-white grid place-items-center'}>
        <p>
          {
            // DateTime.now().toFormat('ZZZZ')
            nextJJStartDate().toLocal().offsetNameShort
          }
          {useMaxDayCount()}
        </p>
      </div>
    </div>
  )
}
