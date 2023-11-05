/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import { Component, lazy } from 'solid-js'
import { useLocale } from '@kobalte/core'
import { createI18n, I18nProvider } from 'solid-i18n'
import { ConfigProviderLoader } from './ui/configProvider/ConfigProvider'
import { MetaProvider } from '@solidjs/meta'
const DBWrapper = lazy(() => import('./db_wrapper'))
const App = lazy(() => import('./App'))

const Main: Component = () => {
  const i18n = createI18n({ language: useLocale().locale() })
  return (
    <MetaProvider>
      <I18nProvider i18n={i18n}>
        <DBWrapper>
          <ConfigProviderLoader>
            <App />
          </ConfigProviderLoader>
        </DBWrapper>
      </I18nProvider>
    </MetaProvider>
  )
}

render(() => <Main />, document.getElementById('root') as HTMLElement)
