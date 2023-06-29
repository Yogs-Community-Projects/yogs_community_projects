import { loadLocalAndRemote, useFirestoreDB } from '@ycapp/common'
import { Component, For, Match, Switch } from 'solid-js'
import { collection, CollectionReference, doc } from 'firebase/firestore'
import { DateTime } from 'luxon'
import { Numeric } from 'solid-i18n'

interface Currency {
  dollars: number
  pounds: number
}

interface CharityData {
  name: string
  desc: string
  img: string
  total: Currency
}

interface JJAPIData {
  average: Currency
  bundles: {
    allocated: number
    available: number
    remaining: number
    sold: number
  }
  // campaigns: any[]
  date: string
  donations: {
    count: number
  }
  entire: {
    amount: Currency
    donations: number
  }
  fundraisers: Currency
  raised: Currency
  total: Currency
}

interface JJData {
  jj_api: JJAPIData
  tiltify_campaign_data: CharityData[]
}

const CharityPage: Component = () => {
  const coll = collection(useFirestoreDB(), 'JJDonationTracker') as CollectionReference<JJData>
  const d = doc<JJData>(coll, 'JJDonationTracker2023')
  const charityData = loadLocalAndRemote('charityData', d, { forceRemote: true, ageInHours: 0 })
  return (
    <div
      class={
        'scrollbar-thin scrollbar-corner-primary-100 scrollbar-thumb-accent-500 scrollbar-track-accent-100 h-full overflow-y-auto overflow-x-hidden p-1.5 pt-0'
      }
    >
      <h3 class={'p-0 pb-2 text-center text-xl text-white'}>Charities</h3>
      <Switch>
        <Match when={charityData.data} keyed={true}>
          <div class={'text-center text-xs'}>
            <div class={'flex w-full flex-col gap-1 rounded-2xl bg-white p-1 shadow-xl'}>
              <div>
                <p class={'text-primary text-base font-bold'}>
                  <Numeric value={charityData.data.jj_api.total.pounds} numberStyle="currency" currency={'GBP'} />
                </p>
                <p class={''}>Raised in {DateTime.fromISO(charityData.data.jj_api.date).year}</p>
              </div>
              <div class={'grid grid-cols-2 gap-1 gap-y-2'}>
                <div>
                  <p class={'text-primary text-xs font-bold'}>
                    <Numeric value={charityData.data.jj_api.raised.pounds} numberStyle="currency" currency={'GBP'} />
                  </p>
                  <p>Raised by the Yogscast</p>
                </div>
                <div>
                  <p class={'text-primary text-xs font-bold'}>
                    <Numeric
                      value={charityData.data.jj_api.fundraisers.pounds}
                      numberStyle="currency"
                      currency={'GBP'}
                    />
                  </p>
                  <p>Raised by Fundraisers</p>
                </div>
                <div>
                  <p class={'text-primary text-xs font-bold'}>{charityData.data.jj_api.bundles.sold}</p>
                  <p>Collections Sold</p>
                </div>
                <div>
                  <p class={'text-primary text-xs font-bold'}>{charityData.data.jj_api.bundles.remaining}</p>
                  <p>Collections Available</p>
                </div>
              </div>
              <div class={'flex flex-1 items-end justify-center'}>
                <p class={'text-center'}>
                  Last update, {DateTime.fromISO(charityData.data.jj_api.date).toLocaleString(DateTime.DATETIME_MED)}
                </p>
              </div>
            </div>
          </div>
          <div class={'h-3'} />
          <CharityList charityData={charityData.data.tiltify_campaign_data} />
        </Match>
      </Switch>
    </div>
  )
}

interface CharityListProps {
  charityData: CharityData[]
}

const CharityList: Component<CharityListProps> = props => {
  return (
    <div class={'flex h-full flex-1 flex-col gap-2'}>
      <For each={props.charityData}>
        {charity => {
          const name = () => {
            if (charity.name.length > 30) {
              return charity.name.substring(0, 30) + '...'
            }
            return charity.name
          }

          return (
            <div class={'min-h-24 w-full rounded-2xl bg-white shadow-xl hover:shadow-2xl'}>
              <div class={'flex h-full w-full items-center p-1'}>
                <img class={'h-10 w-10 rounded-lg'} alt={charity.name} src={charity.img} />
                <div class={'w-full pl-1'}>
                  <p class={'truncate text-ellipsis text-sm'}>{name()}</p>
                  <p class={'line-clamp-2 w-full text-ellipsis text-xs'}>{charity.desc}</p>
                  <p class={'text-primary text-xs font-bold'}>
                    <Numeric value={charity.total.pounds} numberStyle="currency" currency={'GBP'} />
                  </p>
                </div>
              </div>
            </div>
          )
        }}
      </For>
    </div>
  )
}
export default CharityPage
