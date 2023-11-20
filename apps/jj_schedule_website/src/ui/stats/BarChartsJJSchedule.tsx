import { BarChartProvider, useBarChart } from './BarChartProvider2'
import full_2022 from '../../assets/stats/data_2022.json'
import full_2021 from '../../assets/stats/data_2021.json'
import full_2020 from '../../assets/stats/data_2020.json'
import { BarChartFilterProvider } from './BarChartFilterProvider'
import { DonationData2 } from './statsModel'
import { Component, For } from 'solid-js'
import { ECharts } from 'echarts-solid'
import { BarChartJJSettings } from './BarChartJJSettings'

const BarChartsJJSchedule = () => {
  return (
    <div class={'flex flex-col gap-4'}>
      <p class={'text-center text-white'}>
        Donations made to the Jingle Jam during each Yogscast Stream. Use the filter and zoom for more details.
      </p>
      <BarChartFilterProvider>
        <BarChartProvider data={full_2022 as unknown as DonationData2}>
          <BarChartJJSchedule title={'Jingle Jam 2022'} />
        </BarChartProvider>
        <BarChartProvider data={full_2021 as unknown as DonationData2}>
          <BarChartJJSchedule title={'Jingle Jam 2021'} />
        </BarChartProvider>
        <BarChartProvider data={full_2020 as unknown as DonationData2}>
          <BarChartJJSchedule title={'Jingle Jam 2020'} />
        </BarChartProvider>
      </BarChartFilterProvider>
    </div>
  )
}
const BarChartJJSchedule: Component<{ title: string }> = props => {
  const { chartOptions } = useBarChart()

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

export default BarChartsJJSchedule
