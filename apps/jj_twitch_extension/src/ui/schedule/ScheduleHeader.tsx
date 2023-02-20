import { Component, createEffect, createSignal, Match, Switch } from 'solid-js'
import { useCurrentDay, useScheduleData } from './JJScheduleProvider'
import { DateTime } from 'luxon'
import { useDayIndexSetter } from './DayIndexProvider'
import { FaSolidCalendarDay, FaSolidChevronLeft, FaSolidChevronRight, FaSolidFilter } from 'solid-icons/fa'
import { FilterDialog } from './ScheduleCreatorFilterButton'
import { useCreatorFilter } from './CreatorFilterProvider'
import { createModalSignal, RemoteData, useCreatorDB } from '@ycapp/common'
import { BiRegularReset } from 'solid-icons/bi'
import { CreatorData } from '@ycapp/model'

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
  const date = () => DateTime.fromISO(day().start)
  const { isEmpty, filter } = useCreatorFilter()

  const [creator, setCreator] = createSignal<RemoteData<CreatorData | null>>({
    data: null,
    loading: true,
    error: null
  })

  createEffect(() => {
    if (filter().length > 0) {
      setCreator(useCreatorDB().read(filter()[0]))
    }
  })

  return (
    <div class={'p-schedule h-full flex-1'}>
      <div class={'schedule-card-white flex h-full flex-col items-center justify-center'}>
        <h3 class={'text-center text-2xl'}>{useScheduleData().name}</h3>
        <Switch>
          <Match when={isEmpty()}>
            <h3 class={'text-center text-2xl'}>
              {date().toLocaleString({
                weekday: 'short',
                day: '2-digit',
                month: 'short'
              })}
            </h3>
          </Match>
          <Match when={!isEmpty()}>
            <Switch>
              <Match when={filter().length == 1 && creator().data}>
                <h3 class={'text-center text-2xl'}>Streams with {creator().data.creator.name}</h3>
              </Match>
              <Match when={filter().length > 1 && creator().data}>
                <h2 class={'text-center text-xl'}>
                  Streams with {creator().data.creator.name} & {filter().length - 1} more streamer
                </h2>
              </Match>
            </Switch>
          </Match>
        </Switch>
      </div>
    </div>
  )
}
const WeekButtons: Component = () => {
  const [prev, next, today] = useDayIndexSetter()
  const modalSignal = createModalSignal()
  const { reset, isEmpty } = useCreatorFilter()

  return (
    <>
      <Switch>
        <Match when={isEmpty()}>
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
              onClick={modalSignal.open}
            >
              <FaSolidFilter />
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
        </Match>
        <Match when={!isEmpty()}>
          <div style={{}} class={`schedule-card-white flex h-full flex-row`}>
            <button
              class={
                'hover:bg-accent-50 ripple flex flex-1 flex-col items-center justify-center rounded-l-2xl hover:scale-105'
              }
              onClick={modalSignal.open}
            >
              <FaSolidFilter />
            </button>
            <button
              class={
                'hover:bg-accent-50 ripple flex flex-1 flex-col items-center justify-center rounded-r-2xl hover:scale-105'
              }
              onclick={() => {
                reset()
              }}
            >
              <BiRegularReset />
            </button>
          </div>
        </Match>
      </Switch>
      <FilterDialog modalSignal={modalSignal} />
    </>
  )
}
