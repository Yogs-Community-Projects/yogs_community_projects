import { ParentComponent } from 'solid-js'
import TwitchConfigProvider from '../config/TwitchConfigProvider'
import ThemeProvider from '../themeProvider/src/ThemeProvider'
import Background from '../../Background'

const GroupedTwitchProviders: ParentComponent = props => {
  return (
    <TwitchConfigProvider>
      <ThemeProvider>
        <Background>{props.children}</Background>
      </ThemeProvider>
    </TwitchConfigProvider>
  )
}

export default GroupedTwitchProviders
