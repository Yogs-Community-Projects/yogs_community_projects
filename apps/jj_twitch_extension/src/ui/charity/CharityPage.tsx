import { loadLocalAndRemote, useFirestoreDB } from '@ycapp/common'
import { Component, Match, Switch } from 'solid-js'
import { collection, CollectionReference, doc } from 'firebase/firestore'
import { JJData } from './charity_model'
import { CharityList } from './CharityList'
import { CharityOverview } from './CharityOverview'

const CharityPage: Component = () => {
  const coll = collection(useFirestoreDB(), 'JJDonationTracker') as CollectionReference<JJData>
  const d = doc<JJData>(coll, 'JJDonationTracker2023')
  const charityData = loadLocalAndRemote('charityData', d, { forceRemote: true, ageInHours: 0 })
  return (
    <div
      class={
        'scrollbar-thin scrollbar-corner-primary-100 scrollbar-thumb-accent-500 scrollbar-track-accent-100 h-full overflow-y-auto overflow-x-hidden p-1.5 pt-0'
      }
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
  )
}

export default CharityPage
