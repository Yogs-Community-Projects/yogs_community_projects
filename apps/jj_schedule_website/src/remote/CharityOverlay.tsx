import { Component, For, JSXElement, Match, Switch } from 'solid-js'
import { data } from '../assets/fundraiser_data.json'
import { Numeric } from 'solid-i18n'
import { FaBrandsTwitch } from 'solid-icons/fa'
import { excludedChannel } from './overlay_signals'
import { collection, CollectionReference, doc } from 'firebase/firestore'
import { JJData } from 'jj_twitch_extension/src/ui/charity/charity_model'
import { loadLocalAndRemote, useFirestoreDB } from '@ycapp/common'

export const CharityOverlay: Component = () => {
  const e = excludedChannel()
  const useData = () => data.filter(d => !e.includes(d.login))

  const coll = collection(useFirestoreDB(), 'JJDonationTracker') as CollectionReference<JJData>
  const d = doc<JJData>(coll, 'JJDonationTracker2023')
  const charityData = loadLocalAndRemote('charityData', d, { forceRemote: true, ageInHours: 0 })
  const desc = () => {
    if (useData().length % 4 == 0) {
      return 4
    }
    return 3
  }
  const items = () => {
    const lst = charityData.data.tiltify_campaign_data
    const result: JSXElement[] = []

    for (let i = 0; i < lst.length; i++) {
      const d = lst[i]
      if (i % desc() == 0) {
        result.push(
          <div class={'flex h-full w-full flex-col items-center justify-center rounded-2xl bg-white p-2 shadow-2xl'}>
            <p class={'text-accent-500 font-bold'}>Jingle Jam</p>
            <p class={'text-primary-500 font-bold'}>Charities</p>
          </div>,
        )
      }
      result.push(
        <div class={'h-full w-full rounded-2xl bg-white p-2 shadow-2xl'}>
          <div class={'flex h-full w-full flex-row items-center justify-start'}>
            <img class={'h-12 w-12 rounded-lg'} alt={''} src={d.img} />
            <div class={'flex h-full flex-1 flex-col items-start justify-center overflow-hidden truncate pl-2 '}>
              <p class={'text-accent font-bold'}>{d.name}</p>
              <p class={'text-primary font-bold'}>
                Raised <Numeric value={+d.total.pounds} numberStyle="currency" currency={'GBP'} />
              </p>
            </div>
          </div>
        </div>,
      )
    }

    return result
  }

  return (
    <Switch>
      <Match when={charityData.data} keyed={true}>
        <div class="relative flex overflow-x-hidden">
          <div class="animate-marquee flex flex-row whitespace-nowrap">
            <For each={items()}>
              {d => {
                return <div class="inline-block h-[72px] w-[256px] items-center justify-center px-2 py-1">{d}</div>
              }}
            </For>
          </div>
          <div class="animate-marquee2 absolute top-0 flex flex-row whitespace-nowrap">
            <For each={items()}>
              {d => {
                return <div class="inline-block h-[72px] w-[256px] items-center justify-center px-2 py-1">{d}</div>
              }}
            </For>
          </div>
        </div>
      </Match>
    </Switch>
  )
}
