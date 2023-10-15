import { Component, lazy } from 'solid-js'
import { Router } from '@solidjs/router'

const App = lazy(() => import('./App'))
const Providers = lazy(() => import('./Providers'))

export const JJExtensionMain: Component = () => {
  return (
    <Router>
      <Providers>
        <App />
      </Providers>
    </Router>
  )
}
