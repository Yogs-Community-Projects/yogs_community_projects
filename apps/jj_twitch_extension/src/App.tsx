import type { Component, ParentComponent } from 'solid-js'
import { Match, Switch } from 'solid-js'
import NavBar from './ui/components/NavBar'
import { routes } from './routes'
import { useRoutes } from '@solidjs/router'
import { JJConfigProvider, useConfigDB } from '@ycapp/common'
import { twMerge } from 'tailwind-merge'
import { ThemeProvider, useTheme } from './ThemeProvider'

const App: Component = () => {
  const Routes = useRoutes(routes)
  const jjExtensionConfig = useConfigDB().readJJExtensionConfig()

  return (
    <Switch>
      <Match when={jjExtensionConfig.error}>
        <p>Error: {JSON.parse(jjExtensionConfig.error)}</p>
      </Match>
      <Match when={jjExtensionConfig.loading}>
        <p>Loading...</p>
      </Match>
      <Match when={jjExtensionConfig.data}>
        <JJConfigProvider config={jjExtensionConfig.data}>
          <ThemeProvider>
            <Theme>
              <>
                <NavBar />
                <div class={'mx-auto w-full flex-1 overflow-hidden overscroll-none'}>
                  <Routes />
                </div>
              </>
            </Theme>
          </ThemeProvider>
        </JJConfigProvider>
      </Match>
    </Switch>
  )
}

const Theme: ParentComponent = props => {
  const { theme } = useTheme()
  const gradient = () => {
    switch (theme()) {
      case 'blue':
        return 'from-accent-300 to-accent-600'
      case 'dark':
        return 'from-gray-500 to-gray-800'
      case 'red_dark':
        return 'from-primary-500 to-primary-800'
      case 'blue_dark':
        return 'from-accent-500 to-accent-800'
      case 'rainbow':
        return ''
      default:
        return 'from-primary-300 to-primary-600'
    }
  }
  const cssStyle = () => {
    if (theme() !== 'rainbow') {
      return undefined
    }
    return {
      background: `linear-gradient(180deg,
      rgb(239 68 68),
      rgb(249 115 22),
      rgb(245 158 11),
      rgb(34 197 94),
      rgb(6 182 212),
      rgb(59 130 246),
      rgb(168 85 247))`,
    }
  }

  return (
    <div
      class={twMerge('flex h-screen flex-col overflow-hidden overscroll-none bg-red-400 bg-gradient-to-b', gradient())}
      style={cssStyle()}
    >
      {props.children}
    </div>
  )
}

export default App
