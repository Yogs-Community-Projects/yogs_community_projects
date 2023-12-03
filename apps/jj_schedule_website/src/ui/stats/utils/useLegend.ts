import { useBarChartFilter } from '../BarChartFilterProvider'
import { ChartTimeType, ChartDataType } from '../BarChartEnums'

export const useLegend = () => {
  const { bars, dataType } = useBarChartFilter()

  return () => {
    return {
      show: false,
      selected: {
        /*
        Total: showTotal(),
        Yogs: showYogs(),
        Fundraiser: showFundraiser(),
        Bundles: showBundles(),
        Donations: showDonations(),
        'Total Hourly': showHourlyTotal(),
        'Yogs Hourly': showHourlyYogs(),
        'Fundraiser Hourly': showHourlyFundraiser(),
        */
      },
    }
  }
}
