import { Component, Show } from 'solid-js'
import { Outlet } from '@solidjs/router'
import { AnalyticsConsentBanner } from './components/AnalyticsConsent'
import { JJLogo } from './components/JJLogo'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import { useConfig } from './configProvider/ConfigProvider'
import { FiExternalLink } from 'solid-icons/fi'

const AppBody: Component = () => {
  const config = useConfig()
  return (
    <div
      class={
        'font-poppins from-primary-shade via-primary to-primary-shade h-screen overflow-hidden overscroll-none bg-gradient-to-b'
      }
    >
      <div class="flex h-full flex-1 flex-col">
        <div class={'flex flex-1 flex-col items-center overflow-auto overflow-x-hidden overscroll-auto'}>
          <JJLogo />
          <Show when={config.donateButton.visible}>
            <a
              class={
                'bg-accent hover:text-accent-100 mt-4 flex flex-row items-center gap-2 rounded-full p-2 text-center text-white no-underline shadow transition-all hover:scale-105'
              }
              href={config.donateButton.url ?? 'https://jinglejam.tiltify.com'}
            >
              <p>{config.donateButton.text ?? 'Donate'}</p>
              <FiExternalLink size={18} />
            </a>
          </Show>
          <NavBar />
          <AnalyticsConsentBanner />
          <div class={'container mx-auto sm:p-1'}>
            <Outlet />
          </div>
          <div class={'grow'} />
          <Footer />
        </div>
      </div>
    </div>
  )
}
export default AppBody
