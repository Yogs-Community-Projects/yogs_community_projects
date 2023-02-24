import { Component, For } from 'solid-js'
import { useCurrentDay, useScheduleData } from './YogsScheduleProvider'
import { SlotCard } from './SlotCard'
import { ScheduleHeader } from './ScheduleHeader'
import { Slot, SlotUtils } from '@ycapp/model'

export const ScheduleBody: Component = () => {
  return (
    <div>
      <ScheduleHeader />
      <ScheduleSlots />
    </div>
  )
}

const ScheduleSlots: Component = () => {
  const schedule = useScheduleData()

  const show = (slot: Slot) => {
    if (schedule.settings.type == 'Special') {
      return true
    }
    return !SlotUtils.isLive(slot)
  }
  const slots = () =>
    useCurrentDay()
      .slots.filter(slot => slot.visible && slot.streamType == 'twitch' && show(slot))
      .sort(SlotUtils.sortByNextStream)

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
