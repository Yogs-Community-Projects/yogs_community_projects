import { Component, For } from 'solid-js'
import { Numeric } from 'solid-i18n'
import { useCurrency } from '../CurrencyProvider'
import { Cause } from '@ycapp/model'
import { useTheme } from '../../ThemeProvider'
import { twMerge } from 'tailwind-merge'

interface CharityListProps {
  charityData: Cause[]
}

export const CharityList: Component<CharityListProps> = props => {
  const { pounds, avgConversionRate } = useCurrency()
  const { theme, tailwindTextPrimary } = useTheme()
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
    if (theme() === 'dark') {
      // return 'bg-gray-500 text-white'

      return 'text-white bg-gradient-to-br from-gray-500 to-gray-600'
    } else if (theme() === 'rainbow') {
      return gradient[i % colors.length]
    }
    return 'bg-gradient-to-br from-white to-gray-100'
  }
  const raisedColor = () => {
    if (theme() === 'dark') {
      return 'text-white'
    } else if (theme() === 'rainbow') {
      return 'text-black'
    }
    return tailwindTextPrimary()
  }
  return (
    <div class={'mb-2 flex min-h-full flex-1 flex-col gap-2'}>
      <For each={props.charityData}>
        {(charity, i) => {
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
            <div class={twMerge('min-h-24 w-full rounded-2xl bg-white shadow-xl hover:shadow-2xl', campaignColor(i()))}>
              <div class={'flex h-full w-full items-center p-1'}>
                <img class={'h-10 w-10 rounded-lg'} alt={charity.name} src={charity.logo} loading={'lazy'} />
                <div class={'w-full pl-1'}>
                  <p class={'truncate text-ellipsis text-sm'}>{name()}</p>
                  <p class={'line-clamp-2 w-full text-ellipsis text-xs'}>{charity.description}</p>
                  <p class={twMerge('text-primary text-xs font-bold', tailwindTextPrimary(), raisedColor())}>
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
