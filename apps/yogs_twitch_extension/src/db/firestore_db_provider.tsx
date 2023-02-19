import YcDBFirebaseProvider from '@ycapp/common/src/db/firestore_db_provider'
import { ParentComponent } from 'solid-js'

interface ExtensionDBFirebaseProviderProps {
  config: any
}

const ExtensionDBFirebaseProvider: ParentComponent<ExtensionDBFirebaseProviderProps> = props => {
  return <YcDBFirebaseProvider config={props.config}>{props.children}</YcDBFirebaseProvider>
}

export default ExtensionDBFirebaseProvider
