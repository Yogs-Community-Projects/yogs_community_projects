import { useBarChartFilter } from '../BarChartFilterProvider'
import { ChartDataType, DonationType } from '../BarChartEnums'

export const useLegend = () => {
  const { bars, dataType } = useBarChartFilter()

  const isHourly = () => dataType() === ChartDataType.hourly
  const isYogs = () => dataType() === ChartDataType.yogsStreams
  const showTotal = () => isYogs() && bars() === DonationType.total
  const showYogs = () => isYogs() && (bars() === DonationType.yogs || bars() === DonationType.total2)
  const showFundraiser = () => isYogs() && (bars() === DonationType.fundraiser || bars() === DonationType.total2)
  const showHourlyTotal = () => isHourly() && bars() === DonationType.total
  const showHourlyYogs = () => isHourly() && (bars() === DonationType.yogs || bars() === DonationType.total2)
  const showHourlyFundraiser = () =>
    isHourly() && (bars() === DonationType.fundraiser || bars() === DonationType.total2)

  return () => {
    return {
      show: false,
      selected: {
        Total: showTotal(),
        Yogs: showYogs(),
        Fundraiser: showFundraiser(),
        'Total Hourly': showHourlyTotal(),
        'Yogs Hourly': showHourlyYogs(),
        'Fundraiser Hourly': showHourlyFundraiser(),
      },
    }
  }
}
