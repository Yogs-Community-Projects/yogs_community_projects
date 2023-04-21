import { Component, createMemo, Match, Show, Switch } from 'solid-js'
import { ScheduleDataProvider } from './YogsScheduleProvider'
import { DayIndexProvider } from './DayIndexProvider'
import { ScheduleBody } from './ScheduleBody'
import { useScheduleDB } from '@ycapp/common'
import { useYogsExtensionConfig } from '../components/YogsExtensionConfigProvider'

const SchedulePage: Component = () => {
  const visible = () => useYogsExtensionConfig().visible

  return (
    <>
      <Show when={visible()}>
        <Visible />
      </Show>
      <Show when={!visible()}>
        <Invisible />
      </Show>
    </>
  )
}

const Invisible: Component = () => {
  return (
    <div class={'h-full w-full text-center text-white'}>
      <p>The Schedule is currently unavailable.</p>
      <p>Please check in later</p>
    </div>
  )
}

const Visible: Component = () => {
  // yogscaststreamteam
  // tinyteams2022_2_2
  const id = () => useYogsExtensionConfig().scheduleId
  const schedule = createMemo(() => useScheduleDB().read(id()))
  return (
    <Switch>
      <Match when={schedule().data} keyed={true}>
        <ScheduleDataProvider scheduleData={schedule().data}>
          <DayIndexProvider>
            <ScheduleBody />
          </DayIndexProvider>
        </ScheduleDataProvider>
      </Match>
      <Match when={schedule().error} keyed={false}>
        <p>{JSON.parse(schedule().error)}</p>
      </Match>
      <Match when={schedule().loading} keyed={false}>
        <p>Loading...</p>
      </Match>
    </Switch>
  )
}

export default SchedulePage
