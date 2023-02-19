import {createContext, createSignal, ParentComponent, useContext} from "solid-js";
import {Accessor} from "solid-js/types/reactive/signal";

type WeekIndexProps = {
  useIndex: Accessor<number>,
  prev: () => void,
  next: () => void,
}
export const WeekIndexContext = createContext<WeekIndexProps>();

export const WeekIndexProvider: ParentComponent = (props) => {
  const [useIndex, setIndex] = createSignal(0);
  const prev = () => {
    setIndex(Math.abs((useIndex() - 1) % 2))
  }
  const next = () => {
    setIndex(i => (i + 1) % 2);
  }

  return (
    <WeekIndexContext.Provider value={{useIndex, prev, next}}>
      {props.children}
    </WeekIndexContext.Provider>
  )
}
export const useWeekIndexContext = () => useContext(WeekIndexContext)!;
export const useWeekIndex: Accessor<number> = () => useWeekIndexContext().useIndex();
export const useWeekIndexSetter = () => [
  useWeekIndexContext().prev,
  useWeekIndexContext().next
];
