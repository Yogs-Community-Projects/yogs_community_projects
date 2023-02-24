import { YogsConfigs } from '@ycapp/model'
import { createContext, ParentComponent, useContext } from 'solid-js'

interface JJConfigProps {
  config: YogsConfigs
}

const Context = createContext<YogsConfigs>()

export const JJConfigProvider: ParentComponent<JJConfigProps> = props => {
  return <Context.Provider value={props.config}>{props.children}</Context.Provider>
}
export const useJJConfig = () => useContext(Context)
