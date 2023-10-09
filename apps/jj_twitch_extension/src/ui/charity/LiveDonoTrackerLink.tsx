import { useJJConfig } from '@ycapp/common'
import { Component, Show } from 'solid-js'
import { useTheme } from '../../ThemeProvider'
import { twMerge } from 'tailwind-merge'

export const LiveDonoTrackerLink: Component = () => {
  const extensionConfig = useJJConfig()
  const { tailwindBGAccent, theme } = useTheme()

  const pulseColor = () => {
    switch (theme()) {
      case 'blue':
      case 'blue_dark':
        return 'bg-blue-400'
      default:
        return 'bg-red-400'
    }
  }
  const pulseFGColor = () => {
    switch (theme()) {
      case 'blue':
      case 'blue_dark':
        return 'bg-blue-500'
      default:
        return 'bg-red-500'
    }
  }

  return (
    <Show when={extensionConfig.donationTrackerUrl && extensionConfig.donationTrackerUrl !== ''}>
      <a
        class={twMerge(
          'min-h-24 hover:scale-102 bg-accent-500 flex w-full flex-row items-center justify-center rounded-2xl p-1 text-center text-white shadow-xl transition-all hover:shadow-2xl hover:brightness-105',
          tailwindBGAccent(),
        )}
        href={extensionConfig.donationTrackerUrl}
        target={'_blank'}
      >
        <span class="relative mr-4 flex h-3 w-3">
          <span
            class={twMerge(
              'absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75',
              pulseColor(),
            )}
          />
          <span class={twMerge('relative inline-flex h-full w-full rounded-full bg-red-500', pulseFGColor())} />
        </span>
        Live Donation Tracker
      </a>
      <div class={'h-3'} />
    </Show>
  )
}
