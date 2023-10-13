import { Component, createEffect, createSignal, Match, Switch } from 'solid-js'
import { useCurrentDay, useScheduleData } from './JJScheduleProvider'
import { DateTime } from 'luxon'
import { useCreatorFilter } from './CreatorFilterProvider'
import { RemoteData, useCreatorDB } from '@ycapp/common'
import { CreatorData } from '@ycapp/model'
import { ScheduleControls } from './ScheduleControls'

export const ScheduleHeader: Component = () => {
  return (
    <div style={{}} class={'flex w-full flex-col'}>
      <div class={'h-30'}>
        <Title />
      </div>
      <div class={'p-schedule h-4'}>
        <ScheduleControls />
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
