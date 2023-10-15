import { ParentComponent } from 'solid-js'
import { createI18n, I18nProvider } from 'solid-i18n'
import { useLocale } from '@kobalte/core'
import DBWrapper from './db_wrapper'
import JJConfigProviderLoader from './JJConfigProviderLoader'
import TwitchConfigProvider from './ui/config/TwitchConfigProvider'
import ThemeProvider from './ui/themeProvider/src/ThemeProvider'
import DataProvider from './ui/dataProvider/src/DataProvider'

/*
const DBWrapper = lazy(() => import('./db_wrapper'))
const JJConfigProviderLoader = lazy(() => import('./JJConfigProviderLoader'))
const TwitchConfigProvider = lazy(() => import('./ui/config/TwitchConfigProvider'))
const DataProvider = lazy(() => import('./ui/dataProvider/src/DataProvider'))
const ThemeProvider = lazy(() => import('./ui/themeProvider/src/ThemeProvider'))
*/
const Providers: ParentComponent = props => {
  const i18n = createI18n({ language: useLocale().locale() })
  return (
    <I18nProvider i18n={i18n}>
      <DBWrapper>
        <JJConfigProviderLoader>
          <TwitchConfigProvider>
            <ThemeProvider>
              <DataProvider>{props.children}</DataProvider>
            </ThemeProvider>
          </TwitchConfigProvider>
        </JJConfigProviderLoader>
      </DBWrapper>
    </I18nProvider>
  )
}

export default Providers
