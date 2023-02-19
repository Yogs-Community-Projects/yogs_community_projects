/* @refresh reload */
import './index.css'
import { render } from 'solid-js/web'

import { Component, lazy } from 'solid-js'
import { Router } from '@solidjs/router'

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
  /*
  const configString = import.meta.env.VITE_FIREBASE_CONFIG
  if (configString) {
    const config = JSON.parse(configString)
    const app = initializeApp(config)
    const db = initializeFirestore(app, {})
    return (
      <YcDBFirebaseProvider db={db}>
        <Router>
          <App />
        </Router>
      </YcDBFirebaseProvider>
    )
  } else {
    return (
      <YcDBDummyProvider>
        <p class={'fixed w-full bg-red-500 text-center text-white'}>USING DUMMY DB</p>
        <div class={'pt-10'}>
          <Router>
            <App />
          </Router>
        </div>
      </YcDBDummyProvider>
    )
  }
  */
}

render(() => <Main />, document.getElementById('root') as HTMLElement)
