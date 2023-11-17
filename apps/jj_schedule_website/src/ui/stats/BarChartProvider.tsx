import { createContext, ParentComponent, useContext } from 'solid-js'
import { DonationData } from './statsModel'
import { EChartsOption } from 'echarts'
import { useChartSeries } from './utils/useChartSeries'
import { useChartXAxis } from './utils/useChartXAxis'
import { useLegend } from './utils/useLegend'
import { useData } from '../../dataProvider'
import { CreatorData, Slot } from '@ycapp/model'
import { useChartOnStreamFilter } from './BarChartFilterProvider'
import { OnStreamType } from './BarChartEnums'

const useBarChartHook = (data: DonationData) => {
  const series = useChartSeries(data)
  const xAxis = useChartXAxis(data)
  const legend = useLegend()
  return {
    data,
    chartOptions: (): EChartsOption => {
      return {
        tooltip: {
          trigger: 'item',
        },
        dataZoom: {},
        legend: legend(),
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
        xAxis: xAxis(),
        series: series(),
      }
    },
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

const useBarChartOnStreamHook = (donationData: DonationData) => {
  const { bars, sortByAmount, top15 } = useChartOnStreamFilter()

  const { useCreators } = useData()
  const slots = donationData.slots

  const jjLength = slots.map(s => s.slot.duration).reduce((a, b) => a + b)
  const creatorIds = () => [...new Set(slots.map(s => s.slot.relations.creators).flat()).keys()]

  const creators = useCreators(creatorIds)

  const isCreatorInSlot = (cId: string, s: Slot) => s.relations.creators.includes(cId)

  const numberOfAppearances = (cId: string) => slots.filter(s => isCreatorInSlot(cId, s.slot)).length
  const numberOfMinutesOnStream = (cId: string) =>
    slots
      .filter(s => isCreatorInSlot(cId, s.slot))
      .map(s => +(s.slot.duration / (60 * 60)).toFixed(2))
      .reduce((a, b) => a + b)

  const percentageOfTotalStreams = (cId: string) =>
    +(
      slots
        .filter(s => isCreatorInSlot(cId, s.slot))
        .map(s => s.slot.duration)
        .reduce((a, b) => a + b) / jjLength
    ).toFixed(2)

  const dataNumber = (c: CreatorData) => {
    switch (bars()) {
      case OnStreamType.appearances:
        return numberOfAppearances(c.creator.creatorId)
      case OnStreamType.hoursStreamed:
        return numberOfMinutesOnStream(c.creator.creatorId)
      case OnStreamType.percentageOfTotal:
        return percentageOfTotalStreams(c.creator.creatorId)
    }
  }
  const rawData = (): { label: string; n: number; color: string }[] => {
    if (!creators.data) {
      return []
    }
    return creators.data.map(c => {
      return {
        label: c.creator.name,
        n: dataNumber(c),
        color: '#' + c.style.primaryColor.substring(2),
      }
    })
  }

  const data = (): { label: string; n: number; color: string }[] => {
    let d = rawData().sort((a, b) => {
      return b.n - a.n
    })

    if (top15()) {
      d = d.slice(0, 15)
    }

    return d
  }

  return {
    creators,
    data,
    chartOptions: (): EChartsOption => {
      return {
        tooltip: {
          trigger: 'item',
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
            fontSize: 12,
          },
          splitLine: {
            lineStyle: {
              type: 'solid',
              width: 2,
            },
          },
          type: 'category',
          data: data().map(d => d.label),
        },
        series: [
          {
            name: 'Yogs on Stream',
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
            data: data().map(d => {
              return {
                value: d.n,
                itemStyle: {
                  color: d.color,
                },
              }
            }),
          },
        ],
      }
    },
  }
}

interface BarChartOnStreamProps {
  data: DonationData
}

const BarChartOnStreamContext = createContext<ReturnType<typeof useBarChartOnStreamHook>>()

export const BarChartOnStreamProvider: ParentComponent<BarChartOnStreamProps> = props => {
  const hook = useBarChartOnStreamHook(props.data)
  return <BarChartOnStreamContext.Provider value={hook}>{props.children}</BarChartOnStreamContext.Provider>
}
export const useBarChartOnStream = () => useContext(BarChartOnStreamContext)
