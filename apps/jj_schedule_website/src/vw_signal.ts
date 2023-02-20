import { createSignal, onMount, Setter } from 'solid-js'
import { Accessor } from 'solid-js/types/reactive/signal'

export const createVWSignal = (): [
  Accessor<number>,
  Accessor<HTMLDivElement | undefined>,
  Setter<HTMLDivElement | undefined>
] => {
  const [ref, setRef] = createSignal<HTMLDivElement | undefined>()
  const [windowSize, setWindowSize] = createSignal({ width: 0, height: 0 })

  const refWidth = () => ref()?.clientWidth ?? 0
  const refHeight = () => ref()?.clientHeight ?? 0

  function _setSize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  _setSize()

  window.addEventListener('resize', () => _setSize())
  onMount(() => {
    _setSize()
  })
  const vw = () => {
    const r = ref()
    const rw = r?.clientWidth ?? 0
    const windowWidth = windowSize().width
    return Math.round((rw / windowWidth) * 10000) / 100
  }
  return [vw, ref, setRef]
}
