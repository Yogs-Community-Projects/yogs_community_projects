import { ChartOnStreamFilterProvider } from './BarChartFilterProvider'
import { BarChartOnStreamSettings } from './BarChartJJSettings'
import { BarChartOnStreamProvider, useBarChartOnStream } from './BarChartOnStreamProvider'
import full_2022 from '../../assets/stats/data_2022.json'
import full_2021 from '../../assets/stats/data_2021.json'
import full_2020 from '../../assets/stats/data_2020.json'
import { Component } from 'solid-js'
import { DonationData2 } from './statsModel'
import { ECharts } from 'echarts-solid'

const BarChartsOnStream = () => {
  return (
    <div class={'flex flex-col gap-4'}>
      <div class={''}>
        <p class={'text-center text-white'}>
          The number of appearances of a person during the Yogscast Jingle Jam Streams
        </p>
        <p class={'p-2 text-center text-white'}>
          These number are just estimates and some appearances might have been missed or stream lengths miscalculated.
        </p>
      </div>
      <ChartOnStreamFilterProvider>
        <BarChartOnStreamSettings />
        <BarChartOnStreamProvider data={full_2022 as unknown as DonationData2}>
          <OnStreamTimeChart title={'Jingle Jam 2022'} />
        </BarChartOnStreamProvider>
        <BarChartOnStreamProvider data={full_2021 as unknown as DonationData2}>
          <OnStreamTimeChart title={'Jingle Jam 2021'} />
        </BarChartOnStreamProvider>
        <BarChartOnStreamProvider data={full_2020 as unknown as DonationData2}>
          <OnStreamTimeChart title={'Jingle Jam 2020'} />
        </BarChartOnStreamProvider>
      </ChartOnStreamFilterProvider>
    </div>
  )
}
const OnStreamTimeChart: Component<{ title: string }> = props => {
  const { chartOptions, donationData } = useBarChartOnStream()
  return (
    <div class={'flex w-full flex-col gap-2'}>
      <p class={'text-xl text-white'}>{props.title}</p>
      <div>
        <p class={'text-white'}>Number of streams: {donationData.summary.total_number_of_streams}</p>
        <p class={'text-white'}>
          Hours streamed: {(donationData.summary.duration / (60 * 60)).toFixed(2)}, not including reruns
        </p>
      </div>
      <div class={'bg-white'}>
        <ECharts height={400} width={1200} option={chartOptions()} />
      </div>
    </div>
  )
}

export default BarChartsOnStream
