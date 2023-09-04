import { loadLocalAndRemote, useFirestoreDB, useJJConfig } from '@ycapp/common'
import { Component, Match, Show, Switch } from 'solid-js'
import { collection, CollectionReference, doc } from 'firebase/firestore'
import { JJData } from './charity_model'
import { CharityList } from './CharityList'
import { CharityOverview } from './CharityOverview'
import { CurrencyProvider } from '../CurrencyProvider'
import { useJJStartCountdown, useNextJJStartDate } from '../schedule/SchedulePage'
import { useTwitchConfig } from '../config/TwitchConfigProvider'
import { twMerge } from 'tailwind-merge'

const visible = () => useJJConfig().showCharities
const CharityPage: Component = () => {
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
  return (
    <CurrencyProvider>
      <div
        class={twMerge(
          'scrollbar-thin scrollbar-corner-primary-100 scrollbar-thumb-accent-500 scrollbar-track-accent-100 h-full overflow-y-auto overflow-x-hidden p-1.5 pt-0',
          config.theme === 'blue'
            ? 'scrollbar-corner-accent-100 scrollbar-thumb-primary-500 scrollbar-track-primary-100'
            : '',
        )}
      >
        <h3 class={'p-0 pb-2 text-center text-xl text-white'}>Charities</h3>
        <Switch>
          <Match when={charityData.data} keyed={true}>
            <CharityOverview data={charityData.data} />
            <div class={'h-3'} />
            <CharityList charityData={charityData.data.tiltify_campaign_data} />
          </Match>
        </Switch>
      </div>
    </CurrencyProvider>
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
