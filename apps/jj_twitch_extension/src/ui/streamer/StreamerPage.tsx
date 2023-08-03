import { Component, For, Match, Switch } from 'solid-js'
import { Numeric } from 'solid-i18n'
import { loadLocalAndRemote, useFirestoreDB, useJJConfig } from '@ycapp/common'
import { collection, CollectionReference, doc } from 'firebase/firestore'
import { FundraiserData } from '../charity/charity_model'

const StreamerPage: Component = () => {
  const excludeChannels = () => useJJConfig().excludeChannels ?? []

  const coll = collection(useFirestoreDB(), 'JJDonationTracker') as CollectionReference<FundraiserData>
  const d = doc<FundraiserData>(coll, 'Fundraiser2023')
  const fundraiserData = loadLocalAndRemote('fundraiserData', d, { forceRemote: true, ageInHours: 0 })

  const fundraiser = () => {
    return fundraiserData.data.data
      .filter(d => !excludeChannels().includes(d.login) && !excludeChannels().includes(d.display_name))
      .sort((a, b) => {
        if (a.login && b.login) {
          return +b.amount - +a.amount
        } else if (a.login) {
          return -1
        } else if (b.login) {
          return 1
        }
        return +b.amount - +a.amount
      })
  }

  return (
    <div
      class={
        'scrollbar-thin scrollbar-corner-primary-100 scrollbar-thumb-accent-500 scrollbar-track-accent-100 h-full overflow-y-auto overflow-x-hidden p-1.5 pt-0'
      }
    >
      <div class={'h-30 flex flex-row p-0 pb-2 text-center text-xl text-white'}>
        <h3 class={'flex-1'}>Community Fundraiser</h3>
      </div>
      <div class={'flex h-full flex-1 flex-col gap-2'}>
        <Switch>
          <Match when={fundraiserData.data}>
            <For each={fundraiser()}>
              {d => {
                return (
                  <Switch>
                    <Match when={d.login}>
                      <a
                        class={
                          'min-h-24 hover:scale-102 bg-twitch-200 w-full rounded-2xl shadow-xl transition-all hover:shadow-2xl hover:brightness-105'
                        }
                        href={`https://twitch.tv/${d.login}`}
                        target={'_blank'}
                      >
                        <div class={'flex h-full w-full items-center p-1'}>
                          <img class={'h-10 w-10 rounded-lg'} alt={d.display_name} src={d.img} />
                          <div class={'w-full pl-1'}>
                            <p class={'truncate text-ellipsis text-sm font-bold'}>{d.display_name}</p>
                            <p class={'line-clamp-2 w-full text-ellipsis text-xs'}>{d.desc}</p>
                            <p class={'text-primary text-xs font-bold'}>
                              Raised <Numeric value={+d.amount} numberStyle="currency" currency={'GBP'} />
                            </p>
                          </div>
                        </div>
                      </a>
                    </Match>
                    <Match when={!d.login}>
                      <div class={'min-h-24 w-full rounded-2xl bg-white shadow-xl transition-all'}>
                        <div class={'flex h-full w-full items-center p-1'}>
                          <img class={'h-10 w-10 rounded-lg'} alt={d.display_name} src={d.img} />
                          <div class={'w-full pl-1'}>
                            <p class={'truncate text-ellipsis text-sm font-bold'}>{d.display_name}</p>
                            <p class={'line-clamp-2 w-full text-ellipsis text-xs'}>{d.desc}</p>
                            <p class={'text-primary text-xs font-bold'}>
                              Raised <Numeric value={+d.amount} numberStyle="currency" currency={'GBP'} />
                            </p>
                          </div>
                        </div>
                      </div>
                    </Match>
                  </Switch>
                )
              }}
            </For>
          </Match>
        </Switch>
      </div>
    </div>
  )
}

export default StreamerPage
