import { RouteDefinition } from '@solidjs/router'
import { lazy } from 'solid-js'

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('./ui/twitch/TwitchPage')),
  },
  {
    path: '',
    component: lazy(() => import('./ui/twitch/TwitchPage')),
  },
  {
    path: '*',
    component: lazy(() => import('./ui/twitch/TwitchPage')),
  },
  {
    path: '/schedule',
    component: lazy(() => import('./ui/schedule/SchedulePage')),
  },
]
