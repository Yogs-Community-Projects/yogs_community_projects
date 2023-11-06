import { Component, createEffect, createSignal, For, Match, onMount, Show, Switch } from 'solid-js'
import { collection, CollectionReference, doc } from 'firebase/firestore'
import { Campaign, JJCommunityFundraiser } from '@ycapp/model'
import { useFirestore } from 'solid-firebase'
import { useFirestoreDB } from '@ycapp/common'
import { twMerge } from 'tailwind-merge'
import { Numeric } from 'solid-i18n'
import { DateTime } from 'luxon'

const CommunityPage: Component = () => {
  return (
    <div class={'mx-auto flex flex-col items-center p-1 text-center text-white md:w-[75%]'}>
      <p class={'p-2 text-2xl font-bold md:text-4xl'}>Jingle Jam Community Fundraiser</p>
      <CommunityFundraiserList />
    </div>
  )
}

const CommunityFundraiserList: Component = () => {
  const db = useFirestoreDB()
  const coll = collection(db, 'JJDonationTracker') as CollectionReference<JJCommunityFundraiser>
  const d = doc<JJCommunityFundraiser>(coll, 'Fundraiser2023')
  const fundraiserData = useFirestore(d)

  return (
    <Switch>
      <Match when={fundraiserData.loading}>
        <p>Loading...</p>
      </Match>
      <Match when={fundraiserData.error}>
        <p>{fundraiserData.error.message}</p>
      </Match>
      <Match when={fundraiserData.data}>
        <FundraiserBody fundraiserData={fundraiserData.data} />
      </Match>
    </Switch>
  )
}

