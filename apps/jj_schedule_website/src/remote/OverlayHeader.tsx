import { Component, createSignal, Match, onCleanup, ParentComponent, Show, Switch } from 'solid-js'
import { Transition } from 'solid-transition-group'
import { animatedHeader } from './overlay_signals'

export const OverlayHeader: Component = () => {
  const [headerIndex, setHeaderIndex] = createSignal(0)

  const timer = setInterval(() => {
    setHeaderIndex((headerIndex() + 1) % 3)
  }, 8000)
  onCleanup(() => clearInterval(timer))

  return (
    <>
      <Show when={animatedHeader()}>
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
          <Switch>
            <Match when={headerIndex() === 0}>
              <HeaderCard>
                <UpNext />
              </HeaderCard>
            </Match>
            <Match when={headerIndex() === 1}>
              <HeaderCard>
                <DonationChatCommand />
              </HeaderCard>
            </Match>
            <Match when={headerIndex() === 2}>
              <HeaderCard>
                <ExtensionAd />
              </HeaderCard>
            </Match>
          </Switch>
        </Transition>
      </Show>
      <Show when={!animatedHeader()}>
        <HeaderCard>
          <UpNext />
        </HeaderCard>
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

const ExtensionAd: Component = () => {
  return (
    <p class={'text-accent-500 text-center text-base'}>
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
