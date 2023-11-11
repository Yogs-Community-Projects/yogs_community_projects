import { createContext, createEffect, createSignal, ParentComponent, useContext } from 'solid-js'
import { useLocation, useSearchParams } from '@solidjs/router'
import { useCreatorIds, useSlots } from './ScheduleDataProvider'
import { useData } from '../../../dataProvider'
import { Slot } from '@ycapp/model'

const useHook = () => {
  const [params, setSearchParams] = useSearchParams()
  const location = useLocation()
  const { useCreators } = useData()
  const creatorIds = useCreatorIds()
  const creators = useCreators(() => creatorIds)
  const creatorNameMap = () => {
    const map = new Map<string, string>()
    if (!creators.data) {
      return map
    }
    for (const c of creators.data) {
      map.set(c.creator.name.toLowerCase().replace(' ', '_'), c.creator.creatorId)
    }
    return map
  }
  const creatorIdMap = () => {
    const map = new Map<string, string>()
    if (!creators.data) {
      return map
    }
    for (const c of creators.data) {
      map.set(c.creator.creatorId, c.creator.name.toLowerCase().replace(' ', '_'))
    }
    return map
  }

  const [filter, setFilter] = createSignal<string[]>([])
  const [and, setAnd] = createSignal<boolean>(false)
  const [sortByName, setSortByName] = createSignal(true)
  const [loaded, setLoaded] = createSignal<boolean>(false)
  const [runInitNames, setRunInitNames] = createSignal<boolean>(true)
  const [runFilterType, setRunFilterType] = createSignal<boolean>(true)

  createEffect(() => {
    if (creators.data) {
      setLoaded(true)
    }
  })

  createEffect(() => {
    if (runInitNames() && creators.data) {
      if (params['filter'] && creators.data) {
        const initNames = (params['filter'] ?? '').split(',')
        setFilter(initNames.map(name => creatorNameMap().get(name)).filter(e => e))
      }
      setRunInitNames(false)
    }
  })
  createEffect(() => {
    if (runFilterType() && creators.data) {
      if (params['filterType'] && creators.data) {
        const filterType = params['filterType']
        setAnd(filterType === 'and')
      }
      setRunFilterType(false)
    }
  })

  createEffect(() => {
    if (loaded()) {
      if (filter().length > 1) {
        if (and()) {
          setSearchParams({ filterType: 'and' })
        } else {
          setSearchParams({ filterType: 'or' })
        }
      } else {
        setSearchParams({ filterType: undefined })
      }
    }
  })

  createEffect(() => {
    if (loaded()) {
      if (!isEmpty()) {
        const normalizedNames = filter()
          .map(id => creatorIdMap().get(id))
          .join(',')
        setSearchParams({ filter: normalizedNames })
        if (filter().length > 1) {
          if (and()) {
            setSearchParams({ filterType: 'and' })
          } else {
            setSearchParams({ filterType: 'or' })
          }
        }
      } else {
        setSearchParams({ filter: undefined, filterType: undefined })
      }
    }
  })
  const add = (id: string) => {
    setFilter([...filter(), id])
  }
  const remove = (id: string) => {
    setFilter(filter().filter(i => i != id))
  }

  const reset = () => {
    setFilter([])
  }

  const includes = (id: string) => filter().includes(id)

  const toggle = (id: string) => {
    if (includes(id)) {
      remove(id)
    } else {
      add(id)
    }
  }
  const isEmpty = () => filter().length == 0

  const makeLink = () => {
    const normalizedNames = filter()
      .map(id => creatorIdMap().get(id))
      .join(',')
    const filterType = `${and() ? 'and' : 'or'}`
    return `https://jj.yogs.app${location.pathname}?filterType=${filterType}&filter=${normalizedNames}`
  }

  const toggleAnd = () => setAnd(v => !v)

  const isSlotPartOfFilter = (slot: Slot) => {
    if (isEmpty()) {
      return true
    }
    if (and()) {
      return filter().every(id => slot.relations.creators.includes(id))
    } else {
      return filter().some(id => slot.relations.creators.includes(id))
    }
  }
  const slots = useSlots()
  const appearanceCount = (id: string) => {
    return slots.filter(s => s.relations.creators.includes(id)).length
  }

  const creatorList = () => {
    if (!creators.data) {
      return []
    }

    if (sortByName()) {
      return [...creators.data].sort((a, b) => {
        return a.creator.name.toLowerCase().localeCompare(b.creator.name.toLowerCase())
      })
    } else {
      return [...creators.data].sort((a, b) => {
        const aAppearance = appearanceCount(a.creator.creatorId)
        const bAppearance = appearanceCount(b.creator.creatorId)
        if (a == b) {
          return a.creator.name.toLowerCase().localeCompare(b.creator.name.toLowerCase())
        }
        return bAppearance - aAppearance
      })
    }
  }

  const toggleSortByName = () => setSortByName(v => !v)

  return {
    creators,
    filter,
    add,
    remove,
    toggle,
    reset,
    includes,
    isEmpty,
    makeLink,
    and,
    toggleAnd,
    isSlotPartOfFilter,
    appearanceCount,
    creatorList,
    sortByName,
    toggleSortByName,
  }
}

const CreatorFilterContext = createContext<ReturnType<typeof useHook>>()

export const CreatorFilterProvider: ParentComponent = props => {
  const hook = useHook()
  return <CreatorFilterContext.Provider value={hook}>{props.children}</CreatorFilterContext.Provider>
}
export const useCreatorFilter = () => useContext(CreatorFilterContext)
