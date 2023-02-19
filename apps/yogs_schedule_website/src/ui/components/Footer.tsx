import { Component, Show } from 'solid-js'
import { DateTime } from 'luxon'
import { FeedbackButtons } from './FeedbackButtons'

export const Footer: Component = () => {
  return (
    <div>
      <div class={'grid grid-cols-1 gap-8 px-6 py-8 text-white md:grid-cols-3'}>
        <About />
        <Feedback />
        <Disclaimer />
      </div>
      <Show when={import.meta.env.VITE_BUILD_DATE}>
        <p class={'p-2 text-center text-white'}>
          Website released, {DateTime.fromISO(import.meta.env.VITE_BUILD_DATE).toLocaleString(DateTime.DATETIME_FULL)}
        </p>
      </Show>
    </div>
  )
}

const About: Component = () => {
  return (
    <div class={'items-center text-center'}>
      <p class={'text-lg'}>About</p>
      <p>
        schedule.yogs.app is a site maintained by the community and shows all Yogscast Creators, their streams and
        currently offline Twitch channel.
      </p>
    </div>
  )
}

const Feedback: Component = () => {
  return (
    <div class={'flex flex-col items-center justify-center text-center'}>
      <p class={'text-lg'}>Feedback</p>
      <p>Feedback is always appreciated.</p>
      <FeedbackButtons />
    </div>
  )
}

const Disclaimer: Component = () => {
  return (
    <div class={'items-center text-center'}>
      <p class={'text-lg'}>Disclaimer</p>
      <p>
        schedule.yogs.app is a community project and <strong>not associated or endorsed</strong> by the Yogscast or
        their partners.
      </p>
    </div>
  )
}
