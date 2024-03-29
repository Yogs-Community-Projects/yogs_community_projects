import { createContext, ParentComponent, useContext } from 'solid-js'
import { Day, Schedule, ScheduleData, Slot, Time, Week } from '@ycapp/model'
import { Accessor } from 'solid-js/types/reactive/signal'
import { useWeekIndex } from './WeekIndexProvider'
import { useDayIndex } from './DayIndexProvider'

interface ScheduleProps {
  data: ScheduleData
}

const ScheduleContext = createContext<ScheduleProps>()

export const ScheduleDataProvider: ParentComponent<{ scheduleData: ScheduleData }> = props => {
  return <ScheduleContext.Provider value={{ data: props.scheduleData }}>{props.children}</ScheduleContext.Provider>
}
const useScheduleDataContext = () => useContext(ScheduleContext)!
export const useScheduleData: Accessor<ScheduleData> = () => useContext(ScheduleContext)!.data
export const useSchedule: Accessor<Schedule> = (): Schedule => useScheduleData().schedule
export const useWeeks: Accessor<Week[]> = (): Week[] => useSchedule().weeks
export const useWeeksCount: Accessor<number> = (): number => useSchedule().weeks.length
export const useCurrentWeek: Accessor<Week> = (): Week => useWeeks()[useWeekIndex()]
export const useCurrentDays: Accessor<Day[]> = (): Day[] => useCurrentWeek().days
export const useDays: Accessor<Day[]> = (): Day[] =>
  useWeeks()
    .map(week => week.days)
    .reduce((a, b) => a.concat(b))
export const useCurrentDay: Accessor<Day> = (): Day => useDays()[useDayIndex()]
export const useDaysCount: Accessor<number> = (): number => useDays().length
export const useSlots: Accessor<Slot[]> = (): Slot[] =>
  useDays()
    .map(day => day.slots)
    .reduce((a, b) => a.concat(b))
export const useMaxDayCount: Accessor<number> = (): number =>
  useWeeks()
    .map(week => week.days.length)
    .reduce((a, b) => Math.max(a, b))
export const useMaxSlotCount: Accessor<number> = (): number =>
  useDays()
    .map(day => day.slots.length)
    .reduce((a, b) => Math.max(a, b))
export const useTimes: Accessor<Time[]> = () => useCurrentWeek().times

export const useCreatorIds: Accessor<string[]> = () => {
  return [
    ...new Set(
      useSlots()
        .map(slot => slot.relations.creators)
        .reduce((a, b) => a.concat(b)),
    ),
  ]
}
