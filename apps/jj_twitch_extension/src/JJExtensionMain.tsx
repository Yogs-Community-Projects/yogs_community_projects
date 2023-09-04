import { Env, EnvProvider } from './EnvProvider'
import { Component, lazy } from 'solid-js'
import { createI18n, I18nProvider } from 'solid-i18n'
import { useLocale } from '@kobalte/core'
import { Router } from '@solidjs/router'
import { TwitchConfigProvider } from './ui/config/TwitchConfigProvider'

const DBWrapper = lazy(() => import('./db_wrapper'))
const App = lazy(() => import('./App'))

interface MainProps {
  env: Env
}

const JJExtensionMain: Component<MainProps> = ({ env }) => {
  const i18n = createI18n({ language: useLocale().locale() })

  return (
    <TwitchConfigProvider>
      <I18nProvider i18n={i18n}>
        <EnvProvider env={env}>
          <DBWrapper>
            <Router>
              <App />
            </Router>
          </DBWrapper>
        </EnvProvider>
      </I18nProvider>
    </TwitchConfigProvider>
  )
}

export const JJExtensionMobile = () => <JJExtensionMain env={Env.mobile} />
export const JJExtensionDesktop = () => <JJExtensionMain env={Env.desktop} />
