import { JJExtensionConfig, News, ScheduleData } from '@ycapp/model'
import { collection, CollectionReference, doc, DocumentReference, Firestore } from 'firebase/firestore'
import { RemoteData } from './local_store'
import { createEffect } from 'solid-js'
import { createStore } from 'solid-js/store'

interface DBName {
  get name(): string
}

interface YcDB<T> extends DBName {
  read: (id: string) => RemoteData<T | null>

  readAll: () => RemoteData<T[] | null>
}

export interface ConfigDB extends DBName {
  readJJExtensionConfig: () => RemoteData<JJExtensionConfig | null>
}

export abstract class YcDBImpl<T> implements YcDB<T> {
  abstract get name(): string

  abstract read(id: string): RemoteData<T | null>

  abstract readAll(): RemoteData<T[] | null>

  readSome(ids: string[]): RemoteData<T[] | null> {
    const signals = ids.map(id => this.read(id))
    const [state, setState] = createStore<RemoteData<T[] | null>>({
      data: [],
      loading: true,
      error: null,
    })
    createEffect(() => {
      if (signals.some(s => s.error)) {
        console.error(
          'readSome',
          'error',
          signals.map(s => s.error),
        )
        setState({
          error: signals.find(s => s.error)?.error,
          loading: false,
          data: null,
        })
      } else if (signals.some(s => s.loading)) {
        setState({
          error: null,
          loading: true,
          data: null,
        })
      } else if (signals.every(s => s.data)) {
        setState({
          data: signals.filter(s => s.data).map(s => s.data) as T[],
          error: null,
          loading: false,
        })
      }
    })
    return state
  }
}

export abstract class YcFirestoreDB<T> extends YcDBImpl<T> {
  protected db: Firestore

  constructor(db: Firestore) {
    super()
    this.db = db
  }

  abstract get collectionName(): string

  protected getCollectionRef() {
    return collection(this.db, this.collectionName) as CollectionReference<T>
  }

  protected getDocRef(id: string): DocumentReference<T> {
    return doc<T>(this.getCollectionRef(), id)
  }
}

export interface YcScheduleDB extends DBName {
  read: (id: string) => RemoteData<ScheduleData | null>
  readYogs: () => RemoteData<ScheduleData | null>
}

export interface YcNewsDB extends DBName {
  read(display: string[]): RemoteData<News[] | null>
}
