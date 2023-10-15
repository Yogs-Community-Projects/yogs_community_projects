import { Component } from 'solid-js'
import { twMerge } from 'tailwind-merge'

interface LoadingPageProps {
  text?: string
  class?: string
}

export const LoadingPage: Component<LoadingPageProps> = props => {
  return (
    <div class={twMerge('flex h-full w-full flex-col items-center justify-center text-center text-white', props.class)}>
      <p>{props.text ?? 'Loading...'}</p>
    </div>
  )
}

export const LoadingSchedule = () => <LoadingPage text={'Loading Schedule...'} />
export const LoadingCharities = () => <LoadingPage text={'Loading Charities...'} />
export const LoadingFundraisers = () => <LoadingPage text={'Loading community fundraiser...'} />
