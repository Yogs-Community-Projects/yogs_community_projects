import YcDBDummyProvider from '@ycapp/common/src/db/dummy_db_provider'
import { ParentComponent } from 'solid-js'

const ExtensionDBDummyProvider: ParentComponent = props => {
  return <YcDBDummyProvider>{props.children}</YcDBDummyProvider>
}

export default ExtensionDBDummyProvider
