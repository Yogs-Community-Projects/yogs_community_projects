import { RouteDataFunc, useRouteData } from '@solidjs/router'
import { RemoteData, useCreatorDB } from '@ycapp/common'
import { CreatorData } from '@ycapp/model'
import { Accessor } from 'solid-js'

export type CreatorsRouteDataType = RouteDataFunc<unknown, Accessor<RemoteData<CreatorData[]>>>

export const creatorsRouteDataFunction: CreatorsRouteDataType = () => {
  return useCreatorDB().readAll()
}

export const useCreatorsRouteData = (): Accessor<RemoteData<CreatorData[]>> => {
  return useRouteData<CreatorsRouteDataType>()
}
