import { Accessor, createContext, createSignal, ParentComponent, useContext } from 'solid-js'

interface CurrencyContextProps {
  pounds: Accessor<boolean>
  avgConversionRate: number
  toggle: () => void
}

const CurrencyContext = createContext<CurrencyContextProps>()

export const CurrencyProvider: ParentComponent<{ avgConversionRate?: number }> = props => {
  const [pounds, set] = createSignal(true)

  const toggle = () => {
    set(!pounds())
  }

  return (
    <CurrencyContext.Provider
      value={{
        pounds,
        toggle,
        avgConversionRate: props?.avgConversionRate ?? 1,
      }}
    >
      {props.children}
    </CurrencyContext.Provider>
  )
}
export const useCurrency = () => useContext(CurrencyContext)
