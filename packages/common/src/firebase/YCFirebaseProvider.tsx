import { initializeApp } from 'firebase/app'
import { ParentComponent, useContext } from 'solid-js'
import { initializeFirestore } from '@firebase/firestore'
import { useFirebaseConfig } from './FirebaseConfigProvider'
import { YcFirebaseContext, YcFirebaseProps } from './jj_firebase_context'

export const YcFirebaseProvider: ParentComponent = props => {
  const config = useFirebaseConfig()
  let app = undefined
  let firestore = undefined
  if (config) {
    app = initializeApp(config)
    firestore = initializeFirestore(app, {})
  }
  const value: YcFirebaseProps = {
    app,
    firestore,
    config
  }
  return <YcFirebaseContext.Provider value={value}>{props.children}</YcFirebaseContext.Provider>
}
export const useYcFirebase = () => useContext(YcFirebaseContext)!
