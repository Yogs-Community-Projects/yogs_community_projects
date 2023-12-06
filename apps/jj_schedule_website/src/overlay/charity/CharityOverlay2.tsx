import { Component, createEffect, createSignal, JSXElement, onCleanup, onMount, ParentComponent, Show } from 'solid-js'
import { collection, CollectionReference, doc } from 'firebase/firestore'
import { loadLocalAndRemote, useFirestoreDB } from '@ycapp/common'
import '../marquee.css'
import { Transition } from 'solid-transition-group'
import { Numeric } from 'solid-i18n'
import {
  useCauses,
  useHeader,
  useHeaderTheme,
  useShowCharityDesc,
  useShowCharityQRCode,
  useShowCharityUrl,
  useShowRaised,
  useSpeed,
  useTheme,
} from '../overlay_signals'
import { twMerge } from 'tailwind-merge'
import { Cause, JJData } from '@ycapp/model'
import { QRCodeSVG } from 'solid-qr-code'

export const CharityOverlay2: Component = () => {
  return (
    <div class={'h-screen w-full'}>
      <CharityOverlayComponent2
        header={useHeader()}
        theme={useTheme()}
        headerTheme={useHeaderTheme()}
        showDesc={useShowCharityDesc()}
        showQRCode={useShowCharityQRCode()}
        showUrl={useShowCharityUrl()}
        speed={useSpeed()}
        showRaised={useShowRaised()}
        causes={useCauses()}
      />
    </div>
  )
}
export const CharityOverlayComponent2: Component<{
  header: string[]
  theme: string
  headerTheme: string
  showDesc: boolean
  showQRCode: boolean
  showUrl: boolean
  speed: number
  showRaised: boolean
  causes?: string[]
}> = props => {
  return (
    <div class={'flex h-full w-full flex-col'}>
      <div class={''}>
        <OverlayHeader header={props.header} headerTheme={props.headerTheme} speed={props.speed} />
      </div>
      <div class={'flex-1'}>
        <Body
          theme={props.theme}
          showDesc={props.showDesc}
          showQRCode={props.showQRCode}
          showUrl={props.showUrl}
          speed={props.speed}
          showRaised={props.showRaised}
          causes={props.causes ?? []}
        />
      </div>
    </div>
  )
}

const Body: Component<{
  theme: string
  showDesc: boolean
  showQRCode: boolean
  showUrl: boolean
  speed: number
  showRaised: boolean
  causes: string[]
}> = props => {
  const db = useFirestoreDB()
  const coll = collection(db, 'JJDonationTracker') as CollectionReference<JJData>
  const d = doc<JJData>(coll, 'JJDonationTracker2023')
  const charityData = loadLocalAndRemote('charityData', d, { forceRemote: true, ageInHours: 0 })

  const [currentCharity, setCurrentCharity] = createSignal(0)

  const oneCause = () => props.causes.length === 1
  const charities = () => {
    if (props.causes.length > 0) {
      return charityData.data.causes.filter(cause => {
        return props.causes.includes(`${cause.id}`)
      })
    }
    return charityData.data.causes
  }
  const [timer, setTimer] = createSignal<ReturnType<typeof setInterval>>()

  onMount(() => {
    if (!oneCause()) {
      const t = setInterval(() => {
        if (charityData.data) {
          setCurrentCharity(i => (i + 1) % charities().length)
        }
      }, props.speed * 1000)
      setTimer(t)
    }
  })

  createEffect(() => {
    if (!oneCause()) {
      if (timer()) {
        clearInterval(timer())
      }
      const t = setInterval(() => {
        if (charityData.data) {
          setCurrentCharity(i => (i + 1) % charities().length)
        }
      }, props.speed * 1000)
      setTimer(t)
    }
  })

  onCleanup(() => {
    if (timer()) {
      clearInterval(timer())
    }
  })
  const items = () => {
    return charities().map((c, i) => {
      if (props.theme === 'carousel') {
        if (i % 3 == 0) {
          return (
            <CharityItem
              charity={c}
              theme={'default'}
              showDesc={props.showDesc}
              showQRCode={props.showQRCode}
              showUrl={props.showUrl}
              showRaised={props.showRaised}
            />
          )
          //return <CharityItemWhite charity={c} />
        }
        if (i % 3 == 1) {
          return (
            <CharityItem
              charity={c}
              theme={'red'}
              showDesc={props.showDesc}
              showQRCode={props.showQRCode}
              showUrl={props.showUrl}
              showRaised={props.showRaised}
            />
          )
          //return <CharityItemRed charity={c} />
        }
        return (
          <CharityItem
            charity={c}
            theme={'blue'}
            showDesc={props.showDesc}
            showQRCode={props.showQRCode}
            showUrl={props.showUrl}
            showRaised={props.showRaised}
          />
        )
        // return <CharityItemBlue charity={c} />
      }
      return (
        <CharityItem
          charity={c}
          theme={props.theme}
          showDesc={props.showDesc}
          showQRCode={props.showQRCode}
          showUrl={props.showUrl}
          showRaised={props.showRaised}
        />
      )
    })
  }

  const currentItem = () => {
    if (oneCause()) {
      return (
        <CharityItem
          charity={charities()[0]}
          theme={'default'}
          showDesc={props.showDesc}
          showQRCode={props.showQRCode}
          showUrl={props.showUrl}
          showRaised={props.showRaised}
        />
      )
    }
    return items()[currentCharity()]
  }

  return (
    <Show when={charityData.data}>
      <Transition
        mode={'outin'}
        onEnter={(el, done) => {
          const a = el.animate(
            [
              { opacity: 0, transform: 'rotateY(-90deg) perspective(800px)' },
              { opacity: 1, transform: 'rotateY(0deg) perspective(0px)' },
            ],
            {
              duration: 900,
            },
          )
          a.finished.then(done)
        }}
        onExit={(el, done) => {
          const a = el.animate(
            [
              { opacity: 1, transform: 'rotateY(0deg) perspective(0px)' },
              { opacity: 0, transform: 'rotateY(90deg) perspective(800px)' },
            ],
            {
              duration: 900,
            },
          )
          a.finished.then(done)
        }}
      >
        {currentItem()}
      </Transition>
    </Show>
  )
}

