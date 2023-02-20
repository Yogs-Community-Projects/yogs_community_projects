import { createContext, ParentComponent, useContext } from 'solid-js'
import { useAvailableScheduleDimensionsContext } from './AvailableScheduleDimensions'
import { Accessor } from 'solid-js/types/reactive/signal'
import { ScheduleDimensions } from '../../../model/Dimension'
import { useMaxDayCount, useMaxSlotCount } from './ScheduleDataProvider'

interface ScheduleMobileDimensionsProps {
  scheduleDimensions: Accessor<ScheduleDimensions>
}

const ScheduleMobileDimensionsContext = createContext<ScheduleMobileDimensionsProps>()
export const ScheduleMobileDimensionsProvider: ParentComponent = props => {
  const { availableScheduleDimensions } = useAvailableScheduleDimensionsContext()
  const useAvailableWidth: Accessor<number> = () => availableScheduleDimensions().width
  const useAvailableHeight: Accessor<number> = (): number => availableScheduleDimensions().height
  const useDataSize: Accessor<number> = (): number => {
    return Math.max(48, useAvailableHeight() / 20)
  }
  const useSlotSize: Accessor<number> = (): number => {
    return (useAvailableWidth() - useDataSize()) / useMaxDayCount()
  }
  const useSlotWidth: Accessor<number> = (): number => {
    return useAvailableWidth()
  }
  const useSlotHeight: Accessor<number> = (): number => {
    return Math.max(96, (useAvailableHeight() - 2 * useDataSize()) / 10)
  }
  const useBodyHeight: Accessor<number> = (): number => useSlotSize() * useMaxSlotCount()

  const useBodyWidth: Accessor<number> = (): number => {
    return useSlotSize() * useMaxDayCount()
  }
  const useScheduleHeight: Accessor<number> = (): number => useBodyHeight() + 2 * useDataSize()
  const useScheduleWidth: Accessor<number> = (): number => useBodyWidth() + useDataSize()
  const size = (): ScheduleDimensions => {
    return {
      bodyHeight: useBodyHeight(),
      bodyWidth: useBodyWidth(),
      dataSize: useDataSize(),
      height: useScheduleHeight(),
      maxDays: useMaxDayCount(),
      maxSlots: useMaxSlotCount(),
      slotSize: useSlotSize(),
      slotWidth: useSlotWidth(),
      slotHeight: useSlotHeight(),
      width: useScheduleWidth(),
    }
  }

  return (
    <ScheduleMobileDimensionsContext.Provider value={{ scheduleDimensions: size }}>
      {props.children}
    </ScheduleMobileDimensionsContext.Provider>
  )
}
export const useScheduleMobileDimensionsContext = () => useContext(ScheduleMobileDimensionsContext)!
export const useScheduleMobileDimensions: Accessor<ScheduleDimensions> = (): ScheduleDimensions => {
  const { scheduleDimensions } = useScheduleMobileDimensionsContext()
  return scheduleDimensions()
}
