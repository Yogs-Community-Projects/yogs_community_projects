import { Component } from 'solid-js'
import AppBody from './AppBody'
import NavBar from './ui/components/NavBar'

const App: Component = () => {
  return (
    <div class={'flex min-h-screen flex-col items-center'}>
      <NavBar />
      <div class={'container mx-auto'}>
        <AppBody />
      </div>
    </div>
  )
}
export default App
