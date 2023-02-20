import { RouteDataFunc, useRouteData } from '@solidjs/router'
import { ScheduleData } from '@ycapp/model'
import { RemoteData, useScheduleDB } from '@ycapp/common'

export type ScheduleRouteDataType = RouteDataFunc<unknown, RemoteData<ScheduleData | null>>

export const schedule2022RouteDataFunc: ScheduleRouteDataType = () => {
  return useScheduleDB().read('jinglejam2022')
}

export const schedule2021RouteDataFunc: ScheduleRouteDataType = () => {
  return useScheduleDB().read('jinglejam2021')
}

export const useScheduleRouteData = () => {
  return useRouteData<ScheduleRouteDataType>()
}
