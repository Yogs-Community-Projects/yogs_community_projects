import type { Component } from 'solid-js'
import { lazy } from 'solid-js'
import { NavBar } from './ui/components/NavBar'
import { JJLogo } from './ui/components/JJLogo'
import { Footer } from './ui/components/Footer'
import { AnalyticsConsent } from './ui/components/AnalyticsConsent'

const AppBody = lazy(() => import('./ui/AppBody'))
const App: Component = () => {
  return (
    <div class={'font-poppins flex min-h-screen flex-col items-center'}>
      <AnalyticsConsent />
      <JJLogo />
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
