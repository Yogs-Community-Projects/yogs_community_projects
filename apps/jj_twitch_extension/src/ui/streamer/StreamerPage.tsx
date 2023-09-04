import { Component, createEffect, createSignal, For, Match, onMount, Show, Switch } from 'solid-js'
import { Numeric } from 'solid-i18n'
import { loadLocalAndRemote, useFirestoreDB, useJJConfig } from '@ycapp/common'
import { collection, CollectionReference, doc } from 'firebase/firestore'
import { Fundraiser, FundraiserData } from '../charity/charity_model'
import { DateTime } from 'luxon'
import { useJJStartCountdown, useNextJJStartDate } from '../schedule/SchedulePage'
import { FiExternalLink } from 'solid-icons/fi'
import { twMerge } from 'tailwind-merge'
import { useTwitchConfig } from '../config/TwitchConfigProvider'

const visible = () => useJJConfig().showCommunityFundraiser
const StreamerPage: Component = () => {
  return (
    <>
      <Show when={visible()}>
        <VisibleBody />
      </Show>
      <Show when={!visible()}>
        <InvisibleBody />
      </Show>
    </>
  )
}
const VisibleBody: Component = () => {
  const excludeChannels = () => useJJConfig()?.excludeChannels ?? []
  const { config } = useTwitchConfig()

  const coll = collection(useFirestoreDB(), 'JJDonationTracker') as CollectionReference<FundraiserData>
  const d = doc<FundraiserData>(coll, 'Fundraiser2023')
  const fundraiserData = loadLocalAndRemote('fundraiserData', d, { forceRemote: true, ageInHours: 0 })
  const fundraiser = () => {
    return fundraiserData.data.data
      .filter(d => !excludeChannels().includes(d.login) && !excludeChannels().includes(d.display_name))
      .sort((a, b) => {
        /*
        if (a.login && b.login) {
          return +b.amount.value - +a.amount.value
        } else if (a.login) {
          return -1
        } else if (b.login) {
          return 1
        }*/
        return +b.amount.value - +a.amount.value
      })
  }

  return (
    <div
      class={twMerge(
        'scrollbar-thin scrollbar-corner-primary-100 scrollbar-thumb-accent-500 scrollbar-track-accent-100 h-full overflow-y-auto overflow-x-hidden p-1.5 pt-0',
        config.theme === 'blue'
          ? 'scrollbar-corner-accent-100 scrollbar-thumb-primary-500 scrollbar-track-primary-100'
          : '',
      )}
    >
      <div class={'h-30 flex flex-row p-0 pb-2 text-center text-xl text-white'}>
        <h3 class={'flex-1'}>Community Fundraiser</h3>
      </div>
      <div class={'flex h-full flex-1 flex-col gap-2'}>
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
    </div>
  )
}

const FundraiserBody: Component<{ fundraisers: Fundraiser[] }> = props => {
  const fundraiser = () => props.fundraisers
  return (
    <For each={fundraiser()}>
      {d => {
        return (
          <Switch>
            <Match when={d.login}>
              <a
                class={
                  'min-h-24 hover:scale-102 group w-full rounded-2xl bg-white shadow-xl transition-all hover:shadow-2xl hover:brightness-105'
                }
                href={`https://twitch.tv/${d.login}`}
                target={'_blank'}
              >
                <div class={'flex h-full w-full items-center p-1'}>
                  <img class={'h-10 w-10 rounded-lg'} alt={d.display_name} src={d.img} loading={'lazy'} />
                  <div class={'w-full pl-1'}>
                    <div class={'flex flex-row items-center gap-2'}>
                      <Show when={d.isLive}>
                        <p class={'text-xxs animate-pulse rounded bg-red-500 p-0.5 text-white'}>LIVE</p>
                      </Show>
                      <p class={'truncate text-ellipsis text-sm font-bold'}>{d.display_name}</p>
                    </div>
                    <p class={'line-clamp-2 w-full text-ellipsis text-xs'}>{d.desc}</p>
                    <p class={'text-primary text-xs font-bold'}>
                      Raised <Numeric value={+d.amount.value} numberStyle="currency" currency={d.amount.currency} />
                    </p>
                  </div>
                  <FiExternalLink />
                </div>
              </a>
            </Match>
            <Match when={!d.login}>
              <div class={'min-h-24 w-full rounded-2xl bg-white shadow-xl transition-all'}>
                <div class={'flex h-full w-full items-center p-1'}>
                  <img class={'h-10 w-10 rounded-lg'} alt={d.display_name} src={d.img} loading={'lazy'} />
                  <div class={'w-full pl-1'}>
                    <p class={'truncate text-ellipsis text-sm font-bold'}>{d.display_name}</p>
                    <p class={'line-clamp-2 w-full text-ellipsis text-xs'}>{d.desc}</p>
                    <p class={'text-primary text-xs font-bold'}>
                      Raised <Numeric value={+d.amount.value} numberStyle="currency" currency={d.amount.currency} />
                    </p>
                  </div>
                </div>
              </div>
            </Match>
          </Switch>
        )
      }}
    </For>
  )
}

const RandomFundraiserButton: Component<{ fundraisers: Fundraiser[] }> = props => {
  const fundraisers = () => props.fundraisers.filter(f => f.login && f.isLive)

  const show = () => fundraisers().length > 0
  const randomFundraiser = () => {
    const f = fundraisers()
    const rand = Math.floor(Math.random() * f.length)
    return f[rand]
  }

  const [fundraiser, setFundraiser] = createSignal<Fundraiser>(randomFundraiser())

  const updateSelectedFundraiser = () => setFundraiser(randomFundraiser())

  onMount(() => {
    updateSelectedFundraiser()
  })

  createEffect(() => {
    updateSelectedFundraiser()
  })

  const url = () => `https://twitch.tv/${fundraiser().login}`

  return (
    <Show when={show()}>
      <a
        href={url()}
        target={'_blank'}
        class={
          'bg-accent-500 flex flex-row items-center justify-center gap-1 rounded-full p-1 text-sm text-white shadow hover:brightness-105'
        }
        onMouseEnter={updateSelectedFundraiser}
      >
        Open Random Fundraiser Stream
        <FiExternalLink />
      </a>
    </Show>
  )
}

const InvisibleBody: Component = () => {
  return (
    <div class={'mx-auto flex w-fit flex-col items-center p-1 text-center text-base text-white md:w-[50%] md:text-2xl'}>
      <p class={'p-1 text-2xl font-bold md:p-2 md:text-4xl'}>Jingle Jam Countdown</p>
      <p class={'text-xl md:text-3xl'}>{useNextJJStartDate().toLocal().toFormat('DDDD')}</p>
      <p class={'text-xl md:text-3xl'}>{useNextJJStartDate().toLocal().toFormat('ttt')}</p>
      <p class={''}>{useNextJJStartDate().toFormat('DDDD')}</p>
      <p class={''}>{useNextJJStartDate().toFormat('ttt')}</p>
      <div class={'flex flex-col items-center p-1 text-white md:p-4'}>
        <p class={'text-2xl md:text-4xl'}>Jingle Jam {useNextJJStartDate().year} starts</p>
        <p class={'font-mono text-2xl md:text-4xl'}>{useJJStartCountdown().toFormat("dd 'Days' hh:mm:ss")}</p>
      </div>
      <p>The Community Fundraiser Page will be live soon.</p>
    </div>
  )
}
export default StreamerPage
