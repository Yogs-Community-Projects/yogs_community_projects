import { Component } from 'solid-js'
import { A } from '@solidjs/router'

const NavBar: Component = () => {
  return (
    <div class={'grid h-10 w-full grid-cols-2 items-center justify-items-stretch p-1 text-white underline'}>
      <A href={'/'} activeClass={'underline'}>
        <button class={'hover:bg-primary-300 h-full w-full border-2 border-white transition-all hover:text-black'}>
          <p>Stream Team</p>
        </button>
      </A>
      <A href={'/schedule'}>
        <button
          class={
            'hover:bg-primary-300 h-full h-full w-full w-full border-2 border-2 border-white border-white transition-all hover:text-black'
          }
        >
          <p>Streams</p>
        </button>
      </A>
    </div>
  )
}
export default NavBar
