import { ParentComponent } from 'solid-js'
import YcDBFirebaseProvider from '../db/firestore_db_provider'

interface ExtensionDBFirebaseProviderProps {
  config: any
  initAnalytics: boolean
}

const ExtensionDBFirebaseProvider: ParentComponent<ExtensionDBFirebaseProviderProps> = props => {
  return (
    <YcDBFirebaseProvider config={props.config} initAnalytics={props.initAnalytics}>
      {props.children}
    </YcDBFirebaseProvider>
  )
}

export default ExtensionDBFirebaseProvider
