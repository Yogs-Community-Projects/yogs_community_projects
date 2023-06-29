import { Component, createSignal } from 'solid-js'
import { A } from '@solidjs/router'
import { FaRegularClock, FaSolidHeart, FaSolidPeopleGroup } from 'solid-icons/fa'

const [navState, setNavState] = createSignal('/')

const active =
  'bg-accent-500 h-full w-full border-2 border-white transition-all text-white text-center justify-items-center'

const inActive =
  'hover:bg-accent-300 h-full w-full border-2 border-white transition-all text-white text-center justify-items-center'

const state = link => {
  if (link == navState()) {
    return active + ' flex justify-center p-1'
  }
  return inActive + ' flex justify-center p-1'
}
const Home = ({ classes = '' }) => (
  <A href={'/'}>
    <button class={state('/') + ' ' + classes} onclick={() => setNavState('/')}>
      <FaRegularClock />
    </button>
  </A>
)

const Charity = ({ classes = '' }) => (
  <A href={'/charities'}>
    <button class={state('/charities') + ' ' + classes} onclick={() => setNavState('/charities')}>
      <FaSolidHeart />
    </button>
  </A>
)

const Fundraiser = ({ classes = '' }) => (
  <A href={'/community'}>
    <button class={state('/community') + ' ' + classes} onclick={() => setNavState('/community')}>
      <FaSolidPeopleGroup />
    </button>
  </A>
)
const NavBar: Component = () => {
  return (
    <div class={`grid h-12 w-full grid-cols-3 items-center justify-items-stretch p-1 pb-0 text-white underline`}>
      <Home classes={'rounded-l-2xl'} />
      <Charity />
      <Fundraiser classes={'rounded-r-2xl'} />
    </div>
  )
}
export default NavBar
