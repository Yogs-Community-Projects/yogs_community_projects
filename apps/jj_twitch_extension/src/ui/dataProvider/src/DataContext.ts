import { Accessor, batch, createContext, createEffect, createRoot, createSignal } from 'solid-js'
import { useLocation } from '@solidjs/router'
import { useTwitchConfig } from '../../config/useTwitchConfig'
import { TabType } from '../../config/TwitchConfig'
import { useFirestore } from 'solid-firebase'
import { collection, CollectionReference, doc, Firestore, FirestoreError } from 'firebase/firestore'
import { useCreatorDB, useJJConfig, useTwitchDB } from '@ycapp/common'
import { CreatorData, JJCommunityFundraiser, JJData, ScheduleData, TwitchChannelData } from '@ycapp/model'
import { createStore } from 'solid-js/store'

interface UseFireStoreReturn<T> {
  data: T
  loading: boolean
  error: FirestoreError | null
}

function getDoc<T>(db: Firestore, collectionName: string, id: string) {
  const coll = collection(db, collectionName) as CollectionReference<T>
  return doc<T>(coll, id)
}

const getScheduleDoc = (db: Firestore) => {
  const id = () => useJJConfig().scheduleId
  return getDoc<ScheduleData>(db, 'ScheduleData', id())
}
const getCharitiesDoc = (db: Firestore) => {
  const docId = useJJConfig().jjDonationTrackerDoc ?? 'JJDonationTracker2023'
  return getDoc<JJData>(db, 'JJDonationTracker', docId)
}
const getFundraiserDoc = (db: Firestore) => {
  const docId = useJJConfig().fundraiserDoc ?? 'Fundraiser2023'
  return getDoc<JJCommunityFundraiser>(db, 'JJDonationTracker', docId)
}

function useCache<T>(tab: TabType, load: ReturnType<typeof getDoc<T>>) {
  const location = useLocation()
  const { config } = useTwitchConfig()
  const [visited, setVisited] = createSignal<boolean>(false)

  const [cache, setCache] = createStore<UseFireStoreReturn<T>>({
    loading: false,
    error: null,
    data: null,
  })

  const isTab1 = () =>
    config.tab1 === tab &&
    (location.pathname === '/1' ||
      location.pathname === '/' ||
      location.pathname === '' ||
      location.pathname === '*' ||
      location.pathname.endsWith('.html'))
  const isTab = () => {
    return (
      isTab1() ||
      (config.tab2 === tab && location.pathname === '/2') ||
      (config.tab3 === tab && location.pathname === '/3')
    )
  }

  createEffect(() => {
    if (isTab()) {
      setVisited(true)
    }
  })

  createEffect(() => {
    if (visited()) {
      createRoot(() => {
        const s = useFirestore<T>(load)
        createEffect(() => {
          batch(() => {
            setCache('data', s.data)
            setCache('loading', s.loading)
            setCache('error', s.error)
          })
        })
      })
    }
  })
  return cache
}

function useSchedule(tab: TabType, db: Firestore) {
  const jjConfig = useJJConfig()
  const id = () => jjConfig.scheduleId

  const d = () => getDoc<ScheduleData>(db, 'ScheduleData', id())

  const location = useLocation()
  const { config } = useTwitchConfig()
  const [visited, setVisited] = createSignal<boolean>(false)

  const [cache, setCache] = createStore<UseFireStoreReturn<ScheduleData>>({
    loading: false,
    error: null,
    data: null,
  })

  const isTab1 = () =>
    config.tab1 === tab &&
    (location.pathname === '/1' ||
      location.pathname === '/' ||
      location.pathname === '' ||
      location.pathname === '*' ||
      location.pathname.endsWith('.html'))
  const isTab = () => {
    return (
      isTab1() ||
      (config.tab2 === tab && location.pathname === '/2') ||
      (config.tab3 === tab && location.pathname === '/3')
    )
  }

  createEffect(() => {
    if (isTab()) {
      setVisited(true)
    }
  })

  createEffect(() => {
    const scheduleDoc = d()
    if (visited()) {
      createRoot(() => {
        const s = useFirestore(scheduleDoc)
        createEffect(() => {
          batch(() => {
            setCache('data', s.data)
            setCache('loading', s.loading)
            setCache('error', s.error)
          })
        })
      })
    }
  })
  return cache
}

function creatorAndChannelCache() {
  const db = useCreatorDB()
  const twitchDB = useTwitchDB()
  const [creatorCache, setCreatorCache] = createStore<{
    [key: string]: CreatorData
  }>()
  const [twitchCache, setTwitchCache] = createStore<{
    [key: string]: TwitchChannelData
  }>()
  const useCreators = (ids: Accessor<string[]>) => {
    createEffect(() => {
      if (ids().some(id => !creatorCache[id])) {
        createRoot(() => {
          const resp = db.readSome(ids())
          createEffect(() => {
            batch(() => {
              if (resp.data) {
                for (const data of resp.data) {
                  setCreatorCache(data.creator.creatorId, data)
                }
              }
            })
          })
        })
      }
    })
    return () =>
      ids()
        .filter(id => creatorCache[id])
        .map(id => creatorCache[id])
  }
  const useCreator = (id: Accessor<string | undefined>) => {
    createEffect(() => {
      if (id() && !creatorCache[id()]) {
        createRoot(() => {
          const resp = db.read(id())
          createEffect(() => {
            batch(() => {
              if (resp.data) {
                setCreatorCache(resp.data.creator.creatorId, resp.data)
              }
            })
          })
        })
      }
    })
    return () => (id() ? creatorCache[id()] : undefined)
  }

  const getCreatorCache = () => {
    const c: CreatorData[] = []
    for (const key in creatorCache) {
      c.push(creatorCache[key])
    }
    return c
  }

  const useTwitchChannels = (ids: Accessor<string[]>) => {
    createEffect(() => {
      if (ids().some(id => !twitchCache[id])) {
        createRoot(() => {
          const resp = twitchDB.readSome(ids())
          createEffect(() => {
            batch(() => {
              if (resp.data) {
                for (const data of resp.data) {
                  setTwitchCache(data.channel.id, data)
                }
              }
            })
          })
        })
      }
    })
    return () =>
      ids()
        .filter(id => twitchCache[id])
        .map(id => twitchCache[id])
  }

  const useTwitchWithCreators = (ids: Accessor<string[]>) => {
    const creators = useCreators(ids)
    const twitchIds = () =>
      creators()
        .map(c => c.creator.relations.twitchChannels)
        .flat()
    return useTwitchChannels(twitchIds)
  }

  const getTwitchCache = () => {
    const c: TwitchChannelData[] = []
    for (const key in twitchCache) {
      c.push(twitchCache[key])
    }
    return c
  }

  return { useCreators, useCreator, getCreatorCache, useTwitchChannels, getTwitchCache, useTwitchWithCreators }
}

export const useDataHook = (db: Firestore) => {
  const scheduleData = useSchedule('yogs', db)
  const charityData = useCache('charities', getCharitiesDoc(db))
  const fundraiserData = useCache('community', getFundraiserDoc(db))
  const { useCreators, useCreator, getCreatorCache, useTwitchChannels, getTwitchCache, useTwitchWithCreators } =
    creatorAndChannelCache()
  return {
    scheduleData,
    charityData,
    fundraiserData,
    useCreators,
    useCreator,
    getCreatorCache,
    useTwitchChannels,
    getTwitchCache,
    useTwitchWithCreators,
  }
}
export const DataContext = createContext<ReturnType<typeof useDataHook>>()
