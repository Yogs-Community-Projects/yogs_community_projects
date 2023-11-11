import { Component, For, JSXElement, Match, Switch } from 'solid-js'
import { Numeric } from 'solid-i18n'
import { FaBrandsTwitch, FaBrandsYoutube } from 'solid-icons/fa'
import { excludedChannel, minAmount, useTiltifyUrl, useSpeed, useTheme, useTitleLogo } from '../overlay_signals'
import '../marquee.css'
import { JJLink } from '../JJLinkCard'
import { collection, CollectionReference, doc } from 'firebase/firestore'
import { loadLocalAndRemote, useFirestoreDB } from '@ycapp/common'
import { Campaign, JJCommunityFundraiser } from '@ycapp/model'
import { twMerge } from 'tailwind-merge'
import { JJTitleCard } from '../JJTitleCard'

export const FundraisersOverlay = () => {
  return (
    <FundraisersOverlayComponent
      speed={useSpeed()}
      theme={useTheme()}
      url={useTiltifyUrl()}
      titleLogo={useTitleLogo()}
    />
  )
}

export const FundraisersOverlayComponent: Component<{
  speed: number
  theme: string
  url: string
  titleLogo: string
}> = props => {
  const e = excludedChannel()

  const coll = collection(useFirestoreDB(), 'JJDonationTracker') as CollectionReference<JJCommunityFundraiser>
  const d = doc<JJCommunityFundraiser>(coll, 'Fundraiser2023_2')
  const fundraiserData = loadLocalAndRemote('fundraiserData', d, { forceRemote: true, ageInHours: 0 })
  const useData = () =>
    fundraiserData.data?.campaigns
      // .filter(d => !e.includes(d.login))
      // .filter(d => !e.includes(d.display_name))
      .filter(d => d.raised >= minAmount()) ?? []

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
          result.push(<Title theme={props.theme} titleLogo={props.titleLogo} />)
        } else {
          result.push(<JJLink theme={props.theme} url={props.url} />)
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
  )
}

interface ChildProps {
  theme: string
  d: Campaign
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

  const isTwitch = () => props.d.twitch_data && props.d.livestream.type === 'twitch'
  const isYoutube = () => props.d.livestream.type === 'youtube'

  const img = () => {
    if (props.d.user.avatar === 'https://assets.tiltify.com/assets/default-avatar.png') {
      if (isTwitch()) {
        return props.d.twitch_data.profile_image_url
      }
    }
    return props.d.user.avatar
  }

  return (
    <div class={`h-full w-full rounded-2xl ${useBackground()} p-2 text-base shadow-2xl`}>
      <div class={'flex h-full w-full flex-row items-center justify-start'}>
        <img class={'h-12 w-12 rounded-lg'} alt={''} src={img()} loading={'eager'} />
        <div class={'flex h-full w-full flex-col items-start justify-center overflow-hidden truncate pl-2'}>
          <div class={twMerge(`flex flex-row items-center font-bold`, useDisplayNameTextColor())}>{props.d.name}</div>
          <Switch>
            <Match when={isTwitch()}>
              <div class={twMerge(`flex flex-row items-center font-bold`, useTwitchIconColor())}>
                <FaBrandsTwitch size={14} />
                <span class={twMerge(`text-xs`, useDisplayNameTextColor())}>/{props.d.twitch_data.login}</span>
              </div>
            </Match>
            <Match when={isYoutube()}>
              <div class={`${useTwitchIconColor()} flex flex-row items-center font-bold`}>
                <FaBrandsYoutube size={14} />
                <span class={twMerge(`text-xs`, useDisplayNameTextColor())}>/{props.d.livestream.channel}</span>
              </div>
            </Match>
          </Switch>
          <p class={`${useRaisedTextColor()} font-bold`}>
            Raised <Numeric value={props.d.raised} numberStyle="currency" currency={'GBP'} />
          </p>
        </div>
      </div>
    </div>
  )
}

interface TitleProps {
  theme: string
  titleLogo: string
}

const Title: Component<TitleProps> = props => {
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
    <JJTitleCard theme={props.theme} titleLogo={props.titleLogo}>
      <p class={`${community()} font-bold`}>Jingle Jam</p>
      <p class={`${fundraisers()} font-bold`}>Charities</p>
    </JJTitleCard>
  )
}
