import { Component, For, Match, Show, Switch } from 'solid-js'
import { useCurrentDay, useScheduleData, useSlots } from './JJScheduleProvider'
import { SlotCard } from './SlotCard'
import { Title } from './ScheduleHeader'
import { useCreatorFilter } from './CreatorFilterProvider'
import { DateTime } from 'luxon'
import { twMerge } from 'tailwind-merge'
import { useTheme } from '../themeProvider'
import ScheduleControls from './ScheduleControls'
import { Env, useEnv } from '../../EnvProvider'

const ScheduleBody: Component = () => {
  const scroll =
    'flex-1 overflow-auto overflow-x-hidden scrollbar-thin scrollbar-corner-primary-100 scrollbar-thumb-accent-500 scrollbar-track-accent-100 pt-0'
  const schedule = useScheduleData()
  const { theme } = useTheme()

  const scrollbar = () => {
    switch (theme()) {
      case 'blue':
      case 'blue_light':
        return 'scrollbar-corner-accent-100 scrollbar-thumb-primary-500 scrollbar-track-primary-100'
      case 'dark':
        return 'scrollbar-corner-gray-100 scrollbar-thumb-gray-600 scrollbar-track-gray-100'
      default:
        return ''
    }
  }

  const env = useEnv()
  return (
    <div class="flex h-full flex-1 flex-col">
      <Show when={env === Env.mobile}>
        <div class={'h-2'} />
      </Show>
      <div class={'h-30 mb-2'}>
        <Title />
      </div>
      <div class={twMerge(scroll, scrollbar())}>
        <ScheduleSlots />
      </div>
      <p class={'text-xxs text-center font-bold text-white'}>
        Last updated, {DateTime.fromISO(schedule.updatedAt).toLocaleString(DateTime.DATETIME_FULL)}
      </p>
      <ScheduleControls />
      <Show when={env === Env.desktop}>
        <div class={'h-2'} />
      </Show>
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
        <div class={'flex min-h-full flex-col gap-2 px-2'}>
          <For each={slots()}>
            {slot => {
              return <SlotCard slot={slot} showCountdown={true} showTime={true} />
            }}
          </For>
        </div>
      </Match>
      <Match when={!isEmpty()}>
        <div class={'flex flex-col gap-2 p-2'}>
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

export default ScheduleBody
