import { ParentComponent } from 'solid-js'
import { twMerge } from 'tailwind-merge'
import { useTheme } from './ui/themeProvider'

export const ColoredScrollbar: ParentComponent = props => {
  const { theme } = useTheme()

  const scrollbar = () => {
    switch (theme()) {
      case 'blue':
      case 'blue_light':
        return 'scrollbar-corner-accent-100 scrollbar-thumb-primary-500 scrollbar-track-primary-100'
      case 'dark':
        return 'scrollbar-corner-gray-100 scrollbar-thumb-gray-600 scrollbar-track-gray-100'
      default:
        return ''
    }
  }
  return (
    <div
      class={twMerge(
        'scrollbar-thin scrollbar-corner-primary-100 scrollbar-thumb-accent-500 scrollbar-track-accent-100 h-full overflow-y-auto overflow-x-hidden p-1.5 pt-0',
        scrollbar(),
      )}
    >
      {props.children}
    </div>
  )
}
