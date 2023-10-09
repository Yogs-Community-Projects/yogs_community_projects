import { Component, createSignal, onCleanup } from 'solid-js'
import { Accessor } from 'solid-js/types/reactive/signal'
import { DateTime, Duration } from 'luxon'
import { useTheme } from '../ThemeProvider'
import { twMerge } from 'tailwind-merge'

interface InvisibleBodyProps {
  text: string
}

export const InvisibleBody: Component<InvisibleBodyProps> = props => {
  const { theme } = useTheme()

  return (
    <div class={'p-1'}>
      <div
        class={twMerge(
          'mx-auto flex w-fit flex-col items-center p-1 text-center text-base text-white md:w-[50%] md:text-2xl',
          theme() === 'rainbow' ? 'rounded-2xl bg-gray-500/50' : '',
        )}
      >
        <p class={'p-1 text-2xl font-bold md:p-2 md:text-4xl'}>Jingle Jam Countdown</p>
        <p class={'text-xl md:text-3xl'}>{useNextJJStartDate().toLocal().toFormat('DDDD')}</p>
        <p class={'text-xl md:text-3xl'}>{useNextJJStartDate().toLocal().toFormat('ttt')}</p>
        <p class={''}>{useNextJJStartDate().toFormat('DDDD')}</p>
        <p class={''}>{useNextJJStartDate().toFormat('ttt')}</p>
        <div class={'flex flex-col items-center p-1 text-white md:p-4'}>
          <p class={'text-2xl md:text-4xl'}>Jingle Jam {useNextJJStartDate().year} starts</p>
          <p class={'font-mono text-2xl md:text-4xl'}>{useJJStartCountdown().toFormat("dd 'Days' hh:mm:ss")}</p>
        </div>
        <p>{props.text}</p>
      </div>
    </div>
  )
}

const london = 'Europe/London'
export const useDatetimeLondonNow: Accessor<DateTime> = (init?: DateTime) => {
  const [date, setDate] = createSignal(init ?? DateTime.now().setZone(london))
  const interval = setInterval(() => setDate(init ?? DateTime.now().setZone(london)), 1000)
  onCleanup(() => clearInterval(interval))
  return date()
}
export const useDatetimeNow: Accessor<DateTime> = () => {
  const [date, setDate] = createSignal(DateTime.now())
  const interval = setInterval(() => setDate(DateTime.now()), 1000)
  onCleanup(() => clearInterval(interval))
  return date()
}
export const useNextJJStartDate: Accessor<DateTime> = () => {
  if (!useIsAfterJJEnd()) {
    return DateTime.fromObject(
      {
        year: useDatetimeLondonNow().year,
        month: 12,
        day: 1,
        hour: 17,
      },
      {
        zone: london,
      },
    )
  }
  return DateTime.fromObject(
    {
      year: useDatetimeLondonNow().year + 1,
      month: 12,
      day: 1,
      hour: 17,
    },
    {
      zone: london,
    },
  )
}
export const useIsAfterJJEnd: Accessor<boolean> = () => {
  const end = DateTime.fromObject(
    {
      year: useDatetimeLondonNow().year,
      month: 12,
      day: 14,
      hour: 23,
      minute: 59,
      second: 59,
    },
    {
      zone: london,
    },
  )
  return end < useDatetimeLondonNow()
}

export const useJJStartCountdown: Accessor<Duration> = () => {
  return useNextJJStartDate().diff(useDatetimeNow())
}
