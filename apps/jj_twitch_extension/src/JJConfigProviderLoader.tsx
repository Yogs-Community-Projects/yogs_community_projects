import { Match, ParentComponent, Switch } from 'solid-js'
import { JJConfigProvider } from '@ycapp/common'
import { LoadingPage } from './ui/components/LoadingPage'
import { collection, CollectionReference, doc, Firestore } from 'firebase/firestore'
import { useFirestore } from 'solid-firebase'
import { JJExtensionConfig } from '@ycapp/model'

const JJConfigProviderLoader: ParentComponent<{ db: Firestore }> = props => {
  const coll = collection(props.db, 'Config') as CollectionReference<JJExtensionConfig>
  const d = doc<JJExtensionConfig>(coll, 'TwitchExtensionConfig')
  const config = useFirestore(d)
  return (
    <Switch>
      <Match when={config.error}>
        <p>JJConfigProviderLoader Error: {config.error.message}</p>
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
