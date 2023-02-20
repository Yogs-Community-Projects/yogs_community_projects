import { LoadingSpinner } from './LoadingSpinner'
import { Component } from 'solid-js'

interface LoadingProps {}

export const Loading: Component<LoadingProps> = props => {
  return (
    <div class={'flex flex-row items-center justify-center'}>
      <LoadingSpinner />
      <p class={'text-xl text-white'}>Loading...</p>
    </div>
  )
}
