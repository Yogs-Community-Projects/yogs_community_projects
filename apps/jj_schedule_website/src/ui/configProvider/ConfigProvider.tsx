import { Component, createContext, Match, ParentComponent, Switch, useContext } from 'solid-js'
import { LoadingPage } from 'jj_twitch_extension/src/ui/components/LoadingPage'
import { useConfigDB } from '@ycapp/common'

import { JJWebsiteConfig } from '@ycapp/model'
import { Outlet } from '@solidjs/router'
import { p } from 'vitest/dist/index-2dd51af4'

const ConfigContext = createContext<JJWebsiteConfig>()

const ConfigProvider: ParentComponent<{ config: JJWebsiteConfig }> = props => {
  return <ConfigContext.Provider value={props.config}>{props.children}</ConfigContext.Provider>
}
export const useConfig = () => useContext(ConfigContext)

export const ConfigProviderLoader: ParentComponent = props => {
  const config = useConfigDB().readJJWebsiteConfig()
  return (
    <Switch>
      <Match when={config.error}>
        <p>JJConfigProviderLoader Error: {config.error.message}</p>
      </Match>
      <Match when={config.loading}>
        <LoadingPage class={''} />
      </Match>
      <Match when={config.data}>
        <ConfigProvider config={config.data}>{props.children}</ConfigProvider>
      </Match>
    </Switch>
  )
}
