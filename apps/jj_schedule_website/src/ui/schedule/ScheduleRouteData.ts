import { RouteDataFunc, useRouteData } from '@solidjs/router'
import { useConfig } from '../configProvider/ConfigProvider'
import { useData } from '../../dataProvider'

const schedule = (id: string) => {
  const { useSchedule } = useData()
  return useSchedule(() => id)
}
export type ScheduleRouteDataType = RouteDataFunc<unknown, ReturnType<typeof schedule>>

export const schedule2023RouteDataFunc: ScheduleRouteDataType = () => {
  return schedule('jinglejam2023')
}

export const schedule2022RouteDataFunc: ScheduleRouteDataType = () => {
  return schedule('jinglejam2022')
}

export const schedule2021RouteDataFunc: ScheduleRouteDataType = () => {
  return schedule('jinglejam2021')
}

export const schedule2020RouteDataFunc: ScheduleRouteDataType = () => {
  return schedule('jinglejam2020')
}
export const scheduleCurrentRouteDataFunc: ScheduleRouteDataType = () => {
  const config = useConfig()
  return schedule(config.scheduleId)
}

export const useScheduleRouteData = () => {
  return useRouteData<ScheduleRouteDataType>()
}
