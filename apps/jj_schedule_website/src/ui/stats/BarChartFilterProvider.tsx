import { createContext, createSignal, ParentComponent, useContext } from 'solid-js'
import { Bars, ChartType } from './BarChartEnums'

const useBarChartFilterHook = () => {
  const [bars, setBars] = createSignal<Bars>(Bars.total)
  const [type, setType] = createSignal<ChartType>(ChartType.total)

  const [sortByAmount, setSortByAmount] = createSignal<boolean>(false)
  const [top15, setTop15] = createSignal<boolean>(false)
  const [excludeDay1, setExcludeDay1] = createSignal<boolean>(false)
  const [excludeNights, setExcludeNights] = createSignal<boolean>(false)

  return {
    bars,
    setBars,
    type,
    setType,
    sortByAmount,
    setSortByAmount,
    top15,
    setTop15,
    excludeDay1,
    setExcludeDay1,
    excludeNights,
    setExcludeNights,
  }
}

const BarChartFilterContext = createContext<ReturnType<typeof useBarChartFilterHook>>()

export const BarChartFilterProvider: ParentComponent = props => {
  const hook = useBarChartFilterHook()
  return <BarChartFilterContext.Provider value={hook}>{props.children}</BarChartFilterContext.Provider>
}
export const useBarChartFilter = () => useContext(BarChartFilterContext)
