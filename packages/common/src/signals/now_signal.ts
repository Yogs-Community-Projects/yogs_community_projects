import { createSignal, onCleanup } from 'solid-js'
import { DateTime } from 'luxon'

export const useNow = () => {
  const [date, setDate] = createSignal<DateTime>(DateTime.now())
  const timer = setInterval(() => setDate(DateTime.now()), 1000)
  onCleanup(() => clearInterval(timer))
  return date()
}
