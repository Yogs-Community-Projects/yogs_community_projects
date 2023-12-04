import { createContext, createSignal, ParentComponent, useContext } from 'solid-js'
import { Accessor } from 'solid-js/types/reactive/signal'
import { useDays, useDaysCount } from './ScheduleDataProvider'
import { useIsJJ, useNow } from '@ycapp/common'
import { DayUtils } from '@ycapp/model'

type DayIndexProps = {
  useIndex: Accessor<number>
  prev: () => void
  next: () => void
  numberOfDays: number
}
export const DayIndexContext = createContext<DayIndexProps>()
const getTodayIndex = () => {
  const days = useDays()
  const jj = useIsJJ()
  const now = useNow()
  let index = 0
  if (jj()) {
    for (let i = 0; i < days.length; i++) {
      const day = days[i]
      if (DayUtils.isToday(day)) {
        index = i
        break
      } else if (i > 0) {
        const prevDay = days[i - 1]
        if (now() >= DayUtils.end(prevDay) && now() <= DayUtils.start(day)) {
          index = i
          break
        }
      }
    }
  }
  return index
}
export const DayIndexProvider: ParentComponent = props => {
  const today = getTodayIndex()
  const [useIndex, setIndex] = createSignal(today)
  const numberOfDays = useDaysCount()
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

  return (
    <DayIndexContext.Provider value={{ useIndex, prev, next, numberOfDays }}>{props.children}</DayIndexContext.Provider>
  )
}
export const useDayIndexContext = () => useContext(DayIndexContext)!
export const useDayIndex: Accessor<number> = () => useDayIndexContext().useIndex()
export const useDayIndexSetter = () => [useDayIndexContext().prev, useDayIndexContext().next]
