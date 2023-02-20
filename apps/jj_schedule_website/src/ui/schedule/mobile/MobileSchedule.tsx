import {Component, For} from 'solid-js'
import {MobileScheduleHeader} from './MobileHeader'
import {useCurrentDay} from '../providers/ScheduleDataProvider'
import {MobileScheduleSlot} from './MobileScheduleSlot'

export const MobileSchedule: Component = () => {
  return (
    <div class={'flex flex-col font-babas tracking-wider'}>
      <MobileScheduleHeader/>
      <MobileScheduleBody/>
    </div>
  )
}

const MobileScheduleBody: Component = () => {
  return (
    <div>
      <For each={useCurrentDay().slots}>{slot => <MobileScheduleSlot slot={slot}/>}</For>
    </div>
  )
}
