import { useLocation } from '@solidjs/router'
import { useNow } from '@ycapp/common'

const useParam = (key: string) => {
  //const [params] = useSearchParams()
  const location = useLocation()
  return location.query[key]
}
export const useHeader = () => {
  return (useParam('header') ?? 'upnext').split(',')
}
export const background = () => {
  return '#' + useParam('background') ?? 'ff000000'
}
export const excludedChannel = () => {
  return (useParam('exclude') ?? '').split(',')
}
export const minAmount = () => {
  return parseInt(useParam('minamount') ?? '0')
}
export const useSpeed = () => {
  return parseInt(useParam('speed') ?? '2') ?? 2
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
