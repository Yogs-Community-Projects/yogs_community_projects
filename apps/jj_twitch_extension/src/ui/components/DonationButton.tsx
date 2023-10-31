import { useJJConfig } from '@ycapp/common'
import { Component, Show } from 'solid-js'
import { useTwitchConfig } from '../config/useTwitchConfig'
import { twMerge } from 'tailwind-merge'
import { Theme } from '../config/TwitchConfig'
import { useSearchParams } from '@solidjs/router'

export const DonationButton: Component = () => {
  const jjConfig = useJJConfig()
  const { config } = useTwitchConfig()

  const [searchParams] = useSearchParams()
  const theme = (): Theme => {
    const searchTheme = searchParams['theme'] as Theme
    const theme = config.theme
    return searchTheme ?? theme
  }

  const url = () => {
    if (!config.donationUrl || config.donationUrl === '') {
      return jjConfig.donationLink.url
    }
    return config.donationUrl
  }

  const gradient = () => {
    switch (theme()) {
      case 'blue':
        return 'bg-gradient-to-br from-primary-400 to-primary-500'
      case 'dark':
        return 'bg-gradient-to-br from-gray-400 to-gray-500'
      case 'red_dark':
        return 'bg-gradient-to-br from-accent-500 to-accent-600'
      case 'blue_dark':
        return 'bg-gradient-to-br from-primary-500 to-primary-600'
      default:
        return 'bg-gradient-to-br from-accent-400 to-accent-500'
    }
  }
  return (
    <Show when={jjConfig.donationLink.visible}>
      <a
        class={twMerge(
          'hover:scale-102 bg-accent-500 flex w-full flex-row items-center justify-center rounded-2xl p-0.5 text-center text-white shadow-xl transition-all hover:shadow-2xl hover:brightness-105',
          gradient(),
        )}
        href={url()}
        target={'_blank'}
      >
        {jjConfig.donationLink.text ?? 'Donate'}
      </a>
    </Show>
  )
}
