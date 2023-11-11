import { Accessor, batch, createContext, createEffect, createRoot } from 'solid-js'
import { RemoteData, useCreatorDB, useScheduleDB, useTwitchDB, YcDBImpl } from '@ycapp/common'
import { createStore } from 'solid-js/store'
import { ScheduleData } from '@ycapp/model'

const createCacheStoreList = <T>() => {
  const [store, setStore] = createStore<RemoteData<T[]>>({
    loading: true,
    data: null,
    error: null,
  })

  const set = (data: T[]) => {
    setStore({
      error: null,
      loading: false,
      data: data,
    })
  }
  const add = (data: T) => {
    setStore('data', d => [...d, data])
  }
  const error = (e: any) => {
    setStore({
      error: e,
      loading: false,
      data: null,
    })
  }
  const loading = (l: boolean) => {
    setStore('loading', l)
  }
  return {
    store,
    set,
    add,
    error,
    loading,
  }
}
const createCacheStore = <T>() => {
  const [store, setStore] = createStore<RemoteData<T>>({
    loading: true,
    data: null,
    error: null,
  })

  const set = (data: T) => {
    setStore({
      error: null,
      loading: false,
      data: data,
    })
  }
  const error = (e: any) => {
    setStore({
      error: e,
      loading: false,
      data: null,
    })
  }
  const loading = (l: boolean) => {
    setStore('loading', l)
  }
  return {
    store,
    set,
    error,
    loading,
  }
}

const createYcDBCache = <T>(db: YcDBImpl<T>, getId: (data: T) => string) => {
  const [cache, setCache] = createStore<{
    [key: string]: T
  }>()
  const useSome = (ids: Accessor<string[]>) => {
    const { store, set, add, error, loading } = createCacheStoreList<T>()
    createEffect(() => {
      if (ids().some(id => !cache[id])) {
        createRoot(() => {
          const resp = db.readSome(ids())
          createEffect(() => {
            batch(() => {
              if (resp.data) {
                for (const data of resp.data) {
                  setCache(getId(data), data)
                }
                set(resp.data)
              } else if (resp.loading) {
                loading(resp.loading)
              } else if (resp.error) {
                error(resp.error)
              }
            })
          })
        })
      } else {
        set(
          ids()
            .filter(id => cache[id])
            .map(id => cache[id]),
        )
      }
    })

    return store
  }
  const use = (id: Accessor<string | undefined>) => {
    const { store, set, error, loading } = createCacheStore<T>()

    createEffect(() => {
      if (id() && !cache[id()]) {
        createRoot(() => {
          const resp = db.read(id())
          createEffect(() => {
            batch(() => {
              if (resp.data) {
                setCache(getId(resp.data), resp.data)
                set(resp.data)
              } else if (resp.loading) {
                loading(resp.loading)
              } else if (resp.error) {
                error(resp.error)
              }
            })
          })
        })
      } else {
        set(cache[id()])
      }
    })
    return store
  }

  const getCache = () => {
    const c: T[] = []
    for (const key in cache) {
      c.push(cache[key])
    }
    return c
  }
  return { useSome, use, getCache }
}
const createScheduleCache = () => {
  const db = useScheduleDB()

  const [cache, setCache] = createStore<{
    [key: string]: ScheduleData
  }>()

  const use = (id: Accessor<string | undefined>) => {
    const { store, set, error, loading } = createCacheStore<ScheduleData>()

    createEffect(() => {
      if (id() && !cache[id()]) {
        createRoot(() => {
          const resp = db.read(id())
          createEffect(() => {
            batch(() => {
              if (resp.data) {
                setCache(resp.data.id, resp.data)
                set(resp.data)
              } else if (resp.loading) {
                loading(resp.loading)
              } else if (resp.error) {
                error(resp.error)
              }
            })
          })
        })
      } else {
        set(cache[id()])
      }
    })
    return store
  }

  const getCache = () => {
    const c: ScheduleData[] = []
    for (const key in cache) {
      c.push(cache[key])
    }
    return c
  }
  return { use, getCache }
}

function creatorAndChannelCache() {
  const creatorDB = useCreatorDB()
  const twitchDB = useTwitchDB()
  const {
    useSome: useCreators,
    use: useCreator,
    getCache: getCreatorCache,
  } = createYcDBCache(creatorDB, data => data.creator.creatorId)
  const {
    useSome: useTwitchChannels,
    use: useTwitchChannel,
    getCache: getTwitchCache,
  } = createYcDBCache(twitchDB, data => data.channel.id)

  const { use: useSchedule, getCache: getScheduleCache } = createScheduleCache()
  const useTwitchWithCreators = (ids: Accessor<string[]>) => {
    const creators = useCreators(ids)
    const twitchIds = () => (creators.data ?? []).map(c => c.creator.relations.twitchChannels).flat()

    return useTwitchChannels(twitchIds)
  }

  return {
    useCreators,
    useCreator,
    getCreatorCache,
    useTwitchChannels,
    useTwitchChannel,
    getTwitchCache,
    useTwitchWithCreators,
    useSchedule,
    getScheduleCache,
  }
}

export const useDataHook = () => {
  // const charityData = useCache('charities', getCharitiesDoc(db))
  const cache = creatorAndChannelCache()
  return {
    ...cache,
  }
}
export const DataContext = createContext<ReturnType<typeof useDataHook>>()
