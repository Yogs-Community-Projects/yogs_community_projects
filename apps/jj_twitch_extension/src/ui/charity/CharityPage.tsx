import { loadLocalAndRemote, useFirestoreDB, useJJConfig } from '@ycapp/common'
import { Component, Match, Show, Switch } from 'solid-js'
import { collection, CollectionReference, doc } from 'firebase/firestore'
import { CharityList } from './CharityList'
import { CharityOverview } from './CharityOverview'
import { CurrencyProvider } from '../CurrencyProvider'
import { useJJStartCountdown, useNextJJStartDate } from '../schedule/SchedulePage'
import { useTwitchConfig } from '../config/TwitchConfigProvider'
import { twMerge } from 'tailwind-merge'
import { JJData } from '@ycapp/model'

const CharityPage: Component = () => {
  const visible = () => useJJConfig().showCharities
  return (
    <>
      <Show when={visible()}>
        <VisibleBody />
      </Show>
      <Show when={!visible()}>
        <InvisibleBody />
      </Show>
    </>
  )
}

const VisibleBody: Component = () => {
  const coll = collection(useFirestoreDB(), 'JJDonationTracker') as CollectionReference<JJData>
  const d = doc<JJData>(coll, 'JJDonationTracker2023')
  const charityData = loadLocalAndRemote('charityData', d, { forceRemote: true, ageInHours: 0 })
  const { config } = useTwitchConfig()
  const extensionConfig = useJJConfig()
  return (
    <Switch>
      <Match when={charityData.data} keyed={true}>
        <CurrencyProvider avgConversionRate={charityData?.data?.avgConversionRate}>
          <div
            class={twMerge(
              'scrollbar-thin scrollbar-corner-primary-100 scrollbar-thumb-accent-500 scrollbar-track-accent-100 h-full overflow-y-auto overflow-x-hidden p-1.5 pt-0',
              config.theme === 'blue'
                ? 'scrollbar-corner-accent-100 scrollbar-thumb-primary-500 scrollbar-track-primary-100'
                : '',
            )}
          >
            <h3 class={'p-0 pb-2 text-center text-xl text-white'}>Charities</h3>
            <CharityOverview data={charityData.data} />
            <div class={'h-3'} />
            <Show when={extensionConfig.donationTrackerUrl && extensionConfig.donationTrackerUrl !== ''}>
              <a
                class={
                  'min-h-24 hover:scale-102 bg-accent-500 flex w-full flex-row items-center justify-center rounded-2xl p-1 text-center text-white shadow-xl transition-all hover:shadow-2xl hover:brightness-105'
                }
                href={extensionConfig.donationTrackerUrl}
                target={'_blank'}
              >
                <span class="relative mr-4 flex h-3 w-3">
                  <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span class="relative inline-flex h-full w-full rounded-full bg-red-500"></span>
                </span>
                Live Donation Tracker
              </a>
              <div class={'h-3'} />
            </Show>
            <CharityList charityData={charityData.data.causes} />
          </div>
        </CurrencyProvider>
      </Match>
      <Match when={charityData.loading}>
        <p>Loading...</p>
      </Match>
    </Switch>
  )
}

const InvisibleBody: Component = () => {
  return (
    <div class={'mx-auto flex w-fit flex-col items-center p-1 text-center text-base text-white md:w-[50%] md:text-2xl'}>
      <p class={'p-1 text-2xl font-bold md:p-2 md:text-4xl'}>Jingle Jam Countdown</p>
      <p class={'text-xl md:text-3xl'}>{useNextJJStartDate().toLocal().toFormat('DDDD')}</p>
      <p class={'text-xl md:text-3xl'}>{useNextJJStartDate().toLocal().toFormat('ttt')}</p>
      <p class={''}>{useNextJJStartDate().toFormat('DDDD')}</p>
      <p class={''}>{useNextJJStartDate().toFormat('ttt')}</p>
      <div class={'flex flex-col items-center p-1 text-white md:p-4'}>
        <p class={'text-2xl md:text-4xl'}>Jingle Jam {useNextJJStartDate().year} starts</p>
        <p class={'font-mono text-2xl md:text-4xl'}>{useJJStartCountdown().toFormat("dd 'Days' hh:mm:ss")}</p>
      </div>
      <p>The Charities Page will be live soon.</p>
    </div>
  )
}

export default CharityPage
