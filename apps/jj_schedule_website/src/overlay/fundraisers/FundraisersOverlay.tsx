import { Component, For, JSXElement, Match, Switch } from 'solid-js'
import { data } from '../../assets/fundraiser_data.json'
import { Numeric } from 'solid-i18n'
import { FaBrandsTwitch } from 'solid-icons/fa'
import { excludedChannel, minAmount, useSpeed, useTheme } from '../overlay_signals'
import '../marquee.css'
import { JJLink } from '../JJLinkCard'

export const FundraisersOverlay = () => {
  return <FundraisersOverlayComponent speed={useSpeed()} theme={useTheme()} />
}

export const FundraisersOverlayComponent: Component<{ speed: number; theme: string }> = props => {
  const e = excludedChannel()
  const useData = () =>
    data
      .filter(d => !e.includes(d.login))
      .filter(d => !e.includes(d.display_name))
      .filter(d => +d.amount >= minAmount())

  const desc = () => {
    if (useData().length % 4 == 0) {
      return 4
    }
    return 3
  }
  const items = () => {
    const lst = useData()
    const result: JSXElement[] = []

    for (let i = 0; i < lst.length; i++) {
      const d = lst[i]
      if (i % desc() == 0) {
        if (i % (desc() * 2) == 0) {
          result.push(<Title theme={props.theme} />)
        } else {
          result.push(<JJLink theme={props.theme} />)
        }
      }
      result.push(<Child d={d} theme={props.theme} />)
    }

    return result
  }

  return (
    <div class="relative flex overflow-x-hidden">
      <div
        style={{
          animation: `marquee ${props.speed * (items().length * 2)}s linear infinite`,
        }}
        class="flex flex-row whitespace-nowrap"
      >
        <For each={items()}>
          {d => {
            return <div class="inline-block h-[72px] w-[256px] items-center justify-center px-2 py-1">{d}</div>
          }}
        </For>
      </div>
      <div
        style={{
          animation: `marquee2 ${props.speed * (items().length * 2)}s linear infinite`,
        }}
        class="absolute top-0 flex flex-row whitespace-nowrap"
      >
        <For each={items()}>
          {d => {
            return <div class="inline-block h-[72px] w-[256px] items-center justify-center px-2 py-1">{d}</div>
          }}
        </For>
      </div>
    </div>
  )
}

interface ChildProps {
  theme: string
  d: any
}

const Child: Component<ChildProps> = props => {
  const useBackground = () => {
    switch (props.theme) {
      case 'pink':
      case 'red':
        return 'bg-primary'
      case 'blue':
        return 'bg-accent'
      default:
        return 'bg-white'
    }
  }
  const useDisplayNameTextColor = () => {
    switch (props.theme) {
      case 'pink':
      case 'red':
      case 'blue':
        return 'text-white'
      default:
        return 'text-accent'
    }
  }
  const useRaisedTextColor = () => {
    switch (props.theme) {
      case 'pink':
      case 'red':
      case 'blue':
        return 'text-white'
      default:
        return 'text-primary'
    }
  }
  const useTwitchIconColor = () => {
    switch (props.theme) {
      case 'pink':
      case 'red':
      case 'blue':
        return 'text-white'
      default:
        return 'text-twitch'
    }
  }
  return (
    <div class={`h-full w-full rounded-2xl ${useBackground()} p-2 shadow-2xl`}>
      <div class={'flex h-full w-full flex-row items-center justify-start'}>
        <img class={'h-12 w-12 rounded-lg'} alt={''} src={props.d.img} />
        <div class={'flex h-full w-full flex-col items-start justify-center overflow-hidden truncate pl-2'}>
          <Switch>
            <Match when={props.d.login}>
              <div class={`${useTwitchIconColor()} flex flex-row items-center font-bold`}>
                <FaBrandsTwitch size={18} />
                <span class={`${useDisplayNameTextColor()}`}>/{props.d.login}</span>
              </div>
            </Match>
            <Match when={!props.d.login}>
              <div class={`${useDisplayNameTextColor()} flex flex-row items-center font-bold`}>
                {props.d.display_name}
              </div>
            </Match>
          </Switch>
          <p class={`${useRaisedTextColor()} font-bold`}>
            Raised <Numeric value={+props.d.amount} numberStyle="currency" currency={'GBP'} />
          </p>
        </div>
      </div>
    </div>
  )
}

interface TitleProps {
  theme: string
}

const Title: Component<TitleProps> = props => {
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
  const community = () => {
    switch (props.theme) {
      case 'pink':
      case 'red':
      case 'blue':
        return 'text-white'
      default:
        return 'text-accent-500'
    }
  }
  const fundraisers = () => {
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
    <div class={`flex h-full w-full flex-col items-center justify-center rounded-2xl ${background()} p-2 shadow-2xl`}>
      <p class={`${community()} font-bold`}>Community</p>
      <p class={`${fundraisers()} font-bold`}>Fundraisers</p>
    </div>
  )
}
