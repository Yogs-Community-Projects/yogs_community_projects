import {createContext, createSignal, ParentComponent, useContext} from "solid-js";
import {Accessor} from "solid-js/types/reactive/signal";

interface CreatorFilterContextProps {
  filter: Accessor<string[]>
  add: (id: string) => void;
  remove: (id: string) => void
  toggle: (id: string) => void
  reset: () => void
  includes: (id: string) => boolean
  isEmpty: () => boolean
}

interface CreatorFilterProps {
}

const CreatorFilterContext = createContext<CreatorFilterContextProps>();

export const CreatorFilterProvider: ParentComponent<CreatorFilterProps> = (props) => {
  const [filter, setFilter] = createSignal<string[]>([]);

  const add = (id: string) => {
    setFilter([...filter(), id]);
  }
  const remove = (id: string) => {
    setFilter(filter().filter((i) => i != id));
  }

  const reset = () => {
    setFilter([]);
  }

  const includes = (id: string) => filter().includes(id);

  const toggle = (id: string) => {
    if (includes(id)) {
      remove(id)
    } else {
      add(id)
    }
  }
  const isEmpty = () => filter().length == 0;

  return (
    <CreatorFilterContext.Provider value={{
      filter,
      add,
      remove,
      toggle,
      reset,
      includes,
      isEmpty,
    }}>
      {props.children}
    </CreatorFilterContext.Provider>
  );
}
export const useCreatorFilter = () => useContext(CreatorFilterContext)!;
