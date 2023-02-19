import { ParentComponent } from 'solid-js'
import YcDBDummyProvider from './dummy_db_provider'
import YcDBFirebaseProvider from './firestore_db_provider'

export const YcDBProvider: ParentComponent = props => {
  const configString = import.meta.env.VITE_FIREBASE_CONFIG
  if (configString) {
    const config = JSON.parse(configString)
    return <YcDBFirebaseProvider config={config}>{props.children}</YcDBFirebaseProvider>
  } else {
    return (
      <YcDBDummyProvider>
        <p class={'fixed w-full bg-red-500 text-center text-white'}>USING DUMMY DB</p>
        <div class={'pt-10'}>{props.children}</div>
      </YcDBDummyProvider>
    )
  }
}
