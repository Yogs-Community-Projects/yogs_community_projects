import { createContext, ParentComponent, useContext } from 'solid-js'
import { Dimension } from '@ycapp/model'

export interface YogsScheduleDimension {
  availableHeight: number
  availableWidth: number
  scheduleHeight: number
  scheduleWidth: number
  dataSize: number
}

interface ScheduleDimensionContextProps {
  dimension: () => YogsScheduleDimension
}

interface ScheduleDimensionProps {
  dimension: Dimension
}

const ScheduleDimensionContext = createContext<ScheduleDimensionContextProps>()

export const ScheduleDimensionProvider: ParentComponent<ScheduleDimensionProps> = props => {
  const available = () => props.dimension
  const availableWidth = () => available().width
  const availableHeight = () => available().height
  const dataSize = () => 50

  const scheduleHeight = () => availableHeight() - 2 * dataSize()
  const scheduleWidth = () => availableWidth()

  const dimension = (): YogsScheduleDimension => {
    return {
      availableHeight: availableHeight(),
      availableWidth: availableWidth(),
      scheduleHeight: scheduleHeight(),
      scheduleWidth: scheduleWidth(),
      dataSize: dataSize(),
    }
  }

  return (
    <ScheduleDimensionContext.Provider value={{ dimension: dimension }}>
      {props.children}
    </ScheduleDimensionContext.Provider>
  )
}
export const useScheduleDimensionContext = () => useContext(ScheduleDimensionContext)!
export const useYogsScheduleDimension = () => useScheduleDimensionContext().dimension()