const FundraiserBody: Component<{ fundraiserData: JJCommunityFundraiser }> = props => {
  const fundraiser = () => {
    return (
      [...props.fundraiserData.campaigns]
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

  const top = () => fundraiser().at(0)

  const top10 = () => (fundraiser().length > 10 ? fundraiser().slice(1, 10) : fundraiser().slice(1))

  const rest = () => (fundraiser().length > 10 ? fundraiser().slice(10) : [])

  return (
    <div class={'flex flex-col items-center gap-4'}>
      <p class={'mb-2 text-center text-base text-white'}>
        Last update, {DateTime.fromISO(props.fundraiserData.date).toLocaleString(DateTime.DATETIME_MED)}
      </p>
      <a class={'text-xl hover:text-white'} href={'https://jinglejam.tiltify.com'} target={'_blank'}>
        jinglejam.tiltify.com
      </a>
      <Show when={fundraiser().length > 0}>
        <div class={'flex flex-row items-center justify-center gap-2'}>
          <RandomFundraiserButton fundraisers={fundraiser()} />
          <RandomTwitchButton fundraisers={fundraiser()} />
        </div>
        <div class={'md:w-[50%]'}>
          <Child campaign={top()} />
        </div>
        <div class={'grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] content-center gap-4'}>
          <For each={top10()}>
            {(campaign: Campaign) => {
              return <Child campaign={campaign} />
            }}
          </For>
        </div>
        <div class={'grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] content-center gap-2'}>
          <For each={rest()}>
            {(campaign: Campaign) => {
              return <Child campaign={campaign} />
            }}
          </For>
        </div>
      </Show>
    </div>
  )
}

const Child: Component<{
  campaign: Campaign
}> = props => {
  const campaign = props.campaign

  const title = () => campaign?.twitch_data?.display_name ?? campaign.user.name
  const isTwitch = () => campaign.twitch_data && campaign.livestream.type === 'twitch'
  const img = () => {
    if (campaign.user.avatar === 'https://assets.tiltify.com/assets/default-avatar.png') {
      if (isTwitch()) {
        return campaign.twitch_data.profile_image_url
      }
    }
    return campaign.user.avatar
  }

  const twitchUrl = () => {
    if (!campaign.twitch_data) {
      return undefined
    }
    return `https://twitch.tv/${campaign.twitch_data.login}`
  }

  const youtubeUrl = () => {
    if (campaign.livestream.type === 'youtube_live') {
      return `https://www.youtube.com/channel/${campaign.livestream.channel}`
    }
    if (campaign.livestream.type === 'youtube_video') {
      return `https://www.youtube.com/watch?v=${campaign.livestream.channel}`
    }
    return undefined
  }

  return (
    <div class={'min-h-24 flex flex-col'}>
      <div
        class={
          'min-h-24 flex h-full w-full flex-row items-start gap-2 rounded-2xl bg-gradient-to-br from-white to-gray-100 p-1.5 text-black shadow-xl transition-all'
        }
      >
        <div class={'flex h-full flex-1 flex-col overflow-hidden'}>
          <div class={'flex flex-row gap-1'}>
            <img class={'h-10 w-10 rounded-lg'} alt={title()} src={img()} loading={'lazy'} />
            <div class={'flex h-full flex-col justify-between overflow-hidden'}>
              <div class={'flex max-h-[14px] flex-row items-center gap-1 overflow-hidden'}>
                <Show when={campaign.isLive && twitchUrl()}>
                  <Live />
                </Show>
                <p class={'truncate text-ellipsis text-start text-sm font-bold'}>{title()}</p>
              </div>
              <p class={'truncate text-ellipsis text-start text-xs font-bold'}>{campaign.name}</p>
              <p class={twMerge('text-primary-500 text-start text-xs font-bold')}>
                Raised <Numeric value={campaign.raised} numberStyle="currency" currency={'GBP'} />
              </p>
            </div>
          </div>
          <p class={'line-clamp-2 w-full text-ellipsis text-start text-xs'}>{campaign.description}</p>
        </div>
      </div>
      <div class={'flex w-full flex-row items-center justify-end gap-4 p-1'}>
        <a
          class={
            'bg-accent-500 hover:scale-102 rounded-xl p-1 no-underline shadow hover:text-white hover:brightness-105'
          }
          href={campaign.url}
          target={'_blank'}
        >
          Donate
        </a>
        <Show when={twitchUrl()}>
          <a
            class={
              'bg-twitch-500 hover:scale-102 rounded-xl p-1 no-underline shadow hover:text-white hover:brightness-105'
            }
            href={twitchUrl()}
            target={'_blank'}
          >
            Twitch
          </a>
        </Show>
        <Show when={youtubeUrl()}>
          <a
            class={
              'bg-youtube hover:scale-102 rounded-xl p-1 no-underline shadow hover:text-white hover:brightness-105'
            }
            href={youtubeUrl()}
            target={'_blank'}
          >
            Youtube
          </a>
        </Show>
      </div>
    </div>
  )
}

const Live = () => {
  return (
    <>
      <div class={'relative hidden h-3 items-center justify-center group-hover/live:flex'}>
        <p class={'bg-twitch-500 rounded p-0.5 text-[6px] text-white'}>LIVE</p>
      </div>
      <span class="relative flex h-3 w-3 items-center justify-center group-hover/live:hidden">
        <span class={'bg-twitch-400 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75'} />
        <span class={'bg-twitch-500 relative inline-flex h-full w-full rounded-full'} />
      </span>
    </>
  )
}

const RandomTwitchButton: Component<{ fundraisers: Campaign[] }> = props => {
  const fundraisers = () => props.fundraisers.filter(f => f.livestream.type === 'twitch' && f.twitch_data)
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

  const url = () => `https://twitch.tv/${fundraiser().livestream.channel}`

  return (
    <Show when={show()}>
      <a
        href={url()}
        target={'_blank'}
        class={twMerge(
          'bg-twitch-500 hover:scale-102 flex flex-row items-center justify-center gap-1 rounded-full p-1 text-sm text-white no-underline shadow hover:text-white hover:brightness-105',
        )}
        onMouseEnter={updateSelectedFundraiser}
      >
        Open Random Stream
      </a>
    </Show>
  )
}

const RandomFundraiserButton: Component<{ fundraisers: Campaign[] }> = props => {
  const fundraisers = () => props.fundraisers
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

  const url = () => fundraiser().url

  return (
    <Show when={show()}>
      <a
        href={url()}
        target={'_blank'}
        class={twMerge(
          'bg-accent-500 hover:scale-102 flex flex-row items-center justify-center gap-1 rounded-full p-1 text-sm text-white no-underline shadow hover:text-white hover:brightness-105',
        )}
        onMouseEnter={updateSelectedFundraiser}
      >
        Open Random Fundraiser
      </a>
    </Show>
  )
}

export default CommunityPage
