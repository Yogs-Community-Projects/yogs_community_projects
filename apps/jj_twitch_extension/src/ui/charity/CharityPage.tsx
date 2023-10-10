import { loadLocalAndRemote, useFirestoreDB, useJJConfig } from '@ycapp/common'
import { Component, Match, Show, Switch } from 'solid-js'
import { collection, CollectionReference, doc } from 'firebase/firestore'
import { CharityList } from './CharityList'
import { CharityOverview, CharityOverviewLoading } from './CharityOverview'
import { CurrencyProvider } from '../CurrencyProvider'
import { useTwitchConfig } from '../config/TwitchConfigProvider'
import { twMerge } from 'tailwind-merge'
import { JJData } from '@ycapp/model'
import { LiveDonoTrackerLink } from './LiveDonoTrackerLink'
import { InvisibleBody } from '../InvisibleBody'
import { Transition, TransitionGroup } from 'solid-transition-group'
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
  const { config } = useTwitchConfig()

  const overview = () => {
    if (charityData.data) {
      return (
        <CurrencyProvider avgConversionRate={charityData?.data?.avgConversionRate}>
          <CharityOverview data={charityData.data} />
        </CurrencyProvider>
      )
    }
    return <CharityOverviewLoading />
  }

  function onEnter(el: Element, done: VoidFunction) {
    const a = el.animate([{ opacity: 0.5 }, { opacity: 1 }], { duration: 500, easing: 'ease' })
    a.finished.then(done)
  }
  function onExit(el: Element, done: VoidFunction) {
    const a = el.animate([{ opacity: 1 }, { opacity: 0.5 }], { duration: 500, easing: 'ease' })
    a.finished.then(done)
  }

  return (
    <ColoredScrollbar>
      <h3 class={'pb-2 text-center text-xl text-white'}>Charities</h3>
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
  )
}

export default CharityPage
