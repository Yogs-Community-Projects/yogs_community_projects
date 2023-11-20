import { DonationData, DonationData2 } from '../statsModel'
import { useBarChartFilter } from '../BarChartFilterProvider'
import { DateTime } from 'luxon'
import { DonationType, ChartDataType } from '../BarChartEnums'
import { useStatsUtils, useStatsUtils2 } from './useStatsUtils'
import { EChartsOption } from 'echarts'

const _Series = () => {
  const b: EChartsOption = {}
  return b.series
}

type Series = ReturnType<typeof _Series>
export const useChartSeries = (data: DonationData) => {
  const { bars, dataType } = useBarChartFilter()
  const { yogsValue, fundraiserValue, color, slots, hours } = useStatsUtils(data)
  const hoursYogs = () => {
    return hours().map(s => {
      const date = DateTime.fromISO(s.date, { setZone: false })
      const hour = date.hour
      const isNight = hour < 11 || hour >= 23
      return {
        value: yogsValue(s),
        itemStyle: {
          color: isNight ? '#09437a' : '#3584BF',
        },
        data: s,
      }
    })
  }
  const hoursFundraiser = () => {
    return hours().map(s => {
      return {
        value: fundraiserValue(s),
        itemStyle: {
          color: '#E30E50',
        },
        data: s,
      }
    })
  }
  const fundraiser = () => {
    return slots().map(s => {
      return {
        value: fundraiserValue(s),
        itemStyle: {
          color: bars() === DonationType.total2 ? '#ff0000' : color(s.slot),
        },
        tooltip: {
          show: true,
        },
      }
    })
  }

  const yogsFormatter = params => {
    const dataIndex = params.dataIndex
    const slot = slots().at(dataIndex)
    const date = DateTime.fromISO(slot.slot.start)
    const f = date.toFormat('MMM dd, HH:mm')
    return `
                  ${params.seriesName}
                  <br>${params.marker}${slot.slot.title} ${f} ${date.offsetNameShort}
                  <span style='float: right; margin-left: 20px'><b>${params.value}£</b></span>`

    // return `${params.seriesName}<br/>`
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

    // return `${params.seriesName}<br/>`
  }
  const yogs = () => {
    return slots().map(s => {
      return {
        value: yogsValue(s),
        itemStyle: {
          color: color(s.slot),
        },
        data: s,
      }
    })
  }
  const yogSeries = (): Series => {
    return [
      {
        name: 'Yogs',
        type: 'bar',
        stack: 'total',
        label: {
          show: false,
        },
        emphasis: {
          // focus: 'series',
        },
        tooltip: {
          show: true,
          formatter: yogsFormatter,
        },
        data: yogs(),
      },
      {
        name: 'Fundraiser',
        type: 'bar',
        stack: 'total',
        label: {
          show: false,
        },
        emphasis: {
          // focus: 'series',
        },
        tooltip: {
          show: true,
          formatter: yogsFormatter,
        },
        data: fundraiser(),
      },
    ]
  }
  const hourlySeries = (): Series => {
    return [
      {
        name: 'Yogs',
        type: 'bar',
        stack: 'total',
        label: {
          show: false,
        },
        emphasis: {
          // focus: 'series',
        },
        tooltip: {
          show: true,
          formatter: hoursFormatter,
        },
        data: hoursYogs(),
      },
      {
        name: 'Fundraiser',
        type: 'bar',
        stack: 'total',
        label: {
          show: false,
        },
        emphasis: {
          // focus: 'series',
        },
        tooltip: {
          show: true,
          formatter: hoursFormatter,
        },
        data: hoursFundraiser(),
      },
    ]
  }

  return () => {
    if (dataType() === ChartDataType.yogsStreams) {
      return yogSeries()
    }
    return hourlySeries()
  }
}
export const useChartSeries2 = (data: DonationData2) => {
  const { bars } = useBarChartFilter()
  const { totalValue, yogsValue, fundraiserValue, slots, hours } = useStatsUtils2(data)

  const hoursTotal = () => {
    return hours().map(s => {
      const date = DateTime.fromISO(s.date, { setZone: false })
      const hour = date.hour
      const isNight = hour < 11 || hour >= 23
      return {
        value: totalValue(s),
        itemStyle: {
          color: isNight ? '#09437a' : '#3584BF',
        },
        data: s,
      }
    })
  }
  const hoursYogs = () => {
    return hours().map(s => {
      const date = DateTime.fromISO(s.date, { setZone: false })
      const hour = date.hour
      const isNight = hour < 11 || hour >= 23
      return {
        value: yogsValue(s),
        itemStyle: {
          color: isNight ? '#09437a' : '#3584BF',
        },
        data: s,
      }
    })
  }
  const hoursFundraiser = () => {
    return hours().map(s => {
      const date = DateTime.fromISO(s.date, { setZone: false })
      const hour = date.hour
      const isNight = hour < 11 || hour >= 23
      return {
        value: fundraiserValue(s),
        itemStyle: {
          color: isNight ? '#57051f' : '#E30E50',
        },
        data: s,
      }
    })
  }
  const total = () => {
    return slots().map(s => {
      return {
        value: totalValue(s),
        itemStyle: {
          color: s.color,
        },
        data: s,
      }
    })
  }
  const yogs = () => {
    return slots().map(s => {
      return {
        value: yogsValue(s),
        itemStyle: {
          color: s.color,
        },
        data: s,
      }
    })
  }
  const fundraiser = () => {
    return slots().map(s => {
      return {
        value: fundraiserValue(s),
        itemStyle: {
          color: bars() === DonationType.total2 ? '#ff0000' : s.color,
        },
        tooltip: {
          show: true,
        },
      }
    })
  }

  const yogsFormatter = params => {
    const dataIndex = params.dataIndex
    const slot = slots().at(dataIndex)
    const date = DateTime.fromISO(slot.date)
    const f = date.toFormat('MMM dd, HH:mm')
    return `
                  ${params.seriesName}
                  <br>${params.marker}${slot.label} ${f} ${date.offsetNameShort}
                  <span style='float: right; margin-left: 20px'><b>${params.value}£</b></span>`

    // return `${params.seriesName}<br/>`
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

    // return `${params.seriesName}<br/>`
  }

  const series = (): Series => {
    return [
      {
        name: 'Total',
        type: 'bar',
        stack: 'total',
        label: {
          show: false,
        },
        emphasis: {
          // focus: 'series',
        },
        tooltip: {
          show: true,
          formatter: yogsFormatter,
        },
        data: total(),
      },
      {
        name: 'Yogs',
        type: 'bar',
        stack: 'total',
        label: {
          show: false,
        },
        emphasis: {
          // focus: 'series',
        },
        tooltip: {
          show: true,
          formatter: yogsFormatter,
        },
        data: yogs(),
      },
      {
        name: 'Fundraiser',
        type: 'bar',
        stack: 'total',
        label: {
          show: false,
        },
        emphasis: {
          // focus: 'series',
        },
        tooltip: {
          show: true,
          formatter: yogsFormatter,
        },
        data: fundraiser(),
      },
      {
        name: 'Total Hourly',
        type: 'bar',
        stack: 'total',
        label: {
          show: false,
        },
        emphasis: {
          // focus: 'series',
        },
        tooltip: {
          show: true,
          formatter: hoursFormatter,
        },
        data: hoursTotal(),
      },
      {
        name: 'Yogs Hourly',
        type: 'bar',
        stack: 'total',
        label: {
          show: false,
        },
        emphasis: {
          // focus: 'series',
        },
        tooltip: {
          show: true,
          formatter: hoursFormatter,
        },
        data: hoursYogs(),
      },
      {
        name: 'Fundraiser Hourly',
        type: 'bar',
        stack: 'total',
        label: {
          show: false,
        },
        emphasis: {
          // focus: 'series',
        },
        tooltip: {
          show: true,
          formatter: hoursFormatter,
        },
        data: hoursFundraiser(),
      },
    ]
  }

  return () => {
    return series()
  }
}
