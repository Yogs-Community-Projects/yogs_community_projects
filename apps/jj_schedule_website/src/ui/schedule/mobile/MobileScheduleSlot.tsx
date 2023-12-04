import { Component, JSX, Show } from 'solid-js'
import { Slot, SlotUtils } from '@ycapp/model'
import { DateTime, Duration } from 'luxon'
import { useScheduleMobileDimensions } from '../providers/ScheduleMobileDimensionsProvider'
import { createModalSignal, getTextColor, useNow } from '@ycapp/common'
import { SlotDialog } from '../../components/schedule/SlotDialog'
import { BiLogosTwitch, BiLogosYoutube } from 'solid-icons/bi'
import { BsHeart, BsPeopleFill } from 'solid-icons/bs'
import { useAnalytics } from '../../../AnalyticsProvider'
import { LivePulseDot } from '../LivePulseDot'

interface MobileScheduleSlotProps {
  slot: Slot
}

export const MobileScheduleSlot: Component<MobileScheduleSlotProps> = props => {
  const slot = props.slot
  const now = useNow()
  const { logSlotClick } = useAnalytics()

  const durationHour = () => Duration.fromDurationLike({ second: slot.duration }).as('hours')
  const countdown = () => {
    const diff = DateTime.fromISO(slot.start).diff(now())
    if (diff.as('day') < 1) {
      return DateTime.fromISO(slot.start).diff(now()).toFormat("hh'h' mm'm' ss's'")
    }
    return DateTime.fromISO(slot.start).diff(now()).toFormat("dd'd' hh'h' mm'm' ss's'")
  }
  const showCountdown = () => {
    return SlotUtils.isBefore(slot, now())
  }
  const isLive = () => SlotUtils.isLive(slot, now())

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
            class={'schedule-card flex flex-col items-center justify-center p-1 text-center transition-all'}
            style={{
              ...background(),
            }}
            onclick={() => {
              logSlotClick(slot)
              modalSignal.open()
            }}
          >
            <p class={'text-md font-bold'}>{props.slot.title}</p>
            <p class={'text-sm'}>{props.slot.subtitle}</p>
            <Show when={showCountdown()}>
              <p class={'font-mono text-xs'}>{countdown()}</p>
            </Show>
            <Show when={!showCountdown() && isLive()}>
              <LivePulseDot />
            </Show>
            <div class={'flex w-full flex-row justify-around'}>
              <Show when={slot.showTwitchIcon}>
                <BiLogosTwitch size={18} />
              </Show>
              <Show when={slot.showHighlightIcon}>
                <BsHeart size={18} />
              </Show>
              <Show when={slot.showYoutubeIcon}>
                <BiLogosYoutube size={18} />
              </Show>
              <Show when={slot.relations.creators.length > 0}>
                <BsPeopleFill size={18} />
              </Show>
            </div>
          </div>
        </div>
      </div>
      <SlotDialog slot={slot} modalSignal={modalSignal} />
    </>
  )
}
