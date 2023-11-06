import { Dialog } from '@kobalte/core'
import { createModalSignal } from '@ycapp/common'
import { Component, createSignal, Show } from 'solid-js'
import { Accessor } from 'solid-js/types/reactive/signal'
import { useAnalytics } from '../../AnalyticsProvider'

export const AnalyticsConsent: Component = () => {
  const showDisclaimerAnalyticsLocalStorage = localStorage?.getItem('showDisclaimerAnalytics') ?? null
  const acceptAnalytics = (localStorage?.getItem('acceptAnalytics') ?? null) === 'true'
  const showDisclaimerAnalytics = showDisclaimerAnalyticsLocalStorage == null
  const modalSignal = createModalSignal(showDisclaimerAnalytics)
  //install(import.meta.env.VITE_GTAG, { anonymize_ip: true })

  const { grantConsent, deniedConsent, installGTag } = useAnalytics()
  installGTag()
  if (acceptAnalytics) {
    grantConsent()
  } else {
    deniedConsent()
  }
  return (
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
  )
}
export const AnalyticsConsentDialog: Component = () => {
  const showDisclaimerAnalyticsLocalStorage = localStorage?.getItem('showDisclaimerAnalytics') ?? null
  const acceptAnalytics = (localStorage?.getItem('acceptAnalytics') ?? null) === 'true'
  const showDisclaimerAnalytics = showDisclaimerAnalyticsLocalStorage == null
  const modalSignal = createModalSignal(showDisclaimerAnalytics)
  //install(import.meta.env.VITE_GTAG, { anonymize_ip: true })

  const { grantConsent, deniedConsent, installGTag } = useAnalytics()
  installGTag()
  if (acceptAnalytics) {
    grantConsent()
  } else {
    deniedConsent()
  }
  return (
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
  )
}
export const AnalyticsConsentBanner: Component = () => {
  const showDisclaimerAnalyticsLocalStorage = localStorage?.getItem('showDisclaimerAnalytics') ?? null
  const acceptAnalytics = (localStorage?.getItem('acceptAnalytics') ?? null) === 'true'
  const showDisclaimerAnalytics = showDisclaimerAnalyticsLocalStorage == null
  // const modalSignal = createModalSignal(showDisclaimerAnalytics)
  const [show, setShow] = createSignal(showDisclaimerAnalytics)
  //install(import.meta.env.VITE_GTAG, { anonymize_ip: true })

  const { grantConsent, deniedConsent, installGTag } = useAnalytics()
  installGTag()
  if (acceptAnalytics) {
    grantConsent()
  } else {
    deniedConsent()
  }
  return (
    <Show when={show()}>
      <AnalyticsConsentBannerBody open={show} onClose={() => setShow(false)} />
    </Show>
  )
}

interface AnalyticsConsentBodyProps {
  open: Accessor<boolean>
  onClose: () => void
}

export const AnalyticsConsentBody: Component<AnalyticsConsentBodyProps> = props => {
  const { onClose } = props
  const { grantConsent, deniedConsent } = useAnalytics()
  const onDecline = () => {
    localStorage?.setItem('showDisclaimerAnalytics', 'false')
    localStorage?.setItem('acceptAnalytics', 'false')
    deniedConsent()
    onClose()
  }
  const onAccept = () => {
    localStorage?.setItem('showDisclaimerAnalytics', 'false')
    localStorage?.setItem('acceptAnalytics', 'true')
    grantConsent()
    onClose()
  }

  return (
    <div class={`flex h-full w-full flex-col rounded-3xl bg-white`}>
      <div class={`bg-primary flex h-[72px] items-center justify-center rounded-t-3xl p-2 shadow-xl`}>
        <h3 class={'text-2xl text-white'}>Disclaimer and Analytics</h3>
      </div>
      <div class={'flex w-full flex-1 flex-col overflow-auto p-4'}>
        <p class={'text-xl'}>
          jinglejam.yogs.app is a fan project and not associated or endorsed by the Yogscast or their partners.
        </p>
        <p class={'text-xl'}>
          jinglejam.yogs.app uses Google Analytics 4 which collects Anonymous data about the usage of this site, the
          duration of the visit and the country the site is visited from.
        </p>
      </div>
      <div class={'flex h-[72px] flex-row items-center justify-end gap-2 p-4'}>
        <button class={'rounded-xl p-2'} onClick={onDecline}>
          Decline
        </button>
        <button class={'bg-primary rounded-xl p-2 text-white'} onClick={onAccept}>
          Accept
        </button>
      </div>
    </div>
  )
}

export const AnalyticsConsentBannerBody: Component<AnalyticsConsentBodyProps> = props => {
  const { onClose } = props
  const { grantConsent, deniedConsent } = useAnalytics()
  const onDecline = () => {
    localStorage?.setItem('showDisclaimerAnalytics', 'false')
    localStorage?.setItem('acceptAnalytics', 'false')
    deniedConsent()
    onClose()
  }
  const onAccept = () => {
    localStorage?.setItem('showDisclaimerAnalytics', 'false')
    localStorage?.setItem('acceptAnalytics', 'true')
    grantConsent()
    onClose()
  }

  return (
    <div class={`m-2 flex w-[90%] flex-col rounded-3xl bg-white md:w-[40%]`}>
      <div class={`text-xxs bg-primary flex h-16 items-center justify-center rounded-t-3xl p-2 shadow-xl`}>
        <h3 class={'text-lg text-white'}>Disclaimer and Analytics</h3>
      </div>
      <div class={'flex w-full flex-1 flex-col overflow-auto p-4'}>
        <p class={'text-sm'}>
          jinglejam.yogs.app is a fan project and not associated or endorsed by the Yogscast or their partners.
        </p>
        <p class={'text-sm'}>
          jinglejam.yogs.app uses Google Analytics which collects Anonymous data about the usage of this site, the
          duration of the visit and the country the site is visited from.
        </p>
      </div>
      <div class={'flex flex-row items-center justify-end gap-2 p-2'}>
        <button class={'rounded-xl p-2'} onClick={onDecline}>
          Decline
        </button>
        <button class={'bg-primary rounded-xl p-2 text-white'} onClick={onAccept}>
          Accept
        </button>
      </div>
    </div>
  )
}
