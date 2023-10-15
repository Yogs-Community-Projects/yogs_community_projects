import { DocumentData, DocumentReference, Query } from 'firebase/firestore'
import { DateTime } from 'luxon'
import { createEffect } from 'solid-js'
import { createStore, reconcile, unwrap } from 'solid-js/store'
import { useFirestore } from 'solid-firebase'

export interface CacheOptions {
  forceRemote: boolean
  ageInHours: number
}

const DefaultCacheOptions: CacheOptions = {
  forceRemote: false,
  ageInHours: 24,
}

interface StoreItem<T> {
  data: T
  date: string
}

export interface RemoteData<T> {
  data: T | null
  error: any | null
  loading: boolean
}

function isDocumentReference<T>(docRef: any): docRef is DocumentReference<T> {
  return (docRef.path?.match(/\//g) || []).length % 2 !== 0
}

function isLocalStorageAvailable() {
  const test = 'test'
  try {
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}

export function saveToLocalstorage(key: string, data: any) {
  if (!isLocalStorageAvailable()) return false
  try {
    localStorage.setItem(key, JSON.stringify({ data: data, date: DateTime.now().toISO() }))
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export function loadFromLocalstorage<T>(key: string): StoreItem<T> | undefined {
  if (!isLocalStorageAvailable()) {
    return undefined
  }
  const strData = localStorage.getItem(key)
  if (strData) {
    const data = JSON.parse(strData) as StoreItem<T>
    return data
  }
  return undefined
}

/*function isDataOldWithKey<T>(key: string, maxAge = 24): boolean {
  return isDataOld<T>(loadFromLocalstorage<T>(key), maxAge)
}*/

export function isDataOld<T>(data?: StoreItem<T>, maxAge = 24): boolean {
  if (!data) {
    return true
  }
  if (!data.data) {
    return true
  }
  return DateTime.now().diff(DateTime.fromISO(data.date)).as('hour') > maxAge
}

export function loadLocalAndRemote<T>(
  key: string,
  query: DocumentReference<T>,
  cacheOptions?: CacheOptions,
): RemoteData<T>

export function loadLocalAndRemote<T>(key: string, query: Query<T>, cacheOptions?: CacheOptions): RemoteData<T[]>

export function loadLocalAndRemote<T extends DocumentData>(
  key: string,
  query: DocumentReference<T> | Query<T>,
  cacheOptions: CacheOptions = DefaultCacheOptions,
): RemoteData<T | null> | RemoteData<T[] | null> {
  if (isDocumentReference(query)) {
    let localData: StoreItem<T> | undefined = undefined
    if (!cacheOptions.forceRemote) {
      localData = loadFromLocalstorage<T>(key)
    }
    const b = !cacheOptions.forceRemote || !localData || isDataOld(localData, cacheOptions.ageInHours)
    const [state, setState] = createStore<RemoteData<T | null>>({
      data: null,
      loading: true,
      error: null,
    })
    if (b) {
      const fsState = useFirestore<T>(query)
      createEffect(() => {
        if (fsState.loading) {
          setState({
            loading: true,
            data: null,
            error: null,
          })
        } else if (fsState.error) {
          console.error('loadLocalAndRemote', key, 'error', fsState.error)
          setState({
            loading: false,
            data: null,
            error: fsState.error,
          })
        } else if (fsState.data) {
          setState({
            loading: false,
            data: fsState.data,
            error: null,
          })
        }
      })
    } else {
      if (localData) {
        setState(
          reconcile({
            data: localData.data,
            loading: false,
            error: undefined,
          }),
        )
      }
    }
    createEffect(() => {
      if (!cacheOptions.forceRemote) {
        if (state.data) {
          saveToLocalstorage(key, unwrap(state).data)
        }
      }
    })
    return state
  } else {
    let localData: StoreItem<T[]> | undefined = undefined
    if (!cacheOptions.forceRemote) {
      localData = loadFromLocalstorage<T[]>(key)
    }
    const b = !cacheOptions.forceRemote || localData !== undefined || isDataOld(localData, cacheOptions.ageInHours)

    const [state, setState] = createStore<RemoteData<T[] | null>>({
      data: null,
      loading: true,
      error: null,
    })
    createEffect(() => {
      if (state.error) {
        console.error('loadLocalAndRemote', key, 'error', state.error)
      }
    })
    if (b) {
      const fsState = useFirestore<T>(query)
      createEffect(() => {
        if (fsState.loading) {
          setState({
            loading: true,
            data: null,
            error: null,
          })
        } else if (fsState.error) {
          console.error('loadLocalAndRemote', key, 'error', fsState.error)
          setState({
            loading: false,
            data: null,
            error: fsState.error,
          })
        } else if (fsState.data) {
          setState({
            loading: false,
            data: fsState.data,
            error: null,
          })
        }
      })
    } else {
      if (localData) {
        setState(
          reconcile({
            data: localData.data,
            loading: false,
            error: undefined,
          }),
        )
      }
    }

    createEffect(() => {
      if (state.data) {
        if (!cacheOptions.forceRemote) {
          saveToLocalstorage(key, unwrap(state).data)
        }
      }
    })
    return state
  }
}
