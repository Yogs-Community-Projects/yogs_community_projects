import { RouteDefinition } from '@solidjs/router'
import { lazy } from 'solid-js'

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('./ui/schedule/YogsSchedulePage')),
  },
  {
    path: '/creators',
    children: [
      {
        path: '/',
        component: lazy(() => import('./ui/creator/CreatorsPage')),
      },

      {
        path: '/:id',
        component: lazy(() => import('./ui/creator/CreatorDetailPage')),
      },
    ],
  },
]
