import { Component, For } from 'solid-js'
import { useCurrentDay } from './YogsScheduleProvider'
import { SlotCard } from './SlotCard'
import { ScheduleHeader } from './ScheduleHeader'
import { SlotUtils } from '@ycapp/model'

export const ScheduleBody: Component = () => {
  return (
    <div>
      <ScheduleHeader />
      <ScheduleSlots />
    </div>
  )
}

const ScheduleSlots: Component = () => {
  const slots = () =>
    useCurrentDay()
      .slots.filter(slot => slot.visible && slot.streamType == 'twitch' && !SlotUtils.isLive(slot))
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
