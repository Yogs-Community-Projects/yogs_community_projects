import type { Component } from 'solid-js'
import { lazy } from 'solid-js'
import { ScheduleLogo } from './ui/components/ScheduleLogo'
import { NavBar } from './ui/components/NavBar'
import { Footer } from './ui/components/Footer'
import { AnalyticsConsent } from './ui/components/AnalyticsConsent'

const AppBody = lazy(() => import('./AppBody'))

const App: Component = () => {
  return (
    <div class={'font-poppins flex min-h-screen flex-col items-center'}>
      <AnalyticsConsent />
      <ScheduleLogo />
      <NavBar />
      <div class={'container mx-auto sm:p-1'}>
        <AppBody />
      </div>
      <div class={'grow'} />
      <Footer />
    </div>
  )
}

export default App
