import { Component, createEffect, Match, Switch } from 'solid-js'
import { ScheduleDataProvider } from './YogsScheduleProvider'
import { DayIndexProvider } from './DayIndexProvider'
import { ScheduleBody } from './body/ScheduleBody'
import { DesktopViewModeProvider } from './body/DesktopViewModeProvider'
import { useScheduleDB } from '@ycapp/common'
import { ScheduleData } from '@ycapp/model'
import { ScheduleNewsTop } from '../components/ScheduleNewsTop'
import { Title } from '@solidjs/meta'
/*

          <ScheduleDataProvider scheduleData={schedule.data}>
            <DayIndexProvider>
              <DesktopViewModeProvider>
                <ScheduleBody />
              </DesktopViewModeProvider>
            </DayIndexProvider>
          </ScheduleDataProvider>
 */
const YogsSchedulePage: Component = () => {
  const state = useScheduleDB().readYogs()
  createEffect(() => {
    if (state.error) {
      console.error('YogsSchedulePage', 'schedule', 'error', state)
    }
  })
  return (
    <div class={'flex flex-col items-center'}>
      <Title>Yogscast Stream Schedules</Title>
      <ScheduleNewsTop />
      <Switch>
        <Match when={state.loading}>
          <p>Loading..</p>
        </Match>
        <Match when={state.error}>
          <p>Error {JSON.stringify(state.error)}</p>
        </Match>
        <Match when={state.data}>
          <ScheduleDataProvider scheduleData={state.data as ScheduleData}>
            <DayIndexProvider scheduleData={state.data as ScheduleData}>
              <DesktopViewModeProvider>
                <Switch>
                  <Match when={state.loading}>
                    <p>Loading..</p>
                  </Match>
                  <Match when={state.error}>
                    <p>Error {JSON.stringify(state.error)}</p>
                  </Match>
                  <Match when={state.data}>
                    <ScheduleDataProvider scheduleData={state.data as ScheduleData}>
                      <DayIndexProvider scheduleData={state.data as ScheduleData}>
                        <DesktopViewModeProvider>
                          <ScheduleBody />
                        </DesktopViewModeProvider>
                      </DayIndexProvider>
                    </ScheduleDataProvider>
                  </Match>
                </Switch>
              </DesktopViewModeProvider>
            </DayIndexProvider>
          </ScheduleDataProvider>
        </Match>
      </Switch>
    </div>
  )
}

/*
      <BetaBanner />
      <Switch>
        <Match when={data.loading} keyed>
          <p>Loading..</p>
        </Match>
        <Match when={data.error} keyed>
          <p>Error {data.error}</p>
        </Match>
        <Match when={data.data} keyed>
          <ScheduleDataProvider scheduleData={data.data}>
            <DayIndexProvider>
              <DesktopViewModeProvider>
                <ScheduleBody />
              </DesktopViewModeProvider>
            </DayIndexProvider>
          </ScheduleDataProvider>
        </Match>
      </Switch>
 */

export default YogsSchedulePage
