import { Component, lazy } from 'solid-js'
import { createI18n, I18nProvider } from 'solid-i18n'
import { useLocale } from '@kobalte/core'
import { Router } from '@solidjs/router'

const DBWrapper = lazy(() => import('./db_wrapper'))
const App = lazy(() => import('./App'))
const TwitchConfigProvider = lazy(() => import('./ui/config/TwitchConfigProvider'))

export const JJExtensionMain: Component = () => {
  const i18n = createI18n({ language: useLocale().locale() })

  return (
    <TwitchConfigProvider>
      <I18nProvider i18n={i18n}>
        <DBWrapper>
          <Router>
            <App />
          </Router>
        </DBWrapper>
      </I18nProvider>
    </TwitchConfigProvider>
  )
}
