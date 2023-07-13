import { Component } from 'solid-js'
import { ScheduleOverviewComponent } from './ScheduleOverviewComponent'
import { CharitiesOverviewComponent, CharitiesOverviewComponent2 } from './CharityOverviewComponents'
import { FundraiserOverviewComponent } from './FundraiserOverviewComponent'

export const OverlayOverview: Component = () => {
  return (
    <div class={'p-4'}>
      <p class={'text-3xl'}>JJ OBS Overlays</p>
      <p>
        These are JJ related overlays meant to be used in OBS Browser sources. Use these links and add them to your obs
        scenes.
      </p>
      <p class={'text-xl font-bold text-red-600'}>
        These are still work in progress. For demo purposes these overlays use data from 2022
      </p>
      <a href={'https://obsproject.com/kb/browser-source#:~:text=Description,video%2C%20and%20even%20audio%20tasks.'}>
        How to add a Browser source
      </a>
      <div class={'grid grid-cols-2'}>
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
