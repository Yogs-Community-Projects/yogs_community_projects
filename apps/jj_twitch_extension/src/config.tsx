/* @refresh reload */
import './config.css'
import { render } from 'solid-js/web'
import { ConfigBody } from './ui/config/ConfigBody'
import TwitchConfigProvider from './ui/config/TwitchConfigProvider'
import JJConfigProviderLoader from './JJConfigProviderLoader'
import DBWrapper from './db_wrapper'
import { useFirestoreDB } from '@ycapp/common'
import { AnalyticsProvider } from './analytics/AnalyticsProvider'

const root = document.getElementById('root')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  )
}

render(
  () => (
    <DBWrapper>
      <Body />
    </DBWrapper>
  ),
  root,
)

const Body = () => {
  const db = useFirestoreDB()
  return (
    <JJConfigProviderLoader db={db}>
      <TwitchConfigProvider>
        <AnalyticsProvider>
          <ConfigBody />
        </AnalyticsProvider>
      </TwitchConfigProvider>
    </JJConfigProviderLoader>
  )
}
