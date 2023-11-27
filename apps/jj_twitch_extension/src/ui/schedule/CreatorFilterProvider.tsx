import { createContext, createSignal, ParentComponent, useContext } from 'solid-js'

const useHook = () => {
  const [filter, setFilter] = createSignal<string[]>([])
  const [sortByName, setSortByName] = createSignal(false)

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
  const toggleSortByName = () => setSortByName(v => !v)

  return {
    filter,
    add,
    remove,
    toggle,
    reset,
    includes,
    isEmpty,
    sortByName,
    setSortByName,
    toggleSortByName,
  }
}

const CreatorFilterContext = createContext<ReturnType<typeof useHook>>()
export const CreatorFilterProvider: ParentComponent = props => {
  const hook = useHook()
  return <CreatorFilterContext.Provider value={hook}>{props.children}</CreatorFilterContext.Provider>
}
export const useCreatorFilter = () => useContext(CreatorFilterContext)
