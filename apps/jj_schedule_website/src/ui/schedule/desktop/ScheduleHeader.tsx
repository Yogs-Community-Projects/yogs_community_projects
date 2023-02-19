import {Component} from "solid-js";
import {useWeekIndexSetter} from "../providers/WeekIndexProvider";
import {useScheduleData} from "../providers/ScheduleDataProvider";
import {FaSolidChevronLeft, FaSolidChevronRight} from "solid-icons/fa";
import {FilterButton} from "../ScheduleCreatorFilterButton";

export const ScheduleHeader: Component = () => {
  return (
    <div class={'w-schedule h-data flex flex-row'}>
      <div class={'h-data w-data p-schedule'}/>
      <Title/>
      <div class={'flex-1'}/>
      <FilterButton/>
      <WeekButtons/>
    </div>
  );
}
const Title: Component = () => {
  return (
    <div class={'p-schedule h-data w-[calc(var(--slot-size)_*_3)]'}>
      <div class={'schedule-card-white flex items-center justify-center'}>
        <h3 class={'text-center text-[calc(var(--slot-size)_/_8)]'}>{useScheduleData().name}</h3>
      </div>
    </div>
  );
}
// npx degit solidjs/templates/ts-tailwindcss yogs_schedule_website
const WeekButtons: Component = () => {

  const [prev, next] = useWeekIndexSetter()

  return (
    <div class={'w-slot h-data p-schedule'}>
      <div class={'schedule-card-white flex flex-row'}>
        <button
          class={'hover:bg-accent-50 hover:scale-105 flex-1 ripple rounded-l-2xl flex flex-col justify-center items-center'}
          onclick={prev}>
          <FaSolidChevronLeft/>
        </button>
        <button
          class={'hover:bg-accent-50 hover:scale-105 flex-1 ripple rounded-r-2xl flex flex-col justify-center items-center'}
          onclick={next}>
          <FaSolidChevronRight/>
        </button>
      </div>
    </div>
  );
}
