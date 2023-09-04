import { RouteDefinition } from '@solidjs/router'
import { JJTab1, JJTab2, JJTab3 } from './ui/components/JJTab'
import { ConfigBody } from './ui/config/ConfigBody'

export const routes: RouteDefinition[] = [
  {
    path: '/1',
    // component: lazy(() => import('./ui/schedule/SchedulePage')),
    component: JJTab1,
  },
  {
    path: '',
    component: JJTab1,
  },
  {
    path: '*',
    component: JJTab1,
  },
  {
    path: '/2',
    component: JJTab2,
  },
  {
    path: '/3',
    component: JJTab3,
  },
  /*
  {
    path: '/config',
    component: ConfigBody,
  },*/
]
