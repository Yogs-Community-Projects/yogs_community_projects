import { Component, JSX, Show } from 'solid-js'
import { useDayIndexContext } from '../providers/DayIndexProvider'
import { useCurrentDay, useScheduleData } from '../providers/ScheduleDataProvider'
import { FaSolidChevronLeft, FaSolidChevronRight } from 'solid-icons/fa'
import { DateTime } from 'luxon'
import { FilterDialog } from '../ScheduleCreatorFilterButton'
import { createModalSignal } from '@ycapp/common'
import { CalendarDialog } from '../ScheduleCalendarExportButton'
import { useCreatorFilter } from '../providers/CreatorFilterProvider'
import { BiRegularReset } from 'solid-icons/bi'

export const MobileScheduleHeader: Component = () => {
  return (
    <div class={'schedule-header flex flex-col'}>
      <MobileTitle />
      <ScheduleButtons />
    </div>
  )
}
const MobileTitle: Component = () => {
  const style = (): JSX.CSSProperties => {
    return {}
  }
  return (
    <div style={style()} class={'p-schedule'}>
      <div class={'schedule-card-white flex flex-col items-center justify-center'}>
        <h3 class={'text-2xl'}>{useScheduleData().name}</h3>
        <p class={'text-day-header flex-1 text-center text-base'}>
          {DateTime.fromJSDate(new Date(useCurrentDay().start)).toFormat("EEE',' MMM d")}
        </p>
      </div>
    </div>
  )
}

const ScheduleButtons: Component = () => {
  const { prev, next } = useDayIndexContext()
  const filterModalSignal = createModalSignal()
  const exportModalSignal = createModalSignal()
  const { isEmpty, reset } = useCreatorFilter()

  return (
    <>
      <div class={'p-schedule h-data'}>
        <Show when={isEmpty()}>
          <div class={'schedule-card-white flex flex-row items-center justify-between px-2'}>
            <button class={'w-data ripple flex flex-col items-center justify-center rounded-2xl'} onclick={prev}>
              <FaSolidChevronLeft />
            </button>
            <button onclick={filterModalSignal.open}>Filter</button>
            <button onclick={exportModalSignal.open}>Export</button>
            <button class={'w-data ripple flex flex-col items-center justify-center rounded-2xl'} onclick={next}>
              <FaSolidChevronRight />
            </button>
          </div>
        </Show>
        <Show when={!isEmpty()}>
          <div class={'schedule-card-white flex flex-row items-center justify-around'}>
            <button onclick={reset}>
              <BiRegularReset />
            </button>
            <button onclick={filterModalSignal.open}>Filter</button>
            <button onclick={exportModalSignal.open}>Export</button>
          </div>
        </Show>
      </div>
      <FilterDialog modalSignal={filterModalSignal} />
      <CalendarDialog modalSignal={exportModalSignal} />
    </>
  )
}
