import { RouteDataFunc, useRouteData } from '@solidjs/router'
import { RemoteData, useCreatorDB } from '@ycapp/common'
import { CreatorData } from '@ycapp/model'

export type CreatorRouteDataType = RouteDataFunc<unknown, RemoteData<CreatorData>>

export const creatorRouteDataFunction: CreatorRouteDataType = ({ params, location, navigate, data }) => {
  return useCreatorDB().read(params.id)
}

export const useCreatorRouteData = () => {
  return useRouteData<CreatorRouteDataType>()
}

/*
export type CreatorsRouteDataType = RouteDataFunc<unknown, Accessor<RemoteData<CreatorData[]>>>

export const creatorsRouteDataFunction: CreatorsRouteDataType = () => {
  const db = useYcFirebase().firestore
  return useAllCreatorsData(db)
}

export const useCreatorsRouteData = () => {
  return useRouteData<CreatorsRouteDataType>()
}
*/
