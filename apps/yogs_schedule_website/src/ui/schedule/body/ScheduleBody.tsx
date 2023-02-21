import { Component, createMemo, For, Match, Show, Switch } from 'solid-js'
import { ScheduleDimensionProvider, useYogsScheduleDimension } from '../ScheduleDimensionProvider'
import { useDays, useScheduleData } from '../YogsScheduleProvider'
import { DateTime, Duration } from 'luxon'
import { Event, PlacementAlgo } from '../ScheduleSlotPlacementAlgo'
import { SlotCard, TwitchSlotCard } from '../SlotCard'
import { useDayIndex, useDayIndexSetter, useIsCurrentDaySelected } from '../DayIndexProvider'
import { FaSolidCalendarDay, FaSolidChevronLeft, FaSolidChevronRight, FaSolidList } from 'solid-icons/fa'
import { useDivDimension, useNow, useTwitchDB } from '@ycapp/common'
import { SlotUtils, Time, TimeOfDay } from '@ycapp/model'
import { DesktopViewMode, useDesktopViewMode } from './DesktopViewModeProvider'
import GridIcon from '../../../assets/grid.svg'
import { TwitchOfflineCard } from '@ycapp/commonui'
import { FeedbackButtons } from '../../components/FeedbackButtons'
// import { TwitchOfflineCard } from '../../components/cards/TwitchCard'

const currentDay = () => useDays()[useDayIndex()]
const isTimeNow = (time: Time) => {
  const start = DateTime.fromISO(time.start)
  start.weekday
  const end = start.plus(Duration.fromDurationLike({ millisecond: time.duration / 1000 }))
  const startTimeOfDay = TimeOfDay.fromDateTime(start)
  const endTimeOfDay = TimeOfDay.fromDateTime(end)
  const nowTimeOfDay = () => TimeOfDay.fromDateTime(useNow())
  return nowTimeOfDay().minOfDay >= startTimeOfDay.minOfDay && nowTimeOfDay().minOfDay <= endTimeOfDay.minOfDay
}
export const ScheduleBody: Component = () => {
  const [size, setRef] = useDivDimension()
  const { useMode } = useDesktopViewMode()

  return (
    <div class={'flex w-full flex-col items-stretch'}>
      <div class={'w-full'}>
        <Switch>
          <Match when={useMode() == DesktopViewMode.stack} keyed>
            <div class={'min-h-[70vh] w-full lg:max-h-[110vh]'} ref={setRef}>
              <ScheduleDimensionProvider dimension={size()}>
                <Body />
              </ScheduleDimensionProvider>
            </div>
          </Match>
          <Match when={useMode() == DesktopViewMode.wrap} keyed>
            <div class={'w-full lg:max-h-[110vh]'} ref={setRef}>
              <ScheduleDimensionProvider dimension={size()}>
                <Body />
              </ScheduleDimensionProvider>
            </div>
          </Match>
        </Switch>
        <Show when={useMode() == DesktopViewMode.stack}>
          <LastUpdate />
        </Show>
        <TwitchOfflineCards />
      </div>
    </div>
  )
}
/*

        <Show when={useMode() == DesktopViewMode.stack}>
          <div class={'min-h-[70vh] w-full lg:max-h-[110vh]'} ref={setRef}>
            <ScheduleDimensionProvider dimension={size()}>
              <Body />
            </ScheduleDimensionProvider>
          </div>
        </Show>
        <Show when={useMode() == DesktopViewMode.wrap}>
          <div class={'w-full lg:max-h-[110vh]'} ref={setRef}>
            <ScheduleDimensionProvider dimension={size()}>
              <Body />
            </ScheduleDimensionProvider>
          </div>
        </Show>
        <Show when={useMode() == DesktopViewMode.stack}>
          <LastUpdate />
        </Show>
        <TwitchOfflineCards />
 */

const Body: Component = () => {
  const { useMode } = useDesktopViewMode()
  return (
    <Switch>
      <Match when={useMode() == DesktopViewMode.stack}>
        <>
          <div class={'hidden lg:block'}>
            <Stack />
          </div>
          <div class={'block lg:hidden'}>
            <Wrap />
          </div>
        </>
      </Match>
      <Match when={useMode() == DesktopViewMode.wrap}>
        <Wrap />
      </Match>
    </Switch>
  )
}

