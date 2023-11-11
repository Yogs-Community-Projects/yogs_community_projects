import { createContext, createEffect, createSignal, ParentComponent, useContext } from 'solid-js'
import { Accessor } from 'solid-js/types/reactive/signal'
import { useLocation, useSearchParams } from '@solidjs/router'
import { useCreatorIds, useSlots } from './ScheduleDataProvider'
import { useData } from '../../../dataProvider'
import { Slot } from '@ycapp/model'

interface CreatorFilterContextProps {
  filter: Accessor<string[]>
  add: (id: string) => void
  remove: (id: string) => void
  toggle: (id: string) => void
  reset: () => void
  includes: (id: string) => boolean
  isEmpty: () => boolean
  makeLink: () => string
  and: () => boolean
  toggleAnd: () => void
  isSlotPartOfFilter: (slot: Slot) => boolean
}

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
  createEffect(() => {
    if (params['filter'] && creators.data) {
      const initNames = (params['filter'] ?? '').split(',')
      console.log('initNames', initNames)
      setFilter(initNames.map(name => creatorNameMap().get(name)))
    }
  })
  createEffect(() => {
    if (params['filterType'] && creators.data) {
      const filterType = params['filterType']
      setAnd(filterType === 'and')
    }
  })

  createEffect(() => {
    if (!isEmpty()) {
      if (and()) {
        setSearchParams({ filterType: 'and' })
      } else {
        setSearchParams({ filterType: 'or' })
      }
    }
  })
  createEffect(() => {
    if (!isEmpty()) {
      const normalizedNames = filter()
        .map(id => creatorIdMap().get(id))
        .join(',')
      setSearchParams({ filter: normalizedNames })
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
