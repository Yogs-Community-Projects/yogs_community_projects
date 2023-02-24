/* @refresh reload */
import './index.css'
import { render } from 'solid-js/web'

import { Component, lazy } from 'solid-js'
import { Router } from '@solidjs/router'
import { MetaProvider, Title } from '@solidjs/meta'

const App = lazy(() => import('./App'))
const DBWrapper = lazy(() => import('./db_wrapper'))

const Main: Component = () => {
  return (
    <MetaProvider>
      <Title>Yogscast Stream Schedules</Title>
      <DBWrapper>
        <Router>
          <App />
        </Router>
      </DBWrapper>
    </MetaProvider>
  )
}

const A: Component = () => {
  return <></>
}

render(() => <Main />, document.getElementById('root') as HTMLElement)
