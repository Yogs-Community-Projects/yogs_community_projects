import { lazy, ParentComponent } from 'solid-js'

const YcDBFirebaseProvider = lazy(() => import('./firestore_db_provider'))
const YcDBDummyProvider = lazy(() => import('./dummy_db_provider'))
export const YcDBProvider: ParentComponent<{
  initAnalytics: boolean
}> = props => {
  const configString = import.meta.env.VITE_FIREBASE_CONFIG
  if (configString) {
    const config = JSON.parse(configString)
    return (
      <YcDBFirebaseProvider config={config} initAnalytics={props.initAnalytics}>
        {props.children}
      </YcDBFirebaseProvider>
    )
  } else {
    return (
      <YcDBDummyProvider>
        <p class={'fixed w-full bg-red-500 text-center text-white'}>USING DUMMY DB</p>
        <div class={'pt-10'}>{props.children}</div>
      </YcDBDummyProvider>
    )
  }
}
