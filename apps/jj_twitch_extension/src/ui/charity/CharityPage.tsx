import { loadLocalAndRemote, useFirestoreDB, useJJConfig } from '@ycapp/common'
import { Component, Match, Show, Switch } from 'solid-js'
import { collection, CollectionReference, doc } from 'firebase/firestore'
import { CharityList } from './CharityList'
import { CharityOverview } from './CharityOverview'
import { CurrencyProvider } from '../CurrencyProvider'
import { JJData } from '@ycapp/model'
import { LiveDonoTrackerLink } from './LiveDonoTrackerLink'
import { InvisibleBody } from '../InvisibleBody'
import { ColoredScrollbar } from '../../ColoredScrollbar'

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

  return (
    <div class={'flex h-full flex-1 flex-col'}>
      <h3 class={'mb-2 text-center text-xl text-white'}>Charities</h3>
      <ColoredScrollbar>
        <Switch>
          <Match when={charityData.data && !charityData.loading}>
            <CurrencyProvider avgConversionRate={charityData?.data?.avgConversionRate}>
              <CharityOverview data={charityData.data} />
              <div class={'h-2'} />
              <LiveDonoTrackerLink />
              <CharityList charityData={charityData.data.causes} />
            </CurrencyProvider>
          </Match>
          <Match when={charityData.loading && !charityData.data}>
            <p>Loading</p>
          </Match>
        </Switch>
      </ColoredScrollbar>
    </div>
  )
}

export default CharityPage
