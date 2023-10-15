/* @refresh reload */
import './config.css'
import { render } from 'solid-js/web'
import { ConfigBody } from './ui/config/ConfigBody'
import TwitchConfigProvider from './ui/config/TwitchConfigProvider'

const root = document.getElementById('root')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  )
}

render(
  () => (
    <TwitchConfigProvider>
      <ConfigBody />
    </TwitchConfigProvider>
  ),
  root,
)
