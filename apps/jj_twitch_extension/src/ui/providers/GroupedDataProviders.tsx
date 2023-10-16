import { ParentComponent } from 'solid-js'
import { initializeApp } from 'firebase/app'
import { initializeFirestore } from 'firebase/firestore'
import { createI18n, I18nProvider } from 'solid-i18n'
import { useLocale } from '@kobalte/core'
import JJConfigProviderLoader from '../../JJConfigProviderLoader'
import DataProvider from '../dataProvider/src/DataProvider'

const GroupedDataProviders: ParentComponent = props => {
  const configString = import.meta.env.VITE_FIREBASE_CONFIG
  const fbConfig = JSON.parse(configString)
  const app = initializeApp(fbConfig)
  const db = initializeFirestore(app, {})
  const i18n = createI18n({ language: useLocale().locale() })
  return (
    <I18nProvider i18n={i18n}>
      <JJConfigProviderLoader db={db}>
        <DataProvider db={db}>{props.children}</DataProvider>
      </JJConfigProviderLoader>
    </I18nProvider>
  )
}
export default GroupedDataProviders
