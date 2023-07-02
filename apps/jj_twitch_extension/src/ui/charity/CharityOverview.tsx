import { JJData } from './charity_model'
import { Component, createSignal, onCleanup, onMount, ParentComponent, Show } from 'solid-js'
import { Numeric } from 'solid-i18n'
import { DateTime } from 'luxon'
import { NumberStyle } from 'i18n-mini/lib/types'
import { Transition } from 'solid-transition-group'

interface CharityOverviewProps {
  data: JJData
}

export const CharityOverview: Component<CharityOverviewProps> = props => {
  const [dollar, setShowDollar] = createSignal(false)

  const timer = setInterval(() => {
    setShowDollar(!dollar())
  }, 10000)
  onCleanup(() => clearInterval(timer))
  return (
    <div class={'text-center text-xs'}>
      <div class={'flex w-full flex-col gap-1 rounded-2xl bg-white p-1 shadow-xl'}>
        <div>
          <p class={'text-primary text-base font-bold'}>
            <CurrencyAnim dollars={props.data.jj_api.total.dollars} pounds={props.data.jj_api.total.pounds} />
          </p>
          <p class={''}>Raised in {DateTime.fromISO(props.data.jj_api.date).year}</p>
        </div>
        <div class={'grid grid-cols-2 gap-1 gap-y-2'}>
          <div>
            <p class={'text-primary text-xs font-bold'}>
              <CurrencyAnim dollars={props.data.jj_api.raised.dollars} pounds={props.data.jj_api.raised.pounds} />
            </p>
            <p>Raised by the Yogscast</p>
          </div>
          <div>
            <p class={'text-primary text-xs font-bold'}>
              <CurrencyAnim
                dollars={props.data.jj_api.fundraisers.dollars}
                pounds={props.data.jj_api.fundraisers.pounds}
              />
            </p>
            <p>Raised by Fundraisers</p>
          </div>
          <div>
            <p class={'text-primary text-xs font-bold'}>
              <Numeric value={props.data.jj_api.bundles.sold} numberStyle={'decimal'} />
            </p>
            <p>Collections Sold</p>
          </div>
          <div>
            <p class={'text-primary text-xs font-bold'}>
              <Numeric value={props.data.jj_api.bundles.remaining} numberStyle={'decimal'} />
            </p>
            <p>Collections Available</p>
          </div>
        </div>
        <div class={'flex flex-1 items-end justify-center'}>
          <p class={'text-center'}>
            Last update, {DateTime.fromISO(props.data.jj_api.date).toLocaleString(DateTime.DATETIME_MED)}
          </p>
        </div>
      </div>
    </div>
  )
}

interface CountUpProps {
  value: number
  numberStyle?: NumberStyle
  currency?: string
}

const CountUp: Component<CountUpProps> = props => {
  const [total, setTotal] = createSignal(0)

  function animateCounting(duration, finalValue) {
    const ms = 1000 / 60
    const increment = finalValue / (duration / ms) // Calculate increment per second

    let currentCount = 0

    function updateCount() {
      currentCount += increment // Increment current count by the increment
      if (currentCount <= finalValue) {
        setTotal(Math.ceil(currentCount))
        setTimeout(updateCount, ms)
      } else {
        setTotal(finalValue) // Set the final value
      }
    }

    updateCount()
  }

  onMount(() => {
    animateCounting(1000, props.value)
  })
  return <Numeric value={total()} numberStyle={props.numberStyle} currency={props.currency} />
}

const Anim: ParentComponent = props => {
  return (
    <Transition
      mode={'outin'}
      onEnter={(el, done) => {
        const a = el.animate(
          [
            {
              opacity: 0, //transform: 'rotateX(-90deg) perspective(800px)'
            },
            {
              opacity: 1, //transform: 'rotateX(0deg) perspective(0px)'
            },
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
            {
              opacity: 1, //transform: 'rotateX(0deg) perspective(0px)'
            },
            {
              opacity: 0, //transform: 'rotateX(90deg) perspective(800px)'
            },
          ],
          {
            duration: 700,
          },
        )
        a.finished.then(done)
      }}
      children={props.children}
    />
  )
}

interface CurrencyAnimProps {
  dollars: number
  pounds: number
}

const CurrencyAnim: Component<CurrencyAnimProps> = props => {
  const [dollar, setShowDollar] = createSignal(false)
  const timer = setInterval(() => {
    setShowDollar(!dollar())
  }, 10000)
  onCleanup(() => clearInterval(timer))
  return (
    <Anim>
      <Show when={dollar()}>
        <div id={'usd'}>
          <Numeric value={props.dollars} numberStyle="currency" currency={'USD'} />
        </div>
      </Show>
      <Show when={!dollar()}>
        <div id={'gbp'}>
          <Numeric value={props.pounds} numberStyle="currency" currency={'GBP'} />
        </div>
      </Show>
    </Anim>
  )
}
