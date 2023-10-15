import { useContext } from 'solid-js'
import { ThemeContext } from './ThemeContext'

export const useTheme = () => useContext(ThemeContext)
