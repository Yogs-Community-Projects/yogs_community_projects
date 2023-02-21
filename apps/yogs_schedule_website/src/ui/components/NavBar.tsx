import { Component, createSignal, Show } from 'solid-js'
import { A, useLocation } from '@solidjs/router'
import './NavBar.css'
import { CgClose, CgMenu } from 'solid-icons/cg'

// activeClass={'activeLink'}
export const NavBar: Component = () => {
  return (
    <>
      <div class={'hidden flex-row justify-center gap-4 p-4 align-middle text-2xl text-white md:flex'}>
        <Link path="/" title="Schedule" />
        <Link path="/creators" title="Creators" />
        <Link path="/extension" title="Extension" />
      </div>
      <div class={'w-schedule md:hidden'}>
        <DropdownNavBar />
      </div>
    </>
  )
}

const DropdownNavBar: Component = props => {
  const [open, setOpen] = createSignal(false)
  const [ref, setRef] = createSignal<HTMLDivElement>()

  const onClick = () => {
    ref()?.classList.toggle('hidden')
    setOpen(!open())
  }

  const onClose = () => {
    ref()?.classList.add('hidden')
    setOpen(false)
  }

  return (
    <div class={'flex flex-col items-center justify-center p-4'}>
      <button class={'text-text flex flex-row items-center rounded-xl bg-white p-4'} onClick={onClick}>
        Menu {!open() ? <CgMenu class={'ml-2'} /> : <CgClose class={'ml-2'} />}
      </button>
      <div class={'mt-1 flex hidden flex-col space-y-1 md:hidden'} ref={setRef}>
        <LinkMobile path="/" title="Home" close={onClose} />
        <LinkMobile path="/creators" title="Creators" close={onClose} />
        <LinkMobile path="/extension" title="Extension" close={onClose} />
      </div>
    </div>
  )
}

interface LinkProps {
  path: string
  title: string
}

const Link: Component<LinkProps> = props => {
  const useCurrentPath = () => useLocation().pathname
  const useIsActive = () => useCurrentPath() == props.path

  const useClasses = () => {
    if (useIsActive()) {
      return 'nav text-lg activeLink'
    }
    return 'nav text-lg inactiveLink hover:scale-105 transition-all'
  }
  return (
    <A class={useClasses()} href={props.path}>
      {props.title}
    </A>
  )
}

interface LinkMobileProps {
  path: string
  title: string
  close: () => void
}

const LinkMobile: Component<LinkMobileProps> = props => {
  const useCurrentPath = () => useLocation().pathname
  const useIsActive = () => useCurrentPath() == props.path

  const useClasses = () => {
    const classes = 'nav text-lg hover:scale-105 transition-all bg-white text-black rounded-xl p-4'
    if (useIsActive()) {
      return classes + ' activeLink'
    }
    return classes + ' inactiveLink'
  }

  return (
    <Show when={!useIsActive()}>
      <A class={useClasses()} href={props.path} onclick={props.close}>
        {props.title}
      </A>
    </Show>
  )
}
