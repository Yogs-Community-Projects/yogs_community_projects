import { Component, createEffect, createSignal, lazy, Suspense } from 'solid-js'
import { useAnalytics } from '../../AnalyticsProvider'
import { Accordion } from '@kobalte/core'
import { BiRegularChevronDown } from 'solid-icons/bi'
import { twMerge } from 'tailwind-merge'

const BarChartsJJSchedule = lazy(() => import('./BarChartsJJSchedule'))
const BarChartsOnStreamProvider = lazy(() => import('./BarChartsOnStream'))
const StatsPage: Component = () => {
  const { log } = useAnalytics()

  const [expandedItem, setExpandedItem] = createSignal<string[]>([])
  createEffect(() => {
    const items = expandedItem()
    if (items.length > 0) {
      log('stats_open', { overlay: items[0] })
    }
  })
  const donations = () => expandedItem().includes('donations')
  const yogs = () => expandedItem().includes('yogs')
  return (
    <div class={'flex flex-col items-center gap-4'}>
      <p class={'p-2 text-2xl font-bold text-white md:text-4xl'}>Jingle Jam Statistics</p>
      <p class={'block text-center text-white md:hidden'}>This page is currently not optimized for mobile devices.</p>
      <Accordion.Root collapsible={true} value={expandedItem()} onChange={setExpandedItem} class={'hidden md:block'}>
        <Accordion.Item value={'donations'} class={'flex flex-col items-center transition-all'}>
          <Accordion.Header>
            <Accordion.Trigger
              class={
                'hover:scale-102 hover:brightness-102 bg-primary-200/50 border-accent-500 border-1 group m-2 flex w-[30vw] flex-row items-center rounded p-2 text-xl text-white shadow'
              }
            >
              <p class={'flex-1 text-left'}>Donations</p>
              <BiRegularChevronDown
                class={twMerge('transition-all group-hover:animate-none', donations() && 'rotate-180 animate-none')}
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content class={'max-w-[90vw] p-2'}>
            <Suspense fallback={<p class={'text-white'}>Loading...</p>}>
              <BarChartsJJSchedule />
            </Suspense>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value={'yogs'} class={'flex flex-col items-center transition-all'}>
          <Accordion.Header>
            <Accordion.Trigger
              class={
                'hover:scale-102 hover:brightness-102 bg-primary-200/50 border-accent-500 border-1 group m-2 flex w-[30vw] flex-row items-center rounded p-2 text-xl text-white shadow'
              }
            >
              <p class={'flex-1 text-left'}>Yogs & Friends on Stream</p>
              <BiRegularChevronDown
                class={twMerge('transition-all group-hover:animate-none', yogs() && 'rotate-180 animate-none')}
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content class={'flex max-w-[90vw] flex-col items-center p-2'}>
            <Suspense fallback={<p class={'text-white'}>Loading...</p>}>
              <BarChartsOnStreamProvider />
            </Suspense>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  )
}

export default StatsPage
