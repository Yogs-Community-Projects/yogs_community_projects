import { loadLocalAndRemote, useFirestoreDB, useJJConfig } from '@ycapp/common'
import { Component, Match, Show, Switch } from 'solid-js'
import { collection, CollectionReference, doc } from 'firebase/firestore'
import { CharityList } from './CharityList'
import { CharityOverview } from './CharityOverview'
import { CurrencyProvider } from '../CurrencyProvider'
import { useTwitchConfig } from '../config/TwitchConfigProvider'
import { twMerge } from 'tailwind-merge'
import { JJData } from '@ycapp/model'
import { LiveDonoTrackerLink } from './LiveDonoTrackerLink'
import { InvisibleBody } from '../InvisibleBody'

const CharityPage: Component = () => {
  const visible = () => useJJConfig().showCharities
  return (
    <>
      <Show when={visible()}>
        <VisibleBody />
      </Show>
      <Show when={!visible()}>
        <InvisibleBody text={'The Charities Page will be live soon.'} />
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
            <LiveDonoTrackerLink />
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

export default CharityPage
