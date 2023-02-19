import { JJExtensionConfig } from '@ycapp/model'
import { createContext, ParentComponent, useContext } from 'solid-js'

interface JJConfigProps {
  config: JJExtensionConfig
}

const Context = createContext<JJExtensionConfig>()

export const JJConfigProvider: ParentComponent<JJConfigProps> = props => {
  return <Context.Provider value={props.config}>{props.children}</Context.Provider>
}
export const useJJConfig = () => useContext(Context)
