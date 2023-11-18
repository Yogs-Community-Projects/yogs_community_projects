import { Component } from 'solid-js'
import { useWeekIndexSetter } from '../providers/WeekIndexProvider'
import { useScheduleData } from '../providers/ScheduleDataProvider'
import { FaSolidChevronLeft, FaSolidChevronRight } from 'solid-icons/fa'
import { FilterButton, FilterResetButton, FilterShareButton } from '../ScheduleCreatorFilterButton'
import { CalendarExportButton } from '../ScheduleCalendarExportButton'
import { Tooltip } from '@kobalte/core'

export const ScheduleHeader: Component = () => {
  return (
    <div class={'w-schedule flex snap-start flex-row'}>
      <div class={'h-data w-data p-schedule'} />
      <Title />
      <div class={'flex-1'} />
      <FilterShareButton />
      <FilterResetButton />
      <FilterButton />
      <CalendarExportButton />
      <WeekButtons />
    </div>
  )
}
const Title: Component = () => {
  return (
    <div class={'p-schedule h-data w-[calc(var(--slot-size)_*_3)]'}>
      <div class={'schedule-card-white flex items-center justify-center'}>
        <h3 class={'text-center text-[calc(var(--slot-size)_/_6)]'}>{useScheduleData().name}</h3>
      </div>
    </div>
  )
}
// npx degit solidjs/templates/ts-tailwindcss yogs_schedule_website
const WeekButtons: Component = () => {
  const [prev, next] = useWeekIndexSetter()

  return (
    <div class={'w-slot h-data p-schedule'}>
      <div class={'schedule-card-white flex flex-row'}>
        <Tooltip.Root openDelay={300} closeDelay={300}>
          <Tooltip.Trigger
            class={
              'hover:bg-accent-50 ripple flex flex-1 flex-col items-center justify-center rounded-l-2xl transition-all hover:scale-105'
            }
            onClick={prev}
          >
            <FaSolidChevronLeft />
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content class={'bg-accent rounded p-2 text-white'}>
              <Tooltip.Arrow />
              <p>Previous Week</p>
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
        <Tooltip.Root openDelay={300} closeDelay={300}>
          <Tooltip.Trigger
            class={
              'hover:bg-accent-50 ripple flex flex-1 flex-col items-center justify-center rounded-r-2xl transition-all hover:scale-105'
            }
            onClick={next}
          >
            <FaSolidChevronRight />
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content class={'bg-accent rounded p-2 text-white'}>
              <Tooltip.Arrow />
              <p>Next Week</p>
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </div>
    </div>
  )
}
