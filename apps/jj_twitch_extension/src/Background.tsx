import { Match, ParentComponent, Switch } from 'solid-js'
import { useTheme } from './ui/themeProvider'
import { twMerge } from 'tailwind-merge'

const Background: ParentComponent = props => {
  const { theme } = useTheme()
  const gradient = () => {
    switch (theme()) {
      case 'blue':
        return 'from-accent-shade from-10% via-accent to-accent-shade to-90%'
      case 'dark':
        return 'from-gray-500 to-gray-800'
      case 'red_light':
        return 'from-primary-300 to-primary-600'
      case 'blue_light':
        return 'from-accent-300 to-accent-600'
      case 'rainbow':
        return ''
      default:
        return 'from-primary-shade from-10% via-primary to-primary-shade to-90%'
    }
  }
  const cssStyle = () => {
    if (theme() !== 'rainbow') {
      return undefined
    }
    const colors = [
      'rgb(239 68 68)',
      'rgb(249 115 22)',
      'rgb(245 158 11)',
      'rgb(34 197 94)',
      'rgb(6 182 212)',
      'rgb(59 130 246)',
      'rgb(168 85 247)',
    ]
    const p = +(100 / colors.length).toFixed(2)
    const gradientColors = colors
      .map((c, i) => {
        if (i == 0) {
          return [`${c}`, `${c} ${p * (i + 1)}%`]
        } else if (i == colors.length - 1) {
          return [`${c} ${p * i}%`, `${c}`]
        }
        return [`${c} ${p * i}%`, `${c} ${p * (i + 1)}%`]
      })
      .flat()
    return {
      background: `linear-gradient(180deg, ${gradientColors.join(',')}`,
    }
  }

  return (
    <div
      class={twMerge('flex h-screen flex-col overflow-hidden overscroll-none bg-gradient-to-b', gradient())}
      style={cssStyle()}
    >
      {props.children}
    </div>
  )
}

export default Background
