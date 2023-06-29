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
    path: '/charities',
    component: lazy(() => import('./ui/charity/CharityPage')),
  },
  {
    path: '/community',
    component: lazy(() => import('./ui/streamer/StreamerPage')),
  },
]
