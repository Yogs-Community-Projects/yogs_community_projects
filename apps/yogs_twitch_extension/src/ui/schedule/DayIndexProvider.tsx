import { createContext, createSignal, ParentComponent, useContext } from 'solid-js'
import { Accessor } from 'solid-js/types/reactive/signal'
import { useDaysCount } from './YogsScheduleProvider'
import { DateTime } from 'luxon'

type DayIndexProps = {
  useIndex: Accessor<number>
  prev: () => void
  next: () => void
  today: () => void
  numberOfDays: number

  isTodaySelected: () => boolean
}
export const DayIndexContext = createContext<DayIndexProps>()

const useWeekDay = () => DateTime.now().weekday

export const DayIndexProvider: ParentComponent = props => {
  const [useIndex, setIndex] = createSignal(useWeekDay() - 1)
  const numberOfDays = useDaysCount()

  const isTodaySelected = () => {
    return useIndex() == useWeekDay() - 1
  }
  const prev = () => {
    const current = useIndex()
    let next = Math.abs((current - 1) % numberOfDays)
    if (current == 0) {
      next = numberOfDays - 1
    }
    setIndex(next)
  }
  const next = () => {
    const current = useIndex()
    const next = (current + 1) % numberOfDays
    setIndex(next)
  }
  const today = () => {
    setIndex(DateTime.now().weekday - 1)
  }

  return (
    <DayIndexContext.Provider value={{ useIndex, prev, next, numberOfDays, isTodaySelected, today }}>
      {props.children}
    </DayIndexContext.Provider>
  )
}
export const useDayIndexContext = () => useContext(DayIndexContext)!
export const useDayIndex: Accessor<number> = () => useDayIndexContext().useIndex()
export const useIsCurrentDaySelected: Accessor<boolean> = () => useDayIndexContext().isTodaySelected()
export const useDayIndexSetter = () => [
  useDayIndexContext().prev,
  useDayIndexContext().next,
  useDayIndexContext().today
]
