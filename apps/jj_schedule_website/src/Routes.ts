import { RouteDefinition } from '@solidjs/router'
import { lazy } from 'solid-js'
import { schedule2021RouteDataFunc, schedule2022RouteDataFunc } from './ui/schedule/ScheduleRouteData'

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('./ui/home/HomePage')),
  },
  {
    path: '/extension',
    component: lazy(() => import('./ui/extension/ExtensionPage')),
  },
  {
    path: '/creators',
    children: [
      {
        path: '/:id',
        component: lazy(() => import('./ui/creator/CreatorDetailPage')),
      },
    ],
  },
  {
    path: '/2022',
    component: lazy(() => import('./ui/schedule/SchedulePage')),
    data: schedule2022RouteDataFunc,
  },
  {
    path: '/2021',
    component: lazy(() => import('./ui/schedule/SchedulePage')),
    data: schedule2021RouteDataFunc,
  },
]
