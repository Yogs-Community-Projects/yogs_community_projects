/* @refresh reload */
import { render } from 'solid-js/web'
import 'tw-elements'
import './index.css'
import { Outlet, Route, Router, Routes } from '@solidjs/router'
import { Component, lazy } from 'solid-js'
import { ScheduleOverlay } from './remote/schedule_overlay'
import { AnalyticsConsent } from './ui/components/AnalyticsConsent'
import { JJLogo } from './ui/components/JJLogo'
import { NavBar } from './ui/components/NavBar'
import { Footer } from './ui/components/Footer'
import { schedule2021RouteDataFunc, schedule2022RouteDataFunc } from './ui/schedule/ScheduleRouteData'

// const App = lazy(() => import('./App'))
const DBWrapper = lazy(() => import('./db_wrapper'))

const Root = () => {
  return (
    <div
      class={'font-poppins from-primary-300 to-primary-700 flex min-h-screen flex-col items-center bg-gradient-to-b'}
    >
      <AnalyticsConsent />
      <JJLogo />
      <NavBar />
      <div class={'container mx-auto sm:p-1'}>
        <Outlet />
      </div>
      <div class={'grow'} />
      <Footer />
    </div>
  )
}

const Main: Component = () => {
  return (
    <DBWrapper>
      <Router>
        <Routes>
          <Route path={'/'} component={Root}>
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
          <Route path={'/overlay'} component={ScheduleOverlay}></Route>
        </Routes>
      </Router>
    </DBWrapper>
  )
}

render(() => <Main />, document.getElementById('root') as HTMLElement)
