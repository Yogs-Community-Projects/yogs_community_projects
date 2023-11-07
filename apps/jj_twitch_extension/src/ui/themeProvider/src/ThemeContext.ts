import { useTwitchConfig } from '../../config/useTwitchConfig'
import { useSearchParams } from '@solidjs/router'
import { Theme } from '../../config/TwitchConfig'
import { createContext } from 'solid-js'

export const useInternalTheme = () => {
  const { config } = useTwitchConfig()
  const [searchParams] = useSearchParams()

  const theme = (): Theme => {
    const searchTheme = searchParams['theme'] as Theme
    const theme = config.theme
    return searchTheme ?? theme
  }

  const tailwindBGAccent = () => {
    switch (theme()) {
      case 'blue':
        return 'bg-primary-500'
      case 'dark':
        return 'bg-gray-500'
      case 'red_light':
        return 'bg-accent-400'
      case 'blue_light':
        return 'bg-primary-400'
      default:
        return 'bg-accent-500'
    }
  }
  const tailwindBGAccent300 = () => {
    switch (theme()) {
      case 'blue':
        return 'bg-primary-300'
      case 'dark':
        return 'bg-gray-600'
      case 'red_light':
        return 'bg-accent-400'
      case 'blue_light':
        return 'bg-primary-400'
      default:
        return 'bg-accent-300'
    }
  }
  const tailwindBGPrimary = () => {
    switch (theme()) {
      case 'blue':
        return 'bg-accent-500'
      case 'dark':
        return 'bg-gray-800'
      case 'red_light':
        return 'bg-primary-400'
      case 'blue_light':
        return 'bg-accent-400'
      default:
        return 'bg-primary-500'
    }
  }
  const tailwindBGPrimary300 = () => {
    switch (theme()) {
      case 'blue':
        return 'bg-accent-300'
      case 'dark':
        return 'bg-gray-600'
      case 'red_light':
        return 'bg-primary-400'
      case 'blue_light':
        return 'bg-accent-400'
      default:
        return 'bg-primary-300'
    }
  }
  const tailwindTextAccent = () => {
    switch (theme()) {
      case 'blue':
        return 'text-primary-500'
      case 'dark':
        return 'text-gray-500'
      case 'red_light':
        return 'text-accent-400'
      case 'blue_light':
        return 'text-primary-400'
      default:
        return 'text-accent-500'
    }
  }
  const tailwindTextPrimary = () => {
    switch (theme()) {
      case 'blue':
        return 'text-accent-500'
      case 'dark':
        return 'text-gray-800'
      case 'red_light':
        return 'text-primary-400'
      case 'blue_light':
        return 'text-accent-400'
      default:
        return 'text-primary-500'
    }
  }

  return {
    theme,
    tailwindBGAccent,
    tailwindBGPrimary,
    tailwindTextAccent,
    tailwindTextPrimary,
    tailwindBGAccent300,
    tailwindBGPrimary300,
  }
}
export const ThemeContext = createContext<ReturnType<typeof useInternalTheme>>()
