import type { Component, ParentComponent } from 'solid-js'
import { Match, Switch } from 'solid-js'
import NavBar from './ui/components/NavBar'
import { routes } from './routes'
import { useRoutes } from '@solidjs/router'
import { JJConfigProvider, useConfigDB } from '@ycapp/common'
import { useTwitchConfig } from './ui/config/TwitchConfigProvider'
import { twMerge } from 'tailwind-merge'

const App: Component = () => {
  const Routes = useRoutes(routes)
  const jjExtensionConfig = useConfigDB().readJJExtensionConfig()

  return (
    <Theme>
      <Switch>
        <Match when={jjExtensionConfig.error}>
          <p>Error: {JSON.parse(jjExtensionConfig.error)}</p>
        </Match>
        <Match when={jjExtensionConfig.loading}>
          <p>Loading...</p>
        </Match>
        <Match when={jjExtensionConfig.data}>
          <JJConfigProvider config={jjExtensionConfig.data}>
            <>
              <NavBar />
              <div class={'mx-auto w-full flex-1 overflow-hidden overscroll-none'}>
                <Routes />
              </div>
            </>
          </JJConfigProvider>
        </Match>
      </Switch>
    </Theme>
  )
}

const Theme: ParentComponent = props => {
  const { config } = useTwitchConfig()
  const gradient = () => {
    if (config.theme === 'blue') {
      return 'from-accent-300 to-accent-600'
    }
    return 'from-primary-300 to-primary-600'
  }
  return (
    <div class={twMerge('flex h-screen flex-col overflow-hidden overscroll-none bg-gradient-to-b', gradient())}>
      {props.children}
    </div>
  )
}

export default App
