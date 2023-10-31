import type { Component } from 'solid-js'
import { Show } from 'solid-js'
import NavBar from './ui/components/NavBar'
import { Route, Routes, useLocation, useNavigate } from '@solidjs/router'
import { JJTab1, JJTab2, JJTab3 } from './ui/components/JJTab'
import { Env, useEnv } from './EnvProvider'

const App: Component = () => {
  const env = useEnv()
  const location = useLocation
  const navigate = useNavigate()
  if (!location().pathname.includes('config')) {
    navigate('/1')
  }
  return (
    <div class={'flex h-full flex-col'}>
      <Show when={env === Env.desktop}>
        <NavBar />
      </Show>
      <div class={'mx-auto w-full flex-1 overflow-hidden overscroll-none'}>
        <Routes>
          <Route path={'/'} component={JJTab1}></Route>
          <Route path={''} component={JJTab1}></Route>
          <Route path={'*'} component={JJTab1}></Route>
          <Route path={'/1'} component={JJTab1}></Route>
          <Route path={'/2'} component={JJTab2}></Route>
          <Route path={'/3'} component={JJTab3}></Route>
        </Routes>
      </div>
      <Show when={env === Env.mobile}>
        <NavBar />
      </Show>
    </div>
  )
}

export default App
