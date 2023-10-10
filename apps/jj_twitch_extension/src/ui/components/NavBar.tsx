import { Component, Show } from 'solid-js'
import { A } from '@solidjs/router'
import { FaRegularClock, FaSolidHeart, FaSolidPeopleGroup } from 'solid-icons/fa'
import { TabType, useTwitchConfig } from '../config/TwitchConfigProvider'
import { twMerge } from 'tailwind-merge'
import { useTheme } from '../../ThemeProvider'

const NavBar: Component = () => {
  const { config } = useTwitchConfig()
  const tab1 = () => config.tab1
  const tab2 = () => config.tab2
  const tab3 = () => config.tab3
  const visibleTabs = () => [config.tab1, config.tab2, config.tab3].filter(t => t !== 'none')
  const visibleTabsLength = () => visibleTabs().length
  const showTabs = () => visibleTabsLength() > 1

  return (
    <Show when={showTabs()}>
      <div class={`flex h-8 w-full flex-row items-center justify-items-stretch p-1 pb-0 text-white underline`}>
        <TabC href={'/1'} tabType={tab1()} class={'rounded-l-2xl'} />
        <TabC href={'/2'} tabType={tab2()} class={tab3() === 'none' ? 'rounded-r-2xl' : ''} />
        <TabC href={'/3'} tabType={tab3()} class={'rounded-r-2xl'} />
      </div>
    </Show>
  )
}
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

const TabC: Component<{ href: string; tabType: TabType; class?: string }> = props => {
  const { theme } = useTheme()
  const active = () => {
    switch (theme()) {
      case 'blue':
        return '[&.active]:bg-primary-500'
      case 'dark':
        return '[&.active]:bg-gray-800'
      case 'red_dark':
        return '[&.active]:bg-accent-600'
      case 'blue_dark':
        return '[&.active]:bg-primary-600'
      default:
        return '[&.active]:bg-accent-500'
    }
  }
  const hover = () => {
    switch (theme()) {
      case 'blue':
        return 'hover:bg-primary-300'
      case 'dark':
        return 'hover:bg-gray-600'
      case 'red_dark':
        return 'hover:bg-accent-500'
      case 'blue_dark':
        return 'hover:bg-primary-500'
      default:
        return 'hover:bg-accent-300'
    }
  }
  return (
    <Show when={props.tabType !== 'none'}>
      <A
        class={twMerge(
          'group flex h-full w-full flex-1 justify-center justify-items-center border-2 border-white p-1 text-center text-white transition-all',
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
