import { useBarChartFilter } from '../BarChartFilterProvider'
import { Bars } from '../BarChartEnums'

export const useLegend = () => {
  const { bars } = useBarChartFilter()
  const showYogs = () => bars() === Bars.yogs || bars() === Bars.total || bars() === Bars.total2
  const showFundraiser = () => bars() === Bars.fundraiser || bars() === Bars.total || bars() === Bars.total2

  return () => {
    return {
      show: false,
      selected: {
        Yogs: showYogs(),
        Fundraiser: showFundraiser(),
      },
    }
  }
}
