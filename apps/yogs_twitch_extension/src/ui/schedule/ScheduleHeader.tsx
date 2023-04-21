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
      <div class={'h-10 px-2 pb-2'}>
        <WeekButtons />
      </div>
    </div>
  )
}

const Title: Component = () => {
  const schedule = useScheduleData()

  const isSpecial = () => schedule.settings.type == 'Special'
  const day = () => useCurrentDay()
  const date = () =>
    isSpecial()
      ? DateTime.fromISO(day().start)
      : DateTime.fromObject({
          weekday: day().dayOfWeek,
        })

  const dateString = () =>
    isSpecial()
      ? date().toLocaleString({
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : date().toLocaleString({
          weekday: 'long',
        })

  return (
    <div class={'h-full flex-1 p-2'}>
      <div class={'schedule-card-white flex h-full flex-col items-center justify-center'}>
        <h3 class={'text-center text-2xl'}>{useScheduleData().name}</h3>
        <h3 class={'text-center text-2xl'}>{dateString()}</h3>
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
