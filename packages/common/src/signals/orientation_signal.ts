import { useWindowSize } from './window_size_signal'

export enum Orientation {
  Portrait,
  Landscape
}

export const useOrientation = (): Orientation => {
  const size = useWindowSize()
  const width = () => size().width
  const height = () => size().height

  return width() > height() ? Orientation.Landscape : Orientation.Portrait
}
