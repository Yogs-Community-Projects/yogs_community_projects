import {createEffect, ParentComponent} from "solid-js";
import {useScheduleDimensions} from "./ScheduleDimensionsProvider";
import {useScheduleMobileDimensions} from "./ScheduleMobileDimensionsProvider";

export const ScheduleDimensionsCSS: ParentComponent = (props) => {
  const useStyle = () => document.body.style;
  createEffect(() => {
    const dimensions = useScheduleDimensions();
    const style = useStyle();
    if (!style) return;
    style.setProperty('--slot-size', dimensions.slotSize + 'px');
    style.setProperty('--slot-width', dimensions.slotWidth + 'px');
    style.setProperty('--slot-height', dimensions.slotHeight + 'px');
    style.setProperty('--data-size', dimensions.dataSize + 'px');
    style.setProperty('--schedule-body-width', dimensions.bodyWidth + 'px');
    style.setProperty('--schedule-body-height', dimensions.bodyHeight + 'px');
    style.setProperty('--schedule-width', dimensions.width + 'px');
    style.setProperty('--schedule-height', dimensions.height + 'px');
  })
  return (
    <>
      {props.children}
    </>
  );
}
export const ScheduleMobileDimensionsCSS: ParentComponent = (props) => {
  const useStyle = () => document.body.style;
  createEffect(() => {
    const dimensions = useScheduleMobileDimensions();
    const style = useStyle();
    if (!style) return;
    style.setProperty('--slot-size', dimensions.slotSize + 'px');
    style.setProperty('--slot-width', dimensions.slotWidth + 'px');
    style.setProperty('--slot-height', dimensions.slotHeight + 'px');
    style.setProperty('--data-size', dimensions.dataSize + 'px');
    style.setProperty('--schedule-body-width', dimensions.bodyWidth + 'px');
    style.setProperty('--schedule-body-height', dimensions.bodyHeight + 'px');
    style.setProperty('--schedule-width', dimensions.width + 'px');
    style.setProperty('--schedule-height', dimensions.height + 'px');
  })
  return (
    <>
      {props.children}
    </>
  );
}
