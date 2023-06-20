import { ParentComponent } from 'solid-js'
import YcDBDummyProvider from '../db/dummy_db_provider'

const ExtensionDBDummyProvider: ParentComponent = props => {
  return <YcDBDummyProvider>{props.children}</YcDBDummyProvider>
}

export default ExtensionDBDummyProvider