const CharityItem: Component<{
  charity: Cause
  theme: string
  showDesc: boolean
  showQRCode: boolean
  showUrl: boolean
  showRaised: boolean
}> = props => {
  const background = () => {
    switch (props.theme) {
      case 'red':
        return 'bg-primary-500'
      case 'blue':
        return 'bg-accent-500'
    }
    return 'bg-white'
  }
  const textColor = () => {
    switch (props.theme) {
      case 'red':
      case 'blue':
        return 'text-white'
    }
    return 'text-black'
  }
  const raisedColor = () => {
    switch (props.theme) {
      case 'red':
      case 'blue':
        return 'text-white'
    }
    return 'text-primary-500'
  }

  const qrCodeFG = () => {
    switch (props.theme) {
      case 'red':
      case 'blue':
        return '#ffffff'
    }
    return '#000000'
  }
  const qrCodeBG = () => {
    switch (props.theme) {
      case 'red':
        return '#E21350'
      case 'blue':
        return '#3484BF'
    }
    return '#ffffff'
  }

  const charityUrl = () => {
    const url = props.charity.url.replace('https://', '').replace('www.', '')
    if (url.endsWith('/')) {
      return url.substring(0, url.length - 1)
    }
    return url
  }

  const qrCodeSize = () => {
    let base = 64

    if (!props.showDesc) {
      base += 24
    }
    if (!props.showUrl) {
      base += 12
    }
    if (!props.showRaised) {
      base += 12
    }

    return base
  }
  const value = () => props.charity.raised.fundraisers // + props.d.raised.yogscast

  return (
    <div class={'h-full p-2'}>
      <div
        class={twMerge(
          'flex h-full flex-col items-center justify-center rounded-2xl p-2 text-center font-bold shadow-xl transition-all',
          background(),
          textColor(),
        )}
      >
        <img class={'h-20 w-20 rounded-lg bg-white'} alt={''} src={props.charity.logo} loading={'eager'} />
        <p class={'line-clamp-2 overflow-hidden text-2xl'}>{props.charity.name}</p>
        <Show when={props.showRaised}>
          <p class={twMerge('line-clamp-2 overflow-hidden text-xl', raisedColor())}>
            Raised <Numeric value={value()} numberStyle="currency" currency={'GBP'} />
          </p>
        </Show>
        <Show when={props.showDesc}>
          <p class={'line-clamp-3 text-center'}>{props.charity.description}</p>
        </Show>
        <Show when={props.showUrl && !props.showQRCode}>
          <p>{charityUrl()}</p>
        </Show>
        <Show when={props.showQRCode}>
          <div class={'flex w-full flex-1 flex-col content-center items-center justify-center gap-1 pt-2'}>
            <Show when={props.showQRCode}>
              <QRCodeSVG value={props.charity.url} size={qrCodeSize()} bgColor={qrCodeBG()} fgColor={qrCodeFG()} />
            </Show>
            <Show when={props.showUrl}>
              <p>{charityUrl()}</p>
            </Show>
          </div>
        </Show>
      </div>
    </div>
  )
}

