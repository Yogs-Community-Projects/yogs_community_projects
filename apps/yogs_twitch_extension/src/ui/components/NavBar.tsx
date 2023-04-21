import { Component } from 'solid-js'
import { A } from '@solidjs/router'
import './NavBar.css'
import { useYogsExtensionConfig } from './YogsExtensionConfigProvider'

const NavBar: Component = () => {
  const config = useYogsExtensionConfig()
  return (
    <div class={'grid h-10 w-full grid-cols-2 items-center justify-items-stretch p-1 text-white underline'}>
      <A href={'/'} activeClass={'activeLink'} end={true}>
        <button class={'hover:bg-primary-700 h-full w-full border-2 border-white transition-all'}>
          <p>{config.streamerTabName ?? 'Stream Team'}</p>
        </button>
      </A>
      <A href={'schedule'} activeClass={'activeLink'} end={true}>
        <button class={'hover:bg-primary-700 h-full w-full border-2 border-white transition-all'}>
          <p>{config.scheduleTabName ?? 'Streams'}</p>
        </button>
      </A>
    </div>
  )
}
export default NavBar
