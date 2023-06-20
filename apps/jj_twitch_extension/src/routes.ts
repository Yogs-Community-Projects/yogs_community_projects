import { RouteDefinition } from '@solidjs/router'
import { lazy } from 'solid-js'
export const routes: RouteDefinition[] = [
  {
    path: '/',
    // component: lazy(() => import('./ui/schedule/SchedulePage')),
    component: lazy(() => import('./ui/schedule/SchedulePage')),
  },
  {
    path: '',
    component: lazy(() => import('./ui/schedule/SchedulePage')),
  },
  {
    path: '*',
    component: lazy(() => import('./ui/schedule/SchedulePage')),
  },
  {
    path: '/charity',
    component: lazy(() => import('./ui/charity/CharityPage')),
  },
  {
    path: '/streamer',
    component: lazy(() => import('./ui/streamer/StreamerPage')),
  },
]
