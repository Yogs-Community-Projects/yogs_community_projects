import ExtensionDBDummyProvider from '@ycapp/common/src/jj_db/dummy_db_provider'
import ExtensionDBFirebaseProvider from '@ycapp/common/src/jj_db/firestore_db_provider'
import { ParentComponent } from 'solid-js'

const DBWrapper: ParentComponent = props => {
  const configString = import.meta.env.VITE_FIREBASE_CONFIG
  if (configString) {
    const config = JSON.parse(configString)
    return <ExtensionDBFirebaseProvider config={config}>{props.children}</ExtensionDBFirebaseProvider>
  } else {
    return (
      <ExtensionDBDummyProvider>
        <p class={'fixed w-full bg-red-500 text-center text-white'}>USING DUMMY DB</p>
        <div class={'pt-10'}>{props.children}</div>
      </ExtensionDBDummyProvider>
    )
  }
}

export default DBWrapper
