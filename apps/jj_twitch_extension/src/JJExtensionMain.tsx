import { Component } from 'solid-js'
import { Router } from '@solidjs/router'
import Providers from './Providers'
import App from './App'

export const JJExtensionMain: Component = () => {
  return (
    <Router>
      <Providers>
        <App />
      </Providers>
    </Router>
  )
}
