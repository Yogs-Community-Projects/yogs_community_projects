import { createContext, ParentComponent, useContext } from 'solid-js'
import { gtag, install } from 'ga-gtag'
import { logEvent, setAnalyticsCollectionEnabled, setConsent } from '@firebase/analytics'
import { useFBAnalytics } from '@ycapp/common'
import { Creator, Slot } from '@ycapp/model'
import { DateTime } from 'luxon'

const useAnalyticsHook = () => {
  const analytics = useFBAnalytics()

  const installGTag = () => {
    install(import.meta.env.VITE_GTAG, { anonymize_ip: true })
    gtag('consent', 'default', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      security_storage: 'denied',
    })

    if (analytics) {
      setConsent({
        ad_storage: 'denied',
        analytics_storage: 'granted',
        functionality_storage: 'granted',
        personalization_storage: 'denied',
        security_storage: 'denied',
      })
    }
  }

  const log = (eventName: string, data: { [key: string]: any }) => {
    try {
      gtag('event', eventName, data)
      if (analytics) {
        logEvent(analytics, eventName, data)
      }
    } catch (e) {
      console.error(e)
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
  const logCreator = (creator: Creator) => {
    log('click_creator', {
      name: creator.name,
    })
  }
  const grantConsent = () => {
    gtag('consent', 'update', {
      analytics_storage: 'granted',
      functionality_storage: 'granted',
    })

    if (analytics) {
      setAnalyticsCollectionEnabled(analytics, true)
      setConsent({
        ad_storage: 'denied',
        analytics_storage: 'granted',
        functionality_storage: 'granted',
        personalization_storage: 'denied',
        security_storage: 'denied',
      })
    }
  }
  const deniedConsent = () => {
    gtag('consent', 'update', {
      analytics_storage: 'denied',
      functionality_storage: 'denied',
    })

    if (analytics) {
      setAnalyticsCollectionEnabled(analytics, false)
      setConsent({
        ad_storage: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        security_storage: 'denied',
      })
    }
  }

  return { installGTag, logSlotClick, logCreator, log, grantConsent, deniedConsent }
}

const AnalyticsContext = createContext<ReturnType<typeof useAnalyticsHook>>()

export const AnalyticsProvider: ParentComponent = props => {
  const hook = useAnalyticsHook()
  return <AnalyticsContext.Provider value={hook}>{props.children}</AnalyticsContext.Provider>
}
export const useAnalytics = () => useContext(AnalyticsContext)
