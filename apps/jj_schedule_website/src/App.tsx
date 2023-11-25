import { Component, lazy, onMount, ParentComponent, Show, Suspense } from 'solid-js'
import { Route, Router, Routes, useLocation, useNavigate } from '@solidjs/router'
import {
  schedule2020RouteDataFunc,
  schedule2021RouteDataFunc,
  schedule2022RouteDataFunc,
  scheduleCurrentRouteDataFunc,
} from './ui/schedule/ScheduleRouteData'
import { ScheduleOverlay } from './overlay/schedule/ScheduleOverlay'
import { FundraisersOverlay } from './overlay/fundraisers/FundraisersOverlay'
import { CharityOverlay } from './overlay/charity/CharityOverlay'
import { CharityOverlay2 } from './overlay/charity/CharityOverlay2'
import { SimpleScheduleOverlay } from './overlay/schedule_simple/SimpleScheduleOverlay'
import { useConfig } from './ui/configProvider/ConfigProvider'
import { useAnalytics } from './AnalyticsProvider'

const HomePage = lazy(() => import('./ui/home/HomePage'))
const SchedulePage = lazy(() => import('./ui/schedule/SchedulePage'))
const ExtensionPage = lazy(() => import('./ui/extension/ExtensionPage'))
const OverlayOverviewPage = lazy(() => import('./overlay/overview/OverlayOverview'))
const CommunityPage = lazy(() => import('./ui/community/CommunityPage'))
const StatsPage = lazy(() => import('./ui/stats/StatsPage'))

const Page: ParentComponent<{ title: string; desc: string }> = props => {
  const { log } = useAnalytics()
  const location = useLocation()
  onMount(() => {
    document.title = props.title
    document.getElementsByTagName('meta')['description'].content = props.title
    // document.head.title = props.title
    log('page_view', {
      page_title: props.title,
      page_location: location.pathname,
    })
  })
  return <Suspense fallback={<p class={'text-center text-white'}>Loading...</p>}>{props.children}</Suspense>

  /*
  *       <Title>{props.title}</Title>
      <Meta name="description" content={props.desc} />
*/
}
const Home = () => {
  return (
    <Page
      title={'Interactive Yogscast Jingle Jam Schedules and more'}
      desc={
        'Interactive Yogscast Jingle Jam Schedule with additional information. And more Jingle Jam related community resources like a Twitch extension and Streaming Overlays.'
      }
    >
      <HomePage />
    </Page>
  )
}
const Schedule = () => {
  const location = useLocation()

  const scheduleTitle = () =>
    `Interactive Yogscast Jingle Jam Schedule ${location.pathname.replace('/', '').replace('\\n', '')}`

  const title = () => {
    if (location.pathname === '/') {
      return 'Interactive Yogscast Jingle Jam Schedules and more'
    }
    return scheduleTitle()
  }

  const desc = () =>
    'Interactive Yogscast Jingle Jam Schedule with additional information. Click on each stream slot for more information.'

  return (
    <Page title={title()} desc={desc()}>
      <SchedulePage />
    </Page>
  )
}

const Extension = () => {
  return (
    <Page
      title={'Jingle Jam Community Twitch Extension'}
      desc="Jingle Jam Community Twitch Extension. Add the extension to your channel to give your viewers more information about the Jingle Jam"
    >
      <ExtensionPage />
    </Page>
  )
}

const OverlayOverview = () => {
  return (
    <Page
      title={'Jingle Jam Community Streaming Overlays'}
      desc={
        'Jingle Jam Community Streaming Overlays. Jingle Jam related Overlays that show the charities and community fundraiser. Customize and add them to your stream.'
      }
    >
      <OverlayOverviewPage />
    </Page>
  )
}
const Community = () => {
  return (
    <Page
      title={'Jingle Jam Community Fundraiser'}
      desc={
        'Jingle Jam Community Fundraiser. A list of the top 50 Community Fundraisers with links to their tiltify Campaign and channel.'
      }
    >
      <CommunityPage />
    </Page>
  )
}
const Stats = () => {
  return (
    <Page
      title={'Jingle Jam Stats'}
      desc={
        'Jingle Jam Community Fundraiser. A list of the top 50 Community Fundraisers with links to their tiltify Campaign and channel.'
      }
    >
      <StatsPage />
    </Page>
  )
}

const App: Component = () => {
  const config = useConfig()
  const visible = () => config.visible
  return (
    <Router>
      <Routes>
        <Route path={'/'} component={lazy(() => import('./ui/AppBody'))}>
          <Show when={!visible()}>
            <Route path={'/'} component={Home} />
          </Show>
          <Show when={visible()}>
            <Route path={'/'} data={scheduleCurrentRouteDataFunc} component={Schedule}></Route>
          </Show>
          <Route path={'/extension'} component={Extension} />
          <Route path={'/overlay'} component={OverlayOverview} />
          <Route path={'/community'} component={Community} />
          <Route path={'/stats'} component={Stats} />
          <Route path={'/2020'} data={schedule2020RouteDataFunc} component={Schedule}></Route>
          <Route path={'/2021'} data={schedule2021RouteDataFunc} component={Schedule}></Route>
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
