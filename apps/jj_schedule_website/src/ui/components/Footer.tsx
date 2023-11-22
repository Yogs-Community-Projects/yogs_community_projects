import { Component, Show } from 'solid-js'
import { FeedbackButtons } from './FeedbackButtons'
import { DateTime } from 'luxon'
import { Button, Dialog } from '@kobalte/core'
import { AnalyticsConsentBody } from './AnalyticsConsent'
import { createModalSignal } from '@ycapp/common'

export const Footer: Component = () => {
  const modalSignal = createModalSignal(false)
  return (
    <div class={'my-2 flex flex-col items-center justify-center'}>
      <div class={'grid grid-cols-1 gap-8 px-4 text-white md:grid-cols-3 md:px-6 md:py-8'}>
        <About />
        <Feedback />
        <Disclaimer />
      </div>

      <Show when={import.meta.env.VITE_BUILD_DATE}>
        <p class={'p-2 text-center text-white'}>
          Website released, {DateTime.fromISO(import.meta.env.VITE_BUILD_DATE).toLocaleString(DateTime.DATETIME_FULL)}
        </p>
      </Show>
      <Button.Root
        class={'text-white underline'}
        onClick={() => {
          modalSignal.open()
        }}
      >
        Analytics Disclaimer
      </Button.Root>

      <Dialog.Root open={modalSignal.isOpen()} onOpenChange={modalSignal.setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay class={'fixed inset-0 z-50 bg-black bg-opacity-20'} />
          <div class={'fixed inset-0 z-50 flex items-center justify-center'}>
            <Dialog.Content class={'h-full w-full max-w-[500px] p-2 lg:w-[min(calc(100vw_-_16px),_500px)] lg:p-16'}>
              <AnalyticsConsentBody open={modalSignal.open} onClose={modalSignal.close} />
            </Dialog.Content>
          </div>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

const About: Component = () => {
  return (
    <div class={'items-center text-center'}>
      <p class={'text-lg'}>About</p>
      <p>
        jinglejam.yogs.app is a site maintained by the community. You can see past Yogscast Jingle Jam Streams including
        links to the VODs.{' '}
        <strong>
          For more information about the Jingle Jam visit{' '}
          <a class={'underline'} href={'https://jinglejam.co.uk'}>
            jinglejam.co.uk
          </a>
        </strong>
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
        jinglejam.yogs.app is a community project and <strong>not associated or endorsed</strong> by the Jingle Jam, the
        Yogscast or their partners.
      </p>
    </div>
  )
}
