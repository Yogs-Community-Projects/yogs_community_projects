import { createContext, createSignal, ParentComponent, useContext } from 'solid-js'
import { Accessor } from 'solid-js'
import { useDays, useDaysCount, useSlots } from './JJScheduleProvider'
import { DayUtils, SlotUtils } from '@ycapp/model'
import { DateTime } from 'luxon'
import { useNow } from '@ycapp/common'

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

export const jjStart = () => {
  const slots = useSlots()
  const startSlot = slots[0]
  return SlotUtils.start(startSlot)
}
export const jjEnd = () => {
  const slots = useSlots()
  const endSlot = slots[slots.length - 1]
  return SlotUtils.end(endSlot)
}

export const isJJ = () => {
  return isAfterJJStart() && isBeforeJJEnd()
}
export const isBeforeJJStart = () => {
  const now = useNow()
  return now() < jjStart()
}
export const isAfterJJStart = () => {
  return !isBeforeJJStart()
}
export const isAfterJJEnd = () => {
  const now = useNow()
  return now() > jjEnd()
}
export const isBeforeJJEnd = () => {
  return !isAfterJJEnd()
}

export const useTodayIndex = () => {
  const days = useDays()
  const now = useNow()
  let index = 0
  if (isJJ()) {
    for (let i = 0; i < days.length; i++) {
      const day = days[i]
      if (DayUtils.isToday(day)) {
        index = i
        break
      } else if (i > 1) {
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
  const todayIndex = useTodayIndex()
  const numberOfDays = useDaysCount()
  const [useIndex, setIndex] = createSignal(todayIndex)

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
    setIndex(todayIndex)
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
  useDayIndexContext().today,
]
