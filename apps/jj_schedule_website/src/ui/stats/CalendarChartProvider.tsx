import { createContext, ParentComponent, useContext } from 'solid-js'
import { Donation, DonationData } from './statsModel'
import { useData } from '../../dataProvider'
import { EChartsOption } from 'echarts'
import { DateTime } from 'luxon'

const useCalendarChartHook = (donationData: DonationData) => {
  const { useCreators } = useData()
  const creatorIds = () => {
    return [...new Set(donationData.slots.map(s => s.slot.relations.creators).reduce((a, b) => a.concat(b)))]
  }
  const creators = useCreators(creatorIds)

  const calcData = () => {
    const map = new Map<string, Donation>()
    donationData.hours.forEach(d => {
      const date = DateTime.fromISO(d.date)
      const key = `${date.day}-${date.hour}`
      map.set(key, d)
    })
    const data = []
    for (let day = 1; day < 15; day++) {
      for (let hour = 0; hour < 24; hour++) {
        const key = `${day}-${hour}`
        if (map.has(key)) {
          const donation = map.get(key)
          if (donation.total === 0) {
            data.push([day, hour, '-'])
          } else {
            data.push([day, hour, Math.round(donation.total / 60)])
          }
        } else {
          data.push([day, hour, '-'])
        }
      }
    }

    return data
  }

  const data = calcData()
  console.log(data)
  const max = data
    .filter(d => d[2] !== '-')
    .map(d => d[2])
    .reduce((a, b) => Math.max(a, b))
  const min = data
    .filter(d => d[2] !== '-')
    .map(d => d[2])
    .reduce((a, b) => Math.min(a, b))
  console.log(min)
  console.log(max)
  const chartOptions = (): EChartsOption => {
    return {
      tooltip: {
        position: 'top',
      },
      grid: {
        height: '50%',
        top: '10%',
      },
      xAxis: {
        type: 'category',
        splitArea: {
          show: true,
        },
      },
      yAxis: {
        type: 'category',
        splitArea: {
          show: true,
        },
      },
      visualMap: {
        min,
        max,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%',
      },
      series: [
        {
          name: 'Punch Card',
          type: 'heatmap',
          data: data,
        },
      ],
    }
  }
  return { chartOptions }
}

const CalendarChartContext = createContext<ReturnType<typeof useCalendarChartHook>>()

export const CalendarChartProvider: ParentComponent<{ data: DonationData }> = props => {
  const hook = useCalendarChartHook(props.data)
  return <CalendarChartContext.Provider value={hook}>{props.children}</CalendarChartContext.Provider>
}
export const useCalendarChart = () => useContext(CalendarChartContext)
