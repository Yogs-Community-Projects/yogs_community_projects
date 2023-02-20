import { DateTime, Duration } from 'luxon'
import { createSignal, onCleanup } from 'solid-js'
import { Accessor } from 'solid-js/types/reactive/signal'

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
  const now = DateTime.now()
  if (!useIsAfterJJEnd()) {
    return DateTime.fromObject(
      {
        year: useDatetimeLondonNow().year,
        month: 12,
        day: 1,
        hour: 17
      },
      {
        zone: london
      }
    )
  }
  return DateTime.fromObject(
    {
      year: useDatetimeLondonNow().year + 1,
      month: 12,
      day: 1,
      hour: 17
    },
    {
      zone: london
    }
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
      second: 59
    },
    {
      zone: london
    }
  )
  return end < useDatetimeLondonNow()
}

export const useJJStartCountdown: Accessor<Duration> = () => {
  return useNextJJStartDate().diff(useDatetimeNow())
}
