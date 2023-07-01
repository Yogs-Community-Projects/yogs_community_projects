/* @refresh reload */
import { render } from 'solid-js/web'
import 'tw-elements'
import './index.css'
import { Component, lazy } from 'solid-js'

// const App = lazy(() => import('./App'))
const DBWrapper = lazy(() => import('./db_wrapper'))
const App = lazy(() => import('./App'))

const Main: Component = () => {
  return (
    <DBWrapper>
      <App />
    </DBWrapper>
  )
}

render(() => <Main />, document.getElementById('root') as HTMLElement)
