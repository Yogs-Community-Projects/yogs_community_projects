import { onMount, ParentComponent } from 'solid-js'
import { createStore } from 'solid-js/store'
import { defaultConfig, TwitchConfig } from './TwitchConfig'
import { TwitchConfigContext } from './TwitchConfigContext'

const TwitchConfigProvider: ParentComponent = props => {
  const [config, setConfig] = createStore<TwitchConfig>(defaultConfig)
  const [originalConfig, setOriginalConfig] = createStore<TwitchConfig>(defaultConfig)
  const twitch = (window as any)?.Twitch?.ext

  const edited = () => {
    return (
      config.tab1 !== originalConfig.tab1 ||
      config.tab2 !== originalConfig.tab2 ||
      config.tab3 !== originalConfig.tab3 ||
      config.theme !== originalConfig.theme
    )
  }

  const configOnChanged = () => {
    if (twitch.configuration.broadcaster) {
      try {
        const config = JSON.parse(twitch.configuration.broadcaster.content)
        if (typeof config === 'object') {
          if (config.tab1 === undefined) {
            setConfig(defaultConfig)
            setOriginalConfig(defaultConfig)
          } else {
            setConfig({ ...config })
            setOriginalConfig({ ...config })
          }
        } else {
          setConfig(defaultConfig)
          setOriginalConfig(defaultConfig)
        }
      } catch (e) {
        setConfig(defaultConfig)
        setOriginalConfig(defaultConfig)
      }
    } else {
      setConfig(defaultConfig)
      setOriginalConfig(defaultConfig)
    }
  }
  const loadConfig = () => {
    if (!twitch) {
      setConfig(defaultConfig)
      return
    }
    if (!twitch.configuration.broadcaster) {
      setConfig(defaultConfig)
    }
    configOnChanged()
    twitch.configuration.onChanged(() => {
      configOnChanged()
    })
  }

  onMount(() => {
    twitch?.onAuthorized(auth => {
      loadConfig()
    })
  })
  const setTwitchConfiguration = (newConfig: Partial<TwitchConfig>) => {
    setConfig({ ...config, ...newConfig })
  }
  const save = () => {
    twitch?.configuration.set('broadcaster', '1', JSON.stringify(config))
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

export default TwitchConfigProvider
