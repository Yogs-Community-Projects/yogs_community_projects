import { Component, For, Show } from 'solid-js'
import { MobileScheduleHeader } from './MobileHeader'
import { useCurrentDay, useSlots } from '../providers/ScheduleDataProvider'
import { MobileScheduleSlot } from './MobileScheduleSlot'
import { useCreatorFilter } from '../providers/CreatorFilterProvider'

export const MobileSchedule: Component = () => {
  return (
    <div class={'font-babas flex flex-col tracking-wider'}>
      <MobileScheduleHeader />
      <MobileScheduleBody />
    </div>
  )
}

const MobileScheduleBody: Component = () => {
  const { isEmpty, isSlotPartOfFilter } = useCreatorFilter()
  const slots = () => useCurrentDay().slots
  const filteredSlots = () => {
    return useSlots().filter(isSlotPartOfFilter)
  }

  return (
    <div>
      <Show when={isEmpty()}>
        <For each={slots()}>{slot => <MobileScheduleSlot slot={slot} />}</For>
      </Show>
      <Show when={!isEmpty()}>
        <For each={filteredSlots()}>{slot => <MobileScheduleSlot slot={slot} />}</For>
      </Show>
    </div>
  )
}
