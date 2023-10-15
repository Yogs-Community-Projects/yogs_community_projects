import { useJJConfig } from '@ycapp/common'
import { Component, Match, Show, Switch } from 'solid-js'
import { CharityList } from './CharityList'
import { CharityOverview } from './CharityOverview'
import { CurrencyProvider } from '../CurrencyProvider'
import { LiveDonoTrackerLink } from './LiveDonoTrackerLink'
import { InvisibleBody } from '../InvisibleBody'
import { ColoredScrollbar } from '../../ColoredScrollbar'
import { useData } from '../dataProvider'

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
  const { charityData } = useData()
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
            <div class={'flex h-full w-full flex-col items-center justify-center text-center text-white'}>
              <p>Loading Charities...</p>
            </div>
          </Match>
          <Match when={charityData.error} keyed={false}>
            <p>{charityData.error.message}</p>
          </Match>
        </Switch>
      </ColoredScrollbar>
    </div>
  )
}

export default CharityPage
