/* @refresh reload */
import { render } from 'solid-js/web'
import 'tw-elements'
import './index.css'
import { Router } from '@solidjs/router'
import { Component, lazy } from 'solid-js'

const App = lazy(() => import('./App'))
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

render(() => <Main />, document.getElementById('root') as HTMLElement)
