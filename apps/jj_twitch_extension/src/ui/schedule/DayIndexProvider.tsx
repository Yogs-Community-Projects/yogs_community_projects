import { createContext, createSignal, ParentComponent, useContext } from 'solid-js'
import { Accessor } from 'solid-js/types/reactive/signal'
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
  return useNow() < jjStart()
}
export const isAfterJJStart = () => {
  return !isBeforeJJStart()
}
export const isAfterJJEnd = () => {
  return useNow() > jjEnd()
}
export const isBeforeJJEnd = () => {
  return !isAfterJJEnd()
}

export const useTodayIndex = () => {
  const days = useDays()
  let index = 0
  if (isJJ()) {
    for (let i = 0; i < days.length; i++) {
      const day = index[i]
      if (DayUtils.isToday(day)) {
        index = i
        break
      }
    }
  }
  return index
}

export const DayIndexProvider: ParentComponent = props => {
  const [useIndex, setIndex] = createSignal(useTodayIndex())
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
    setIndex(useTodayIndex())
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
