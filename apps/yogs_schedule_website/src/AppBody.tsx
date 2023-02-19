import { Component } from 'solid-js'
import { routes } from './routes'
import { useRoutes } from '@solidjs/router'

const AppBody: Component = () => {
  const Routes = useRoutes(routes)
  return <Routes />
}
export default AppBody
