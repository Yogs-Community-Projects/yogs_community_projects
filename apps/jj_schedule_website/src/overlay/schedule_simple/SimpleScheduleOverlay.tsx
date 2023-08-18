import { Component, Match, Show, Switch } from 'solid-js'
import { Loading } from '../../ui/components/loading/Loading'
import { useScheduleDB } from '@ycapp/common'
import '../overlay.css'
import { LinearGradient, Slot, SlotUtils } from '@ycapp/model'
import {
  background,
  useHeader,
  useHeaderTheme,
  useNext,
  useOverlayNow,
  useShowTimezone,
  useSimpleScheduleData,
  useTheme,
  useTimezone,
} from '../overlay_signals'
import { DateTime, IANAZone } from 'luxon'
import { OverlayHeader } from '../schedule/OverlayHeader'
import { ScheduleOverlayDateProviderProvider } from '../schedule/ScheduleOverlayDateProvider'
import { OverlaySlotList } from '../schedule/OverlaySlotList'

export const SimpleScheduleOverlay: Component<{ date?: DateTime }> = props => {
  return (
    <ScheduleOverlayDateProviderProvider debug={false} date={props.date}>
      <SimpleScheduleOverlayComponent
        header={useHeader()}
        next={useNext()}
        background={background()}
        headerTheme={useHeaderTheme()}
        theme={useTheme()}
        scheduleData={useSimpleScheduleData()}
        showTimezone={useShowTimezone()}
        timezone={useTimezone()}
      />
    </ScheduleOverlayDateProviderProvider>
  )
}

export const SimpleScheduleOverlayComponent: Component<{
  next: number
  background: string
  header: string[]
  theme: string
  headerTheme: string
  scheduleData: string
  timezone: string
  showTimezone: boolean
}> = props => {
  const scheduleData = () => props.scheduleData
  const ianaTimezone = () => {
    if (IANAZone.isValidZone(props.timezone)) {
      return props.timezone
    }
    return 'Europe/London'
  }
  const parsedSlots = () => {
    return scheduleData()
      .split('\n')
      .map(s => {
        try {
          const [title, subtitle, start, duration = '180', color1 = '', color2 = ''] = s.split(';')
          if (title === '' || start === '' || duration === '') {
            return null
          }
          // title, subtitle, start, duration
          let linearGradient: LinearGradient = undefined
          if (color1 !== '' && color2 !== '') {
            linearGradient = {
              begin: {
                x: 1,
                y: 0,
              },
              end: {
                x: 0,
                y: 0,
              },
              colors: [color1, color2],
            }
          }

          return {
            title,
            subtitle,
            start: DateTime.fromFormat(`${start}` || '2023-12-01-12-00', 'yyyy-MM-dd-HH-mm', {
              zone: ianaTimezone(),
            }).toISO(),
            duration: parseInt(duration || '180'),
            style: {
              linearGradient,
            },
          } as Slot
        } catch (e) {
          return null
        }
      })
      .filter(s => s !== null)
  }

  const slots = () =>
    parsedSlots()
      .filter(slot => {
        return SlotUtils.isLive(slot, useOverlayNow()) || SlotUtils.isBefore(slot, useOverlayNow())
      })
      .slice(0, props.next)

  const nextGrid = () => {
    switch (props.next) {
      case 2:
        return 'grid-rows-2'
      case 3:
        return 'grid-rows-3'
      default:
        return 'grid-rows-4'
    }
  }

  const timezone = () => {
    const t = DateTime.fromISO(slots()[0].start, {
      zone: ianaTimezone(),
    }).toFormat('ZZZZ')
    if (t === 'UTC') {
      return 'GMT'
    }
    return t
  }
  const countdownBackground = () => {
    if (props.theme === 'blue' || props.theme === 'blue_img') {
      return 'bg-accent'
    }
    return 'bg-primary'
  }
  return (
    <div
      style={{
        background: props.background,
      }}
      class={`max-w-screen flex h-full flex-col rounded-2xl uppercase`}
    >
      <div class={'flex h-full flex-col'}>
        <Show when={props.header}>
          <OverlayHeader header={props.header} theme={props.headerTheme} />
        </Show>
        <div class={'grid h-full flex-1 ' + nextGrid()}>
          <Show when={slots().length > 0}>
            <OverlaySlotList slots={slots()} theme={props.theme} />
            <Show when={props.showTimezone}>
              <div class={'w-full p-2'}>
                <div
                  class={`${countdownBackground()} flex h-6 w-full flex-col items-center justify-between rounded-2xl text-center`}
                >
                  <p class={'text-center text-sm text-white'}>TIMES IN {timezone()}</p>
                </div>
              </div>
            </Show>
          </Show>
          <Show when={slots().length == 0}>
            <p>No Streams found {useOverlayNow().toFormat('dd.MM.yyyy')}</p>
          </Show>
        </div>
      </div>
    </div>
  )
}
