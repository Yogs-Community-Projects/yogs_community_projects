import { Component, createSignal, JSXElement, onCleanup, ParentComponent, Show } from 'solid-js'
import { Transition } from 'solid-transition-group'

export const OverlayHeader: Component<{ header: string[] }> = props => {
  const headerLength = () => props.header.length
  const headerLength2 = props.header.length
  const headerItemNames = () => props.header.map(h => h.toLowerCase())
  const headerItems = () => {
    const items: JSXElement[] = []
    if (
      headerItemNames().includes('upnext') ||
      headerItemNames().includes('default') ||
      headerItemNames().includes('next')
    ) {
      items.push(
        <HeaderCard>
          <UpNext />
        </HeaderCard>,
      )
    }
    if (headerItemNames().includes('donate') || headerItemNames().includes('donation')) {
      items.push(
        <HeaderCard>
          <DonationChatCommand />
        </HeaderCard>,
      )
    }
    if (headerItemNames().includes('extension')) {
      items.push(
        <HeaderCard>
          <ExtensionAd />
        </HeaderCard>,
      )
    }
    if (headerItemNames().includes('jj') || headerItemNames().includes('jjlink')) {
      items.push(
        <PinkHeaderCard>
          <JJLink />
        </PinkHeaderCard>,
      )
    }

    return items
  }

  const animate = () => headerLength() > 1

  const [headerIndex, setHeaderIndex] = createSignal(0)

  const timer = setInterval(() => {
    try {
      setHeaderIndex((headerIndex() + 1) % headerLength())
    } catch (e) {
      setHeaderIndex((headerIndex() + 1) % headerLength2)
    }
  }, 8000)
  onCleanup(() => clearInterval(timer))

  const currentHeader = (): JSXElement => {
    if (headerLength() == 0) {
      return <></>
    }
    if (headerLength() == 1) {
      return headerItems()[0]
    }
    return headerItems()[headerIndex()]
  }

  return (
    <>
      <Show when={!headerItemNames().includes('none')}>
        <Show when={animate()}>
          <Transition
            mode={'outin'}
            onEnter={(el, done) => {
              const a = el.animate(
                [
                  { opacity: 1, transform: 'rotateX(-90deg) perspective(800px)' },
                  { opacity: 1, transform: 'rotateX(0deg) perspective(0px)' },
                ],
                {
                  duration: 700,
                },
              )
              a.finished.then(done)
            }}
            onExit={(el, done) => {
              const a = el.animate(
                [
                  { opacity: 1, transform: 'rotateX(0deg) perspective(0px)' },
                  { opacity: 1, transform: 'rotateX(90deg) perspective(800px)' },
                ],
                {
                  duration: 700,
                },
              )
              a.finished.then(done)
            }}
          >
            {currentHeader()}
          </Transition>
        </Show>
        <Show when={!animate()}>{headerItems()[0]}</Show>
      </Show>
    </>
  )
}

const UpNext: Component = () => {
  return (
    <p class={'text-center'}>
      <span class={'text-accent-500'}>Up</span> <span class={'text-primary-500'}>Next</span>
    </p>
  )
}

const DonationChatCommand: Component = () => {
  return (
    <p class={'text-center text-xl'}>
      <span class={'text-accent-500'}>!Donate</span> <span class={'text-primary-500'}>in Chat</span>
    </p>
  )
}
const JJLink: Component = () => {
  return (
    <p class={'text-center text-base'}>
      <span class={'text-white'}>jinglejam.tiltify.com</span>
    </p>
  )
}

const ExtensionAd: Component = () => {
  return (
    <p class={'text-accent-500 text-center text-xs'}>
      See the <span class={'text-primary-500'}>full schedule</span> using the{' '}
      <span class={'text-primary-500'}>extension below</span>
    </p>
  )
}

const HeaderCard: ParentComponent = props => {
  const gradient =
    'flex h-11 flex-row items-center justify-center rounded-2xl bg-gradient-to-b from-[#fffdf9] via-[#f6f6f6] to-[#dad1cb] p-2 text-4xl font-bold shadow-xl transition-all'
  const background =
    'bg-white flex h-11 flex-row items-center justify-center rounded-2xl p-2 text-4xl font-bold shadow-xl transition-all'
  return (
    <div class={'p-2'}>
      <div class={background}>{props.children}</div>
    </div>
  )
}
const PinkHeaderCard: ParentComponent = props => {
  const gradient =
    'flex h-11 flex-row items-center justify-center rounded-2xl bg-gradient-to-b from-[#fffdf9] via-[#f6f6f6] to-[#dad1cb] p-2 text-4xl font-bold shadow-xl transition-all'
  const background =
    'bg-primary flex h-11 flex-row items-center justify-center rounded-2xl p-2 text-4xl font-bold shadow-xl transition-all'
  return (
    <div class={'p-2'}>
      <div class={background}>{props.children}</div>
    </div>
  )
}
