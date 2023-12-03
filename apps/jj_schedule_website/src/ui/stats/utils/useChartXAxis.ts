import { DonationData, DonationData2 } from '../statsModel'
import { useBarChartFilter } from '../BarChartFilterProvider'
import { ChartTimeType } from '../BarChartEnums'
import { EChartsOption } from 'echarts'
import { useStatsUtils2 } from './useStatsUtils'
import { DateTime } from 'luxon'

const _XAxis = () => {
  const b: EChartsOption = {}
  return b.xAxis
}

type XAxis = ReturnType<typeof _XAxis>
export const useChartXAxis2 = (data: DonationData2) => {
  const { top15, dataType } = useBarChartFilter()
  const { slots, hours } = useStatsUtils2(data)

  const slotLabels = () =>
    slots().map(s => {
      if (s.label.length > 15) {
        return s.label.substring(0, 12) + '...'
      }
      return s.label
    })

  const hourlyLabels = () =>
    hours().map(s => {
      const date = DateTime.fromISO(s.date)
      return date.toFormat('yy-MM-dd hh:mm')
    })
  const labels = () => {
    if (dataType() === ChartTimeType.yogsStreams) {
      return slotLabels()
    }
    return hourlyLabels()
  }
  return (): XAxis => {
    return {
      axisLabel: {
        rotate: 45,
        hideOverlap: false,
        fontSize: top15() ? 12 : 8,
      },
      splitLine: {
        lineStyle: {
          type: 'solid',
          width: 2,
        },
      },
      type: 'category',
      data: labels(),
    }
  }
}
