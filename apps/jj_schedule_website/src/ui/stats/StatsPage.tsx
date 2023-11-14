import { Component } from 'solid-js'

import full_2022 from '../../assets/stats/full_2022.json'
import full_2021 from '../../assets/stats/full_2021.json'
import full_2020 from '../../assets/stats/full_2020.json'
import { DonationData } from './statsModel'
import { ECharts } from 'echarts-solid'
import { BarChartFilterProvider } from './BarChartFilterProvider'
import { BarChartProvider, useBarChart } from './BarChartProvider'
import { BarChartJJSettings } from './BarChartJJSettings'
import { EChartsOption } from 'echarts'
import { DateTime } from 'luxon'

const StatsPage: Component = () => {
  return (
    <div class={'flex flex-col gap-4'}>
      <BarChartFilterProvider>
        <BarChartProvider data={full_2022 as unknown as DonationData}>
          <BarChartJJSchedule title={'Jingle Jam 2022'} />
        </BarChartProvider>
        <BarChartProvider data={full_2021 as DonationData}>
          <BarChartJJSchedule title={'Jingle Jam 2021'} />
        </BarChartProvider>
        <BarChartProvider data={full_2020 as DonationData}>
          <BarChartJJSchedule title={'Jingle Jam 2020'} />
        </BarChartProvider>
      </BarChartFilterProvider>
    </div>
  )
}

/*

      <LineChart
        data2022={full_2022 as DonationData}
        data2021={full_2021 as DonationData}
        data2020={full_2020 as DonationData}
      />
 */
const BarChartJJSchedule: Component<{ title: string }> = props => {
  const chartOptions = useBarChart()
  return (
    <div class={'flex w-full flex-col gap-2'}>
      <p class={'text-xl text-white'}>{props.title}</p>
      <div class={'bg-white'}>
        <ECharts height={400} width={1200} option={chartOptions()} />
      </div>
      <BarChartJJSettings />
    </div>
  )
}

const LineChart: Component<{ data2022: DonationData; data2021: DonationData; data2020: DonationData }> = props => {
  const donations2022 = props.data2022.total
  const donations2021 = props.data2021.total
  const donations2020 = props.data2020.total
  const time2022 = () => donations2022.map((d, i) => d.date)
  const data2022 = () => donations2022.map((d, i) => d.total)
  const data2021 = () => donations2022.map((d, i) => d.total)
  const data2020 = () => donations2022.map((d, i) => d.total)
  const chartOptions = (): EChartsOption => {
    return {
      tooltip: {
        trigger: 'item',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: time2022(),
      },
      yAxis: {
        type: 'value',
      },
      dataZoom: {
        disabled: false,
      },
      grid: {
        show: true,
        top: '4px',
        left: '10px',
        right: '4px',
        bottom: '4px',
        containLabel: true,
      },
      series: [
        {
          name: 'Jingle Jam 2022',
          data: data2022(),
          type: 'line',
          tooltip: {
            show: true,
            formatter: formatter2022,
          },
        },
        {
          name: 'Jingle Jam 2021',
          data: data2021(),
          type: 'line',
          tooltip: {
            show: true,
            formatter: formatter2021,
          },
        },
        {
          name: 'Jingle Jam 2020',
          data: data2020(),
          type: 'line',
          tooltip: {
            show: true,
            formatter: formatter2020,
          },
        },
      ],
    }
  }
  const formatter2022 = params => {
    const dataIndex = params.dataIndex
    const slot = donations2022.at(dataIndex)
    const date = DateTime.fromISO(slot.date)
    const f = date.toFormat('MMM dd, HH:mm')
    return `
                  ${params.seriesName} ${f} ${date.offsetNameShort}
                  <br>${params.marker}<b>${params.value}£</b>`

    // return `${params.seriesName}<br/>`
  }
  const formatter2021 = params => {
    const dataIndex = params.dataIndex
    const slot = donations2021.at(dataIndex)
    const date = DateTime.fromISO(slot.date)
    const f = date.toFormat('MMM dd, HH:mm')
    return `
                  ${params.seriesName} ${f} ${date.offsetNameShort}
                  <br>${params.marker}<b>${params.value}£</b>`

    // return `${params.seriesName}<br/>`
  }
  const formatter2020 = params => {
    const dataIndex = params.dataIndex
    const slot = donations2020.at(dataIndex)
    const date = DateTime.fromISO(slot.date)
    const f = date.toFormat('MMM dd, HH:mm')
    return `
                  ${params.seriesName} ${f} ${date.offsetNameShort}
                  <br>${params.marker}<b>${params.value}£</b>`

    // return `${params.seriesName}<br/>`
  }
  return (
    <div class={'flex w-full flex-col gap-2'}>
      <p class={'text-xl text-white'}>Total Donations</p>
      <div class={'bg-white'}>
        <ECharts height={400} width={1200} option={chartOptions()} />
      </div>
    </div>
  )
}
export default StatsPage
