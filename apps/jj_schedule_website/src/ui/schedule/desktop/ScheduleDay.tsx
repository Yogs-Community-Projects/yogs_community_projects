import {Component, For} from "solid-js";
import {Day} from "@ycapp/model";
import {ScheduleSlot} from "./ScheduleSlot";
import {DateTime} from "luxon";

export const ScheduleDay: Component<{ day: Day }> = (props) => {
  return (
    <div class={'h-schedule-body w-slot flex flex-col'}>
      <ScheduleDayHeader day={props.day}/>
      <ScheduleDayBody day={props.day}/>
    </div>
  );
}

interface ScheduleDayHeaderProps {
  day: Day
}

const ScheduleDayHeader: Component<ScheduleDayHeaderProps> = (props) => {
  return (
    <div class={'h-data w-slot'}>
      <div class={'h-full p-1'}>
        <div class={'schedule-card-white flex items-center justify-center'}>
          <p class={'text-day-header'}>{DateTime.fromJSDate(new Date(props.day.start)).toFormat("EEE',' MMM d")}</p>
        </div>
      </div>
    </div>
  );
}


interface ScheduleDayBodyProps {
  day: Day
}

const ScheduleDayBody: Component<ScheduleDayBodyProps> = (props) => {
  return (
    <div class={'w-slot h-[calc(var(--schedule-body-height)_-_var(--data-size))] flex flex-col'}>
      <For each={props.day.slots}>
        {(slot) => <ScheduleSlot slot={slot}/>}
      </For>
    </div>
  );
}
