import { CharityData } from './charity_model'
import { Component, For } from 'solid-js'
import { Numeric } from 'solid-i18n'
import { useCurrency } from '../CurrencyProvider'

interface CharityListProps {
  charityData: CharityData[]
}

export const CharityList: Component<CharityListProps> = props => {
  const { pounds } = useCurrency()

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

          const currency = () => {
            if (pounds()) {
              return 'GBP'
            } else {
              return 'USD'
            }
          }
          const value = () => {
            if (pounds()) {
              return charity.total.pounds
            } else {
              return charity.total.dollars
            }
          }

          return (
            <div class={'min-h-24 w-full rounded-2xl bg-white shadow-xl hover:shadow-2xl'}>
              <div class={'flex h-full w-full items-center p-1'}>
                <img class={'h-10 w-10 rounded-lg'} alt={charity.name} src={charity.img} />
                <div class={'w-full pl-1'}>
                  <p class={'truncate text-ellipsis text-sm'}>{name()}</p>
                  <p class={'line-clamp-2 w-full text-ellipsis text-xs'}>{charity.desc}</p>
                  <p class={'text-primary text-xs font-bold'}>
                    Raised <Numeric value={value()} numberStyle="currency" currency={currency()} />
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
