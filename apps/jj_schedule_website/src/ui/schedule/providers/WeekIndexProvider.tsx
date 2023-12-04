import { createContext, createSignal, ParentComponent, useContext } from 'solid-js'
import { Accessor } from 'solid-js/types/reactive/signal'
import { DateTime } from 'luxon'
import { useWeeks } from './ScheduleDataProvider'
import { useIsJJ } from '@ycapp/common'

type WeekIndexProps = {
  useIndex: Accessor<number>
  prev: () => void
  next: () => void
}
export const WeekIndexContext = createContext<WeekIndexProps>()

export const WeekIndexProvider: ParentComponent = props => {
  const jj = useIsJJ()
  const weeks = useWeeks()
  const now = DateTime.now()
  let day = Math.floor((now.day - 1) / 7) % weeks.length
  if (day > weeks.length && !jj()) {
    day = 0
  }
  console.log('day', day)
  const [useIndex, setIndex] = createSignal(day)

  const prev = () => {
    setIndex(Math.abs((useIndex() - 1) % 2))
  }
  const next = () => {
    setIndex(i => (i + 1) % 2)
  }

  return <WeekIndexContext.Provider value={{ useIndex, prev, next }}>{props.children}</WeekIndexContext.Provider>
}
export const useWeekIndexContext = () => useContext(WeekIndexContext)
export const useWeekIndex: Accessor<number> = () => useWeekIndexContext().useIndex()
export const useWeekIndexSetter = () => [useWeekIndexContext().prev, useWeekIndexContext().next]
