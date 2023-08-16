import { Component } from 'solid-js'
import { ScheduleOverviewComponent } from './ScheduleOverviewComponent'
import { CharitiesOverviewComponent, CharitiesOverviewComponent2 } from './CharityOverviewComponents'
import { FundraiserOverviewComponent } from './FundraiserOverviewComponent'
import { Accordion } from '@kobalte/core'
import { BiRegularChevronDown } from 'solid-icons/bi'
import overlay1 from '../../assets/overlay/overlay1.png'
import overlay2 from '../../assets/overlay/overlay2.png'
/*
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
*/

export const OverlayOverview: Component = () => {
  return (
    <div class={''}>
      <div
        class={'mx-auto flex w-fit flex-col items-center p-1 text-center text-base text-white md:w-[50%] md:text-2xl'}
      >
        <p class={'p-1 text-2xl font-bold md:p-2 md:text-4xl'}>JJ Community OBS Overlays</p>
        <p>
          These are JJ related overlays are meant to be used in an <a href={'https://obsproject.com/'}>OBS</a> browser
          sources. Configure the Overlays and use these links and add them to your{' '}
          <a href={'https://obsproject.com/'}>OBS</a> scenes.
        </p>
        <p class={'text-xl font-bold'}>
          The Overlays are still work in progress. For demo purposes data from 2022 is used.
        </p>
        <a href={'https://obsproject.com/kb/browser-source'}>How to add a Browser source</a>
        <div class={'visible md:invisible'}>
          <p>Use a desktop to configure the overlays</p>
        </div>
      </div>
      <div class={'accent-accent-500 hidden text-left text-base md:flex'}>
        <Accordion.Root collapsible={true}>
          <Accordion.Item value={'schedule'}>
            <Accordion.Header>
              <Accordion.Trigger class={'hover:bg-accent-500/50 flex flex-row items-center p-2 text-xl text-white'}>
                <p>Yogs JJ Schedule</p>
                <BiRegularChevronDown />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content class={'p-2'}>
              <ScheduleOverviewComponent />
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value={'fundraiser'}>
            <Accordion.Header>
              <Accordion.Trigger class={'hover:bg-accent-500/50 flex flex-row items-center p-2 text-xl text-white'}>
                <p>Community Fundraisers</p>
                <BiRegularChevronDown />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content class={'p-2'}>
              <FundraiserOverviewComponent />
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value={'charities'}>
            <Accordion.Header>
              <Accordion.Trigger class={'hover:bg-accent-500/50 flex flex-row items-center p-2 text-xl text-white'}>
                <p>Charities</p>
                <BiRegularChevronDown />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content class={'p-2'}>
              <CharitiesOverviewComponent />
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value={'charities2'}>
            <Accordion.Header>
              <Accordion.Trigger class={'hover:bg-accent-500/50 flex flex-row items-center p-2 text-xl text-white'}>
                <p>Charities 2</p>
                <BiRegularChevronDown />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content class={'p-2'}>
              <CharitiesOverviewComponent2 />
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>

      <div
        class={'mx-auto flex w-fit flex-col items-center p-1 text-center text-base text-white md:w-[50%] md:text-2xl'}
      >
        <div class={'p-2'}>
          <p>Screenshots</p>
          <img src={overlay1} alt={'Screenshot from OBS'} />
          <p class={'text-xs'}>
            A OBS Scene with all available JJ Community Overlays. The background is a screenshot of a Yogscast Jingle
            Jam Stream.
          </p>
        </div>
        <div class={'p-2'}>
          <img src={overlay2} alt={'Screenshot from OBS'} />
          <p class={'text-xs'}>Editing the Schedule Browser Source</p>
        </div>
      </div>
    </div>
  )
}
