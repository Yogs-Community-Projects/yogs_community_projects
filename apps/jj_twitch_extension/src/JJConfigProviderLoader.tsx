import { Match, ParentComponent, Switch } from 'solid-js'
import { JJConfigProvider, useConfigDB } from '@ycapp/common'
import { LoadingPage } from './ui/components/LoadingPage'

const JJConfigProviderLoader: ParentComponent = props => {
  const config = useConfigDB().readJJExtensionConfig()
  return (
    <Switch>
      <Match when={config.error}>
        <p>Error: {config.error.message}</p>
      </Match>
      <Match when={config.loading}>
        <LoadingPage class={''} />
      </Match>
      <Match when={config.data}>
        <JJConfigProvider config={config.data}>{props.children}</JJConfigProvider>
      </Match>
    </Switch>
  )
}

export default JJConfigProviderLoader
