import { Component, For } from 'solid-js'
import { MobileScheduleHeader } from './MobileHeader'
import { useCurrentDay } from '../providers/ScheduleDataProvider'
import { MobileScheduleSlot } from './MobileScheduleSlot'

export const MobileSchedule: Component = () => {
  return (
    <div class={'font-babas flex flex-col tracking-wider'}>
      <MobileScheduleHeader />
      <MobileScheduleBody />
    </div>
  )
}

const MobileScheduleBody: Component = () => {
  return (
    <div>
      <For each={useCurrentDay().slots}>{slot => <MobileScheduleSlot slot={slot} />}</For>
    </div>
  )
}
