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

  const campaignColor = (i: number) => {
    if (theme() === 'dark') {
      return 'bg-gray-500 text-white'
    } else if (theme() !== 'rainbow') {
      return ''
    }
    return colors[i % colors.length]
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
    <div class={'flex h-full flex-1 flex-col gap-2'}>
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
