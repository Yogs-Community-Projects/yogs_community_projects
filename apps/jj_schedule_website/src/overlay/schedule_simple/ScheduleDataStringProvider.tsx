import { Accessor, createContext, createSignal, ParentComponent, Setter, useContext } from 'solid-js'

interface ScheduleDataStringContextProps {
  schedule: Accessor<string>
  setSchedule: Setter<string>
  timezone: Accessor<string>
  setTimezone: Setter<string>
}

const ScheduleDataStringContext = createContext<ScheduleDataStringContextProps>()

export const ScheduleDataStringProvider: ParentComponent = props => {
  const [schedule, setSchedule] = createSignal(
    'Office Cam;Decorating the Office;2023-12-01-11-00;180;ff00bbe0;ff009fd4\n' +
      'JJ Warmup;Tom & Ben;2023-12-01-14-00;180;ff009fd4;ff0081c7\n' +
      'Jingle Cats;Lewis & Simon;2023-12-01-17-00;180;ff0081c7;ff0069ba\n' +
      'Christmas Trains;;2023-12-01-20-00;180;ff0069ba;ff0054ad',
  )
  const [timezone, setTimezone] = createSignal('Europe/London')

  return (
    <ScheduleDataStringContext.Provider value={{ schedule, setSchedule, timezone, setTimezone }}>
      {props.children}
    </ScheduleDataStringContext.Provider>
  )
}
export const useScheduleDataString = () => useContext(ScheduleDataStringContext)!
