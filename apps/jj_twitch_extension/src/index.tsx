/* @refresh reload */
import './index.css'
import { render } from 'solid-js/web'

import App from './App'
import { Component, lazy } from 'solid-js'
import { Router } from '@solidjs/router'

const root = document.getElementById('root')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  )
}

const DBWrapper = lazy(() => import('./db_wrapper'))
const Main: Component = () => {
  return (
    <DBWrapper>
      <Router>
        <App />
      </Router>
    </DBWrapper>
  )
}

render(() => <Main />, root!)
