import { Component, lazy, Suspense } from 'solid-js'
import { Router } from '@solidjs/router'
import { LoadingPage } from './ui/components/LoadingPage'
import App from './App'

const Providers = lazy(() => import('./ui/providers/Providers'))
export const JJExtensionMain: Component = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingPage class={'text-black'} />}>
        <Providers>
          <App />
        </Providers>
      </Suspense>
    </Router>
  )
}

export default JJExtensionMain
