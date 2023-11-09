import { Component } from 'solid-js'
import { Outlet } from '@solidjs/router'
import { AnalyticsConsentBanner } from './components/AnalyticsConsent'
import { JJLogo } from './components/JJLogo'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'

const AppBody: Component = () => {
  return (
    <div
      class={
        'font-poppins from-primary-shade via-primary to-primary-shade h-screen overflow-hidden overscroll-none bg-gradient-to-b'
      }
    >
      <div class="flex h-full flex-1 flex-col">
        <div class={'flex flex-1 flex-col items-center overflow-auto overflow-x-hidden overscroll-auto'}>
          <JJLogo />
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
