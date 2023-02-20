import { createContext, ParentComponent, useContext } from 'solid-js'
import { useAvailableScheduleDimensionsContext } from './AvailableScheduleDimensions'
import { Accessor } from 'solid-js/types/reactive/signal'
import { ScheduleDimensions } from '../../../model/Dimension'
import { useMaxDayCount, useMaxSlotCount } from './ScheduleDataProvider'

interface ScheduleDimensionsProps {
  scheduleDimensions: Accessor<ScheduleDimensions>
}

const ScheduleDimensionsContext = createContext<ScheduleDimensionsProps>()

export const ScheduleDimensionsProvider: ParentComponent = props => {
  const { availableScheduleDimensions } = useAvailableScheduleDimensionsContext()
  const useAvailableWidth: Accessor<number> = () => availableScheduleDimensions().width
  const useAvailableHeight: Accessor<number> = () => availableScheduleDimensions().height

  const useDataSize: Accessor<number> = (): number => Math.max(50, useAvailableWidth() / (useMaxDayCount() * 3 + 1))

  const useSlotSize: Accessor<number> = (): number => (useAvailableWidth() - useDataSize()) / useMaxDayCount()

  const useSlotWidth: Accessor<number> = (): number => useSlotSize()

  const useSlotHeight: Accessor<number> = (): number => useSlotSize()

  const useBodyHeight: Accessor<number> = (): number => useSlotSize() * useMaxSlotCount() + useDataSize()

  const useBodyWidth: Accessor<number> = (): number => useSlotSize() * useMaxDayCount()

  const useScheduleHeight: Accessor<number> = (): number => useBodyHeight() + useDataSize()

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
      width: useScheduleWidth()
    }
  }

  return (
    <ScheduleDimensionsContext.Provider value={{ scheduleDimensions: size }}>
      {props.children}
    </ScheduleDimensionsContext.Provider>
  )
}
export const useScheduleDimensionsContext = () => useContext(ScheduleDimensionsContext)!
export const useScheduleDimensions: Accessor<ScheduleDimensions> = (): ScheduleDimensions => {
  const { scheduleDimensions } = useScheduleDimensionsContext()
  return scheduleDimensions()
}
