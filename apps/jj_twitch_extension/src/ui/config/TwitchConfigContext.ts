import { Accessor, createContext } from 'solid-js'
import { TwitchConfig } from './TwitchConfig'

interface TwitchConfigContextProps {
  config: TwitchConfig
  setConfig: (config: Partial<TwitchConfig>) => void
  save: () => void
  validConfig: () => boolean
  edited: () => boolean
  channelId: Accessor<string>
}

export const TwitchConfigContext = createContext<TwitchConfigContextProps>()
