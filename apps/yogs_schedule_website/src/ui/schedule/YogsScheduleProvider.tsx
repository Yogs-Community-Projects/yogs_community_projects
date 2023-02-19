import { createContext, ParentComponent, useContext } from 'solid-js'
import { ScheduleData } from '@ycapp/model'

interface ScheduleProps {
  schedule: ScheduleData
}

export const ScheduleContext = createContext<ScheduleProps>()

export const ScheduleDataProvider: ParentComponent<{ scheduleData: ScheduleData }> = props => {
  return <ScheduleContext.Provider value={{ schedule: props.scheduleData }}>{props.children}</ScheduleContext.Provider>
}
export const useScheduleDataContext = () => useContext(ScheduleContext)
export const useScheduleData = () => useScheduleDataContext().schedule
export const useSchedule = () => useScheduleData().schedule
export const useWeeks = () => useSchedule().weeks
export const useWeeksCount = (): number => useSchedule().weeks.length
export const useDays = () =>
  useWeeks()
    .map(week => week.days)
    .reduce((a, b) => a.concat(b))
export const useDaysCount = () => useDays().length
export const useSlots = () =>
  useDays()
    .map(day => day.slots)
    .reduce((a, b) => a.concat(b))
export const useMaxDayCount = (): number =>
  useWeeks()
    .map(week => week.days.length)
    .reduce((a, b) => Math.max(a, b))
export const useMaxSlotCount = () =>
  useDays()
    .map(day => day.slots.length)
    .reduce((a, b) => Math.max(a, b))

export const useCreatorIds = () => {
  return [
    ...new Set(
      useSlots()
        .map(slot => slot.relations.creators)
        .reduce((a, b) => a.concat(b))
    )
  ]
}
