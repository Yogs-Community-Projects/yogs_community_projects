import { batch, createContext, createEffect, createRoot, createSignal } from 'solid-js'
import { useLocation } from '@solidjs/router'
import { useTwitchConfig } from '../../config/useTwitchConfig'
import { TabType } from '../../config/TwitchConfig'
import { useFirestore } from 'solid-firebase'
import { collection, CollectionReference, doc, FirestoreError } from 'firebase/firestore'
import { useFirestoreDB, useJJConfig } from '@ycapp/common'
import { JJCommunityFundraiser, JJData, ScheduleData } from '@ycapp/model'
import { createStore } from 'solid-js/store'

interface UseFireStoreReturn<T> {
  data: T
  loading: boolean
  error: FirestoreError | null
}

function getDoc<T>(collectionName: string, id: string) {
  const db = useFirestoreDB()
  const coll = collection(db, collectionName) as CollectionReference<T>
  return doc<T>(coll, id)
}

const getScheduleDoc = () => {
  const id = useJJConfig().scheduleId
  return getDoc<ScheduleData>('ScheduleData', id)
}
const getCharitiesDoc = () => {
  return getDoc<JJData>('JJDonationTracker', 'JJDonationTracker2023')
}
const getFundraiserDoc = () => {
  return getDoc<JJCommunityFundraiser>('JJDonationTracker', 'Fundraiser2023')
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
  /*
  createEffect(() => {
    console.log('useCache', tab, 'data', cache.data)
  })
  createEffect(() => {
    console.log('useCache', tab, 'loading', cache.loading)
  })
  createEffect(() => {
    console.log('useCache', tab, 'error', cache.error)
  })
  */
  return cache
}
export const useDataHook = () => {
  const scheduleData = useCache('yogs', getScheduleDoc())
  const charityData = useCache('charities', getCharitiesDoc())
  const fundraiserData = useCache('community', getFundraiserDoc())
  return { scheduleData, charityData, fundraiserData }
}
export const DataContext = createContext<ReturnType<typeof useDataHook>>()
