import { Creator, Slot, SlotUtils } from '@ycapp/model'
import { gtag, install } from 'ga-gtag'
import { logEvent, setAnalyticsCollectionEnabled, setConsent } from '@firebase/analytics'
import { useFBAnalytics } from '@ycapp/common'

export const useAnalytics = () => {
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
    gtag('event', eventName, data)
    if (analytics) {
      logEvent(analytics, eventName, data)
    }
  }

  const logSlotClick = (slot: Slot) => {
    try {
      const start = SlotUtils.start(slot)
      const data = {
        slot_title: slot.title,
        slot_year: start.year,
        event_label: `${start.year}_${start.day}_${slot}`,
      }
      log('click_slot', data)
    } catch (e) {
      console.error(e)
    }
  }
  const logCreator = (creator: Creator) => {
    try {
      log('click_creator', {
        name: creator.name,
      })
    } catch (e) {
      console.error(e)
    }
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
