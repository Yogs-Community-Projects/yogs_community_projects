import { Accessor, createContext, createSignal, ParentComponent, useContext } from 'solid-js'

interface CurrencyContextProps {
  pounds: Accessor<boolean>
  toggle: () => void
}

const CurrencyContext = createContext<CurrencyContextProps>()

export const CurrencyProvider: ParentComponent = props => {
  const [pounds, set] = createSignal(true)

  const toggle = () => {
    set(!pounds())
  }

  return <CurrencyContext.Provider value={{ pounds, toggle }}>{props.children}</CurrencyContext.Provider>
}
export const useCurrency = () => useContext(CurrencyContext)!
