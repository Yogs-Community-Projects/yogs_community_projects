import { CreatorChartData, DonationData2 } from './statsModel'
import { useChartOnStreamFilter } from './BarChartFilterProvider'
import { OnStreamType } from './BarChartEnums'
import { EChartsOption } from 'echarts'
import { createContext, ParentComponent, useContext } from 'solid-js'

const _Series = () => {
  const b: EChartsOption = {}
  return b.series
}

type Series = ReturnType<typeof _Series>
const useBarChartOnStreamHook = (donationData: DonationData2) => {
  const { bars, sortByAmount, top15 } = useChartOnStreamFilter()

  const creators = donationData.creator_data

  const color = (creator: CreatorChartData) => {
    let c = creator.color
    if (c.length === 8) {
      c = creator.color.substring(2)
    }
    if (!c.startsWith('#')) {
      c = '#' + c
    }
    return c
  }

  const dataNumber = (c: CreatorChartData) => {
    switch (bars()) {
      case OnStreamType.appearances:
        return c.streams
      case OnStreamType.hoursStreamed:
        return +(c.duration / (60 * 60)).toFixed(2)
      case OnStreamType.percentageOfHours:
        return c.duration_percentage
      case OnStreamType.percentageOfStreams:
        return c.stream_percentage
    }
  }
  const rawData = (): { label: string; n: number; color: string }[] => {
    return creators.map(c => {
      return {
        label: c.name,
        n: dataNumber(c),
        color: color(c),
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

  const yAxisName = () => {
    switch (bars()) {
      case OnStreamType.appearances:
        return 'Appearances'
      case OnStreamType.hoursStreamed:
        return 'Hours on stream'
      case OnStreamType.percentageOfHours:
        return '% of hours'
      case OnStreamType.percentageOfStreams:
        return '% of JJ Streams'
    }
  }

  return {
    creators,
    donationData,
    chartOptions: (): EChartsOption => {
      const d = rawData()

      const avg = d.map(d => d.n).reduce((a, b) => a + b) / d.length

      return {
        tooltip: {
          trigger: 'item',
        },
        grid: {
          show: true,
          top: '30px',
          left: '30px',
          right: '10px',
          bottom: '10px',
          containLabel: true,
        },
        yAxis: {
          name: yAxisName(),
          nameLocation: 'middle',
          nameRotate: 90,
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
            name: 'Average',
            type: 'line',
            data: d.map(_ => avg),
            color: 'transparent',
            markLine: {
              data: [
                {
                  name: 'Average',
                  type: 'average',
                },
              ],
              lineStyle: {
                color: 'red',
              },
            },
          },
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
  data: DonationData2
}

const BarChartOnStreamContext = createContext<ReturnType<typeof useBarChartOnStreamHook>>()

export const BarChartOnStreamProvider: ParentComponent<BarChartOnStreamProps> = props => {
  const hook = useBarChartOnStreamHook(props.data)
  return <BarChartOnStreamContext.Provider value={hook}>{props.children}</BarChartOnStreamContext.Provider>
}
export const useBarChartOnStream = () => useContext(BarChartOnStreamContext)
