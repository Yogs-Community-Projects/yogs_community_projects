import { Component } from 'solid-js'

import { ScheduleTimes } from './ScheduleTimes'
import { ScheduleBody } from './ScheduleBody'
import { ScheduleHeader } from './ScheduleHeader'
import { useScheduleData } from '../providers/ScheduleDataProvider'

export const ScheduleFrame: Component = () => {
  return (
    <div class={'schedule font-babas flex flex-col tracking-wider'}>
      <ScheduleHeader />
      <ScheduleContent />
    </div>
  )
}

const ScheduleContent: Component = () => {
  return (
    <div class={'w-schedule h-schedule-body flex flex-row'}>
      <ScheduleTimes />
      <ScheduleBody />
    </div>
  )
}
