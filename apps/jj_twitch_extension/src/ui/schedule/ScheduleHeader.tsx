import { Component, createEffect, createSignal, Match, Switch } from 'solid-js'
import { useCurrentDay, useScheduleData } from './JJScheduleProvider'
import { DateTime } from 'luxon'
import { useDayIndexSetter } from './DayIndexProvider'
import {
  FaSolidCalendarDay,
  FaSolidChevronLeft,
  FaSolidChevronRight,
  FaSolidFilter,
  FaSolidLink,
  FaSolidLinkSlash,
} from 'solid-icons/fa'
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
      <div class={'p-schedule h-4'}>
        <WeekButtons />
      </div>
    </div>
  )
}
export const Title: Component = () => {
  const day = () => useCurrentDay()
  const date = () => DateTime.fromISO(day().start)
  const { isEmpty, filter } = useCreatorFilter()

  const [creator, setCreator] = createSignal<RemoteData<CreatorData | null>>({
    data: null,
    loading: true,
    error: null,
  })

  createEffect(() => {
    if (filter().length > 0) {
      setCreator(useCreatorDB().read(filter()[0]))
    }
  })

  return (
    <div class={'p-schedule h-full flex-1'}>
      <div class={'schedule-card-white flex h-full flex-col items-center justify-center'}>
        <h3 class={'text-center text-xl'}>{useScheduleData().name}</h3>
        <Switch>
          <Match when={isEmpty()}>
            <h3 class={'text-center text-xl'}>
              {date().toLocaleString({
                weekday: 'short',
                day: '2-digit',
                month: 'short',
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
export const WeekButtons: Component = () => {
  const [prev, next, today] = useDayIndexSetter()
  const modalSignal = createModalSignal()
  const { reset, isEmpty } = useCreatorFilter()

  return (
    <>
      <Switch>
        <Match when={isEmpty()}>
          <div style={{}} class={`schedule-card-white flex h-full flex-row`}>
            <button class={'schedule-header-link-left has-tooltip'} onclick={prev}>
              <span class={'tooltip bg-accent text-xxs -mt-20 rounded p-1 text-white shadow-lg'}>Previous Day</span>
              <FaSolidChevronLeft />
            </button>
            <button class={'schedule-header-link-center has-tooltip'} onClick={modalSignal.open}>
              <span class={'tooltip bg-accent text-xxs -mt-20 rounded p-1 text-white shadow-lg'}>Filter</span>
              <FaSolidFilter />
            </button>
            <button class={'schedule-header-link-center has-tooltip'} onclick={today}>
              <span class={'tooltip bg-accent text-xxs -mt-20 rounded p-1 text-white shadow-lg'}>Today</span>
              <FaSolidCalendarDay />
            </button>
            <a class={'schedule-header-link-center has-tooltip'} href={'https://jj.yogs.app'} target={'_blank'}>
              <span class={'tooltip bg-accent text-xxs -mt-20 rounded p-1 text-white shadow-lg'}>
                https://jj.yogs.app
              </span>
              <FaSolidLinkSlash />
            </a>
            <button class={'schedule-header-link-right has-tooltip'} onclick={next}>
              <span class={'tooltip bg-accent text-xxs -mt-20 rounded p-1 text-white shadow-lg'}>Next day</span>
              <FaSolidChevronRight />
            </button>
          </div>
        </Match>
        <Match when={!isEmpty()}>
          <div style={{}} class={`schedule-card-white flex h-full flex-row`}>
            <button class={'schedule-header-link-left'} onClick={modalSignal.open}>
              <FaSolidFilter />
            </button>
            <button
              class={'schedule-header-link-right'}
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
