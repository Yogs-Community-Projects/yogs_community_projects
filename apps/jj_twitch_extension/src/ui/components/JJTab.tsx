import { Component, lazy, Match, Suspense, Switch } from 'solid-js'
import { TabType, useTwitchConfig } from '../config/TwitchConfigProvider'

interface JJTabProps {
  tab: TabType
}

const SchedulePage = lazy(() => {
  return import('../schedule/SchedulePage')
})
const CharityPage = lazy(() => {
  return import('../charity/CharityPage')
})
const StreamerPage = lazy(() => {
  return import('../streamer/StreamerPage')
})

const JJTab: Component<JJTabProps> = props => {
  return (
    <>
      <Switch>
        <Match when={props.tab == 'yogs'}>
          <Suspense>
            <SchedulePage />
          </Suspense>
        </Match>
        <Match when={props.tab == 'charities'}>
          <Suspense>
            <CharityPage />
          </Suspense>
        </Match>
        <Match when={props.tab == 'community'}>
          <Suspense>
            <StreamerPage />
          </Suspense>
        </Match>
        <Match when={props.tab == 'none'}>
          <p>None</p>
        </Match>
      </Switch>
    </>
  )
}

export const JJTab1 = () => {
  const { config } = useTwitchConfig()
  return <JJTab tab={config.tab1} />
}
export const JJTab2 = () => {
  const { config } = useTwitchConfig()
  return <JJTab tab={config.tab2} />
}
export const JJTab3 = () => {
  const { config } = useTwitchConfig()
  return <JJTab tab={config.tab3} />
}
