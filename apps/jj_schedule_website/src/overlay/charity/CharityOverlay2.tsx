import { Component, createSignal, JSXElement, onCleanup, ParentComponent, Show } from 'solid-js'
import { collection, CollectionReference, doc } from 'firebase/firestore'
import { loadLocalAndRemote, useFirestoreDB } from '@ycapp/common'
import '../marquee.css'
import { Transition } from 'solid-transition-group'
import { Numeric } from 'solid-i18n'
import { useHeader, useHeaderTheme, useTheme } from '../overlay_signals'
import { twMerge } from 'tailwind-merge'
import { Cause, JJData } from '@ycapp/model'

export const CharityOverlay2: Component<{ speed?: number }> = () => {
  return (
    <div class={'h-screen w-full'}>
      <CharityOverlayComponent2 header={useHeader()} theme={useTheme()} headerTheme={useHeaderTheme()} />
    </div>
  )
}
export const CharityOverlayComponent2: Component<{
  header: string[]
  theme: string
  headerTheme: string
}> = props => {
  return (
    <div class={'flex h-full w-full flex-col'}>
      <div class={''}>
        <OverlayHeader header={props.header} headerTheme={props.headerTheme} />
      </div>
      <div class={'flex-1'}>
        <Body theme={props.theme} />
      </div>
    </div>
  )
}

const Body: Component<{ theme: string }> = props => {
  const coll = collection(useFirestoreDB(), 'JJDonationTracker') as CollectionReference<JJData>
  const d = doc<JJData>(coll, 'JJDonationTracker2023')
  const charityData = loadLocalAndRemote('charityData', d, { forceRemote: true, ageInHours: 0 })

  const [currentCharity, setCurrentCharity] = createSignal(0)

  const charities = () => charityData.data.causes

  const timer = setInterval(() => {
    if (charityData.data) {
      setCurrentCharity(i => (i + 1) % charities().length)
    }
  }, 8000)
  onCleanup(() => clearInterval(timer))
  const items = () => {
    return charityData.data.causes.map((c, i) => {
      if (props.theme === 'carousel') {
        if (i % 3 == 0) {
          return <CharityItemWhite charity={c} />
        }
        if (i % 3 == 1) {
          return <CharityItemRed charity={c} />
        }
        return <CharityItemBlue charity={c} />
      }
      return <CharityItem charity={c} theme={props.theme} />
    })
  }

  const currentItem = () => {
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

const CharityItemWhite: Component<{ charity: Cause }> = props => {
  return (
    <div class={'h-full p-2'}>
      <div
        class={
          'flex h-full flex-col items-center justify-start rounded-2xl bg-white p-2 text-center font-bold shadow-xl transition-all'
        }
      >
        <img class={'h-24 w-24 rounded-lg bg-white'} alt={''} src={props.charity.logo} loading={'lazy'} />
        <p class={'line-clamp-2 text-2xl'}>{props.charity.name}</p>
        <p class={'text-primary-500 line-clamp-2 text-xl'}>
          Raised{' '}
          <Numeric
            value={props.charity.raised.fundraisers + props.charity.raised.yogscast}
            numberStyle="currency"
            currency={'GBP'}
          />
        </p>
        <p class={'line-clamp-3'}>{props.charity.description}</p>
      </div>
    </div>
  )
}

const CharityItemRed: Component<{ charity: Cause }> = props => {
  return (
    <div class={'h-full p-2'}>
      <div
        class={
          'bg-primary-500 flex h-full flex-col items-center justify-start rounded-2xl p-2 text-center font-bold text-white shadow-xl transition-all'
        }
      >
        <img class={'h-24 w-24 rounded-lg  bg-white'} alt={''} src={props.charity.logo} loading={'lazy'} />
        <p class={'line-clamp-2 text-2xl'}>{props.charity.name}</p>
        <p class={'line-clamp-2 text-xl'}>
          Raised{' '}
          <Numeric
            value={props.charity.raised.fundraisers + props.charity.raised.yogscast}
            numberStyle="currency"
            currency={'GBP'}
          />
        </p>
        <p class={'line-clamp-3'}>{props.charity.description}</p>
      </div>
    </div>
  )
}

const CharityItemBlue: Component<{ charity: Cause }> = props => {
  return (
    <div class={'h-full p-2'}>
      <div
        class={
          'bg-accent-500 flex h-full flex-col items-center justify-start rounded-2xl p-2 text-center font-bold text-white shadow-xl transition-all'
        }
      >
        <img class={'h-24 w-24 rounded-lg bg-white'} alt={''} src={props.charity.logo} loading={'lazy'} />
        <p class={'line-clamp-2 text-2xl'}>{props.charity.name}</p>
        <p class={'line-clamp-2 text-xl'}>
          Raised{' '}
          <Numeric
            value={props.charity.raised.fundraisers + props.charity.raised.yogscast}
            numberStyle="currency"
            currency={'GBP'}
          />
        </p>
        <p class={'line-clamp-3'}>{props.charity.description}</p>
      </div>
    </div>
  )
}
const CharityItem: Component<{ charity: Cause; theme: string }> = props => {
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

  return (
    <div class={'h-full p-2'}>
      <div
        class={twMerge(
          'flex h-full flex-col items-center justify-start rounded-2xl p-2 text-center font-bold shadow-xl transition-all',
          background(),
          textColor(),
        )}
      >
        <img class={'h-24 w-24 rounded-lg bg-white'} alt={''} src={props.charity.logo} loading={'lazy'} />
        <p class={'line-clamp-2 text-2xl'}>{props.charity.name}</p>
        <p class={twMerge('line-clamp-2 text-xl', raisedColor())}>
          Raised{' '}
          <Numeric
            value={props.charity.raised.fundraisers + props.charity.raised.yogscast}
            numberStyle="currency"
            currency={'GBP'}
          />
        </p>
        <p class={'line-clamp-3'}>{props.charity.description}</p>
      </div>
    </div>
  )
}

const OverlayHeader: Component<{ header: string[]; headerTheme: string }> = props => {
  const headerLength = () => props.header.length
  const headerLength2 = props.header.length
  const headerItemNames = () => props.header.map(h => h.toLowerCase())
  const headerItems = () => {
    const items: JSXElement[] = []
    if (headerItemNames().includes('title')) {
      items.push(
        <HeaderCard>
          <Title />
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

const Title: Component = () => {
  return (
    <div class={'text-center text-2xl'}>
      <p class={'text-primary-500'}>Charities</p>
    </div>
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
