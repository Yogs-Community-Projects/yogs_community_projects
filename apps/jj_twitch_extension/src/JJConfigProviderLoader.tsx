import { Match, ParentComponent, Switch } from 'solid-js'
import { JJConfigProvider, useConfigDB } from '@ycapp/common'

const JJConfigProviderLoader: ParentComponent = props => {
  const jjExtensionConfig = useConfigDB().readJJExtensionConfig()
  return (
    <Switch>
      <Match when={jjExtensionConfig.error}>
        <p>Error: {JSON.parse(jjExtensionConfig.error)}</p>
      </Match>
      <Match when={jjExtensionConfig.loading}>
        <p>Loading...</p>
      </Match>
      <Match when={jjExtensionConfig.data}>
        <JJConfigProvider config={jjExtensionConfig.data}>{props.children}</JJConfigProvider>
      </Match>
    </Switch>
  )
}

export default JJConfigProviderLoader
