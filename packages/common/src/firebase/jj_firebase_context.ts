import { createContext } from 'solid-js'
import { FirebaseApp } from 'firebase/app'
import { Firestore } from 'firebase/firestore'
import { FirebaseOptions } from '@firebase/app'

export interface YcFirebaseProps {
  app?: FirebaseApp
  firestore?: Firestore
  config?: FirebaseOptions
}

export const YcFirebaseContext = createContext<YcFirebaseProps>()
