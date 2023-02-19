import {createContext, ParentComponent, useContext} from "solid-js";
import {Dimension} from "../../../model/Dimension";
import {Accessor} from "solid-js/types/reactive/signal";


interface AvailableScheduleDimensionsProps {
  availableScheduleDimensions: Accessor<Dimension>
}

const AvailableScheduleDimensionsContext = createContext<AvailableScheduleDimensionsProps>();

export const AvailableScheduleDimensionsProvider: ParentComponent<{ size: Accessor<Dimension> }> = (props) => {
  return (
    <AvailableScheduleDimensionsContext.Provider value={{availableScheduleDimensions: props.size}}>
      {props.children}
    </AvailableScheduleDimensionsContext.Provider>
  );
}
export const useAvailableScheduleDimensionsContext = () => useContext(AvailableScheduleDimensionsContext)!;
export const useAvailableScheduleDimensions = () => useAvailableScheduleDimensionsContext().availableScheduleDimensions;
