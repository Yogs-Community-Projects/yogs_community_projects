function _linearizeColorComponent(component: number) {
  if (component <= 0.03928) return component / 12.92
  return Math.pow((component + 0.055) / 1.055, 2.4)
}

function computeLuminance(color: string): number {
  const red = parseInt(color.slice(1, 3), 16)
  const green = parseInt(color.slice(3, 5), 16)
  const blue = parseInt(color.slice(5, 7), 16)
  const R = _linearizeColorComponent(red / 0xff)
  const G = _linearizeColorComponent(green / 0xff)
  const B = _linearizeColorComponent(blue / 0xff)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

enum Brightness {
  light,
  dark,
}

function estimateBrightnessForColor(color: string) {
  const relativeLuminance = computeLuminance(color)
  const kThreshold = 0.15
  if ((relativeLuminance + 0.05) * (relativeLuminance + 0.05) > kThreshold) {
    return Brightness.light
  }
  return Brightness.dark
}

export function getTextColor(bgColor: string) {
  if (isColorLight(bgColor)) {
    return '#000000'
  }
  return '#ffffff'
}

export function isColorLight(bgColor: string) {
  return estimateBrightnessForColor(bgColor) == Brightness.light
}

export function getTailwindTextColor(bgColor: string) {
  if (estimateBrightnessForColor(bgColor) == Brightness.light) {
    return 'text-black'
  }
  return 'text-white'
}
