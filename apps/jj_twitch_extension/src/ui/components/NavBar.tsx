import { Component, createSignal, JSX, Show } from 'solid-js'
import { A } from '@solidjs/router'
import { FaRegularClock, FaSolidHeart, FaSolidPeopleGroup } from 'solid-icons/fa'
import { TabType, useTwitchConfig } from '../config/TwitchConfigProvider'
import { twMerge } from 'tailwind-merge'
const tab1 = () => useTwitchConfig().config.tab1
const tab2 = () => useTwitchConfig().config.tab2
const tab3 = () => useTwitchConfig().config.tab3

const [navState, setNavState] = createSignal('/')

const active =
  'bg-accent-500 h-full w-full border-2 border-white transition-all text-white text-center justify-items-center'

const inActive =
  'hover:bg-accent-300 h-full w-full border-2 border-white transition-all text-white text-center justify-items-center'

const state = link => {
  if (link == navState()) {
    return active + ' flex justify-center p-1'
  }
  return inActive + ' flex justify-center p-1'
}
const Home = ({ classes = '' }) => (
  <A href={'/0'}>
    <button class={state('/0') + ' ' + classes} onclick={() => setNavState('/')}>
      <FaRegularClock />
    </button>
  </A>
)

const Charity = ({ classes = '' }) => (
  <A href={'/1'}>
    <button class={state('/1') + ' ' + classes} onclick={() => setNavState('/charities')}>
      <FaSolidHeart />
    </button>
  </A>
)

const Fundraiser = ({ classes = '' }) => (
  <A href={'/2'}>
    <button class={state('/community') + ' ' + classes} onclick={() => setNavState('/community')}>
      <FaSolidPeopleGroup />
    </button>
  </A>
)
const NavBar: Component = () => {
  const { config } = useTwitchConfig()
  const visibleTabs = () => [config.tab1, config.tab2, config.tab3].filter(t => t !== 'none')
  const visibleTabsLength = () => visibleTabs().length
  const showTabs = () => visibleTabsLength() > 1

  const tabs = () => {
    const t: JSX.Element[] = []

    if (tab2() !== 'none') {
      t.push(
        <A class={'flex-1'} href={`/2`}>
          <button
            class={twMerge(state(`/2`), tab3() === 'none' ? 'rounded-r-2xl' : '')}
            onclick={() => setNavState(`/2`)}
          >
            <TabIcon tab={tab2()} />
          </button>
        </A>,
      )
    }

    if (tab3() !== 'none') {
      t.push(
        <A class={'flex-1'} href={`/3`}>
          <button class={twMerge(state(`/3`), 'rounded-r-2xl')} onclick={() => setNavState(`/3`)}>
            <TabIcon tab={tab3()} />
          </button>
        </A>,
      )
    }
    return t
    /*
    return visibleTabs().map((tab, i) => {
      if (i === 0) {
        return (
          <Show when={tab !== 'none'}>
            <A class={'flex-1'} href={`/${i + 1}`}>
              <button class={`${state(`/${i + 1}`)} rounded-l-2xl`} onclick={() => setNavState(`/${i + 1}`)}>
                <TabIcon tab={tab} />
              </button>
            </A>
          </Show>
        )
      } else if (i === visibleTabsLength() - 1) {
        return (
          <Show when={tab !== 'none'}>
            <A class={'flex-1'} href={`/${i + 1}`}>
              <button class={`${state(`/${i + 1}`)} rounded-r-2xl`} onclick={() => setNavState(`/${i + 1}`)}>
                <TabIcon tab={tab} />
              </button>
            </A>
          </Show>
        )
      }
      return (
        <Show when={tab !== 'none'}>
          <A class={'flex-1'} href={`/${i + 1}`}>
            <button class={`${state(`/${i + 1}`)}`} onclick={() => setNavState(`/${i + 1}`)}>
              <TabIcon tab={tab} />
            </button>
          </A>
        </Show>
      )
    })
    */
  }

  return (
    <Show when={showTabs()}>
      <div class={`flex h-12 w-full flex-row items-center justify-items-stretch p-1 pb-0 text-white underline`}>
        <Tab1 />
        {...tabs()}
      </div>
    </Show>
  )
}
/*
<Show when={!import.meta.env.PROD}>
          <A class={'flex-1'} href={'/config'}>
            <button class={state('/config') + ' rounded-r-2xl'} onclick={() => setNavState('/config')}>
              <TabIcon tab={config.tab3} />
            </button>
          </A>
        </Show>
 */

const TabIcon: Component<{ tab: TabType }> = props => {
  switch (props.tab) {
    case 'yogs':
      return <FaRegularClock />
    case 'charities':
      return <FaSolidHeart />
    case 'community':
      return <FaSolidPeopleGroup />
  }
}

const Tab1: Component = () => {
  const { config } = useTwitchConfig()
  return (
    <A class={'flex-1'} href={`/1`}>
      <button class={twMerge(state(`/1`), 'rounded-l-2xl')} onclick={() => setNavState(`/1`)}>
        <TabIcon tab={config.tab1} />
      </button>
    </A>
  )
}

export default NavBar
