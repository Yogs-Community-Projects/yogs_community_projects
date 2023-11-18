import { Component } from 'solid-js'

import { ScheduleTimes } from './ScheduleTimes'
import { ScheduleBody } from './ScheduleBody'
import { ScheduleHeader } from './ScheduleHeader'

export const ScheduleFrame: Component = () => {
  return (
    <div class={'schedule font-babas flex flex-col tracking-wider '}>
      <ScheduleHeader />
      <ScheduleContent />
    </div>
  )
}

const ScheduleContent: Component = () => {
  return (
    <div class={'w-schedule h-schedule-body flex snap-start flex-row'}>
      <ScheduleTimes />
      <ScheduleBody />
    </div>
  )
}
