import { RouteDataFunc, useRouteData } from '@solidjs/router'
import { ScheduleData } from '@ycapp/model'
import { RemoteData, useScheduleDB } from '@ycapp/common'
import { useConfig } from '../configProvider/ConfigProvider'

export type ScheduleRouteDataType = RouteDataFunc<unknown, RemoteData<ScheduleData | null>>

export const schedule2023RouteDataFunc: ScheduleRouteDataType = () => {
  return useScheduleDB().read('jinglejam2023')
}

export const schedule2022RouteDataFunc: ScheduleRouteDataType = () => {
  return useScheduleDB().read('jinglejam2022')
}

export const schedule2021RouteDataFunc: ScheduleRouteDataType = () => {
  return useScheduleDB().read('jinglejam2021')
}

export const schedule2020RouteDataFunc: ScheduleRouteDataType = () => {
  return useScheduleDB().read('jinglejam2020')
}
export const scheduleCurrentRouteDataFunc: ScheduleRouteDataType = () => {
  const config = useConfig()
  return useScheduleDB().read(config.scheduleId)
}

export const useScheduleRouteData = () => {
  return useRouteData<ScheduleRouteDataType>()
}
