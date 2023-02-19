import {createContext, createSignal, ParentComponent, useContext} from "solid-js";
import {Accessor} from "solid-js/types/reactive/signal";
import {useDaysCount} from "./ScheduleDataProvider";

type DayIndexProps = {
  useIndex: Accessor<number>,
  prev: () => void,
  next: () => void,
  numberOfDays: number;
}
export const DayIndexContext = createContext<DayIndexProps>();

export const DayIndexProvider: ParentComponent = (props) => {
  const [useIndex, setIndex] = createSignal(0);
  const numberOfDays = useDaysCount()
  const prev = () => {
    const current = useIndex();
    let next = Math.abs((current - 1) % numberOfDays)
    if (current == 0) {
      next = numberOfDays - 1;
    }
    setIndex(next)
  }
  const next = () => {
    const current = useIndex();
    const next = (current + 1) % numberOfDays;
    setIndex(next);
  }

  return (
    <DayIndexContext.Provider value={{useIndex, prev, next, numberOfDays}}>
      {props.children}
    </DayIndexContext.Provider>
  )
}
export const useDayIndexContext = () => useContext(DayIndexContext)!;
export const useDayIndex: Accessor<number> = () => useDayIndexContext().useIndex();
export const useDayIndexSetter = () => [
  useDayIndexContext().prev,
  useDayIndexContext().next
];
