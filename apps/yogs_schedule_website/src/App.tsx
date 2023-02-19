import type { Component } from 'solid-js'
import { lazy } from 'solid-js'
import { ScheduleLogo } from './ui/components/ScheduleLogo'
import { NavBar } from './ui/components/NavBar'
import { Footer } from './ui/components/Footer'

const AppBody = lazy(() => import('./AppBody'))

const App: Component = () => {
  return (
    <div class={'flex min-h-screen flex-col items-center'}>
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
