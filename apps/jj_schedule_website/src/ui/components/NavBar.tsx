import { Component, createSignal, Show } from 'solid-js'
import { A, useLocation } from '@solidjs/router'
import './NavBar.css'
import { CgClose, CgMenu } from 'solid-icons/cg'

export const NavBar: Component = () => {
  return (
    <>
      <div class={'hidden flex-row justify-center gap-4 p-4 align-middle text-2xl text-white md:flex'}>
        <Link path="/" title="Home" />
        <Link path="/2022" title="Jingle Jam 2022" />
        <Link path="/2021" title="Jingle Jam 2021" />
        <Link path="/extension" title="Twitch Extension" />
        <Link path="/overlay" title="Streaming Overlays" />
        <a
          href={'https://schedule.yogs.app'}
          class={'hover:text-accent-100 text-lg no-underline transition-all hover:scale-105'}
        >
          Regular Schedule
        </a>
      </div>
      <div class={'w-schedule md:hidden'}>
        <DropdownNavBar />
      </div>
    </>
  )
}

const DropdownNavBar: Component = () => {
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
      <div class={'mt-1 flex flex-col space-y-1 md:hidden'} ref={setRef}>
        <LinkMobile path="/" title="Home" close={onClose} />
        <LinkMobile path="/2022" title="Jingle Jam 2022" close={onClose} />
        <LinkMobile path="/2021" title="Jingle Jam 2021" close={onClose} />
        <LinkMobile path="/extension" title="Twitch Extension" close={onClose} />
        <a
          href={'https://schedule.yogs.app'}
          class={
            'nav hover:text-accent-100 rounded-xl bg-white p-4 text-lg text-black no-underline transition-all hover:scale-105'
          }
        >
          Regular Schedule
        </a>
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
      return 'nav text-lg activeLink hover:text-accent-100'
    }
    return 'nav text-lg inactiveLink hover:scale-105 transition-all hover:text-accent-100'
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
    const classes =
      'nav text-lg hover:text-accent-100 hover:scale-105 transition-all bg-white text-black rounded-xl p-4'
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
