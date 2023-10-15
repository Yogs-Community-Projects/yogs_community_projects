import { ParentComponent } from 'solid-js'
import { ThemeContext, useInternalTheme } from './ThemeContext'

const ThemeProvider: ParentComponent = props => {
  const t = useInternalTheme()
  return <ThemeContext.Provider value={t}>{props.children}</ThemeContext.Provider>
}

export default ThemeProvider
