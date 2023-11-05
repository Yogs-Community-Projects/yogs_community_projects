import { Component } from 'solid-js'
import { Outlet } from '@solidjs/router'
import { AnalyticsConsentBanner } from './components/AnalyticsConsent'
import { JJLogo } from './components/JJLogo'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'

const AppBody: Component = () => {
  return (
    <div
      class={'font-poppins from-primary-300 to-primary-700 flex min-h-screen flex-col items-center bg-gradient-to-b'}
    >
      <JJLogo />
      <NavBar />
      <AnalyticsConsentBanner />
      <div class={'container mx-auto sm:p-1'}>
        <Outlet />
      </div>
      <div class={'grow'} />
      <Footer />
    </div>
  )
}
export default AppBody
