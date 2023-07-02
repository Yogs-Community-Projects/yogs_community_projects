import { ParentComponent } from 'solid-js'
import { createI18n, I18nProvider } from 'solid-i18n'
import { Env, EnvProvider } from './EnvProvider'
import { useLocale } from '@kobalte/core'

interface JJProvidersProps {
  env: Env
}

const JJProviders: ParentComponent<JJProvidersProps> = ({ env, children }) => {
  const i18n = createI18n({ language: useLocale().locale() })
  return (
    <I18nProvider i18n={i18n}>
      <EnvProvider env={env}>{children}</EnvProvider>
    </I18nProvider>
  )
}

export default JJProviders
