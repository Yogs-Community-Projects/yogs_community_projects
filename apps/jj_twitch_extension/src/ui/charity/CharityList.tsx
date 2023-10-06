import { Component, For } from 'solid-js'
import { Numeric } from 'solid-i18n'
import { useCurrency } from '../CurrencyProvider'
import { Cause } from '@ycapp/model'

interface CharityListProps {
  charityData: Cause[]
}

export const CharityList: Component<CharityListProps> = props => {
  const { pounds, avgConversionRate } = useCurrency()

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
              return charity.raised.fundraisers
            } else {
              return charity.raised.fundraisers * avgConversionRate
            }
          }

          return (
            <div class={'min-h-24 w-full rounded-2xl bg-white shadow-xl hover:shadow-2xl'}>
              <div class={'flex h-full w-full items-center p-1'}>
                <img class={'h-10 w-10 rounded-lg'} alt={charity.name} src={charity.logo} loading={'lazy'} />
                <div class={'w-full pl-1'}>
                  <p class={'truncate text-ellipsis text-sm'}>{name()}</p>
                  <p class={'line-clamp-2 w-full text-ellipsis text-xs'}>{charity.description}</p>
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
