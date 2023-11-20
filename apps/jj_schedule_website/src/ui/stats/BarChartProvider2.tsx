import { createContext, ParentComponent, useContext } from 'solid-js'
import { DonationData2 } from './statsModel'
import { EChartsOption } from 'echarts'
import { useChartSeries2 } from './utils/useChartSeries'
import { useLegend } from './utils/useLegend'
import { useChartXAxis2 } from './utils/useChartXAxis'
import { DonationType } from './BarChartEnums'
import { useBarChartFilter } from './BarChartFilterProvider'

const useBarChartHook = (data: DonationData2) => {
  const { bars } = useBarChartFilter()
  const series = useChartSeries2(data)
  const legend = useLegend()
  const xAxis = useChartXAxis2(data)

  const yAxisName = () => {
    switch (bars()) {
      case DonationType.total:
      case DonationType.total2:
        return 'Total'
      case DonationType.yogs:
        return 'Yogs'
      case DonationType.fundraiser:
        return 'Fundraiser'
    }
  }

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
          top: '30px',
          left: '10px',
          right: '4px',
          bottom: '4px',
          containLabel: true,
        },
        yAxis: {
          name: yAxisName(),
          nameLocation: 'end',
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
            hideOverlap: true,
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
  data: DonationData2
}

const BarChartContext = createContext<ReturnType<typeof useBarChartHook>>()

export const BarChartProvider: ParentComponent<BarChartProps> = props => {
  const hook = useBarChartHook(props.data)
  return <BarChartContext.Provider value={hook}>{props.children}</BarChartContext.Provider>
}
export const useBarChart = () => useContext(BarChartContext)
