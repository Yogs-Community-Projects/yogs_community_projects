/* @refresh reload */
import './index.css'
import { render } from 'solid-js/web'

import { Component, lazy } from 'solid-js'
import { Router } from '@solidjs/router'
// import DBWrapper from './db_wrapper'
import App from './App'

// const App = lazy(() => import('./App'))
const DBWrapper = lazy(() => import('./db_wrapper'))
const Main: Component = () => {
  return (
    // overflow-y-scroll
    <div class={''}>
      <DBWrapper>
        <Router>
          <App />
        </Router>
      </DBWrapper>
    </div>
  )
}

render(() => <Main />, document.getElementById('root') as HTMLElement)
