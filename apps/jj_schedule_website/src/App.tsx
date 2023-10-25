import type { Component } from 'solid-js'
import { lazy } from 'solid-js'
import { Route, Router, Routes } from '@solidjs/router'
import {
  schedule2020RouteDataFunc,
  schedule2021RouteDataFunc,
  schedule2022RouteDataFunc,
} from './ui/schedule/ScheduleRouteData'
import { ScheduleOverlay } from './overlay/schedule/ScheduleOverlay'
import { FundraisersOverlay } from './overlay/fundraisers/FundraisersOverlay'
import { OverlayOverview } from './overlay/overview/OverlayOverview'
import { CharityOverlay } from './overlay/charity/CharityOverlay'
import { CharityOverlay2 } from './overlay/charity/CharityOverlay2'
import { SimpleScheduleOverlay } from './overlay/schedule_simple/SimpleScheduleOverlay'

const App: Component = () => {
  return (
    <Router>
      <Routes>
        <Route path={'/'} component={lazy(() => import('./ui/AppBody'))}>
          <Route path={'/'} component={lazy(() => import('./ui/home/HomePage'))} />
          <Route path={'/extension'} component={lazy(() => import('./ui/extension/ExtensionPage'))} />
          <Route
            path={'/2021'}
            data={schedule2021RouteDataFunc}
            component={lazy(() => import('./ui/schedule/SchedulePage'))}
          ></Route>
          <Route
            path={'/2020'}
            data={schedule2020RouteDataFunc}
            component={lazy(() => import('./ui/schedule/SchedulePage'))}
          ></Route>
          <Route
            path={'/2022'}
            data={schedule2022RouteDataFunc}
            component={lazy(() => import('./ui/schedule/SchedulePage'))}
          ></Route>
          <Route path={'/overlay'} component={OverlayOverview} />
        </Route>
        <Route path={'/overlay/schedule'} component={ScheduleOverlay} />
        <Route path={'/overlay/fundraisers'} component={FundraisersOverlay} />
        <Route path={'/overlay/charities'} component={CharityOverlay} />
        <Route path={'/overlay/charities2'} component={CharityOverlay2} />
        <Route path={'/overlay/customschedule'} component={SimpleScheduleOverlay} />
      </Routes>
    </Router>
  )
}

export default App
