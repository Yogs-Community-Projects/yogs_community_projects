/* @refresh reload */
import './index.css'
import { render } from 'solid-js/web'

import App from './App'
import { Component, lazy } from 'solid-js'
import { Router } from '@solidjs/router'

const root = document.getElementById('root')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?'
  )
}

const DBWrapper = lazy(() => import('./db_wrapper'))
const Main: Component = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyC5bxBlM2qtYLu9kLy9D5Zpaw0I4hWvR0c',
    authDomain: 'ycapp-f20c0.firebaseapp.com',
    databaseURL: 'https://ycapp-f20c0-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'ycapp-f20c0',
    storageBucket: 'ycapp-f20c0.appspot.com',
    messagingSenderId: '624703369691',
    appId: '1:624703369691:web:453cb1f036a82cd01eb7fe',
    measurementId: 'G-NWF4CC8VK5'
  }
  console.log(JSON.stringify(firebaseConfig))
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

render(() => <Main />, root!)
