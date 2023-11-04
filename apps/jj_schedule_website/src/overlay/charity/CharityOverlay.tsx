import { Component, For, JSXElement, Match, Show, Switch } from 'solid-js'
import { Numeric } from 'solid-i18n'
import { useShowRaised, useSpeed, useTheme } from '../overlay_signals'
import { collection, CollectionReference, doc } from 'firebase/firestore'
import { loadLocalAndRemote, useFirestoreDB } from '@ycapp/common'
import '../marquee.css'
import { JJLink } from '../JJLinkCard'
import { Cause, JJData } from '@ycapp/model'

export const CharityOverlay: Component = () => {
  return <CharityOverlayComponent speed={useSpeed()} theme={useTheme()} showRaised={useShowRaised()} />
}

export const CharityOverlayComponent: Component<{ speed: number; theme: string; showRaised: boolean }> = props => {
  const coll = collection(useFirestoreDB(), 'JJDonationTracker') as CollectionReference<JJData>
  const d = doc<JJData>(coll, 'JJDonationTracker2023_2')
  const charityData = loadLocalAndRemote('charityData', d, { forceRemote: true, ageInHours: 0 })
  const desc = () => {
    if (!charityData.data) {
      return 3
    }
    if (charityData.data.causes.length % 4 == 0) {
      return 4
    }
    return 3
  }
  const items = () => {
    const lst = charityData.data.causes
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
      result.push(<Child d={d} theme={props.theme} showRaised={props.showRaised} />)
    }

    return result
  }

  return (
    <Switch>
      <Match when={charityData.data} keyed={true}>
        <p>{}</p>
        <div class="relative flex overflow-x-hidden">
          <div
            style={{
              animation: `marquee ${props.speed * (items().length * 2)}s linear infinite`,
            }}
            class="flex flex-row whitespace-nowrap"
          >
            <For each={items()}>
              {d => {
                return <div class="inline-block h-[80px] w-[256px] items-center justify-center px-2 py-1">{d}</div>
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
                return <div class="inline-block h-[80px] w-[256px] items-center justify-center px-2 py-1">{d}</div>
              }}
            </For>
          </div>
        </div>
      </Match>
    </Switch>
  )
}

interface ChildProps {
  theme: string
  d: Cause
  showRaised: boolean
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
  const useNameTextColor = () => {
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
  return (
    <div class={`h-full w-full rounded-2xl ${useBackground()} p-2 shadow-2xl`}>
      <div class={'flex h-full w-full flex-row items-center justify-start'}>
        <img class={'h-12 w-12 rounded-lg'} alt={''} src={props.d.logo} loading={'lazy'} />
        <div class={'flex h-full flex-1 flex-col items-start justify-center overflow-hidden truncate pl-2 '}>
          <p class={`${useNameTextColor()} font-bold`}>{props.d.name}</p>
          <Show when={props.showRaised}>
            <p class={`${useRaisedTextColor()} font-bold`}>
              Raised{' '}
              <Numeric
                value={props.d.raised.fundraisers + props.d.raised.yogscast}
                numberStyle="currency"
                currency={'GBP'}
              />
            </p>
          </Show>
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
      <p class={`${community()} font-bold`}>Jingle Jam</p>
      <p class={`${fundraisers()} font-bold`}>Charities</p>
    </div>
  )
}
