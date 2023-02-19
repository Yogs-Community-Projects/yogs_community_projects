import type { Component } from 'solid-js'
import { Match, Switch } from 'solid-js'
import NavBar from './ui/components/NavBar'
import { routes } from './routes'
import { useRoutes } from '@solidjs/router'
import { useConfigDB } from '@ycapp/common'
import { JJConfigProvider } from './config/JJConfigProvider'

const App: Component = () => {
  const Routes = useRoutes(routes)
  const config = useConfigDB().readJJExtensionConfig()
  return (
    <div class={'flex min-h-screen flex-col items-center'}>
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
              <div class={'container mx-auto'}>
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
