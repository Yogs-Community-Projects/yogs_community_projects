import { Component, createSignal } from 'solid-js'
import { A } from '@solidjs/router'

const [navState, setNavState] = createSignal('/')
const NavBar: Component = () => {
  const active = 'bg-accent-500 h-full w-full border-2 border-white transition-all text-white'

  const inActive = 'hover:bg-accent-500 h-full w-full border-2 border-white transition-all hover:text-white'

  const state = link => {
    if (link == navState()) {
      return active
    }
    return inActive
  }

  return (
    <div class={'grid h-10 w-full grid-cols-3 items-center justify-items-stretch p-1 text-white underline'}>
      <A href={'/'}>
        <button
          class={state('/') + ' rounded-l-xl'}
          onclick={() => {
            setNavState('/')
          }}
        >
          <p>Schedule</p>
        </button>
      </A>
      <A href={'/charity'}>
        <button
          class={state('/charity')}
          onclick={() => {
            setNavState('/charity')
          }}
        >
          <p>Charity</p>
        </button>
      </A>
      <A href={'/streamer'}>
        <button
          class={state('/streamer') + ' rounded-r-xl'}
          onclick={() => {
            setNavState('/streamer')
          }}
        >
          <p>Streamer</p>
        </button>
      </A>
    </div>
  )
}
export default NavBar
