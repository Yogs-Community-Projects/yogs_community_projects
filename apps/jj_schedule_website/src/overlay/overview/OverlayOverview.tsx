import { Component } from 'solid-js'
import { ScheduleOverviewComponent } from './ScheduleOverviewComponent'
import { CharitiesOverviewComponent, CharitiesOverviewComponent2 } from './CharityOverviewComponents'
import { FundraiserOverviewComponent } from './FundraiserOverviewComponent'

export const OverlayOverview: Component = () => {
  return (
    <div class={'p-4'}>
      <p class={'text-3xl'}>JJ OBS Overlays</p>
      <p>
        These are JJ related overlays meant to be used in <a href={'https://obsproject.com/'}>OBS</a> browser sources.
        Configure the Overlays and use these links and add them to your <a href={'https://obsproject.com/'}>OBS</a>{' '}
        scenes.
      </p>
      <p class={'text-xl font-bold text-red-600'}>
        The Overlays are still work in progress. For demo purposes data from 2022 is used.
      </p>
      <a href={'https://obsproject.com/kb/browser-source#:~:text=Description,video%2C%20and%20even%20audio%20tasks.'}>
        How to add a Browser source
      </a>
      <div class={'visible md:invisible'}>
        <p>Use a desktop to configure your overlays</p>
      </div>
      <div class={'hidden grid-cols-2 md:grid'}>
        <ScheduleOverviewComponent />
        <div>
          <FundraiserOverviewComponent />
          <CharitiesOverviewComponent />
          <CharitiesOverviewComponent2 />
        </div>
      </div>
    </div>
  )
}
