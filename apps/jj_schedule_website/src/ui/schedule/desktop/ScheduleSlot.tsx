import { Component, JSX, Show } from 'solid-js'
import { Slot, SlotUtils } from '@ycapp/model'
import { DateTime, Duration } from 'luxon'
import { useScheduleDimensions } from '../providers/ScheduleDimensionsProvider'
import { createModalSignal, getTextColor, useNow } from '@ycapp/common'
import { BiLogosTwitch, BiLogosYoutube } from 'solid-icons/bi'
import { BsHeart, BsPeopleFill } from 'solid-icons/bs'
import { useCreatorFilter } from '../providers/CreatorFilterProvider'
import { SlotDialog } from '../../components/schedule/SlotDialog'
import { useAnalytics } from '../../../AnalyticsProvider'

interface ScheduleSlotProps {
  slot: Slot
}

export const ScheduleSlot: Component<ScheduleSlotProps> = props => {
  const slot = props.slot
  const now = useNow()
  const { logSlotClick } = useAnalytics()
  const durationHour = () => Duration.fromDurationLike({ second: slot.duration }).as('hours')

  const { includes, isEmpty, isSlotPartOfFilter } = useCreatorFilter()
  const enable = () => isSlotPartOfFilter(slot)
  const style = (): JSX.CSSProperties => {
    return {
      height: (useScheduleDimensions().slotSize / 3) * (slot.gridTileSize * 3) + 'px',
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
    if (enable()) {
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
    } else {
      gradientStyle = {
        background: `grey`,
        // background: _parseColor(slot.style.background)
        color: 'white',
        height: '100%',
      }
    }
    return gradientStyle
  }
  const modalSignal = createModalSignal()

  const showCountdown = () => {
    return SlotUtils.isBefore(slot, now())
  }
  const countdown = () => {
    const diff = DateTime.fromISO(slot.start).diff(now())
    if (diff.as('day') < 1) {
      return DateTime.fromISO(slot.start).diff(now()).toFormat("hh'h' mm'm' ss's'")
    }
    return DateTime.fromISO(slot.start).diff(now()).toFormat("dd'd' hh'h' mm'm' ss's'")
  }

  return (
    <>
      <div
        class={'w-slot'}
        style={{
          ...style(),
        }}
      >
        <div class={'p-schedule h-full transition-all'}>
          <button
            class={
              'hover:scale-102 schedule-card flex flex-col items-center justify-between p-1 text-center transition-all hover:shadow-2xl hover:brightness-105 disabled:scale-100 disabled:shadow-xl disabled:brightness-100'
            }
            style={{
              ...background(),
            }}
            disabled={!enable()}
            onclick={() => {
              logSlotClick(slot)
              modalSignal.toggle()
            }}
          >
            <div class={'flex h-full w-full flex-col justify-center text-center'}>
              <p class={'text-slot-title line-clamp-2 font-bold tracking-widest'}>{props.slot.title}</p>
              <p class={'text-slot-subtitle tracking-wide'}>{props.slot.subtitle}</p>
              <Show when={showCountdown()}>
                <p class={'text-slot-countdown tracking-wide'}>{countdown()}</p>
              </Show>
            </div>
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
          </button>
        </div>
      </div>
      <SlotDialog slot={slot} modalSignal={modalSignal} />
    </>
  )
}
