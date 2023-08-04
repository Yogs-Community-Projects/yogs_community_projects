import { Component, JSX, Show } from 'solid-js'
import { Slot, SlotUtils } from '@ycapp/model'
import { Duration } from 'luxon'
import { useScheduleMobileDimensions } from '../providers/ScheduleMobileDimensionsProvider'
import { createModalSignal, getTextColor, useNow } from '@ycapp/common'
import { SlotDialog } from '../../schedule/SlotDialog'

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
  const countdown = () => {
    return SlotUtils.start(slot).diff(useNow()).toFormat('hh:mm:ss')
  }

  const showCountdown = () => {
    return isBefore() && !isLive()
  }
  const isLive = () => {
    return SlotUtils.isLive(slot)
  }
  const isBefore = () => {
    return SlotUtils.isBefore(slot)
  }
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
            <p class={'text-lg font-bold'}>{props.slot.title}</p>
            <p class={'text-base'}>{props.slot.subtitle}</p>
            <Show when={showCountdown()}>
              <p class={'font-mono text-sm tracking-wide'}>{countdown()}</p>
            </Show>
            <Show when={isLive()}>
              <p class={'font-mono text-sm tracking-wide'}>LIVE</p>
            </Show>
          </div>
        </div>
      </div>
      <SlotDialog slot={slot} modalSignal={modalSignal} />
    </>
  )
}
