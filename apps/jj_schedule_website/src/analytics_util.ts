import { gtag } from 'ga-gtag'

export function logSlotClick(year, day, slot, title) {
  gtag('event', 'click_slot', {
    slot_title: title,
    event_label: `${year}_${day}_${slot}`,
  })
}

export function logCreator(name) {
  try {
    gtag('event', 'click_creator', {
      name: name,
    })
  } catch (e) {
    console.error(e)
  }
}
