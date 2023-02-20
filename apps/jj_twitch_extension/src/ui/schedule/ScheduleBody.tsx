import {Component, For, Match, Switch} from 'solid-js'
import {useCurrentDay, useSlots} from './JJScheduleProvider'
import {SlotCard} from './SlotCard'
import {ScheduleHeader} from './ScheduleHeader'
import {useCreatorFilter} from "./CreatorFilterProvider";

export const ScheduleBody: Component = () => {
  return (
    <div>
      <ScheduleHeader/>
      <ScheduleSlots/>
    </div>
  )
}

const ScheduleSlots: Component = () => {
  const slots = () => useCurrentDay().slots
  const {isEmpty, includes} = useCreatorFilter()


  const filteredSlots = () => {
    return useSlots().filter(s => s.relations.creators.some(includes))
  }

  return (
    <Switch>
      <Match when={isEmpty()}>
        <div class={'pb-10'}>
          <For each={slots()}>
            {slot => {
              return <SlotCard slot={slot} showCountdown={true} showTime={true}/>
            }}
          </For>
        </div>
      </Match>
      <Match when={!isEmpty()}>
        <div class={'pb-10'}>
          <For each={filteredSlots()}>
            {slot => {
              return <SlotCard slot={slot} showCountdown={true} showTime={true}/>
            }}
          </For>
        </div>
      </Match>
    </Switch>
  )
}
