import { Component, For } from 'solid-js'
import { useCurrentDay } from './JJScheduleProvider'
import { SlotCard } from './SlotCard'
import { ScheduleHeader } from './ScheduleHeader'

export const ScheduleBody: Component = () => {
  return (
    <div>
      <ScheduleHeader />
      <ScheduleSlots />
    </div>
  )
}

const ScheduleSlots: Component = () => {
  const slots = () => useCurrentDay().slots

  return (
    <div class={'pb-10'}>
      <For each={slots()}>
        {slot => {
          return <SlotCard slot={slot} showCountdown={true} showTime={true} />
        }}
      </For>
    </div>
  )
}
