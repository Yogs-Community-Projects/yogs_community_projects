import { Component, For, Match, Switch } from 'solid-js'
import { useCurrentDay, useScheduleData, useSlots } from './JJScheduleProvider'
import { SlotCard } from './SlotCard'
import { Title } from './ScheduleHeader'
import { useCreatorFilter } from './CreatorFilterProvider'
import { ScheduleControls } from './ScheduleControls'
import { DateTime } from 'luxon'
import { twMerge } from 'tailwind-merge'
import { useTwitchConfig } from '../config/TwitchConfigProvider'

export const ScheduleBody: Component = () => {
  const scroll =
    'flex-1 overflow-auto scrollbar-thin scrollbar-corner-primary-100 scrollbar-thumb-accent-500 scrollbar-track-accent-100 pt-0'
  const schedule = useScheduleData()
  const { config } = useTwitchConfig()
  return (
    <div class="flex h-full flex-1 flex-col">
      <div class={'h-30'}>
        <Title />
      </div>
      <div
        class={twMerge(
          scroll,
          config.theme === 'blue'
            ? 'scrollbar-corner-accent-100 scrollbar-thumb-primary-500 scrollbar-track-primary-100'
            : '',
        )}
      >
        <ScheduleSlots />
      </div>
      <div class={'p-schedule flex h-14 flex-col justify-center p-1'}>
        <p class={'text-xxs p-1 text-center font-bold text-white'}>
          Last updated, {DateTime.fromISO(schedule.updatedAt).toLocaleString(DateTime.DATETIME_FULL)}
        </p>
        <ScheduleControls />
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
  const slots = () => useCurrentDay().slots.filter(s => s.visible)
  // const slots = () => useDays()[2].slots
  const { isEmpty, includes } = useCreatorFilter()

  const filteredSlots = () => {
    return useSlots().filter(s => s.relations.creators.some(includes))
  }

  return (
    <Switch>
      <Match when={isEmpty()}>
        <div>
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
