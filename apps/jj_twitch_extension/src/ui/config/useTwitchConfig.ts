import { useContext } from 'solid-js'
import { TwitchConfigContext } from './TwitchConfigContext'

export const useTwitchConfig = () => useContext(TwitchConfigContext)
