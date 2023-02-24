import { YogsExtensionConfig } from '@ycapp/model'
import { createContext, ParentComponent, useContext } from 'solid-js'

interface YogsExtensionConfigProviderProps {
  config: YogsExtensionConfig
}

const YogsExtensionConfigProviderContext = createContext<YogsExtensionConfig>()

export const YogsExtensionConfigProviderProvider: ParentComponent<YogsExtensionConfigProviderProps> = props => {
  return (
    <YogsExtensionConfigProviderContext.Provider value={props.config}>
      {props.children}
    </YogsExtensionConfigProviderContext.Provider>
  )
}

export const useYogsExtensionConfig = () => useContext(YogsExtensionConfigProviderContext)!
