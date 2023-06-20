import { Component, For, Match, Switch } from 'solid-js'
import { useCurrentDay, useDays, useSlots } from './JJScheduleProvider'
import { SlotCard } from './SlotCard'
import { ScheduleHeader, Title, WeekButtons } from './ScheduleHeader'
import { useCreatorFilter } from './CreatorFilterProvider'
import { useDayIndex } from './DayIndexProvider'

export const ScheduleBody: Component = () => {
  const scroll = 'scrollbar-thin scrollbar-corner-primary-100 scrollbar-thumb-accent-500 scrollbar-track-accent-100'
  const scroll2 =
    'flex-1 overflow-auto scrollbar-thin scrollbar-corner-primary-100 scrollbar-thumb-accent-500 scrollbar-track-accent-100'
  const c = 'flex-1 overflow-auto'
  return (
    <div class="flex h-full flex-1 flex-col">
      <div class={'h-30'}>
        <Title />
      </div>
      <div class={scroll2}>
        <ScheduleSlots />
      </div>

      <div class={'p-schedule h-10'}>
        <WeekButtons />
      </div>
    </div>
  )
}
/*

    <div class={'flex flex-1 flex-col bg-pink-500'}>
      <div class={'flex-none'}>
        <Title />
      </div>
      <div class={'grow bg-green-400'}>
        <ScheduleSlots />
      </div>
      <div class={'p-schedule h-10 flex-none'}>
        <WeekButtons />
      </div>
    </div>
 */

const ScheduleSlots: Component = () => {
  const slots = () => useCurrentDay().slots
  // const slots = () => useDays()[2].slots
  const { isEmpty, includes } = useCreatorFilter()

  const filteredSlots = () => {
    return useSlots().filter(s => s.relations.creators.some(includes))
  }

  return (
    <Switch>
      <Match when={isEmpty()}>
        <div class={''}>
          <For each={slots()}>
            {slot => {
              return <SlotCard slot={slot} showCountdown={true} showTime={true} />
            }}
          </For>
        </div>
      </Match>
      <Match when={!isEmpty()}>
        <div class={'pb-10'}>
          <For each={filteredSlots()}>
            {slot => {
              return <SlotCard slot={slot} showCountdown={true} showTime={true} />
            }}
          </For>
        </div>
      </Match>
    </Switch>
  )
}
