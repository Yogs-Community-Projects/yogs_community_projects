import { Component, For, Show } from 'solid-js'

import { useMaxSlotCount, useTimes } from '../providers/ScheduleDataProvider'
import { Time } from '@ycapp/model'
import { DateTime, Duration } from 'luxon'
import { useNextJJStartDate } from '@ycapp/common'

export const ScheduleTimes: Component = () => {
  const times = useTimes()
  const maxSlots = useMaxSlotCount()
  const lastTime = times[3]
  const lastDuration = Duration.fromMillis(lastTime.duration / 1000)
  const lastEnd = DateTime.fromISO(lastTime.start).plus(lastDuration).toLocaleString({
    timeStyle: 'short',
  })
  return (
    <div class={'w-data h-schedule-body'}>
      <Timezone />
      <For each={times}>{time => <ScheduleTime time={time} />}</For>
      <Show when={times.length === 4 && maxSlots === 5}>
        <div class={'p-schedule w-data h-slot text-[1vw]'}>
          <div class={'schedule-card-white flex h-full flex-col place-content-around items-center'}>
            <p>{lastEnd}</p>
            <p>Late</p>
          </div>
        </div>
      </Show>
      <Show when={times.length === 4 && maxSlots > 5}>
        <div class={'p-schedule w-data h-slot text-[1vw]'}>
          <div class={'schedule-card-white flex h-full flex-col place-content-around items-center'}>
            <span class={'text-center'}>Late</span>
            <span class={'text-center'}>Very Late</span>
          </div>
        </div>
      </Show>
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
    <div class={'p-schedule w-data h-slot snap-start text-[1vw]'}>
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
        </p>
      </div>
    </div>
  )
}
