import { Component, Match, Show, Switch } from 'solid-js'
import { Loading } from '../components/loading/Loading'
import {
  ScheduleMobileProviderContainer,
  ScheduleProviderContainer,
} from '../components/schedule_grid/providers/ScheduleProviderContainer'
import { MobileSchedule } from '../components/schedule_grid/mobile/MobileSchedule'
import { useScheduleData } from '../components/schedule_grid/providers/ScheduleDataProvider'
import { DateTime } from 'luxon'
import { ScheduleData } from '@ycapp/model'
import { useDivDimension, useScheduleDB } from '@ycapp/common'
import { ScheduleTimes } from '../components/schedule_grid/desktop/ScheduleTimes'
import { ScheduleBody } from '../components/schedule_grid/desktop/ScheduleBody'
import { CalendarExportButton } from '../components/schedule_grid/ScheduleCalendarExportButton'
import { FilterButton } from '../components/schedule_grid/ScheduleCreatorFilterButton'
import { useWeekIndexSetter } from '../components/schedule_grid/providers/WeekIndexProvider'
import { FaSolidChevronLeft, FaSolidChevronRight } from 'solid-icons/fa'
import { BiLogosSteam } from 'solid-icons/bi'
import { BsSteam } from 'solid-icons/bs'

const TinyTeams: Component = () => {
  const schedule = useScheduleDB().read('tinyteams2023')

  return (
    <div class={'flex min-h-screen flex-col'}>
      <Switch>
        <Match when={schedule.error}>
          <p>An error occurred</p>
        </Match>
        <Match when={schedule.loading}>
          <Loading />
        </Match>
        <Match when={schedule.data}>
          <ScheduleComponent schedule={schedule.data} />
        </Match>
      </Switch>
    </div>
  )
}

const ScheduleComponent: Component<{ schedule: ScheduleData }> = props => {
  const [size, setRef] = useDivDimension()
  const mobile = () => size().width < 768

  return (
    <div class={'mx-4'}>
      <div class={'flex min-h-screen w-full flex-col items-center'} ref={setRef}>
        <Switch>
          <Match when={!mobile()} keyed>
            <ScheduleProviderContainer size={size} scheduleData={props.schedule}>
              <ScheduleFrame />
              <ScheduleDisclaimer />
            </ScheduleProviderContainer>
          </Match>
          <Match when={mobile()}>
            <ScheduleMobileProviderContainer size={size} scheduleData={props.schedule}>
              <MobileSchedule />
              <ScheduleDisclaimer />
            </ScheduleMobileProviderContainer>
          </Match>
        </Switch>
      </div>
    </div>
  )
}

const ScheduleDisclaimer: Component = () => {
  const schedule = useScheduleData()
  return (
    <div class={'max-w-[90%] text-center text-white md:max-w-[50%]'}>
      <p class={'font-bold'}>
        Last updated, {DateTime.fromISO(schedule.updatedAt).toLocaleString(DateTime.DATETIME_FULL)}
      </p>
      <p>
        This Schedule is maintained <strong>by the community</strong>. If you find errors or see that a stream is
        missing use the contact info below. Streams that appear here are not guaranteed to happen or might be delayed.
        <strong>This schedule is a fan Project and not associated with the Yogscast or their partners.</strong>
      </p>
    </div>
  )
}

const ScheduleFrame: Component = () => {
  return (
    <div class={'schedule font-babas flex flex-col tracking-wider'}>
      <ScheduleHeader />
      <ScheduleContent />
    </div>
  )
}

const ScheduleContent: Component = () => {
  return (
    <div class={'w-schedule h-schedule-body flex flex-row'}>
      <ScheduleTimes />
      <ScheduleBody />
    </div>
  )
}

const ScheduleHeader: Component = () => {
  return (
    <div class={'w-schedule flex flex-row'}>
      <div class={'h-data w-data p-schedule'} />
      <Title />
      <div class={'flex-1'} />
      <TinyTeamsSteam />
      <CalendarExportButton />
      <FilterButton />
      <WeekButtons />
    </div>
  )
}
const Title: Component = () => {
  return (
    <div class={'p-schedule h-data w-[calc(var(--slot-size)_*_3)]'}>
      <div class={'schedule-card-white flex items-center justify-center'}>
        <h3 class={'text-center text-[calc(var(--slot-size)_/_6)]'}>{useScheduleData().name}</h3>
      </div>
    </div>
  )
}
// npx degit solidjs/templates/ts-tailwindcss yogs_schedule_website
const WeekButtons: Component = () => {
  const [prev, next] = useWeekIndexSetter()

  const schedule = useScheduleData()

  return (
    <Show when={schedule.schedule.weeks.length > 1}>
      <div class={'w-slot h-data p-schedule'}>
        <div class={'schedule-card-white flex flex-row'}>
          <button
            class={
              'hover:bg-accent-50 ripple flex flex-1 flex-col items-center justify-center rounded-l-2xl hover:scale-105'
            }
            onClick={prev}
          >
            <FaSolidChevronLeft />
          </button>
          <button
            class={
              'hover:bg-accent-50 ripple flex flex-1 flex-col items-center justify-center rounded-r-2xl hover:scale-105'
            }
            onClick={next}
          >
            <FaSolidChevronRight />
          </button>
        </div>
      </div>
    </Show>
  )
}

const TinyTeamsSteam: Component = () => {
  return (
    <div class={'p-schedule h-data w-[calc(var(--slot-size)_*_2)]'}>
      <a
        target="_blank"
        href="https://store.steampowered.com/sale/tinyteamsfestival2023"
        class={'schedule-card flex items-center justify-center bg-black text-white'}
      >
        <h3 class={'text-center text-[calc(var(--slot-size)_/_6)]'}>Tiny Teams on Steam</h3>
        <BiLogosSteam size={32} />
      </a>
    </div>
  )
}

export default TinyTeams
