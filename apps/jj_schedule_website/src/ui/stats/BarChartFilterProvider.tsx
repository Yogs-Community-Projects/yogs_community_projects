import { createContext, createSignal, ParentComponent, useContext } from 'solid-js'
import { ChartDataType, ChartTimeType, ChartValueType, OnStreamType } from './BarChartEnums'

const useBarChartFilterHook = () => {
  const [bars, setBars] = createSignal<ChartDataType>(ChartDataType.total)
  const [type, setType] = createSignal<ChartValueType>(ChartValueType.total)
  const [dataType, setDataType] = createSignal<ChartTimeType>(ChartTimeType.yogsStreams)

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
    dataType,
    setDataType,
  }
}

const BarChartFilterContext = createContext<ReturnType<typeof useBarChartFilterHook>>()

export const BarChartFilterProvider: ParentComponent = props => {
  const hook = useBarChartFilterHook()
  return <BarChartFilterContext.Provider value={hook}>{props.children}</BarChartFilterContext.Provider>
}
export const useBarChartFilter = () => useContext(BarChartFilterContext)

const useChartOnStreamFilterHook = () => {
  const [bars, setBars] = createSignal<OnStreamType>(OnStreamType.appearances)
  const [sortByAmount, setSortByAmount] = createSignal<boolean>(true)
  const [top15, setTop15] = createSignal<boolean>(true)

  return { bars, setBars, sortByAmount, setSortByAmount, top15, setTop15 }
}

const ChartOnStreamFilterContext = createContext<ReturnType<typeof useChartOnStreamFilterHook>>()

export const ChartOnStreamFilterProvider: ParentComponent = props => {
  const hook = useChartOnStreamFilterHook()
  return <ChartOnStreamFilterContext.Provider value={hook}>{props.children}</ChartOnStreamFilterContext.Provider>
}
export const useChartOnStreamFilter = () => useContext(ChartOnStreamFilterContext)
