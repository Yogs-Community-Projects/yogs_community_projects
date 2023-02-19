import {Component} from 'solid-js'
import {A} from '@solidjs/router'

const NavBar: Component = () => {
  return (
    <div class={'grid h-10 w-full grid-cols-3 items-center justify-items-stretch p-1 text-white underline'}>
      <A href={'/'} activeClass={'underline'}>
        <button class={'hover:bg-primary-300 h-full w-full border-2 border-white transition-all hover:text-black'}>
          <p>Schedule</p>
        </button>
      </A>
      <A href={'/charity'}>
        <button
          class={
            'hover:bg-primary-300 h-full h-full w-full w-full border-2 border-2 border-white border-white transition-all hover:text-black'
          }
        >
          <p>Charity</p>
        </button>
      </A>
      <A href={'/streamer'}>
        <button
          class={
            'hover:bg-primary-300 h-full h-full w-full w-full border-2 border-2 border-white border-white transition-all hover:text-black'
          }
        >
          <p>Streamer</p>
        </button>
      </A>
    </div>
  )
}
export default NavBar
