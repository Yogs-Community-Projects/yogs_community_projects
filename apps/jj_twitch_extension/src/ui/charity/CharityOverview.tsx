import { Component, createSignal, onCleanup, onMount, ParentComponent, Show } from 'solid-js'
import { Numeric } from 'solid-i18n'
import { DateTime } from 'luxon'
import { NumberStyle } from 'i18n-mini/lib/types'
import { Transition } from 'solid-transition-group'
import { ToggleButton } from '@kobalte/core'
import { BsCurrencyDollar, BsCurrencyPound } from 'solid-icons/bs'
import { useCurrency } from '../CurrencyProvider'
import { twMerge } from 'tailwind-merge'
import { JJData } from '@ycapp/model'
import { useTheme } from '../../ThemeProvider'

interface CharityOverviewProps {
  data: JJData
}

export const CharityOverview: Component<CharityOverviewProps> = props => {
  const totalYogsPounds = () => props.data.raised.yogscast
  const totalYogs = () => totalYogsPounds() * props.data.avgConversionRate
  const totalFundraiserPounds = () => props.data.raised.fundraisers
  const totalFundraiser = () => props.data.raised.fundraisers * props.data.avgConversionRate
  const totalPounds = () => props.data.raised.yogscast + props.data.raised.fundraisers
  const total = () => totalPounds() * props.data.avgConversionRate

  const { tailwindTextAccent, tailwindTextPrimary } = useTheme()

  return (
    <div class={'text-center text-xs'}>
      <div class={'flex w-full flex-col gap-1 rounded-2xl bg-white p-1 shadow-xl'}>
        <div id={'parent'} class={'relative h-12'}>
          <div id={'div1'} class={'absolute inset-0 flex flex-col items-center justify-center'}>
            <p class={twMerge('text-primary relative text-base font-bold', tailwindTextPrimary())}>
              <Currency dollars={total()} pounds={totalPounds()} />
            </p>
            <p class={''}>Raised in {DateTime.fromISO(props.data.date).year}</p>
          </div>
          <div id={'div2'} class={'absolute right-0 top-0 p-1'}>
            <CurrencyToggle />
          </div>
        </div>
        <div class={'grid grid-cols-2 gap-1 gap-y-2'}>
          <div>
            <p class={twMerge('text-primary text-xs font-bold', tailwindTextPrimary())}>
              <Currency dollars={totalYogs()} pounds={totalYogsPounds()} />
            </p>
            <p>Raised by the Yogscast</p>
          </div>
          <div>
            <p class={twMerge('text-primary text-xs font-bold', tailwindTextPrimary())}>
              <Currency dollars={totalFundraiser()} pounds={totalFundraiserPounds()} />
            </p>
            <p>Raised by Fundraisers</p>
          </div>
          <div>
            <p class={twMerge('text-primary text-xs font-bold', tailwindTextPrimary())}>
              <Numeric value={props.data.collections.redeemed} numberStyle={'decimal'} />
            </p>
            <p>Collections Sold</p>
          </div>
          <div>
            <p class={twMerge('text-primary text-xs font-bold', tailwindTextPrimary())}>
              <Numeric value={props.data.collections.total - props.data.collections.redeemed} numberStyle={'decimal'} />
            </p>
            <p>Collections Available</p>
          </div>
        </div>
        <div class={'flex flex-1 items-end justify-center'}>
          <p class={'text-center'}>
            Last update, {DateTime.fromISO(props.data.date).toLocaleString(DateTime.DATETIME_MED)}
          </p>
        </div>
      </div>
    </div>
  )
}

const CurrencyToggle: Component = () => {
  const { pounds, toggle } = useCurrency()
  const { tailwindTextAccent, tailwindTextPrimary, tailwindBGPrimary, tailwindBGAccent } = useTheme()
  const dollar = () => !pounds()

  return (
    <ToggleButton.Root class={'flex flex-row text-white transition-all'} pressed={dollar()} onChange={toggle}>
      {state => (
        <>
          <div
            class={twMerge(
              'rounded-l-2xl bg-gray-500 p-1 opacity-60 transition-all',
              !state.pressed() && 'opacity-100',
              !state.pressed() && tailwindBGPrimary(),
            )}
          >
            <BsCurrencyPound size={12} />
          </div>
          <div
            class={twMerge(
              'rounded-r-2xl bg-gray-500 p-1 opacity-60 transition-all',
              state.pressed() && 'opacity-100',
              state.pressed() && tailwindBGPrimary(),
            )}
          >
            <BsCurrencyDollar size={12} />
          </div>
        </>
      )}
    </ToggleButton.Root>
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

const Currency: Component<CurrencyAnimProps> = props => {
  const { pounds } = useCurrency()
  const dollar = () => !pounds()
  return (
    <>
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
    </>
  )
}
