import { createContext, ParentComponent, useContext } from 'solid-js'

interface DebugContextProps {
  debug: boolean
}

interface DebugProps {
  debug?: boolean
}

const DebugContext = createContext<DebugContextProps>()

export const DebugProvider: ParentComponent<DebugProps> = props => {
  return (
    // @ts-ignore
    <DebugContext.Provider value={{ debug: props.debug ?? true }}>{props.children}</DebugContext.Provider>
  )
}
export const useDebug = () => useContext(DebugContext)!
