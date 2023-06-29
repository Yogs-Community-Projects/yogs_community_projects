/* @refresh reload */
import './mobile.css'
import { render } from 'solid-js/web'
import { JJExtensionMobile } from './JJExtensionMain'

const root = document.getElementById('root')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  )
}

render(() => <JJExtensionMobile />, root!)
