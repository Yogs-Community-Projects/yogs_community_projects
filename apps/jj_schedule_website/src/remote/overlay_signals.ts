import { useSearchParams } from '@solidjs/router'
import { useNow } from '@ycapp/common'

const useParam = (key: string) => {
  const [params] = useSearchParams()
  return params[key]
}
export const showHeader = () => {
  return useParam('header') ? useParam('header') === 'true' : true
}
export const animatedHeader = () => {
  return useParam('animatedheader') ? useParam('animatedheader') === 'true' : false
}
export const background = () => {
  return '#' + useParam('background') ?? 'ff000000'
}
export const excludedChannel = () => {
  return (useParam('exclude') ?? '').split(',')
}
export const useNext = () => {
  const v = parseInt(useParam('next')) ?? 3
  if (v < 2) {
    return 2
  } else if (v > 4) {
    return 4
  }
  if (isNaN(v)) {
    return 3
  }
  return v
}

export const useOverlayNow = () => {
  return useNow()
}
