import { BarChartProvider, useBarChart } from './BarChartProvider2'
import full_2022 from '../../assets/stats/data_2022.json'
import full_2021 from '../../assets/stats/data_2021.json'
import full_2020 from '../../assets/stats/data_2020.json'
import { BarChartFilterProvider, useBarChartFilter } from './BarChartFilterProvider'
import { DonationData2 } from './statsModel'
import { Component, createSignal, Show } from 'solid-js'
import { ECharts } from 'echarts-solid'
import { BarChartJJSettings } from './BarChartJJSettings'
import { ChartDataType, ChartValueType } from './BarChartEnums'
import { EChartsType } from 'echarts'
import { Button } from '@kobalte/core'
import { DateTime } from 'luxon'

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
    <div class={'flex w-full flex-col items-start justify-start gap-2'}>
      <p class={'text-xl text-white'}>{props.title}</p>
      <div class={'bg-white'}>
        <ECharts height={400} width={1200} option={chartOptions()} />
      </div>
      <Desc />
      <BarChartJJSettings />
    </div>
  )
}

const Desc = () => {
  const { bars, type, dataType } = useBarChartFilter()

  const desc = () => {
    switch (bars()) {
      case ChartDataType.total:
        switch (type()) {
          case ChartValueType.total:
            return 'Total amount raised'
          case ChartValueType.amountPerMinute:
            return 'Amounts raised per minutes'
          case ChartValueType.percentageOfTotal:
            return 'Percentage of the total amount raised'
        }
        break
      case ChartDataType.yogs:
        switch (type()) {
          case ChartValueType.total:
            return 'Total amount raised by Yogs'
          case ChartValueType.amountPerMinute:
            return 'Amounts raised per minutes by Yogs'
          case ChartValueType.percentageOfTotal:
            return 'Percentage of the total amount raised by Yogs'
        }
        break
      case ChartDataType.fundraiser:
        switch (type()) {
          case ChartValueType.total:
            return 'Total amount raised by Fundraiser'
          case ChartValueType.amountPerMinute:
            return 'Amounts raised per minutes by Fundraiser'
          case ChartValueType.percentageOfTotal:
            return 'Percentage of the total amount raised by Fundraiser'
        }
        break
      case ChartDataType.collections:
        switch (type()) {
          case ChartValueType.total:
            return 'Collections bought'
          case ChartValueType.amountPerMinute:
            return 'Collections bought per minutes'
          case ChartValueType.percentageOfTotal:
            return 'Percentage of Collections bought'
        }
        break
      case ChartDataType.donations:
        switch (type()) {
          case ChartValueType.total:
            return 'Number of donations'
          case ChartValueType.amountPerMinute:
            return 'Average number of donations per minute'
          case ChartValueType.percentageOfTotal:
            return 'Percentage of all donations'
        }
        break
      case ChartDataType.avgDonationAmount:
        switch (type()) {
          case ChartValueType.total:
            return 'Average donation amount'
          case ChartValueType.amountPerMinute:
            return 'Average donation per minute'
          case ChartValueType.percentageOfTotal:
            return ''
        }
        break
    }
    return ''
  }

  return <p class={'text-white'}>{desc()}</p>
}

export default BarChartsJJSchedule
