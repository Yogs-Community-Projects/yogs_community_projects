import { createContext, createEffect, onMount, ParentComponent, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'

export type TabType = 'yogs' | 'charities' | 'community' | 'none'

interface TwitchConfig {
  tab1: TabType
  tab2: TabType
  tab3: TabType
  theme: 'red' | 'blue'
}

interface TwitchConfigContextProps {
  config: TwitchConfig
  setConfig: (config: Partial<TwitchConfig>) => void
  save: () => void
  validConfig: () => boolean
  edited: () => boolean
}

const TwitchConfigContext = createContext<TwitchConfigContextProps>()

const defaultConfig: TwitchConfig = {
  tab1: 'yogs',
  tab2: 'charities',
  tab3: 'community',
  theme: 'red',
}

export const TwitchConfigProvider: ParentComponent = props => {
  const [config, setConfig] = createStore<TwitchConfig>(defaultConfig)
  const [originalConfig, setOriginalConfig] = createStore<TwitchConfig>(defaultConfig)
  const twitch = (window as any)?.Twitch?.ext

  createEffect(() => {
    console.log('TwitchConfigProvider', 'effect', config)
  })

  const edited = () => {
    return (
      config.tab1 !== originalConfig.tab1 ||
      config.tab2 !== originalConfig.tab2 ||
      config.tab3 !== originalConfig.tab3 ||
      config.theme !== originalConfig.theme
    )
  }

  const configOnChanged = () => {
    console.log('TwitchConfigProvider', 'configOnChanged', twitch.configuration.broadcaster)
    if (twitch.configuration.broadcaster) {
      try {
        const config = JSON.parse(twitch.configuration.broadcaster.content)
        console.log('TwitchConfigProvider', 'loaded', config)
        if (typeof config === 'object') {
          console.log('TwitchConfigProvider', 'loaded', 'config === object')
          if (config.tab1 === undefined) {
            console.log('TwitchConfigProvider', 'loaded', 'config.showThirdTab === undefined')
            setConfig(defaultConfig)
            setOriginalConfig(defaultConfig)
          } else {
            setConfig({ ...config })
            setOriginalConfig({ ...config })
          }
        } else {
          console.log('TwitchConfigProvider', 'Invalid config')
          setConfig(defaultConfig)
          setOriginalConfig(defaultConfig)
        }
      } catch (e) {
        console.log('TwitchConfigProvider', 'Invalid config', e)
        setConfig(defaultConfig)
        setOriginalConfig(defaultConfig)
      }
    } else {
      console.log('TwitchConfigProvider', '!twitch.configuration.broadcaste')
      setConfig(defaultConfig)
      setOriginalConfig(defaultConfig)
    }
  }
  const loadConfig = () => {
    console.log('TwitchConfigProvider', 'loadConfig')
    if (!twitch) {
      console.log('TwitchConfigProvider', '!twitch')
      setConfig(defaultConfig)
      return
    }
    if (!twitch.configuration.broadcaster) {
      console.log('!twitch.configuration.broadcaster')
      setConfig(defaultConfig)
    }
    console.log('TwitchConfigProvider', 'twitch', twitch)
    configOnChanged()
    twitch.configuration.onChanged(() => {
      console.log('TwitchConfigProvider', 'onChanged', twitch.configuration.broadcaster)
      configOnChanged()
    })
  }

  onMount(() => {
    console.log('TwitchConfigProvider', 'onMount')
    twitch?.onAuthorized(auth => {
      console.log('TwitchConfigProvider', 'auth', auth)
      loadConfig()
    })
  })
  const setTwitchConfiguration = (newConfig: Partial<TwitchConfig>) => {
    setConfig({ ...config, ...newConfig })
    console.log('setTwitchConfiguration', config)
  }
  const save = () => {
    twitch?.configuration.set('broadcaster', '1', JSON.stringify(config))
    console.log('save', config)
    setOriginalConfig(config)
  }

  const validConfig = () => {
    const t12 = config.tab1 !== config.tab2 || (config.tab1 === 'none' && config.tab2 === 'none')
    const t13 = config.tab1 !== config.tab3 || (config.tab1 === 'none' && config.tab3 === 'none')
    const t23 = config.tab2 !== config.tab3 || (config.tab2 === 'none' && config.tab3 === 'none')
    return t12 && t13 && t23
  }

  return (
    <TwitchConfigContext.Provider
      value={{
        config,
        setConfig: setTwitchConfiguration,
        save,
        validConfig,
        edited,
      }}
    >
      {props.children}
    </TwitchConfigContext.Provider>
  )
}

export const useTwitchConfig = () => useContext(TwitchConfigContext)
