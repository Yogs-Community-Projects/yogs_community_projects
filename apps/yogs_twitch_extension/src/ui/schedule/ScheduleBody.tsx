import { Component, For, Show } from 'solid-js'
import { useCurrentDay, useScheduleData } from './YogsScheduleProvider'
import { SlotCard, SpecialSlotCard } from './SlotCard'
import { ScheduleHeader } from './ScheduleHeader'
import { Slot, SlotUtils } from '@ycapp/model'
import { NewsComponent } from '../components/NewsComponent'
import { DateTime } from 'luxon'

export const ScheduleBody: Component = () => {
  return (
    <div>
      <ScheduleHeader />
      <ScheduleSlots />
    </div>
  )
}

const ScheduleSlots: Component = () => {
  const schedule = useScheduleData()

  const isSpecial = () => schedule.settings.type == 'Special'
  const show = (slot: Slot) => {
    if (isSpecial()) {
      return true
    }
    return !SlotUtils.isLive(slot)
  }
  const lastUpdate = () => {
    return DateTime.fromISO(schedule.updatedAt)
  }
  const slots = () =>
    useCurrentDay()
      .slots.filter(slot => slot.visible && (!slot.streamType || slot.streamType == 'twitch') && show(slot))
      .sort(SlotUtils.sortByNextStream)

  return (
    <>
      <Show when={isSpecial()}>
        <div class={'flex flex-col gap-2 px-2 pb-10'}>
          <NewsComponent />
          <For each={slots()}>
            {slot => {
              return (
                <div class={'h-16'}>
                  <SpecialSlotCard slot={slot} showCountdown={true} showTime={true} />
                </div>
              )
            }}
          </For>
        </div>
      </Show>
      <Show when={!isSpecial()}>
        <div class={'flex flex-col pb-8'}>
          <NewsComponent />
          <p class={'p-1 text-center text-xs font-bold text-white'}>
            Last updated, {lastUpdate().toLocaleString(DateTime.DATETIME_FULL)}
          </p>
          <div class={'grid grid-cols-2 gap-2 px-2 pb-2'}>
            <For each={slots()}>
              {slot => {
                return (
                  <div class={'h-24 w-full'}>
                    <SlotCard slot={slot} showCountdown={true} showTime={true} />
                  </div>
                )
              }}
            </For>
          </div>
          <a class={'text-center text-white'} target={'_blank'} href={'https://schedule.yogs.app'}>
            Full Schedule
          </a>
        </div>
      </Show>
    </>
  )
}
