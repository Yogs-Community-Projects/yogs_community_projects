import YcDBFirebaseProvider from '@ycapp/common/src/db/firestore_db_provider'
import { ParentComponent } from 'solid-js'

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
