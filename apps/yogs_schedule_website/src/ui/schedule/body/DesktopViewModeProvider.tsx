import { createContext, createSignal, ParentComponent, useContext } from 'solid-js'
import { Accessor } from 'solid-js/types/reactive/signal'

export enum DesktopViewMode {
  stack,
  wrap
}

interface DesktopViewModeProps {
  useMode: Accessor<DesktopViewMode>
  switchMode: () => void
}

const DesktopViewModeContext = createContext<DesktopViewModeProps>()

export const DesktopViewModeProvider: ParentComponent = props => {
  const [useMode, setMode] = createSignal(DesktopViewMode.wrap)
  const switchMode = () => {
    if (useMode() == DesktopViewMode.wrap) {
      setMode(DesktopViewMode.stack)
    } else {
      setMode(DesktopViewMode.wrap)
    }
  }
  return (
    <DesktopViewModeContext.Provider
      value={{
        useMode,
        switchMode
      }}
    >
      {props.children}
    </DesktopViewModeContext.Provider>
  )
}
export const useDesktopViewMode = () => useContext(DesktopViewModeContext)!
