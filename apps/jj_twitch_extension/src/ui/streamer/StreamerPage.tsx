import { Component, createEffect, createSignal, For, Match, onMount, ParentComponent, Show, Switch } from 'solid-js'
import { loadLocalAndRemote, useFirestoreDB, useJJConfig } from '@ycapp/common'
import { collection, CollectionReference, doc } from 'firebase/firestore'
import { DateTime } from 'luxon'
import { FiExternalLink } from 'solid-icons/fi'
import { twMerge } from 'tailwind-merge'
import { useTwitchConfig } from '../config/TwitchConfigProvider'
import { Campaign, JJCommunityFundraiser } from '@ycapp/model'
import { useTheme } from '../../ThemeProvider'
import { InvisibleBody } from '../InvisibleBody'
import { Numeric } from 'solid-i18n'
import { ColoredScrollbar } from '../../ColoredScrollbar'

const StreamerPage: Component = () => {
  const visible = () => useJJConfig().showCommunityFundraiser
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
  const excludeChannels = () => useJJConfig()?.excludeChannels ?? []
  const { config } = useTwitchConfig()

  const coll = collection(useFirestoreDB(), 'JJDonationTracker') as CollectionReference<JJCommunityFundraiser>
  const d = doc<JJCommunityFundraiser>(coll, 'Fundraiser2023')
  const fundraiserData = loadLocalAndRemote('fundraiserData', d, { forceRemote: true, ageInHours: 0 })
  const fundraiser = () => {
    return (
      [...fundraiserData.data.campaigns]
        // .filter(d => !excludeChannels().includes(d.login) && !excludeChannels().includes(d.display_name))
        .sort((a, b) => {
          /*
        if (a.login && b.login) {
          return +b.amount.value - +a.amount.value
        } else if (a.login) {
          return -1
        } else if (b.login) {
          return 1
        }*/
          return b.raised - a.raised
        })
    )
  }

  return (
    <ColoredScrollbar>
      <div class={'h-30 flex flex-row p-0 pb-2 text-center text-xl text-white'}>
        <h3 class={'flex-1'}>Community Fundraiser</h3>
      </div>
      <div class={'mb-2 flex min-h-full flex-1 flex-col gap-2'}>
        <Switch>
          <Match when={fundraiserData.data}>
            <p class={'text-center text-base text-white'}>
              Last update, {DateTime.fromISO(fundraiserData.data.date).toLocaleString(DateTime.DATETIME_MED)}
            </p>
            <RandomFundraiserButton fundraisers={fundraiser()} />
            <FundraiserBody fundraisers={fundraiser()} />
          </Match>
        </Switch>
      </div>
    </ColoredScrollbar>
  )
}

const FundraiserBody: Component<{ fundraisers: Campaign[] }> = props => {
  const fundraiser = () => props.fundraisers
  const { theme, tailwindTextPrimary } = useTheme()

  const colors = [
    'bg-red-300/80',
    'bg-orange-300/80',
    'bg-yellow-300/80',
    'bg-green-300/80',
    'bg-cyan-300/80',
    'bg-blue-300/80',
    'bg-purple-300/80',
  ]

  const campaignColor = (i: number) => {
    if (theme() !== 'rainbow') {
      return ''
    }
    return colors[i % colors.length]
  }

  const raisedColor = () => {
    if (theme() === 'rainbow') {
      return 'text-black'
    }
    return tailwindTextPrimary()
  }

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
        /*
        return (
          <Switch>
            <Match when={d.twitch_data}>
              <a
                class={twMerge(
                  'min-h-24 hover:scale-102 group w-full rounded-2xl bg-white shadow-xl transition-all hover:shadow-2xl hover:brightness-105',
                  campaignColor(i()),
                )}
                href={`https://twitch.tv/${d.twitch_data.login}`}
                target={'_blank'}
              >
                <div class={'flex h-full w-full items-start p-1'}>
                  <img class={'h-10 w-10 rounded-lg'} alt={d.twitch_data.display_name} src={img()} loading={'lazy'} />
                  <div class={'w-full overflow-hidden pl-1'}>
                    <p class={'truncate text-ellipsis text-sm font-bold'}>{d.name}</p>
                    <div class={'flex max-h-[12px] flex-row items-center gap-1'}>
                      <Show when={d.isLive}>
                        <Live />
                      </Show>
                      <p class={'text-xxs truncate text-ellipsis font-bold'}>{d.twitch_data.display_name}</p>
                    </div>
                    <p class={'line-clamp-2 w-full text-ellipsis text-xs'}>{d.description}</p>
                    <p class={twMerge('text-primary text-xs font-bold', raisedColor())}>
                      Raised <Numeric value={d.raised} numberStyle="currency" currency={'GBP'} />
                    </p>
                  </div>
                  <FiExternalLink />
                </div>
              </a>
            </Match>
            <Match when={d.livestream.type !== 'twitch' || !d.livestream.channel}>
              <div class={twMerge('min-h-24 w-full rounded-2xl bg-white shadow-xl transition-all', campaignColor(i()))}>
                <div class={'flex h-full w-full items-center p-1'}>
                  <img class={'h-10 w-10 rounded-lg'} alt={d.user.name} src={img()} loading={'lazy'} />
                  <div class={'w-full overflow-hidden pl-1'}>
                    <p class={'truncate text-ellipsis text-sm font-bold'}>{d.name}</p>
                    <p class={'text-xxs truncate text-ellipsis font-bold'}>{d.user.name}</p>
                    <p class={'line-clamp-2 w-full text-ellipsis text-xs'}>{d.description}</p>
                    <p class={twMerge('text-primary text-xs font-bold', raisedColor())}>
                      Raised <Numeric value={d.raised} numberStyle="currency" currency={'GBP'} />
                    </p>
                  </div>
                </div>
              </div>
            </Match>
          </Switch>
        )
        */
      }}
    </For>
  )
}

