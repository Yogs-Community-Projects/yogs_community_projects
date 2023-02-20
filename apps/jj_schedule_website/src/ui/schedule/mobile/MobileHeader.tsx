import { Component, JSX } from 'solid-js'
import { useDayIndexContext } from '../providers/DayIndexProvider'
import { useCurrentDay, useScheduleData } from '../providers/ScheduleDataProvider'
import { FaSolidChevronLeft, FaSolidChevronRight } from 'solid-icons/fa'
import { DateTime } from 'luxon'

export const MobileScheduleHeader: Component = () => {
  return (
    <div class={'schedule-header flex flex-col'}>
      <MobileTitle />
      <DayButtons />
    </div>
  )
}
const MobileTitle: Component = () => {
  const style = (): JSX.CSSProperties => {
    return {}
  }
  return (
    <div style={style()} class={'p-schedule h-data'}>
      <div class={'schedule-card-white flex items-center justify-center text-xl'}>
        <h3>{useScheduleData().name}</h3>
      </div>
    </div>
  )
}

const DayButtons: Component = () => {
  const { prev, next } = useDayIndexContext()
  return (
    <div class={'p-schedule h-data'}>
      <div class={'schedule-card-white flex flex-row items-center justify-center'}>
        <button class={'w-data ripple flex flex-col items-center justify-center rounded-2xl'} onclick={prev}>
          <FaSolidChevronLeft />
        </button>
        <p class={'text-day-header flex-1 text-center'}>
          {DateTime.fromJSDate(new Date(useCurrentDay().start)).toFormat("EEE',' MMM d")}
        </p>
        <button class={'w-data ripple flex flex-col items-center justify-center rounded-2xl'} onclick={next}>
          <FaSolidChevronRight />
        </button>
      </div>
    </div>
  )
}
