import { Component, createEffect, createSignal, Match, Switch } from 'solid-js'
import { useCurrentDay, useScheduleData } from './JJScheduleProvider'
import { DateTime } from 'luxon'
import { useCreatorFilter } from './CreatorFilterProvider'
import { RemoteData, useCreatorDB } from '@ycapp/common'
import { CreatorData } from '@ycapp/model'

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
    <div class={'h-full flex-1 p-2'}>
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
                <h3 class={'text-center text-xl'}>Streams with {creator().data.creator.name}</h3>
              </Match>
              <Match when={filter().length > 1 && creator().data}>
                <h3 class={'text-md text-center'}>
                  Streams with {creator().data.creator.name} or {filter().length - 1} more streamer
                </h3>
              </Match>
            </Switch>
          </Match>
        </Switch>
      </div>
    </div>
  )
}