const RandomFundraiserButton: Component<{ fundraisers: Campaign[] }> = props => {
  const fundraisers = () => props.fundraisers.filter(f => f.livestream.type === 'twitch' && f.isLive)

  const show = () => fundraisers().length > 0
  const randomFundraiser = () => {
    const f = fundraisers()
    const rand = Math.floor(Math.random() * f.length)
    return f[rand]
  }

  const [fundraiser, setFundraiser] = createSignal<Campaign>(randomFundraiser())

  const updateSelectedFundraiser = () => setFundraiser(randomFundraiser())

  onMount(() => {
    updateSelectedFundraiser()
  })

  createEffect(() => {
    updateSelectedFundraiser()
  })
  const { theme } = useTheme()

  const url = () => `https://twitch.tv/${fundraiser().livestream.channel}`
  const gradient = () => {
    switch (theme()) {
      case 'blue':
        return 'bg-gradient-to-br from-primary-400 to-primary-500'
      case 'dark':
        return 'bg-gradient-to-br from-gray-400 to-gray-500'
      case 'red_dark':
        return 'bg-gradient-to-br from-accent-500 to-accent-600'
      case 'blue_dark':
        return 'bg-gradient-to-br from-primary-500 to-primary-600'
      default:
        return 'bg-gradient-to-br from-accent-400 to-accent-500'
    }
  }

  return (
    <Show when={show()}>
      <a
        href={url()}
        target={'_blank'}
        class={twMerge(
          'bg-accent-500 hover:scale-102 flex flex-row items-center justify-center gap-1 rounded-full p-1 text-sm text-white shadow hover:brightness-105',
          gradient(),
        )}
        onMouseEnter={updateSelectedFundraiser}
      >
        Open Random Fundraiser Stream
        <FiExternalLink />
      </a>
    </Show>
  )
}

const Live = () => {
  const { theme } = useTheme()
  const color = () => {
    switch (theme()) {
      case 'blue':
      case 'blue_dark':
        return 'bg-blue-500'
      default:
        return 'bg-red-500'
    }
  }

  const pulseColor = () => {
    switch (theme()) {
      case 'blue':
      case 'blue_dark':
        return 'bg-blue-400'
      default:
        return 'bg-red-400'
    }
  }
  const pulseFGColor = () => {
    switch (theme()) {
      case 'blue':
      case 'blue_dark':
        return 'bg-blue-500'
      default:
        return 'bg-red-500'
    }
  }
  return (
    <span class="relative flex h-3 w-3">
      <span
        class={twMerge(
          'absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75',
          pulseColor(),
        )}
      />
      <span class={twMerge('relative inline-flex h-full w-full rounded-full bg-red-500', pulseFGColor())} />
    </span>
  )
  // return <p class={twMerge('h-4 animate-pulse rounded bg-red-500 p-0.5 text-[6px] text-white', color())}>LIVE</p>
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
      <div class={'flex h-full min-h-[64px] w-full flex-row items-center gap-2 p-1.5'}>
        <div class={'flex h-full flex-1 flex-col gap-1 overflow-hidden'}>
          <div class={'flex flex-row gap-1'}>
            <img class={'h-8 w-8 rounded-lg'} alt={props.title} src={props.img} loading={'lazy'} />
            <div class={'flex h-full flex-col justify-between overflow-hidden'}>
              <div class={'flex max-h-[14px] flex-row items-center gap-1 overflow-hidden'}>
                <Show when={props.isLive}>
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

  const colors = [
    'bg-red-200',
    'bg-orange-200',
    'bg-yellow-200',
    'bg-green-200',
    'bg-cyan-200',
    'bg-blue-200',
    'bg-purple-200',
  ]

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
      return gradient[i % colors.length]
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
            'min-h-24 hover:scale-102 group w-full rounded-2xl bg-white shadow-xl transition-all hover:shadow-2xl hover:brightness-105',
            campaignColor(props.i),
          )}
          href={props.url}
          target={'_blank'}
        >
          {props.children}
        </a>
      </Match>
      <Match when={!props.url}>
        <div class={twMerge('min-h-24 w-full rounded-2xl bg-white shadow-xl transition-all', campaignColor(props.i))}>
          {props.children}
        </div>
      </Match>
    </Switch>
  )
}

export default StreamerPage
