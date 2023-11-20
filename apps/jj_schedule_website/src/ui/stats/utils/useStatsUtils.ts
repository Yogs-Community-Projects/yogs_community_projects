import { Donation, DonationData, DonationData2, HourDonation2, SlotDonation, SlotDonation2 } from '../statsModel'
import { ChartType, DonationType } from '../BarChartEnums'
import { useBarChartFilter } from '../BarChartFilterProvider'
import { DateTime } from 'luxon'
import { Slot } from '@ycapp/model'

export const useStatsUtils = (data: DonationData) => {
  const { bars, type, sortByAmount, top15, excludeDay1, excludeNights, dataType, setDataType } = useBarChartFilter()
  const calcSum = () => {
    switch (bars()) {
      case DonationType.total:
      case DonationType.total2:
        return data.hours.map(s => s.total).reduce((a, b) => a + b, 0)
      case DonationType.yogs:
        return data.hours.map(s => s.yogs).reduce((a, b) => a + b, 0)
      case DonationType.fundraiser:
        return data.hours.map(s => s.fundraiser).reduce((a, b) => a + b, 0)
    }
  }
  const sum = calcSum()
  const showYogs = () => bars() === DonationType.yogs || bars() === DonationType.total || bars() === DonationType.total2
  const showFundraiser = () =>
    bars() === DonationType.fundraiser || bars() === DonationType.total || bars() === DonationType.total2

  const isNight = (s: SlotDonation) => {
    return s.slot.title.includes('Night ') && s.slot.style.background === 'aaaaaa'
  }
  const runValueOnDonation = (
    s: SlotDonation | Donation,
    slotFunc: (a: SlotDonation) => number,
    donationFunc: (b: Donation) => number,
  ) => {
    if (isSlotDonation(s)) {
      return slotFunc(s as SlotDonation)
    }
    return donationFunc(s as Donation)
  }
  const isNotNight = (s: SlotDonation) => !isNight(s)
  const totalValueDonation = (s: Donation) => {
    switch (type()) {
      case ChartType.total:
        return s.total
      case ChartType.amountPerMinute:
        return +(s.total / 60).toFixed(2)
      case ChartType.percentageOfTotal:
        return +((s.total / sum) * 100).toFixed(2)
    }
  }
  const totalValueSlotDonation = (s: SlotDonation) => {
    switch (type()) {
      case ChartType.total:
        return s.donation.total
      case ChartType.amountPerMinute:
        return +(s.donation.total / (s.slot.duration / 60)).toFixed(2)
      case ChartType.percentageOfTotal:
        return +((s.donation.total / sum) * 100).toFixed(2)
      default:
        return s.donation.total
    }
  }

  const isSlotDonation = (s: SlotDonation | Donation) => 'slot' in s
  const totalValue = (s: SlotDonation | Donation) => {
    return runValueOnDonation(s, totalValueSlotDonation, totalValueDonation)
  }
  const yogsValueSlotDonation = (s: SlotDonation) => {
    switch (type()) {
      case ChartType.total:
        return s.donation.yogs
      case ChartType.amountPerMinute:
        return +(s.donation.yogs / (s.slot.duration / 60)).toFixed(2)
      case ChartType.percentageOfTotal:
        return +((s.donation.yogs / sum) * 100).toFixed(2)
    }
  }
  const yogsValueDonation = (s: Donation) => {
    switch (type()) {
      case ChartType.total:
        return s.yogs
      case ChartType.amountPerMinute:
        return +(s.yogs / 60).toFixed(2)
      case ChartType.percentageOfTotal:
        return +((s.yogs / sum) * 100).toFixed(2)
    }
  }
  const yogsValue = (s: SlotDonation | Donation) => runValueOnDonation(s, yogsValueSlotDonation, yogsValueDonation)
  const fundraiserValueSlotDonation = (s: SlotDonation) => {
    switch (type()) {
      case ChartType.total:
        return s.donation.fundraiser
      case ChartType.amountPerMinute:
        return +(s.donation.fundraiser / (s.slot.duration / 60)).toFixed(2)
      case ChartType.percentageOfTotal:
        return +((s.donation.fundraiser / sum) * 100).toFixed(2)
    }
  }
  const fundraiserValueDonation = (s: Donation) => {
    switch (type()) {
      case ChartType.total:
        return s.fundraiser
      case ChartType.amountPerMinute:
        return +(s.fundraiser / 60).toFixed(2)
      case ChartType.percentageOfTotal:
        return +((s.fundraiser / sum) * 100).toFixed(2)
    }
  }

  const fundraiserValue = (s: SlotDonation | Donation) =>
    runValueOnDonation(s, fundraiserValueSlotDonation, fundraiserValueDonation)

  const getDonationDate = (d: SlotDonation | Donation) => {
    if (isSlotDonation(d)) {
      return (d as SlotDonation).slot.start
    }
    return (d as Donation).date
  }
  const sortByDateFunc = (a: SlotDonation | Donation, b: SlotDonation | Donation) => {
    return DateTime.fromISO(getDonationDate(b)).toMillis() - DateTime.fromISO(getDonationDate(a)).toMillis()
  }
  const sortByAmountFunc = (a: SlotDonation | Donation, b: SlotDonation | Donation) => {
    if (showYogs() && !showFundraiser()) {
      return yogsValue(a) - yogsValue(b)
    } else if (!showYogs() && showFundraiser()) {
      return fundraiserValue(a) - fundraiserValue(b)
    }
    return totalValue(a) - totalValue(b)
  }

  const color = (s: Slot) => {
    const color = s.style?.linearGradient?.colors[0]?.substring(2) ?? s.style?.background?.substring(2)
    return '#' + (color ?? 'aaaaaa')
  }

  const slots = () => {
    let slots = data.slots.sort(sortByAmountFunc).reverse()
    if (excludeNights()) {
      slots = slots.filter(isNotNight)
    }
    if (excludeDay1()) {
      slots = slots.filter(s => {
        const date = DateTime.fromISO(s.slot.start)
        return date.day !== 1
      })
    }
    if (top15()) {
      slots = slots.sort(sortByAmountFunc).reverse().slice(0, 15)
    }
    if (!sortByAmount()) {
      slots = slots.sort(sortByDateFunc).reverse()
    }
    return slots
  }

  const hours = () => {
    let h = data.hours // .sort(sortByAmountFunc).reverse()
    if (excludeNights()) {
      h = h.filter(s => {
        const date = DateTime.fromISO(s.date, { setZone: false })
        const hour = date.hour
        return !(hour < 11 || hour >= 23)
      })
    }
    if (excludeDay1()) {
      h = h.filter(s => {
        const date = DateTime.fromISO(s.date, { setZone: false })
        return date.day !== 1
      })
    }
    if (top15()) {
      h = h.sort(sortByAmountFunc).reverse().slice(0, 15)
    }
    if (!sortByAmount()) {
      h = h.sort(sortByDateFunc).reverse()
    }
    return h
  }

  return {
    isNight,
    isNotNight,
    totalValue,
    yogsValue,
    fundraiserValue,
    sortByDateFunc,
    color,
    sortByAmountFunc,
    showYogs,
    showFundraiser,
    slots,
    hours,
  }
}
export const useStatsUtils2 = (data: DonationData2) => {
  const { bars, type, sortByAmount, top15, excludeDay1, excludeNights, dataType, setDataType } = useBarChartFilter()
  const calcSum = () => {
    switch (bars()) {
      case DonationType.total:
      case DonationType.total2:
        return data.hours.map(s => s.total).reduce((a, b) => a + b, 0)
      case DonationType.yogs:
        return data.hours.map(s => s.yogs).reduce((a, b) => a + b, 0)
      case DonationType.fundraiser:
        return data.hours.map(s => s.fundraiser).reduce((a, b) => a + b, 0)
    }
  }
  const sum = calcSum()
  const showYogs = () => bars() === DonationType.yogs || bars() === DonationType.total || bars() === DonationType.total2
  const showFundraiser = () =>
    bars() === DonationType.fundraiser || bars() === DonationType.total || bars() === DonationType.total2

  const isNight = (s: SlotDonation2) => {
    return s.label.includes('Night ')
  }
  const isNotNight = (s: SlotDonation2) => !isNight(s)

  const totalValue = (s: HourDonation2) => {
    switch (type()) {
      case ChartType.total:
        return s.total
      case ChartType.amountPerMinute:
        return +(s.total / (s.duration / 60)).toFixed(2)
      case ChartType.percentageOfTotal:
        return +((s.total / sum) * 100).toFixed(2)
    }
  }

  const yogsValue = (s: HourDonation2) => {
    switch (type()) {
      case ChartType.total:
        return s.yogs
      case ChartType.amountPerMinute:
        return +(s.yogs / (s.duration / 60)).toFixed(2)
      case ChartType.percentageOfTotal:
        return +((s.yogs / sum) * 100).toFixed(2)
    }
  }

  const fundraiserValue = (s: HourDonation2) => {
    const f = +(s.total - s.yogs).toFixed(2)
    switch (type()) {
      case ChartType.total:
        return f
      case ChartType.amountPerMinute:
        return +(f / (s.duration / 60)).toFixed(2)
      case ChartType.percentageOfTotal:
        return +((f / sum) * 100).toFixed(2)
    }
  }

  const getDonationDate = (d: HourDonation2) => {
    return d.date
  }
  const sortByDateFunc = (a: HourDonation2, b: HourDonation2) => {
    return DateTime.fromISO(getDonationDate(b)).toMillis() - DateTime.fromISO(getDonationDate(a)).toMillis()
  }
  const sortByAmountFunc = (a: HourDonation2, b: HourDonation2) => {
    if (showYogs() && !showFundraiser()) {
      return yogsValue(a) - yogsValue(b)
    } else if (!showYogs() && showFundraiser()) {
      return fundraiserValue(a) - fundraiserValue(b)
    }
    return totalValue(a) - totalValue(b)
  }

  const color = (s: SlotDonation2) => {
    return s.color
  }

  const slots = () => {
    let slots = data.slots.sort(sortByAmountFunc).reverse()
    if (excludeNights()) {
      slots = slots.filter(isNotNight)
    }
    if (excludeDay1()) {
      slots = slots.filter(s => {
        const date = DateTime.fromISO(s.date)
        return date.day !== 1
      })
    }
    if (top15()) {
      slots = slots.sort(sortByAmountFunc).reverse().slice(0, 15)
    }
    if (!sortByAmount()) {
      slots = slots.sort(sortByDateFunc).reverse()
    }
    return slots
  }

  const hours = () => {
    let h = data.hours // .sort(sortByAmountFunc).reverse()
    if (excludeNights()) {
      h = h.filter(s => {
        const date = DateTime.fromISO(s.date, { setZone: false })
        const hour = date.hour
        return !(hour < 11 || hour >= 23)
      })
    }
    if (excludeDay1()) {
      h = h.filter(s => {
        const date = DateTime.fromISO(s.date, { setZone: false })
        return date.day !== 1
      })
    }
    if (top15()) {
      h = h.sort(sortByAmountFunc).reverse().slice(0, 15)
    }
    if (!sortByAmount()) {
      h = h.sort(sortByDateFunc).reverse()
    }
    return h
  }

  return {
    isNight,
    isNotNight,
    totalValue,
    yogsValue,
    fundraiserValue,
    sortByDateFunc,
    color,
    sortByAmountFunc,
    showYogs,
    showFundraiser,
    slots,
    hours,
  }
}
