import { Component, createSignal, JSXElement, onCleanup, ParentComponent, Show } from 'solid-js'
import { Transition } from 'solid-transition-group'

export const OverlayHeader: Component<{ header: string[]; theme: string }> = props => {
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
        <HeaderCard theme={props.theme}>
          <UpNext theme={props.theme} />
        </HeaderCard>,
      )
    }
    if (headerItemNames().includes('donate') || headerItemNames().includes('donation')) {
      items.push(
        <HeaderCard theme={props.theme}>
          <DonationChatCommand theme={props.theme} />
        </HeaderCard>,
      )
    }
    if (headerItemNames().includes('extension')) {
      items.push(
        <HeaderCard theme={props.theme}>
          <ExtensionAd theme={props.theme} />
        </HeaderCard>,
      )
    }
    if (headerItemNames().includes('jj') || headerItemNames().includes('jjlink')) {
      items.push(
        <PinkHeaderCard theme={props.theme}>
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

const UpNext: Component<{ theme: string }> = props => {
  const up = () => {
    switch (props.theme) {
      case 'pink':
      case 'red':
      case 'blue':
        return 'text-white'
      default:
        return 'text-accent-500'
    }
  }
  const next = () => {
    switch (props.theme) {
      case 'pink':
      case 'red':
      case 'blue':
        return 'text-white'
      default:
        return 'text-primary-500'
    }
  }
  return (
    <p class={'text-center'}>
      <span class={`${up()}`}>Up</span> <span class={`${next()}`}>Next</span>
    </p>
  )
}

const DonationChatCommand: Component<{ theme: string }> = props => {
  const accent = () => {
    switch (props.theme) {
      case 'pink':
      case 'red':
      case 'blue':
        return 'text-white'
      default:
        return 'text-accent-500'
    }
  }
  const primary = () => {
    switch (props.theme) {
      case 'pink':
      case 'red':
      case 'blue':
        return 'text-white'
      default:
        return 'text-primary-500'
    }
  }
  return (
    <p class={'text-center text-xl'}>
      <span class={`${accent()}`}>!Donate</span> <span class={`${primary()}`}>in Chat</span>
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

const ExtensionAd: Component<{ theme: string }> = props => {
  const accent = () => {
    switch (props.theme) {
      case 'pink':
      case 'red':
      case 'blue':
        return 'text-white'
      default:
        return 'text-accent-500'
    }
  }
  const primary = () => {
    switch (props.theme) {
      case 'pink':
      case 'red':
      case 'blue':
        return 'text-white'
      default:
        return 'text-primary-500'
    }
  }

  return (
    <p class={`${accent()} text-center text-xs`}>
      See the <span class={`${primary()}`}>full schedule</span> using the{' '}
      <span class={`${primary()}`}>extension below</span>
    </p>
  )
}

const HeaderCard: ParentComponent<{ theme: string }> = props => {
  const background = () => {
    switch (props.theme) {
      case 'pink':
      case 'red':
        return 'bg-primary-500'
      case 'blue':
        return 'bg-accent-500'
      default:
        return 'bg-white'
    }
  }
  return (
    <div class={'p-2'}>
      <div
        class={`flex h-11 flex-row items-center justify-center rounded-2xl ${background()} p-2 text-4xl font-bold shadow-xl transition-all`}
      >
        {props.children}
      </div>
    </div>
  )
}
const PinkHeaderCard: ParentComponent<{ theme: string }> = props => {
  const background = () => {
    switch (props.theme) {
      case 'pink':
      case 'red':
        return 'bg-primary'
      case 'blue':
        return 'bg-accent'
      default:
        return 'bg-primary'
    }
  }
  const text = () => {
    switch (props.theme) {
      case 'pink':
      case 'red':
        return 'text-white'
      case 'blue':
        return "text-white'"
      default:
        return "text-white'"
    }
  }
  return (
    <div class={'p-2'}>
      <div
        class={`${background()} flex h-11 flex-row items-center justify-center rounded-2xl p-2 text-4xl font-bold shadow-xl transition-all`}
      >
        {props.children}
      </div>
    </div>
  )
}
