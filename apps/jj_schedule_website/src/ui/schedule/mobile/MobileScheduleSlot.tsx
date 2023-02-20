import { Component, JSX } from 'solid-js'
import { Slot } from '@ycapp/model'
import { Duration } from 'luxon'
import { useScheduleMobileDimensions } from '../providers/ScheduleMobileDimensionsProvider'
import { createModalSignal, getTextColor } from '@ycapp/common'
import { SlotDialog } from '../../components/schedule/SlotDialog'

interface MobileScheduleSlotProps {
  slot: Slot
}

export const MobileScheduleSlot: Component<MobileScheduleSlotProps> = props => {
  const slot = props.slot
  const durationHour = () => Duration.fromDurationLike({ second: slot.duration }).as('hours')

  const style = (): JSX.CSSProperties => {
    return {
      height: useScheduleMobileDimensions().slotHeight + 'px',
      width: useScheduleMobileDimensions().slotWidth + 'px',
    }
  }

  function textColor(background: string) {
    return getTextColor(background)
  }

  function _parseColor(c: string): string {
    return '#' + c.substring(2) //  + c.substring(0, 2)
  }

  const background = () => {
    let gradientStyle: JSX.CSSProperties | undefined
    if (slot.style.linearGradient) {
      const linearGradient = slot.style.linearGradient
      gradientStyle = {
        background: `linear-gradient(180deg, ${linearGradient.colors.map(_parseColor).join(', ')})`,
        color: textColor(_parseColor(slot.style.background ?? linearGradient.colors[0] ?? 'ffff0000')),
        height: '100%',
      }
    } else {
      if (slot.style.background) {
        gradientStyle = {
          background: `${_parseColor(slot.style.background ?? 'ffff0000')}`,
          // background: _parseColor(slot.style.background)
          color: textColor(_parseColor(slot.style.background ?? 'ffff0000')),
          height: '100%',
        }
      }
    }
    return gradientStyle
  }
  const modalSignal = createModalSignal()
  return (
    <>
      <div
        class={'w-slot-size'}
        style={{
          ...style(),
        }}
      >
        <div class={'p-schedule h-full transition-all'}>
          <div
            class={'schedule-card flex flex-col justify-center p-1 text-center transition-all'}
            style={{
              ...background(),
            }}
            onclick={modalSignal.open}
          >
            <p class={'text-[calc(var(--slot-height)_/_4)] font-bold'}>{props.slot.title}</p>
            <p class={'text-[calc(var(--slot-height)_/_6)]'}>{props.slot.subtitle}</p>
          </div>
        </div>
      </div>
      <SlotDialog slot={slot} modalSignal={modalSignal} />
    </>
  )
}
