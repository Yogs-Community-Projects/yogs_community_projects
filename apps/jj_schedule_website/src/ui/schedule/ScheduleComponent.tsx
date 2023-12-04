import { Component, createSignal, Match, Show, Switch } from 'solid-js'
import { ScheduleData } from '@ycapp/model'
import { ScheduleMobileProviderContainer, ScheduleProviderContainer } from './providers/ScheduleProviderContainer'
import { ScheduleFrame } from './desktop/ScheduleFrame'
import { MobileSchedule } from './mobile/MobileSchedule'
import { useScheduleData } from './providers/ScheduleDataProvider'
import { DateTime } from 'luxon'
import { useDivDimension, useIsJJ, useNow } from '@ycapp/common'
import { useAnalytics } from '../../AnalyticsProvider'

export const ScheduleComponent: Component<{ schedule: ScheduleData }> = props => {
  const [size, setRef] = useDivDimension()
  const mobile = () => size().width < 768
  const desktop = () => !mobile()

  return (
    <div class={'mx-4 md:mx-8'}>
      <div class={'flex min-h-screen w-full flex-col items-center'} ref={setRef}>
        <Switch>
          <Match when={desktop()} keyed>
            <ScheduleProviderContainer size={size} scheduleData={props.schedule}>
              <ExtensionAd />
              <ScheduleFrame />
              <ScheduleDisclaimer />
            </ScheduleProviderContainer>
          </Match>
          <Match when={mobile()}>
            <ScheduleMobileProviderContainer size={size} scheduleData={props.schedule}>
              <ExtensionAd />
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
        This Yogscast Jingle Jam schedule is maintained <strong>by the community</strong>. If you find errors or see
        that a stream is missing use the contact info below. Streams that appear here are not guaranteed to happen or
        might be delayed. For more information visit the Jingle Jam Twitter page.
        <strong>
          This schedule is a fan Project and not associated with the Jingle Jam, the Yogscast or their partners.
        </strong>
      </p>
    </div>
  )
}

const ExtensionAd = () => {
  const n = DateTime.now()
  const showExtensionAdd = (localStorage?.getItem(`showExtensionAdd_${n.year}`) ?? 'true') === 'true'
  const [storageValue, setStorageValue] = createSignal(showExtensionAdd)
  const { log } = useAnalytics()

  const jj = useIsJJ()
  const schedule = useScheduleData()
  const now = useNow()
  const year = () => DateTime.fromISO(schedule.schedule.weeks.at(0).days.at(0).start).year
  const show = () => {
    return now().year == year() && jj() && storageValue() && now().day >= 2
  }
  const close = () => {
    localStorage?.setItem(`showExtensionAdd_${n.year}`, 'false')
    setStorageValue(false)
    log('click_extension_ad', {})
  }

  return (
    <Show when={show()}>
      <div class={`m-2 flex w-[90%] flex-col rounded-3xl bg-white md:w-[40%]`}>
        <div class={`text-xxs bg-twitch flex h-16 items-center justify-center rounded-t-3xl p-2 shadow-xl`}>
          <h3 class={'text-center text-lg text-white'}>JJ Community Twitch Extension</h3>
        </div>
        <div class={'flex w-full flex-1 flex-col gap-2 overflow-auto p-4'}>
          <p>
            You can also see the Yogs JJ Schedule using the{' '}
            <span class={'italic'}>Jingle Jam Community Twitch Extension</span> on the{' '}
            <a href={'https://twitch.tv/yogscast'} target={'_blank'}>
              Yogscast Twitch Channel.
            </a>
          </p>
          <p>
            On desktop, scroll down below the about section and on mobile press the Extension icon on the top right
            above the chat.
          </p>
          <p>The Extension also shows a list of many other JJ Fundraiser and if they are live on Twitch.</p>
        </div>
        <div class={'flex flex-row items-center justify-end gap-2 p-2'}>
          <button class={'bg-primary rounded-xl p-2 text-white'} onClick={close}>
            Got it
          </button>
        </div>
      </div>
    </Show>
  )
}
