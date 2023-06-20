import type { Component } from 'solid-js'
import { Match, Switch } from 'solid-js'
import NavBar from './ui/components/NavBar'
import { routes } from './routes'
import { useRoutes } from '@solidjs/router'
import { JJConfigProvider, useConfigDB } from '@ycapp/common'

const App: Component = () => {
  const Routes = useRoutes(routes)
  const config = useConfigDB().readJJExtensionConfig()
  return (
    <div class={'flex h-screen flex-col overflow-hidden overscroll-none'}>
      <Switch>
        <Match when={config.error}>
          <p>Error: {JSON.parse(config.error)}</p>
        </Match>
        <Match when={config.loading}>
          <p>Loading...</p>
        </Match>
        <Match when={config.data}>
          <JJConfigProvider config={config.data}>
            <>
              <NavBar />
              <div class={'mx-auto w-full flex-1 overflow-hidden overscroll-none'}>
                <Routes />
              </div>
            </>
          </JJConfigProvider>
        </Match>
      </Switch>
    </div>
  )
}

export default App
