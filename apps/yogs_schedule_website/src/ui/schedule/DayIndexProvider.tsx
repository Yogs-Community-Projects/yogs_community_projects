import { Accessor, createContext, createSignal, ParentComponent, useContext } from 'solid-js'
import { DateTime } from 'luxon'
import { ScheduleData } from '@ycapp/model'

type DayIndexProps = {
  useIndex: Accessor<number>
  prev: () => void
  next: () => void
  today: () => void

  isTodaySelected: () => boolean
}
export const DayIndexContext = createContext<DayIndexProps>()

const useWeekDay = () => DateTime.now().weekday

export const DayIndexProvider: ParentComponent<{ scheduleData: ScheduleData }> = props => {
  const [useIndex, setIndex] = createSignal(useWeekDay() - 1)
  const dayCount = props.scheduleData.schedule.weeks.map(w => w.days).reduce((a, b) => a.concat(b)).length

  const isTodaySelected = () => {
    return useIndex() == useWeekDay() - 1
  }
  const prev = () => {
    const current = useIndex()
    let next = Math.abs((current - 1) % dayCount)
    if (current == 0) {
      next = dayCount - 1
    }
    setIndex(next)
  }
  const next = () => {
    const current = useIndex()
    const next = (current + 1) % dayCount
    setIndex(next)
  }
  const today = () => {
    setIndex(DateTime.now().weekday - 1)
  }

  return (
    <DayIndexContext.Provider value={{ useIndex, prev, next, isTodaySelected, today }}>
      {props.children}
    </DayIndexContext.Provider>
  )
}
export const useDayIndexContext = () => useContext(DayIndexContext)
export const useDayIndex: Accessor<number> = () => useDayIndexContext().useIndex()
export const useIsCurrentDaySelected: Accessor<boolean> = () => useDayIndexContext().isTodaySelected()
export const useDayIndexSetter = () => [
  useDayIndexContext().prev,
  useDayIndexContext().next,
  useDayIndexContext().today
]
