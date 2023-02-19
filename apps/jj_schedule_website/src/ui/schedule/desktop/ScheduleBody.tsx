import {Component, For} from "solid-js";
import {useCurrentDays} from "../providers/ScheduleDataProvider";

import {ScheduleDay} from "./ScheduleDay";

export const ScheduleBody: Component = () => {
  return (
    <div class={'w-schedule-body h-schedule-body flex flex-row'}>
      <For each={useCurrentDays()}>
        {(day) => <ScheduleDay day={day}/>}
      </For>
    </div>
  );
}
