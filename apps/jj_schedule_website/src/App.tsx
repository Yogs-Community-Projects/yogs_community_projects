import type { Component } from 'solid-js'
import { lazy, Show } from 'solid-js'
import { Route, Router, Routes, useLocation, useNavigate } from '@solidjs/router'
import {
  schedule2020RouteDataFunc,
  schedule2021RouteDataFunc,
  schedule2022RouteDataFunc,
  schedule2023RouteDataFunc,
  scheduleCurrentRouteDataFunc,
} from './ui/schedule/ScheduleRouteData'
import { ScheduleOverlay } from './overlay/schedule/ScheduleOverlay'
import { FundraisersOverlay } from './overlay/fundraisers/FundraisersOverlay'
import { CharityOverlay } from './overlay/charity/CharityOverlay'
import { CharityOverlay2 } from './overlay/charity/CharityOverlay2'
import { SimpleScheduleOverlay } from './overlay/schedule_simple/SimpleScheduleOverlay'
import { useConfig } from './ui/configProvider/ConfigProvider'
import { Meta, Title } from '@solidjs/meta'

const HomePage = lazy(() => import('./ui/home/HomePage'))
const SchedulePage = lazy(() => import('./ui/schedule/SchedulePage'))
const ExtensionPage = lazy(() => import('./ui/extension/ExtensionPage'))
const OverlayOverviewPage = lazy(() => import('./overlay/overview/OverlayOverview'))
const CommunityPage = lazy(() => import('./ui/community/CommunityPage'))

const Home = () => {
  return (
    <>
      <Title>Yogscast Jingle Jam Schedules and more</Title>
      <Meta
        name="description"
        content="Interactive Yogscast Jingle Jam Schedule with additional information. Click on each stream slot for more information."
      />
      <HomePage />
    </>
  )
}
const Schedule = () => {
  const location = useLocation()

  const title = () => `Yogscast Jingle Jam Schedule ${location.pathname.replace('/', '').replace('\\n', '')}`
  return (
    <>
      <Show when={location.pathname === '/'}>
        <Title>Yogscast Jingle Jam Schedules and more</Title>
        <Meta
          name="description"
          content="Interactive Yogscast Jingle Jam Schedule with additional information. Click on each stream slot for more information."
        />
      </Show>
      <Show when={location.pathname !== '/'}>
        <Title>{title()}</Title>
        <Meta
          name="description"
          content="Interactive Yogscast Jingle Jam Schedule with additional information. Click on each stream slot for more information."
        />
      </Show>
      <SchedulePage />
    </>
  )
}

const Extension = () => {
  return (
    <>
      <Title>Jingle Jam Community Twitch Extension</Title>
      <Meta
        name="description"
        content="Jingle Jam Community Twitch Extension. Add the extension to your channel to give your viewers more information about the Jingle Jam"
      />
      <ExtensionPage />
    </>
  )
}

const OverlayOverview = () => {
  return (
    <>
      <Title>Jingle Jam Community Streaming Overlays</Title>
      <Meta
        name="description"
        content="Jingle Jam Community Streaming Overlays. Jingle Jam related Overlays that show the charities and community fundraiser. Customize and add them to your stream."
      />
      <OverlayOverviewPage />
    </>
  )
}
const Community = () => {
  return (
    <>
      <Title>Jingle Jam Community Fundraiser</Title>
      <Meta
        name="description"
        content="Jingle Jam Community Fundraiser. A list of the top 50 Community Fundraisers with links to their tiltify Campaign and channel."
      />
      <CommunityPage />
    </>
  )
}

const App: Component = () => {
  const config = useConfig()
  return (
    <Router>
      <Routes>
        <Route path={'/'} component={lazy(() => import('./ui/AppBody'))}>
          <Show when={!config.visible}>
            <Route path={'/'} component={Home} />
          </Show>
          <Show when={config.visible}>
            <Route path={'/'} data={scheduleCurrentRouteDataFunc} component={Schedule}></Route>
          </Show>
          <Route path={'/extension'} component={Extension} />
          <Route path={'/overlay'} component={OverlayOverview} />
          <Route path={'/community'} component={Community} />
          <Route path={'/2021'} data={schedule2021RouteDataFunc} component={Schedule}></Route>
          <Route path={'/2020'} data={schedule2020RouteDataFunc} component={Schedule}></Route>
          <Route path={'/2022'} data={schedule2022RouteDataFunc} component={Schedule}></Route>
        </Route>
        <Route path={'/overlay/schedule'} component={ScheduleOverlay} />
        <Route path={'/overlay/fundraisers'} component={FundraisersOverlay} />
        <Route path={'/overlay/charities'} component={CharityOverlay} />
        <Route path={'/overlay/charities2'} component={CharityOverlay2} />
        <Route path={'/overlay/customschedule'} component={SimpleScheduleOverlay} />
        <Route path="*" component={Redirect}></Route>
      </Routes>
    </Router>
  )
}
// <Route path={'/2023'} data={schedule2023RouteDataFunc} component={Schedule}></Route>

export const Redirect = () => {
  const navigate = useNavigate()
  navigate('/')
  return <></>
}

export default App
