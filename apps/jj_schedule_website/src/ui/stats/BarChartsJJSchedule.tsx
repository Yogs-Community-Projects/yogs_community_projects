import { BarChartProvider, useBarChart } from './BarChartProvider'
import full_2022 from '../../assets/stats/full_2022.json'
import { DonationData } from './statsModel'
import full_2021 from '../../assets/stats/full_2021.json'
import full_2020 from '../../assets/stats/full_2020.json'
import { BarChartFilterProvider } from './BarChartFilterProvider'
import { Component } from 'solid-js'
import { ECharts } from 'echarts-solid'
import { BarChartJJSettings } from './BarChartJJSettings'

const BarChartsJJSchedule = () => {
  return (
    <>
      <p class={'p-2 text-center text-white'}>
        Donations made to the Jingle Jam during each Yogscast Stream. Use the filter and zoom for more details.
      </p>
      <BarChartFilterProvider>
        <BarChartProvider data={full_2022 as DonationData}>
          <BarChartJJSchedule title={'Jingle Jam 2022'} />
        </BarChartProvider>
        <BarChartProvider data={full_2021 as DonationData}>
          <BarChartJJSchedule title={'Jingle Jam 2021'} />
        </BarChartProvider>
        <BarChartProvider data={full_2020 as DonationData}>
          <BarChartJJSchedule title={'Jingle Jam 2020'} />
        </BarChartProvider>
      </BarChartFilterProvider>
    </>
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
