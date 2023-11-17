import { ChartOnStreamFilterProvider } from './BarChartFilterProvider'
import { BarChartOnStreamSettings } from './BarChartJJSettings'
import { BarChartOnStreamProvider, useBarChartOnStream } from './BarChartProvider'
import full_2022 from '../../assets/stats/full_2022.json'
import { DonationData } from './statsModel'
import full_2021 from '../../assets/stats/full_2021.json'
import full_2020 from '../../assets/stats/full_2020.json'
import { Component } from 'solid-js'
import { ECharts } from 'echarts-solid'

const BarChartsOnStreamProvider = () => {
  return (
    <>
      <div class={'p-2'}>
        <p class={'text-center text-white'}>
          The number of appearances of a person during the Yogscast Jingle Jam Streams
        </p>
        <p class={'p-2 text-center text-white'}>
          These number are just estimates and some appearances might have been missed or stream lengths miscalculated.
        </p>
      </div>
      <ChartOnStreamFilterProvider>
        <BarChartOnStreamSettings />
        <BarChartOnStreamProvider data={full_2022 as DonationData}>
          <OnStreamTimeChart title={'Jingle Jam 2022'} />
        </BarChartOnStreamProvider>
        <BarChartOnStreamProvider data={full_2021 as DonationData}>
          <OnStreamTimeChart title={'Jingle Jam 2021'} />
        </BarChartOnStreamProvider>
        <BarChartOnStreamProvider data={full_2020 as DonationData}>
          <OnStreamTimeChart title={'Jingle Jam 2020'} />
        </BarChartOnStreamProvider>
      </ChartOnStreamFilterProvider>
    </>
  )
}
const OnStreamTimeChart: Component<{ title: string }> = props => {
  const { chartOptions } = useBarChartOnStream()
  return (
    <div class={'flex w-full flex-col gap-2'}>
      <p class={'text-xl text-white'}>{props.title}</p>
      <div class={'bg-white'}>
        <ECharts height={400} width={1200} option={chartOptions()} />
      </div>
    </div>
  )
}

export default BarChartsOnStreamProvider
