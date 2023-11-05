import { YcDBProvider } from '@ycapp/common'
import { ParentComponent } from 'solid-js'

const DBWrapper: ParentComponent = props => {
  return <YcDBProvider initAnalytics={true}>{props.children}</YcDBProvider>
}

export default DBWrapper
