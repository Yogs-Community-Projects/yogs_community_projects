import { Component, createSignal } from 'solid-js'
import { ScheduleOverviewComponent } from './ScheduleOverviewComponent'
import { CharitiesOverviewComponent, CharitiesOverviewComponent2 } from './CharityOverviewComponents'
import { FundraiserOverviewComponent } from './FundraiserOverviewComponent'
import { Accordion, Dialog } from '@kobalte/core'
import { BiRegularChevronDown } from 'solid-icons/bi'
import overlay1 from '../../assets/overlay/overlay1.png'
import overlay2 from '../../assets/overlay/overlay2.png'
import { twMerge } from 'tailwind-merge'
import { SimpleScheduleOverviewComponent } from './SimpleScheduleOverviewComponent'
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
  const [open, setOpen] = createSignal(false)
  const [open2, setOpen2] = createSignal(false)

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
        <p class={'text-xl font-bold'}>Feedback on these overlays is very much appreciated.</p>
        <a href={'https://obsproject.com/kb/browser-source'}>How to add a Browser source</a>
        <div class={'visible md:invisible'}>
          <p>Use a desktop to configure the overlays</p>
        </div>
      </div>
      <Body />
      <div
        class={'mx-auto flex w-fit flex-col items-center p-1 text-center text-base text-white md:w-[50%] md:text-2xl'}
      >
        <div class={'p-2'}>
          <p>Screenshots</p>
          <Dialog.Root open={open()} onOpenChange={setOpen}>
            <img
              class={'hover:scale-105 hover:cursor-pointer'}
              src={overlay1}
              alt={'Screenshot from OBS'}
              onclick={() => {
                setOpen(!open())
              }}
              loading={'lazy'}
            />
            <Dialog.Portal>
              <Dialog.Overlay class={'fixed inset-0 z-50 bg-black bg-opacity-20'} />
              <div class={'fixed inset-0 z-50 flex items-center justify-center'}>
                <Dialog.Content class={'h-full w-[90%] p-2'}>
                  <img class={''} src={overlay1} alt={'Screenshot from OBS'} loading={'lazy'} />
                </Dialog.Content>
              </div>
            </Dialog.Portal>
          </Dialog.Root>
          <p class={'text-xs'}>
            A OBS Scene with all available JJ Community Overlays. The background is a screenshot of a Yogscast Jingle
            Jam Stream.
          </p>
        </div>
        <div class={'p-2'}>
          <Dialog.Root open={open2()} onOpenChange={setOpen2}>
            <img
              class={'hover:scale-105 hover:cursor-pointer'}
              src={overlay2}
              alt={'Screenshot from OBS'}
              onclick={() => {
                setOpen2(!open2())
              }}
              loading={'lazy'}
            />
            <Dialog.Portal>
              <Dialog.Overlay class={'fixed inset-0 z-50 bg-black bg-opacity-20'} />
              <div class={'fixed inset-0 z-50 flex items-center justify-center'}>
                <Dialog.Content class={'h-full w-[90%] p-2'}>
                  <img class={''} src={overlay2} alt={'Screenshot from OBS'} loading={'lazy'} />
                </Dialog.Content>
              </div>
            </Dialog.Portal>
          </Dialog.Root>
          <p class={'text-xs'}>Editing the Schedule Browser Source</p>
        </div>
      </div>
    </div>
  )
}

const Body = () => {
  const [expandedItem, setExpandedItem] = createSignal<string[]>([])

  const schedule = () => expandedItem().includes('schedule')
  const customCchedule = () => expandedItem().includes('custom_schedule')
  const fundraiser = () => expandedItem().includes('fundraiser')
  const charities = () => expandedItem().includes('charities')
  const charities2 = () => expandedItem().includes('charities2')
  return (
    <div class={'accent-accent-500 hidden items-center text-base md:flex md:flex-col'}>
      <Accordion.Root collapsible={true} value={expandedItem()} onChange={setExpandedItem} class={''}>
        <Accordion.Item value={'fundraiser'} class={'flex flex-col items-center transition-all'}>
          <Accordion.Header>
            <Accordion.Trigger
              class={
                'hover:scale-102 hover:brightness-102 bg-primary-200/50 border-accent-500 border-1 group m-2 flex w-[30vw] flex-row items-center rounded p-2 text-xl text-white shadow'
              }
            >
              <p class={'flex-1 text-left'}>Community Fundraisers</p>
              <BiRegularChevronDown
                class={twMerge('transition-all group-hover:animate-none', fundraiser() && 'rotate-180 animate-none')}
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content class={'max-w-[90vw] p-2'}>
            <FundraiserOverviewComponent />
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value={'charities'} class={'flex flex-col items-center transition-all'}>
          <Accordion.Header>
            <Accordion.Trigger
              class={
                'hover:scale-102 hover:brightness-102 bg-primary-200/50 border-accent-500 border-1 group m-2 flex w-[30vw] flex-row items-center rounded p-2 text-xl text-white shadow transition-all'
              }
            >
              <p class={'flex-1 text-left'}>Charities</p>
              <BiRegularChevronDown
                class={twMerge('transition-all group-hover:animate-none', charities() && 'rotate-180 animate-none')}
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content class={'max-w-[90vw] p-2'}>
            <CharitiesOverviewComponent />
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value={'charities2'} class={'flex flex-col items-center transition-all'}>
          <Accordion.Header>
            <Accordion.Trigger
              class={
                'hover:scale-102 hover:brightness-102 bg-primary-200/50 border-accent-500 border-1 group m-2 flex w-[30vw] flex-row items-center rounded p-2 text-xl text-white shadow transition-all'
              }
            >
              <p class={'flex-1 text-left'}>Charities 2</p>
              <BiRegularChevronDown
                class={twMerge('transition-all group-hover:animate-none', charities2() && 'rotate-180 animate-none')}
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content class={'max-w-[90vw] p-2'}>
            <CharitiesOverviewComponent2 />
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value={'custom_schedule'} class={'flex flex-col items-center transition-all'}>
          <Accordion.Header>
            <Accordion.Trigger
              class={
                'hover:scale-102 hover:brightness-102 bg-primary-200/50 border-accent-500 border-1 group m-2 flex w-[30vw] flex-row items-center rounded p-2 text-xl text-white shadow transition-all'
              }
            >
              <p class={'flex-1 text-left'}>Custom JJ Schedule</p>
              <BiRegularChevronDown
                class={twMerge(
                  'transition-all group-hover:animate-none',
                  customCchedule() && 'rotate-180 animate-none',
                )}
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content class={'max-w-[90vw] p-2'}>
            <SimpleScheduleOverviewComponent />
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value={'schedule'} class={'flex flex-col items-center transition-all'}>
          <Accordion.Header>
            <Accordion.Trigger
              class={
                'hover:scale-102 hover:brightness-102 bg-primary-200/50 border-accent-500 border-1 group m-2 flex w-[30vw] flex-row items-center rounded p-2 text-xl text-white shadow transition-all'
              }
            >
              <p class={'flex-1 text-left'}>Yogs JJ Schedule</p>
              <BiRegularChevronDown
                class={twMerge('transition-all group-hover:animate-none', schedule() && 'rotate-180 animate-none')}
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content class={'max-w-[90vw] p-2'}>
            <ScheduleOverviewComponent />
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  )
}
