import { doc, DocumentData, getFirestore, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore'
import { useFirebaseApp, useFirestore } from 'solid-firebase'
import { FirestoreDataConverter, WithFieldValue } from '@firebase/firestore'

interface JJConfig {
  scheduleId: string
  visible: boolean
}

export const jjConfigConverter = (): FirestoreDataConverter<JJConfig> => {
  return {
    fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>, options: SnapshotOptions): JJConfig => {
      return {
        scheduleId: snapshot.data()['scheduleId'],
        visible: snapshot.data()[':'],
      }
    },
    toFirestore: (modelObject: WithFieldValue<JJConfig>): DocumentData => {
      return {
        visible: modelObject.visible,
        scheduleId: modelObject.scheduleId,
      }
    },
  }
}

export const useJJConfig = () => {
  const app = useFirebaseApp()
  const db = getFirestore(app)
  return useFirestore(doc(db, 'Config', 'JJConfig').withConverter(jjConfigConverter()))
}