const Stack: Component = () => {
  const yogsSchedule = useScheduleData()
  const times = () => yogsSchedule.schedule.times

  const firstTime = () => TimeOfDay.fromDateTime(DateTime.fromISO(times()[0].start))

  const dayLength = () => firstTime().minOfDay + times().length * 60

  const slots = () => currentDay().slots
  const algoResult = () => new PlacementAlgo(slots(), times())

  const lanes = createMemo(() => algoResult().lanes())
  const totalWidth = () => useYogsScheduleDimension().availableWidth
  const totalHeight = () => useYogsScheduleDimension().availableHeight
  const scheduleHeight = () => useYogsScheduleDimension().scheduleHeight
  const laneHeight = () => scheduleHeight() / lanes().length

  return (
    <div
      style={{
        // height: totalHeight() + 'px',
        width: totalWidth() + 'px',
      }}
      class={'flex flex-col'}
    >
      <ScheduleHeader />
      <TimesComponent />
      <div
        class={'relative h-full'}
        style={{
          height: scheduleHeight() + 'px',
        }}
      >
        <div class={'absolute left-0 top-0 z-0 h-full w-full'}>
          <Background />
        </div>
        <div class={'absolute left-0 top-0 z-10 bg-pink-500'}>
          <For each={lanes()}>
            {lane => (
              <div
                style={{
                  height: laneHeight() + 'px',
                  width: '100%',
                  position: 'relative',
                }}
                class={'bg-gray-400'}
              >
                <For each={lane.events}>{event => <EventComponent event={event} />}</For>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  )
}

interface EventProps {
  event: Event
}

const EventComponent: Component<EventProps> = props => {
  const yogsSchedule = useScheduleData()
  const times = () => yogsSchedule.schedule.times

  const firstTime = () => TimeOfDay.fromDateTime(DateTime.fromISO(times()[0].start))

  const dayLength = () => times().length * 60

  const totalWidth = () => useYogsScheduleDimension().scheduleWidth

  const minuteWidth = () => totalWidth() / dayLength()

  const x = () => {
    return ((props.event.start - firstTime().minOfDay) / dayLength()) * totalWidth()
  }

  const width = () => minuteWidth() * Duration.fromDurationLike({ second: props.event.slot.duration }).as('minutes')

  return (
    <div
      style={{
        position: 'absolute',
        left: x() + 'px',
        width: width() + 'px',
        height: '100%',
      }}
    >
      <div class={'h-full w-full'}>
        <SlotCard slot={props.event.slot} />
      </div>
    </div>
  )
}

const TimesComponent: Component = () => {
  const yogsSchedule = useScheduleData()
  const times = () => yogsSchedule.schedule.times

  const dataSize = () => useYogsScheduleDimension().dataSize

  const width = () => useYogsScheduleDimension().scheduleWidth
  const timeWidth = () => useYogsScheduleDimension().scheduleWidth / times().length
  return (
    <div
      style={{
        height: dataSize() + 'px',
        width: width() + 'px',
      }}
      class={'flex flex-row'}
    >
      <For each={times()}>
        {(time, i) => {
          const start = DateTime.fromISO(time.start)
          const font = () => (isTimeNow(time) ? 'font-bold' : 'font-normal')
          return (
            <div
              style={{
                height: dataSize() + 'px',
                width: timeWidth() + 'px',
              }}
              class={'p-1'}
            >
              <div class={'schedule-card-white flex flex-row items-center justify-center text-center'}>
                <p class={font()}>{start.toLocaleString(DateTime.TIME_SIMPLE)}</p>
              </div>
            </div>
          )
        }}
      </For>
    </div>
  )
}

const Background: Component = () => {
  const yogsSchedule = useScheduleData()
  const times = () => yogsSchedule.schedule.times

  const width = () => useYogsScheduleDimension().scheduleWidth / times().length

  return (
    <>
      <div class={'flex h-full w-full flex-row'}>
        <For each={times()}>
          {(time, i) => {
            const standardGradient = 'bg-gradient-to-b from-primary-100 to-primary-300'
            const accentGradient = 'bg-gradient-to-b from-accent-100 to-accent-300'
            const gradient = isTimeNow(time) ? accentGradient : i() % 2 == 0 ? standardGradient : ''
            return (
              <div
                style={{
                  width: width() + 'px',
                  height: '100%',
                }}
                class={'py-1'}
              >
                <div class={`h-full w-full rounded-2xl ${gradient}`}></div>
              </div>
            )
          }}
        </For>
      </div>
    </>
  )
}

const ScheduleHeader: Component = () => {
  const yogsSchedule = useScheduleData()
  const times = () => yogsSchedule.schedule.times
  const width = () => useYogsScheduleDimension().scheduleWidth / times().length
  const dataSize = () => useYogsScheduleDimension().dataSize
  return (
    <>
      <div style={{}} class={'flex w-full flex-col lg:hidden'}>
        <div
          style={{
            height: dataSize() * 2 + 'px',
          }}
        >
          <Title />
        </div>
        <div
          style={{
            height: dataSize() + 'px',
          }}
          class={'p-schedule'}
        >
          <WeekButtons />
        </div>
      </div>
      <div
        style={{
          height: dataSize() + 'px',
        }}
        class={'hidden w-full flex-row lg:flex'}
      >
        <Title />
        <div
          style={{
            width: width() * 3 + 'px',
            height: dataSize() + 'px',
          }}
          class={'p-schedule'}
        >
          <WeekButtons />
        </div>
        <ViewModeButton />
      </div>
    </>
  )
}

const Title: Component = () => {
  const date = () =>
    DateTime.fromObject({
      weekday: currentDay().dayOfWeek,
    })

  return (
    <div class={'p-schedule h-full flex-1'}>
      <div class={'schedule-card-white flex h-full items-center justify-center'}>
        <h3 class={'text-center text-2xl'}>
          {useScheduleData().name} -{' '}
          {date().toLocaleString({
            weekday: 'long',
          })}
        </h3>
      </div>
    </div>
  )
}
const WeekButtons: Component = () => {
  const [prev, next, today] = useDayIndexSetter()

  return (
    <div style={{}} class={`schedule-card-white flex h-full flex-row`}>
      <button
        class={
          'hover:bg-accent-50 ripple flex flex-1 flex-col items-center justify-center rounded-l-2xl hover:scale-105'
        }
        onclick={prev}
      >
        <FaSolidChevronLeft />
      </button>
      <button
        class={'hover:bg-accent-50 ripple flex flex-1 flex-col items-center justify-center hover:scale-105'}
        onclick={today}
      >
        <FaSolidCalendarDay />
      </button>
      <button
        class={
          'hover:bg-accent-50 ripple flex flex-1 flex-col items-center justify-center rounded-r-2xl hover:scale-105'
        }
        onclick={next}
      >
        <FaSolidChevronRight />
      </button>
    </div>
  )
}
const ViewModeButton: Component = () => {
  const { useMode, switchMode } = useDesktopViewMode()

  const yogsSchedule = useScheduleData()
  const times = () => yogsSchedule.schedule.times

  const width = () => useYogsScheduleDimension().scheduleWidth / times().length

  return (
    <div
      style={{
        width: width() + 'px',
      }}
      class={'p-schedule'}
    >
      <div class={'schedule-card-white flex flex-row'}>
        <button
          class={
            'hover:bg-accent-50 ripple flex flex-1 flex-col items-center justify-center rounded-2xl hover:scale-105'
          }
          onclick={switchMode}
        >
          {useMode() == DesktopViewMode.stack ? <FaSolidList /> : <GridIcon />}
        </button>
      </div>
    </div>
  )
}

const Wrap: Component = () => {
  return (
    <div class={'flex flex-col justify-center'}>
      <ScheduleHeader />
      <TwitchLiveScheduleGrid />
      <LastUpdate />
    </div>
  )
}

const TwitchLiveScheduleGrid: Component = () => {
  const state = useTwitchDB().readAll()

  const channels = () => {
    if (!state.data) {
      return []
    }
    if (!Array.isArray(state.data)) {
      return []
    }
    return state.data
      .filter(channel => channel.stream)
      .sort((a, b) => {
        return DateTime.fromISO(b.stream.stream.started_at)
          .diff(DateTime.fromISO(a.stream.stream.started_at))
          .as('seconds')
      })
  }
  const slots = () =>
    currentDay()
      .slots.filter(s => s.visible)
      .sort(SlotUtils.sortByNextStream)
      .filter(s => !SlotUtils.isLive(s, DateTime.now()))
      .filter(s => {
        if (!useIsCurrentDaySelected()) {
          return true
        }
        return SlotUtils.nextStream(s).diff(DateTime.now()).as('hour') <= 24
      })

  return (
    <div class={'flex flex-col justify-center gap-2 p-1 sm:flex-row sm:flex-wrap sm:gap-y-4'}>
      <Switch>
        <Match when={state.error}>
          <p>{JSON.stringify(state.error)}</p>
        </Match>
        <Match when={state.loading}>
          <p>Loading...</p>
        </Match>
        <Match when={state.data}>
          <Show when={useIsCurrentDaySelected()}>
            <For each={channels()}>
              {(channel, i) => {
                return (
                  <div class={'h-20 w-full sm:h-32 sm:w-52'}>
                    <div class={'h-full w-full'}>
                      <TwitchSlotCard channel={channel} />
                    </div>
                  </div>
                )
              }}
            </For>
          </Show>
        </Match>
      </Switch>
      <For each={slots()}>
        {(slot, i) => {
          return (
            <div class={'h-24 w-full sm:h-32 sm:w-52'}>
              <SlotCard slot={slot} showCountdown={true} showTime={true} />
            </div>
          )
        }}
      </For>
    </div>
  )
}

export const TwitchOfflineCards: Component = () => {
  const state = useTwitchDB().readAll()
  const channels = () => {
    if (state.loading) {
      return []
    }
    if (state.error) {
      console.error('channels', 'error', state)
      return []
    }
    if (state.data && Array.isArray(state.data)) {
      return state.data
        .filter(c => !c.stream && c.lastStream)
        .filter(a => {
          const aStart = DateTime.now().diff(DateTime.fromISO(a.lastStream.endedAt))
          return aStart.as('days') < 60
        })
        .sort((a, b) => {
          const aStart = DateTime.fromISO(a.lastStream.endedAt).diff(DateTime.now())
          const bStart = DateTime.fromISO(b.lastStream.endedAt).diff(DateTime.now())
          return bStart.minus(aStart).as('minute')
        })
    }
    return []
  }
  return (
    <div class={'p-2'}>
      <p class={'text-center text-2xl text-white'}>Offline</p>
      <Switch>
        <Match when={state.error}>
          <p>{JSON.stringify(state.error)}</p>
        </Match>
        <Match when={state.loading}>
          <p>Loading...</p>
        </Match>
        <Match when={state.data}>
          <div class={'grid w-full grid-cols-1 justify-center gap-2 p-1 sm:grid-cols-[repeat(auto-fit,_18rem)]'}>
            <For each={channels()}>
              {(channel, i) => {
                return <TwitchOfflineCard data={channel} />
              }}
            </For>
          </div>
        </Match>
      </Switch>
    </div>
  )
}

const LastUpdate: Component = () => {
  const yogsSchedule = useScheduleData()
  const lastUpdate = () => {
    return DateTime.fromISO(yogsSchedule.updatedAt)
  }
  return (
    <div class={'flex w-full flex-col items-center justify-center p-4'}>
      <div class={'max-w-[90%] text-center text-white md:max-w-[50%]'}>
        <p class={'font-bold'}>Last updated, {lastUpdate().toLocaleString(DateTime.DATETIME_FULL)}</p>
        <p>
          This schedule is maintained <strong>by the community</strong>. If you find errors or see that a stream is
          missing use the contact info below. Streams that appear here are not guaranteed to happen or might be delayed.
          For more information visit the Twitter page of the <a href={'https://twitter.com/yogscast'}>Yogscast</a> or
          the respective Streamer.
          <strong>This schedule is a fan Project and not associated with the Yogscast or their partners.</strong>
        </p>
        <p>If you want to help keep the schedule up to date, use the links below.</p>
      </div>
      <FeedbackButtons />
    </div>
  )
}
