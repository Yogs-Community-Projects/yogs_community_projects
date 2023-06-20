import { ParentComponent } from 'solid-js'
import YcDBFirebaseProvider from '../db/firestore_db_provider'

interface ExtensionDBFirebaseProviderProps {
  config: any
}

const ExtensionDBFirebaseProvider: ParentComponent<ExtensionDBFirebaseProviderProps> = props => {
  return <YcDBFirebaseProvider config={props.config}>{props.children}</YcDBFirebaseProvider>
}

export default ExtensionDBFirebaseProvider
