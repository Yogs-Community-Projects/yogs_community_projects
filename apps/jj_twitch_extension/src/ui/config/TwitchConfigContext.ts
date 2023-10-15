import { createContext } from 'solid-js'
import { TwitchConfig } from './TwitchConfig'

interface TwitchConfigContextProps {
  config: TwitchConfig
  setConfig: (config: Partial<TwitchConfig>) => void
  save: () => void
  validConfig: () => boolean
  edited: () => boolean
}

export const TwitchConfigContext = createContext<TwitchConfigContextProps>()