const OverlayHeader: Component<{ header: string[]; headerTheme: string; speed: number }> = props => {
  const headerLength = () => props.header.length
  const headerLength2 = props.header.length
  const headerItemNames = () => props.header.map(h => h.toLowerCase())
  const headerItems = () => {
    const items: JSXElement[] = []
    if (headerItemNames().includes('title')) {
      items.push(<Title theme={props.headerTheme} />)
    }
    if (headerItemNames().includes('donate') || headerItemNames().includes('donation')) {
      items.push(<DonationChatCommand theme={props.headerTheme} />)
    }
    if (headerItemNames().includes('extension')) {
      items.push(<ExtensionAd theme={props.headerTheme} />)
    }
    if (headerItemNames().includes('jj') || headerItemNames().includes('jjlink')) {
      items.push(<JJLink theme={props.headerTheme} />)
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
  }, props.speed * 1000)
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

const Title: Component<{ theme: string }> = props => {
  const theme = () => {
    switch (props.theme) {
      case 'red':
        return 'text-white'
      case 'blue':
        return 'text-white'
      default:
        return 'text-primary-500'
    }
  }
  return (
    <HeaderCard theme={props.theme}>
      <div class={'text-center text-2xl'}>
        <p class={theme()}>Charities</p>
      </div>
    </HeaderCard>
  )
}

const DonationChatCommand: Component<{ theme: string }> = props => {
  const donate = () => {
    switch (props.theme) {
      case 'red':
        return 'text-white'
      case 'blue':
        return 'text-white'
      default:
        return 'text-accent-500'
    }
  }
  const inChat = () => {
    switch (props.theme) {
      case 'red':
        return 'text-white'
      case 'blue':
        return 'text-white'
      default:
        return 'text-primary-500'
    }
  }
  return (
    <HeaderCard theme={props.theme}>
      <p class={'text-center text-xl'}>
        <span class={donate()}>!Donate</span> <span class={inChat()}>in Chat</span>
      </p>
    </HeaderCard>
  )
}
const JJLink: Component<{ theme: string }> = props => {
  const theme = () => {
    switch (props.theme) {
      case 'red':
        return 'text-white'
      case 'blue':
        return 'text-white'
      default:
        return 'text-primary'
    }
  }
  return (
    <HeaderCard theme={props.theme}>
      <p class={'text-center text-base'}>
        <span class={theme()}>jinglejam.tiltify.com</span>
      </p>
    </HeaderCard>
  )
}

const ExtensionAd: Component<{ theme: string }> = props => {
  const accent = () => {
    switch (props.theme) {
      case 'red':
        return 'text-white'
      case 'blue':
        return 'text-white'
      default:
        return 'text-accent-500'
    }
  }
  const primary = () => {
    switch (props.theme) {
      case 'red':
        return 'text-white'
      case 'blue':
        return 'text-white'
      default:
        return 'text-primary-500'
    }
  }
  return (
    <HeaderCard theme={props.theme}>
      <p class={twMerge('text-accent-500 text-center text-xs', accent())}>
        See the <span class={primary()}>full schedule</span> using the <span class={accent()}>extension below</span>
      </p>
    </HeaderCard>
  )
}

const HeaderCard: ParentComponent<{ theme: string }> = props => {
  const background =
    'flex h-11 flex-row items-center justify-center rounded-2xl p-2 text-4xl font-bold shadow-xl transition-all'
  const theme = () => {
    switch (props.theme) {
      case 'red':
        return 'bg-primary-500'
      case 'blue':
        return 'bg-accent-500'
      default:
        return 'bg-white '
    }
  }

  return (
    <div class={'p-2'}>
      <div class={twMerge(background, theme())}>{props.children}</div>
    </div>
  )
}
