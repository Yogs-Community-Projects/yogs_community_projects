import { Component, Match, Switch } from 'solid-js'
import { useCurrentDay, useScheduleData } from './JJScheduleProvider'
import { DateTime } from 'luxon'
import { useCreatorFilter } from './CreatorFilterProvider'
import { useData } from '../dataProvider'

export const Title: Component = () => {
  const day = () => useCurrentDay()
  const { useCreator, getCreatorCache, getTwitchCache } = useData()
  const date = () => DateTime.fromISO(day().start)
  const { isEmpty, filter } = useCreatorFilter()
  const id = () => {
    if (filter().length > 0) {
      return filter()[0]
    }
    return undefined
  }
  const creator = useCreator(id)

  return (
    <div
      class={'h-full flex-1 px-2'}
      onClick={() => {
        if (import.meta.env.DEV) {
          console.log('creatorCache', getCreatorCache())
          console.log('twitchCache', getTwitchCache())
        }
      }}
    >
      <div class={'schedule-card-white flex h-full flex-col items-center justify-center'}>
        <h3 class={'text-center text-xl'}>{useScheduleData().name}</h3>
        <Switch>
          <Match when={isEmpty()}>
            <h3 class={'text-md text-center'}>
              {date().toLocaleString({
                weekday: 'short',
                day: '2-digit',
                month: 'short',
              })}
            </h3>
          </Match>
          <Match when={!isEmpty()}>
            <Switch>
              <Match when={filter().length == 1 && creator()}>
                <h3 class={'text-center text-lg'}>Streams with {creator().creator.name}</h3>
              </Match>
              <Match when={filter().length > 1 && creator()}>
                <h3 class={'text-md text-center'}>
                  Streams with {creator().creator.name} or {filter().length - 1} more streamer
                </h3>
              </Match>
            </Switch>
          </Match>
        </Switch>
      </div>
    </div>
  )
}
