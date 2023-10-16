import { ParentComponent } from 'solid-js'
import { createI18n, I18nProvider } from 'solid-i18n'
import { useLocale } from '@kobalte/core'
import JJConfigProviderLoader from '../../JJConfigProviderLoader'
import TwitchConfigProvider from '../config/TwitchConfigProvider'
import ThemeProvider from '../themeProvider/src/ThemeProvider'
import DataProvider from '../dataProvider/src/DataProvider'
import Background from '../../Background'
import DBWrapper from '../../db_wrapper'
import { useFirestoreDB } from '@ycapp/common'

/*
const DBWrapper = lazy(() => import('./db_wrapper'))
const JJConfigProviderLoader = lazy(() => import('./JJConfigProviderLoader'))
const TwitchConfigProvider = lazy(() => import('./ui/config/TwitchConfigProvider'))
const DataProvider = lazy(() => import('./ui/dataProvider/src/DataProvider'))
const ThemeProvider = lazy(() => import('./ui/themeProvider/src/ThemeProvider'))
*/

// const TwitchProviders = lazy(() => import('./GroupedTwitchProviders'))
// const DataProviders = lazy(() => import('./GroupedDataProviders'))
/*
const Providers: ParentComponent = props => {
  const configString = import.meta.env.VITE_FIREBASE_CONFIG
  const fbConfig = JSON.parse(configString)
  const app = initializeApp(fbConfig)
  const db = initializeFirestore(app, {})
  const i18n = createI18n({ language: useLocale().locale() })
  return (
    <TwitchConfigProvider>
      <ThemeProvider>
        <Background>
          <I18nProvider i18n={i18n}>
            <JJConfigProviderLoader db={db}>
              <DataProvider db={db}>{props.children}</DataProvider>
            </JJConfigProviderLoader>
          </I18nProvider>
        </Background>
      </ThemeProvider>
    </TwitchConfigProvider>
  )
}*/
const Providers: ParentComponent = props => {
  /*
  const configString = import.meta.env.VITE_FIREBASE_CONFIG
  const fbConfig = JSON.parse(configString)
  const app = initializeApp(fbConfig)
  const db = initializeFirestore(app, {})*/
  const i18n = createI18n({ language: useLocale().locale() })
  return (
    <TwitchConfigProvider>
      <ThemeProvider>
        <Background>
          <I18nProvider i18n={i18n}>
            <DBWrapper>
              <Body>{props.children}</Body>
            </DBWrapper>
          </I18nProvider>
        </Background>
      </ThemeProvider>
    </TwitchConfigProvider>
  )
}

const Body: ParentComponent = props => {
  const db = useFirestoreDB()
  return (
    <JJConfigProviderLoader db={db}>
      <DataProvider db={db}>{props.children}</DataProvider>
    </JJConfigProviderLoader>
  )
}

export default Providers
