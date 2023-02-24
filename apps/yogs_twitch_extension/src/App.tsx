import { useConfigDB } from '@ycapp/common'
import { Component, Match, Switch } from 'solid-js'
import AppBody from './AppBody'
import NavBar from './ui/components/NavBar'
import { YogsExtensionConfigProviderProvider } from './ui/components/YogsExtensionConfigProvider'

const App: Component = () => {
  const config = useConfigDB().readYogsExtensionConfig()
  return (
    <div class={'flex min-h-screen flex-col items-center'}>
      <Switch>
        <Match when={config.data}>
          <YogsExtensionConfigProviderProvider config={config.data}>
            <NavBar />
            <div class={'container mx-auto'}>
              <AppBody />
            </div>
          </YogsExtensionConfigProviderProvider>
        </Match>
        <Match when={config.loading}>
          <p>Loading Config...</p>
        </Match>
        <Match when={config.error}>
          <p>Error: {JSON.stringify(config.error)}</p>
        </Match>
      </Switch>
    </div>
  )
}
export default App
