import { createContext, ParentComponent, useContext } from 'solid-js'
import { useBarChartFilter } from './BarChartFilterProvider'
import { DonationData, SlotDonation } from './statsModel'
import { DateTime } from 'luxon'
import { Bars, ChartType } from './BarChartEnums'
import { EChartsOption } from 'echarts'
import { Slot } from '@ycapp/model'

const useBarChartHook = (data: DonationData) => {
  const { bars, type, sortByAmount, top15, excludeDay1, excludeNights } = useBarChartFilter()

  const isNight = (s: SlotDonation) => {
    return s.slot.title.includes('Night ') && s.slot.style.background === 'aaaaaa'
  }

  const isNotNight = (s: SlotDonation) => !isNight(s)

  const sortByAmountFunc = (a: SlotDonation, b: SlotDonation) => {
    if (showYogs() && !showFundraiser()) {
      return yogsValue(a) - yogsValue(b)
    } else if (!showYogs() && showFundraiser()) {
      return fundraiserValue(a) - fundraiserValue(b)
    }
    return totalValue(a) - totalValue(b)
  }
  const sortByDateFunc = (a: SlotDonation, b: SlotDonation) => {
    return DateTime.fromISO(b.slot.start).toMillis() - DateTime.fromISO(a.slot.start).toMillis()
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

  const color = (s: Slot) => {
    const color = s.style?.linearGradient?.colors[0]?.substring(2) ?? s.style?.background?.substring(2)
    return '#' + (color ?? 'aaaaaa')
  }
  const labels = () =>
    slots().map(s => {
      if (s.slot.title.length > 15) {
        return s.slot.title.substring(0, 12) + '...'
      }
      return s.slot.title
    })

  const totalValue = (s: SlotDonation) => {
    if (type() === ChartType.amountPerMinute) {
      // const duration = SlotUtils.duration(s.slot)
      return +(s.donation.total / (s.slot.duration / 60)).toFixed(2)
    }
    return s.donation.total
  }
  const yogsValue = (s: SlotDonation) => {
    if (type() === ChartType.amountPerMinute) {
      // const duration = SlotUtils.duration(s.slot)
      return +(s.donation.yogs / (s.slot.duration / 60)).toFixed(2)
    }
    return s.donation.yogs
  }
  const fundraiserValue = (s: SlotDonation) => {
    if (type() === ChartType.amountPerMinute) {
      // const duration = SlotUtils.duration(s.slot)
      return +(s.donation.fundraiser / (s.slot.duration / 60)).toFixed(2)
    }
    return s.donation.fundraiser
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
  const fundraiser = () => {
    return slots().map(s => {
      return {
        value: fundraiserValue(s),
        itemStyle: {
          color: bars() === Bars.total2 ? '#ff0000' : color(s.slot),
        },
        tooltip: {
          show: true,
        },
      }
    })
  }

  const showYogs = () => bars() === Bars.yogs || bars() === Bars.total || bars() === Bars.total2
  const showFundraiser = () => bars() === Bars.fundraiser || bars() === Bars.total || bars() === Bars.total2

  const yogsFormatter = params => {
    const dataIndex = params.dataIndex
    const slot = slots().at(dataIndex)
    const date = DateTime.fromISO(slot.slot.start)
    const f = date.toFormat('MMM dd, HH:mm')
    return `
                  ${params.seriesName}
                  <br>${params.marker}${slot.slot.title} ${f} ${date.offsetNameShort}
                  <span style="float: right; margin-left: 20px"><b>${params.value}£</b></span>`

    // return `${params.seriesName}<br/>`
  }
  return (): EChartsOption => {
    return {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        show: false,
        selected: {
          Yogs: showYogs(),
          Fundraiser: showFundraiser(),
        },
      },
      grid: {
        show: true,
        top: '4px',
        left: '10px',
        right: '4px',
        bottom: '4px',
        containLabel: true,
      },
      yAxis: {
        name: 'Amounts raised in Pounds',
        position: 'top',
        type: 'value',
        show: true,
        splitLine: {
          lineStyle: {
            type: 'solid',
            width: 2,
          },
        },
        axisLabel: {
          rotate: 45,
          hideOverlap: false,
          fontSize: 10,
        },
      },
      xAxis: {
        axisLabel: {
          rotate: 45,
          hideOverlap: false,
          fontSize: top15() ? 12 : 8,
        },
        splitLine: {
          lineStyle: {
            type: 'solid',
            width: 2,
          },
        },
        type: 'category',
        data: labels(),
      },
      series: [
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
      ],
    }
  }
}

interface BarChartProps {
  data: DonationData
}

const BarChartContext = createContext<ReturnType<typeof useBarChartHook>>()

export const BarChartProvider: ParentComponent<BarChartProps> = props => {
  const hook = useBarChartHook(props.data)
  return <BarChartContext.Provider value={hook}>{props.children}</BarChartContext.Provider>
}
export const useBarChart = () => useContext(BarChartContext)
