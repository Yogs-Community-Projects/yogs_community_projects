import { DonationData2, HourDonation2, SlotDonation2 } from '../statsModel'
import { useBarChartFilter } from '../BarChartFilterProvider'
import { DateTime } from 'luxon'
import { ChartDataType, ChartTimeType } from '../BarChartEnums'
import { useStatsUtils2 } from './useStatsUtils'
import { BarSeriesOption, EChartsOption } from 'echarts'
import { RegisteredSeriesOption } from 'echarts/types/dist/echarts'

declare type Values<T> = T[keyof T]
const _Series = () => {
  const b: EChartsOption = {}
  return b.series
}

const _V = () => {
  const b: BarSeriesOption = {}
  return b.data
}
const _VS = () => {
  const b: BarSeriesOption = {}
  return b.data[0]
}

type Series = ReturnType<typeof _Series>
type Data = ReturnType<typeof _V>
type SingleData = ReturnType<typeof _VS>
export const useChartSeries2 = (data: DonationData2) => {
  const { bars, dataType } = useBarChartFilter()
  const { value, slots, hours } = useStatsUtils2(data)

  const isNight = (s: HourDonation2) => {
    const date = DateTime.fromISO(s.date, { setZone: false })
    const hour = date.hour
    return hour < 11 || hour >= 23
  }
  const redColor = (s: HourDonation2) => (isNight(s) ? '#57051f' : '#E30E50')
  const blueColor = (s: HourDonation2) => (isNight(s) ? '#09437a' : '#3584BF')

  const slotItem = (s: SlotDonation2): SingleData => {
    return {
      value: value(s),
      itemStyle: {
        color: s.color,
      },
    }
  }

  const hoursTotal = () => {
    return hours().map(s => {
      return {
        value: value(s),
        itemStyle: {
          color: blueColor(s),
        },
        data: s,
      }
    })
  }
  const hoursYogs = () => {
    return hours().map(s => {
      return {
        value: value(s),
        itemStyle: {
          color: blueColor(s),
        },
        data: s,
      }
    })
  }
  const hoursFundraiser = () => {
    return hours().map(s => {
      return {
        value: value(s),
        itemStyle: {
          color: redColor(s),
        },
        data: s,
      }
    })
  }
  const slotsItems = () => {
    return slots().map(slotItem)
  }
  const hourItems = (): SingleData[] => {
    return hours().map(s => {
      return {
        value: value(s),
        itemStyle: {
          color: blueColor(s),
        },
        data: s,
      }
    })
  }

  const items = () => {
    if (dataType() === ChartTimeType.hourly) {
      return hourItems()
    }
    return slotsItems()
  }

  const yogsFormatterPounds = params => {
    const dataIndex = params.dataIndex
    const slot = slots().at(dataIndex)
    const date = DateTime.fromISO(slot.date)
    const f = date.toFormat('MMM dd, HH:mm')
    return `
                  ${params.seriesName}
                  <br>${params.marker}${slot.label} ${f} ${date.offsetNameShort}
                  <span style='float: right; margin-left: 20px'><b>${params.value}£</b></span>`
  }
  const yogsFormatter = params => {
    const dataIndex = params.dataIndex
    const slot = slots().at(dataIndex)
    const date = DateTime.fromISO(slot.date)
    const f = date.toFormat('MMM dd, HH:mm')
    return `
                  ${params.seriesName}
                  <br>${params.marker}${slot.label} ${f} ${date.offsetNameShort}
                  <span style='float: right; margin-left: 20px'><b>${params.value}</b></span>`
  }
  const hoursFormatterPounds = params => {
    const dataIndex = params.dataIndex
    const slot = hours().at(dataIndex)
    const date = DateTime.fromISO(slot.date)
    const f = date.toFormat('MMM dd, HH:mm')
    return `
                  ${params.seriesName}
                  <br>${params.marker} ${f} ${date.offsetNameShort}
                  <span style='float: right; margin-left: 20px'><b>${params.value}£</b></span>`
  }
  const hoursFormatter = params => {
    const dataIndex = params.dataIndex
    const slot = hours().at(dataIndex)
    const date = DateTime.fromISO(slot.date)
    const f = date.toFormat('MMM dd, HH:mm')
    return `
                  ${params.seriesName}
                  <br>${params.marker} ${f} ${date.offsetNameShort}
                  <span style='float: right; margin-left: 20px'><b>${params.value}£</b></span>`
  }

  const formater = () => {
    switch (dataType()) {
      case ChartTimeType.yogsStreams:
        switch (bars()) {
          default:
            return yogsFormatterPounds
          case ChartDataType.collections:
          case ChartDataType.donations:
            return yogsFormatter
        }
      case ChartTimeType.hourly:
        switch (bars()) {
          default:
            return hoursFormatterPounds
          case ChartDataType.collections:
          case ChartDataType.donations:
            return hoursFormatter
        }
    }
  }

  const s = (name: string, formatter: (params: any) => string, data: Data): Values<RegisteredSeriesOption> => {
    return {
      name: 'Total',
      type: 'bar',
      stack: 'total',
      label: {
        show: false,
      },
      tooltip: {
        show: true,
        formatter: formatter,
      },
      data: data,
    }
  }

  const series = (): Series => {
    return [
      s('Total', formater(), items()),
      /*
      s('Yogs', yogsFormatter, yogs()),
      s('Fundraiser', yogsFormatter, fundraiser()),*/
      /*
      s('Total Hourly', hoursFormatter, hoursTotal()),
      s('Yogs Hourly', hoursFormatter, hoursYogs()),
      s('Fundraiser Hourly', hoursFormatter, hoursFundraiser()),
      s('Bundles', undefined, bundles()),
      s('Donations', undefined, donations()),
      */
    ]
  }

  return () => {
    return series()
  }
}
