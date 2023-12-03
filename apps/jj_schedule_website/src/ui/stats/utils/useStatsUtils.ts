import { DonationData2, HourDonation2, SlotDonation2 } from '../statsModel'
import { ChartDataType, ChartTimeType, ChartValueType } from '../BarChartEnums'
import { useBarChartFilter } from '../BarChartFilterProvider'
import { DateTime } from 'luxon'

const round = (n: number, r = 2) => {
  return +n.toFixed(r)
}
export const useStatsUtils2 = (data: DonationData2) => {
  const { bars, type, sortByAmount, top15, excludeDay1, excludeNights, dataType, setDataType } = useBarChartFilter()
  const calcSum = () => {
    switch (bars()) {
      case ChartDataType.total:
        return data.hours.map(s => s.total).reduce((a, b) => a + b, 0)
      case ChartDataType.yogs:
        return data.hours.map(s => s.yogs).reduce((a, b) => a + b, 0)
      case ChartDataType.fundraiser:
        return data.hours.map(s => s.fundraiser).reduce((a, b) => a + b, 0)
      case ChartDataType.collections:
        return data.hours.map(s => s.bundles).reduce((a, b) => a + b, 0)
      case ChartDataType.donations:
        return data.hours.map(s => s.donations).reduce((a, b) => a + b, 0)
    }
  }
  const sum = calcSum()
  const showYogs = () => bars() === ChartDataType.yogs || bars() === ChartDataType.total
  const showFundraiser = () => bars() === ChartDataType.fundraiser || bars() === ChartDataType.total

  const isNight = (s: SlotDonation2 | HourDonation2) => {
    if ('label' in s) {
      return s.label.includes('Night ')
    } else {
      const date = DateTime.fromISO(s.date, { setZone: false })
      const hour = date.hour
      return hour < 11 || hour >= 23
    }
  }
  const isNotNight = (s: SlotDonation2) => !isNight(s)

  const rawValue = (s: HourDonation2) => {
    switch (bars()) {
      case ChartDataType.total:
        return s.total
      case ChartDataType.yogs:
        return s.yogs
      case ChartDataType.fundraiser:
        return s.fundraiser
      case ChartDataType.collections:
        return s.bundles
      case ChartDataType.donations:
        return s.donations
      case ChartDataType.avgDonationAmount:
        return round(s.total / s.donations)
    }
  }

  const value = (s: HourDonation2) => {
    const v = rawValue(s)
    switch (type()) {
      case ChartValueType.total:
        return v
      case ChartValueType.amountPerMinute:
        return round(v / (s.duration / 60))
      case ChartValueType.percentageOfTotal:
        return round((v / sum) * 100)
    }
  }

  const getDonationDate = (d: HourDonation2) => {
    return d.date
  }
  const sortByDateFunc = (a: HourDonation2, b: HourDonation2) => {
    return DateTime.fromISO(getDonationDate(b)).toMillis() - DateTime.fromISO(getDonationDate(a)).toMillis()
  }
  const sortByAmountFunc = (a: HourDonation2, b: HourDonation2) => {
    return value(a) - value(b)
  }

  const color = (s: SlotDonation2) => {
    return s.color
  }

  const sortedData = (data: (HourDonation2 | SlotDonation2)[]) => {
    let slots = data.sort(sortByAmountFunc).reverse()
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
  const slots = () => {
    return sortedData(data.slots) as SlotDonation2[]
  }

  const hours = () => {
    return sortedData(data.hours) as HourDonation2[]
  }

  const chartData = () => {
    switch (dataType()) {
      case ChartTimeType.yogsStreams:
        return sortedData(data.slots)
      case ChartTimeType.hourly:
        return sortedData(data.hours)
    }
  }

  return {
    isNight,
    isNotNight,
    value,
    /*
    totalValue,
    yogsValue,
    fundraiserValue,
    bundlesValue,
    donationsValue,*/
    sortByDateFunc,
    color,
    sortByAmountFunc,
    showYogs,
    showFundraiser,
    slots,
    hours,
    chartData,
  }
}
