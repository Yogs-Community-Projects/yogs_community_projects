import {ParentComponent} from "solid-js";
import {Accessor} from "solid-js/types/reactive/signal";
import {Dimension} from "../../../model/Dimension";
import {ScheduleData} from "@ycapp/model";
import {AvailableScheduleDimensionsProvider} from "./AvailableScheduleDimensions";
import {ScheduleDataProvider} from "./ScheduleDataProvider";
import {WeekIndexProvider} from "./WeekIndexProvider";
import {ScheduleDimensionsProvider} from "./ScheduleDimensionsProvider";
import {ScheduleDimensionsCSS, ScheduleMobileDimensionsCSS} from "./ScheduleDimensionsCSS";
import {DayIndexProvider} from "./DayIndexProvider";
import {ScheduleMobileDimensionsProvider} from "./ScheduleMobileDimensionsProvider";
import {CreatorFilterProvider} from "./CreatorFilterProvider";


export const ScheduleProviderContainer: ParentComponent<{ size: Accessor<Dimension>, scheduleData: ScheduleData }>
  = (props) => {
  return (
    <AvailableScheduleDimensionsProvider size={props.size}>
      <ScheduleDataProvider scheduleData={props.scheduleData}>
        <ScheduleDimensionsProvider>
          <ScheduleDimensionsCSS>
            <WeekIndexProvider>
              <CreatorFilterProvider>
                {props.children}
              </CreatorFilterProvider>
            </WeekIndexProvider>
          </ScheduleDimensionsCSS>
        </ScheduleDimensionsProvider>
      </ScheduleDataProvider>
    </AvailableScheduleDimensionsProvider>
  );
}

export const ScheduleMobileProviderContainer: ParentComponent<{ size: Accessor<Dimension>, scheduleData: ScheduleData }>
  = (props) => {
  return (
    <AvailableScheduleDimensionsProvider size={props.size}>
      <ScheduleDataProvider scheduleData={props.scheduleData}>
        <ScheduleMobileDimensionsProvider>
          <ScheduleMobileDimensionsCSS>
            <DayIndexProvider>
              {props.children}
            </DayIndexProvider>
          </ScheduleMobileDimensionsCSS>
        </ScheduleMobileDimensionsProvider>
      </ScheduleDataProvider>
    </AvailableScheduleDimensionsProvider>
  );
}
