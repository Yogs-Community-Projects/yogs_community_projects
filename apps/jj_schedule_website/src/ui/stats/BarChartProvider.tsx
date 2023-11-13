import { createContext, createSignal, ParentComponent, useContext } from 'solid-js'
import { DonationData } from './statsModel'
import { useData } from '../../dataProvider'
import { Slot } from '@ycapp/model'
import { EChartsOption } from 'echarts'
import { DateTime } from 'luxon'

export const useChartCreatorFilter = (slots: Slot[]) => {
  const { useCreators } = useData()
  const creatorIds = () => {
    return [...new Set(slots.map(s => s.relations.creators).reduce((a, b) => a.concat(b)))]
  }
  const creators = useCreators(creatorIds)

  const [filter, setFilter] = createSignal<string[]>([])
  const add = (id: string) => {
    setFilter([...filter(), id])
  }
  const remove = (id: string) => {
    setFilter(filter().filter(i => i != id))
  }

  const reset = () => {
    setFilter([])
  }
  const includes = (id: string) => filter().includes(id)

  const toggle = (id: string) => {
    if (includes(id)) {
      remove(id)
    } else {
      add(id)
    }
  }
  const isEmpty = () => filter().length == 0
  const isSlotPartOfFilter = (slot: Slot) => {
    if (isEmpty()) {
      return true
    }
    return filter().some(id => slot.relations.creators.includes(id))
  }
  return {
    creators,
    filter,
    add,
    remove,
    reset,
    includes,
    toggle,
    isEmpty,
    isSlotPartOfFilter,
  }
}

const useBarChartHook = (donationData: DonationData) => {
  const slots = () => donationData.slots

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

  const yogs = () => {
    return slots().map(s => {
      // const duration = SlotUtils.duration(s.slot)
      return {
        value: s.donation.yogs / (s.slot.duration / 60),
        itemStyle: {
          color: color(s.slot),
        },
      }
    })
  }
  const fundraiser = () => {
    return slots().map(s => {
      // const duration = SlotUtils.duration(s.slot)
      return {
        value: s.donation.fundraiser / (s.slot.duration / 60),
        itemStyle: {
          color: color(s.slot),
          borderColor: '#ff0000',
        },
      }
    })
  }

  const chartOptions = (options?: EChartsOption): EChartsOption => {
    return {
      toolbox: {
        show: true,
      },
      legend: {
        width: 350,
        left: 0,
      },
      grid: {
        show: true,
        left: 0,
        right: '15%',
        containLabel: true,
      },
      xAxis: {
        position: 'top',
        type: 'value',
        show: true,
        splitLine: {
          lineStyle: {
            type: 'dashed',
          },
        },
      },
      yAxis: {
        axisLabel: {
          rotate: 45,
          hideOverlap: false,
          fontSize: 8,
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
            focus: 'series',
          },
          data: fundraiser(),
        },
      ],
    }
  }

  return {
    slots,
  }
}

const BarChartContext = createContext<ReturnType<typeof useBarChartHook>>()

export const BarChartProvider: ParentComponent<{ data: DonationData }> = props => {
  const hook = useBarChartHook(props.data)
  return <BarChartContext.Provider value={hook}>{props.children}</BarChartContext.Provider>
}
export const useBarChart = () => useContext(BarChartContext)
