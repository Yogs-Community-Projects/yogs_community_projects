import { createContext, createEffect, ParentComponent, useContext } from 'solid-js'
import { Slot } from '@ycapp/model'
import { DateTime } from 'luxon'
import { useTwitchConfig } from './ui/config/useTwitchConfig'

const useAnalyticsHook = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const gtag = window.gtag

  const { channelId } = useTwitchConfig()

  const log = (eventName: string, data?: { [key: string]: any }) => {
    try {
      let completeData = { channelId: channelId() }
      if (data) {
        completeData = { ...completeData, ...data }
      }
      gtag('event', eventName, completeData)
      console.log('ap', 'log', completeData)
    } catch (e) {
      console.error('ap', 'error', e)
    }
  }

  const logSlotClick = (slot: Slot) => {
    const start = DateTime.fromISO(slot.start, {
      setZone: true,
    })
    const data = {
      slot_title: slot.title,
      slot_year: start.year,
      event_label: `${start.year}_${start.day}_${start.hour}`,
    }
    log('click_slot', data)
  }
  createEffect(() => {
    if (channelId()) {
      console.log('ap', 'log', 'loaded')
      log('loaded')
    }
  })
  return { logSlotClick, log }
}

const AnalyticsContext = createContext<ReturnType<typeof useAnalyticsHook>>()

export const AnalyticsProvider: ParentComponent = props => {
  const hook = useAnalyticsHook()
  return <AnalyticsContext.Provider value={hook}>{props.children}</AnalyticsContext.Provider>
}
export const useAnalytics = () => useContext(AnalyticsContext)
