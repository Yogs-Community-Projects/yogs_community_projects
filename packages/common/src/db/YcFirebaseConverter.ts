import { FirestoreDataConverter, WithFieldValue } from '@firebase/firestore'
import { DocumentData, QueryDocumentSnapshot, SetOptions, SnapshotOptions } from 'firebase/firestore'

export class YcFirebaseConverter<T> implements FirestoreDataConverter<T> {
  fromFirestore(snapshot: QueryDocumentSnapshot<T>, options?: SnapshotOptions): T {
    return snapshot.data() as T
  }

  toFirestore(modelObject: WithFieldValue<T>): DocumentData
  toFirestore(modelObject: WithFieldValue<T>, options?: SetOptions): DocumentData {
    return modelObject as DocumentData
  }
}
