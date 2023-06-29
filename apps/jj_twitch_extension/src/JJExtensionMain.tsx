import { Env, EnvProvider } from './EnvProvider'
import { Router } from '@solidjs/router'
import App from './App'
import { Component, lazy } from 'solid-js'
import { createI18n, I18nProvider } from 'solid-i18n'
import { useLocale } from '@kobalte/core'

const DBWrapper = lazy(() => import('./db_wrapper'))

interface MainProps {
  env: Env
}

const JJExtensionMain: Component<MainProps> = ({ env }) => {
  const i18n = createI18n({ language: useLocale().locale() })

  return (
    <I18nProvider i18n={i18n}>
      <EnvProvider env={env}>
        <DBWrapper>
          <Router>
            <App />
          </Router>
        </DBWrapper>
      </EnvProvider>
    </I18nProvider>
  )
}

export const JJExtensionMobile = () => <JJExtensionMain env={Env.mobile} />
export const JJExtensionDesktop = () => <JJExtensionMain env={Env.desktop} />
