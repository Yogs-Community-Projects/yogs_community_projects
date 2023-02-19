import { Component } from 'solid-js'
import { useCurrentDay, useScheduleData } from './YogsScheduleProvider'
import { DateTime } from 'luxon'
import { useDayIndexSetter } from './DayIndexProvider'
import { FaSolidCalendarDay, FaSolidChevronLeft, FaSolidChevronRight } from 'solid-icons/fa'

export const ScheduleHeader: Component = () => {
  return (
    <div style={{}} class={'flex w-full flex-col'}>
      <div class={'h-30'}>
        <Title />
      </div>
      <div class={'p-schedule h-10'}>
        <WeekButtons />
      </div>
    </div>
  )
}

const Title: Component = () => {
  const day = () => useCurrentDay()
  const date = () =>
    DateTime.fromObject({
      weekday: day().dayOfWeek
    })

  return (
    <div class={'p-schedule h-full flex-1'}>
      <div class={'schedule-card-white flex h-full flex-col items-center justify-center'}>
        <h3 class={'text-center text-2xl'}>{useScheduleData().name}</h3>
        <h3 class={'text-center text-2xl'}>
          {date().toLocaleString({
            weekday: 'long'
          })}
        </h3>
      </div>
    </div>
  )
}
const WeekButtons: Component = () => {
  const [prev, next, today] = useDayIndexSetter()

  return (
    <div style={{}} class={`schedule-card-white flex h-full flex-row`}>
      <button
        class={
          'hover:bg-accent-50 ripple flex flex-1 flex-col items-center justify-center rounded-l-2xl hover:scale-105'
        }
        onclick={prev}
      >
        <FaSolidChevronLeft />
      </button>
      <button
        class={'hover:bg-accent-50 ripple flex flex-1 flex-col items-center justify-center hover:scale-105'}
        onclick={today}
      >
        <FaSolidCalendarDay />
      </button>
      <button
        class={
          'hover:bg-accent-50 ripple flex flex-1 flex-col items-center justify-center rounded-r-2xl hover:scale-105'
        }
        onclick={next}
      >
        <FaSolidChevronRight />
      </button>
    </div>
  )
}
