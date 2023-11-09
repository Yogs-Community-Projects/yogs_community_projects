import { Component, Match, Show, Switch } from 'solid-js'
import { A } from '@solidjs/router'
import { FaRegularClock, FaSolidHeart, FaSolidPeopleGroup } from 'solid-icons/fa'
import { twMerge } from 'tailwind-merge'
import { useTheme } from '../themeProvider'
import { useTwitchConfig } from '../config/useTwitchConfig'
import { TabType } from '../config/TwitchConfig'

const Yogs = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 1163 1268">
      <path
        id="Auswahl"
        fill="#ffffff"
        stroke="white"
        stroke-width="1"
        d="M 712.00,1.00
           C 719.54,2.41 1042.00,172.00 1042.00,172.00
             1042.00,172.00 806.56,637.00 806.56,637.00
             806.56,637.00 950.00,1176.00 950.00,1176.00
             950.00,1176.00 586.72,1265.88 586.72,1265.88
             586.72,1265.88 442.57,731.10 442.57,731.10
             442.57,731.10 0.00,496.00 0.00,496.00
             0.00,496.00 190.00,144.00 190.00,144.00
             190.00,144.00 545.00,365.00 545.00,365.00
             545.00,365.00 712.00,1.00 712.00,1.00 Z
           M 702.00,576.00"
      />
    </svg>
  )
}

const NavBar: Component = () => {
  const { config } = useTwitchConfig()
  const tab1 = () => config.tab1
  const tab2 = () => config.tab2
  const tab3 = () => config.tab3
  const visibleTabs = () => [config.tab1, config.tab2, config.tab3].filter(t => t !== 'none')
  const visibleTabsLength = () => visibleTabs().length
  const showTabs = () => visibleTabsLength() > 1

  return (
    <>
      <Show when={showTabs()}>
        <div class={`flex w-full flex-row items-center justify-items-stretch p-2 text-white underline`}>
          <TabC href={'/1'} tabType={tab1()} class={'rounded-l-2xl'} />
          <TabC href={'/2'} tabType={tab2()} class={tab3() === 'none' ? 'rounded-r-2xl' : ''} />
          <TabC href={'/3'} tabType={tab3()} class={'rounded-r-2xl'} />
        </div>
      </Show>
      <Show when={!showTabs()}>
        <div class={'h-2'} />
      </Show>
    </>
  )
}
const TabIcon: Component<{ tab: TabType }> = props => {
  return (
    <Switch>
      <Match when={props.tab === 'yogs'}>
        <Yogs />
      </Match>
      <Match when={props.tab === 'charities'}>
        <FaSolidHeart />
      </Match>
      <Match when={props.tab === 'community'}>
        <FaSolidPeopleGroup />
      </Match>
    </Switch>
  )
}

const TabC: Component<{ href: string; tabType: TabType; class?: string }> = props => {
  const { theme } = useTheme()
  const active = () => {
    switch (theme()) {
      case 'blue':
      case 'blue_light':
        return '[&.active]:bg-primary-500'
      case 'dark':
        return '[&.active]:bg-gray-800'
      default:
        return '[&.active]:bg-accent-500'
    }
  }
  const hover = () => {
    switch (theme()) {
      case 'blue':
      case 'blue_light':
        return 'hover:bg-primary-300'
      case 'dark':
        return 'hover:bg-gray-600'
      default:
        return 'hover:bg-accent-300'
    }
  }
  return (
    <Show when={props.tabType !== 'none'}>
      <A
        class={twMerge(
          'group flex h-full w-full flex-1 items-center justify-center border-2 border-white p-1 text-center text-white transition-all',
          active(),
          hover(),
          props.class,
        )}
        href={props.href}
      >
        <TabIcon tab={props.tabType} />
      </A>
    </Show>
  )
}

export default NavBar
