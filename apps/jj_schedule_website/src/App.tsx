import type { Component } from 'solid-js'
import { lazy } from 'solid-js'
import { Route, Router, Routes } from '@solidjs/router'
import { schedule2021RouteDataFunc, schedule2022RouteDataFunc } from './ui/schedule/ScheduleRouteData'
import { ScheduleOverlay } from './remote/ScheduleOverlay'
import { FundraisersOverlay } from './remote/FundraisersOverlay'
import { OverlayOverview } from './remote/OverlayOverview'

const App: Component = () => {
  return (
    <Router>
      <Routes>
        <Route path={'/'} component={lazy(() => import('./ui/AppBody'))}>
          <Route path={'/'} component={lazy(() => import('./ui/home/HomePage'))}></Route>
          <Route path={'/extension'} component={lazy(() => import('./ui/extension/ExtensionPage'))}></Route>
          <Route
            path={'/2021'}
            data={schedule2021RouteDataFunc}
            component={lazy(() => import('./ui/schedule/SchedulePage'))}
          ></Route>
          <Route
            path={'/2022'}
            data={schedule2022RouteDataFunc}
            component={lazy(() => import('./ui/schedule/SchedulePage'))}
          ></Route>
        </Route>
        <Route path={'/overlay'} component={OverlayOverview}></Route>
        <Route path={'/overlay/schedule'} component={ScheduleOverlay}></Route>
        <Route path={'/overlay/fundraisers'} component={FundraisersOverlay}></Route>
      </Routes>
    </Router>
  )
}

export default App
