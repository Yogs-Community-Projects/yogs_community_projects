import { Component, For, Match, ParentComponent, Show, Switch } from 'solid-js'
import { useJJConfig } from '@ycapp/common'
import { DateTime } from 'luxon'
import { FiExternalLink } from 'solid-icons/fi'
import { twMerge } from 'tailwind-merge'
import { Campaign } from '@ycapp/model'
import { useTheme } from '../themeProvider'
import { InvisibleBody } from '../InvisibleBody'
import { Numeric } from 'solid-i18n'
import { ColoredScrollbar } from '../../ColoredScrollbar'
import { useData } from '../dataProvider'
import { LoadingFundraisers } from '../components/LoadingPage'

const StreamerPage: Component = () => {
  const config = useJJConfig()
  const visible = () => config.showCommunityFundraiser
  return (
    <>
      <Show when={visible()}>
        <VisibleBody />
      </Show>
      <Show when={!visible()}>
        <InvisibleBody text={'The Community Fundraiser Page will be live soon.'} />
      </Show>
    </>
  )
}
const VisibleBody: Component = () => {
  const { fundraiserData } = useData()

  const fundraiser = () => fundraiserData.data.campaigns

  return (
    <div class={'flex h-full flex-1 flex-col'}>
      <ColoredScrollbar>
        <p class={'px-2 text-center text-xl text-white'}>Community Fundraiser</p>
        <Switch>
          <Match when={fundraiserData.data}>
            <p class={'mb-2 text-center text-base text-white'}>
              Last update, {DateTime.fromISO(fundraiserData.data.date).toLocaleString(DateTime.DATETIME_MED)}
            </p>
            <div class={'mb-2 flex flex-1 flex-col gap-2'}>
              <FundraiserBody fundraisers={fundraiser()} />
            </div>
          </Match>
          <Match when={fundraiserData.error} keyed={false}>
            <p>{fundraiserData.error.message}</p>
          </Match>
          <Match when={fundraiserData.loading} keyed={false}>
            <LoadingFundraisers />
          </Match>
        </Switch>
      </ColoredScrollbar>
    </div>
  )
}

const FundraiserBody: Component<{ fundraisers: Campaign[] }> = props => {
  const fundraiser = () => props.fundraisers

  return (
    <For each={fundraiser()}>
      {(d: Campaign, i) => {
        const isTwitch = () => d.twitch_data && d.livestream.type === 'twitch'
        const img = () => {
          if (d.user.avatar === 'https://assets.tiltify.com/assets/default-avatar.png') {
            if (isTwitch()) {
              return d.twitch_data.profile_image_url
            }
          }
          return d.user.avatar
        }

        const url = () => {
          if (!d.twitch_data) {
            return undefined
          }
          return `https://twitch.tv/${d.twitch_data.login}`
        }

        return (
          <Child
            i={i()}
            img={img()}
            title={d?.twitch_data?.display_name ?? d.user.name}
            subtitle={d.name}
            desc={d.description}
            isLive={d.isLive}
            raised={d.raised}
            url={url()}
          />
        )
      }}
    </For>
  )
}

const Live = () => {
  return (
    <div class={'relative flex h-3 items-center justify-center'}>
      <p class={'bg-twitch-500 rounded p-0.5 text-[6px] text-white'}>LIVE</p>
    </div>
  )
}

const Child: Component<{
  i: number
  title: string
  subtitle: string
  img: string
  isLive: boolean
  desc: string
  raised: number
  url?: string
}> = props => {
  const { theme, tailwindTextPrimary } = useTheme()

  const raisedColor = () => {
    if (theme() === 'rainbow') {
      return 'text-black'
    } else if (theme() === 'dark') {
      return 'text-white'
    }
    return tailwindTextPrimary()
  }

  return (
    <ChildBody url={props.url} i={props.i}>
      <div class={'flex h-full w-full flex-row items-center gap-2 p-1.5'}>
        <div class={'flex h-full flex-1 flex-col gap-1 overflow-hidden'}>
          <div class={'flex flex-row gap-1'}>
            <img class={'h-8 w-8 rounded-lg'} alt={props.title} src={props.img} loading={'lazy'} />
            <div class={'flex h-full flex-col justify-between overflow-hidden'}>
              <div class={'flex max-h-[14px] flex-row items-center gap-1 overflow-hidden'}>
                <Show when={props.isLive && props.url}>
                  <Live />
                </Show>
                <p class={'truncate text-ellipsis text-sm font-bold'}>{props.title}</p>
              </div>
              <p class={'truncate text-ellipsis text-xs font-bold'}>{props.subtitle}</p>
            </div>
          </div>
          <p class={'line-clamp-2 w-full text-ellipsis text-xs'}>{props.desc}</p>
          <p class={twMerge('text-primary text-xs font-bold', raisedColor())}>
            Raised <Numeric value={props.raised} numberStyle="currency" currency={'GBP'} />
          </p>
        </div>
        <Show when={props.url}>
          <FiExternalLink />
        </Show>
      </div>
    </ChildBody>
  )

  /*
  return (
    <ChildBody url={props.url} i={props.i}>
      <div class={'flex h-full w-full items-start p-1'}>
        <img class={'h-10 w-10 rounded-lg'} alt={props.title} src={props.img} loading={'lazy'} />
        <div class={'w-full overflow-hidden pl-1'}>
          <p class={'truncate text-ellipsis text-sm font-bold'}>{props.title}</p>
          <div class={'flex max-h-[12px] flex-row items-center gap-1'}>
            <Show when={props.isLive}>
              <Live />
            </Show>
            <p class={'text-xxs truncate text-ellipsis font-bold'}>{props.subtitle}</p>
          </div>
          <p class={'line-clamp-2 w-full text-ellipsis text-xs'}>{props.desc}</p>
          <p class={twMerge('text-primary text-xs font-bold', raisedColor())}>
            Raised <Numeric value={props.raised} numberStyle="currency" currency={'GBP'} />
          </p>
        </div>
        <Show when={props.url}>
          <FiExternalLink />
        </Show>
      </div>
    </ChildBody>
  )*/
}

const ChildBody: ParentComponent<{ i: number; url?: string }> = props => {
  const { theme } = useTheme()

  const gradient = [
    'bg-gradient-to-br from-red-200 to-red-400',
    'bg-gradient-to-br from-orange-200 to-orange-400',
    'bg-gradient-to-br from-yellow-200 to-yellow-400',
    'bg-gradient-to-br from-green-200 to-green-400',
    'bg-gradient-to-br from-cyan-200 to-cyan-400',
    'bg-gradient-to-br from-blue-200 to-blue-400',
    'bg-gradient-to-br from-purple-200 to-purple-400',
  ]

  const campaignColor = (i: number) => {
    if (theme() === 'rainbow') {
      return gradient[i % gradient.length]
    } else if (theme() === 'dark') {
      return 'bg-gray-500 text-white'
    }
    return 'bg-gradient-to-br from-white to-gray-100'
  }
  return (
    <Switch>
      <Match when={props.url}>
        <a
          class={twMerge(
            'min-h-24 w-full rounded-2xl shadow-xl',
            'hover:scale-102 group/live transition-all hover:shadow-2xl hover:brightness-105',
            campaignColor(props.i),
          )}
          href={props.url}
          target={'_blank'}
        >
          {props.children}
        </a>
      </Match>
      <Match when={!props.url}>
        <div class={twMerge('min-h-24 w-full rounded-2xl shadow-xl transition-all', campaignColor(props.i))}>
          {props.children}
        </div>
      </Match>
    </Switch>
  )
}

export default StreamerPage
