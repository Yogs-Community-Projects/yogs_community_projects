import { Accessor } from 'solid-js/types/reactive/signal'
import { createEffect, createSignal, onCleanup, onMount, Setter } from 'solid-js'
import { Dimension } from '@ycapp/model'

export const useWindowSize = (): Accessor<{ width: number; height: number }> => {
  const [size, setSize] = createSignal<{ width: number; height: number }>({ width: 0, height: 0 })

  function onResize() {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  onMount(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
    window.addEventListener('resize', onResize)
  })
  onCleanup(() => {
    window.removeEventListener('resize', onResize)
  })

  return size
}

export const useDivDimension = (): [Accessor<Dimension>, Setter<HTMLDivElement | undefined>] => {
  const [ref, setRef] = createSignal<HTMLDivElement | undefined>()
  const [size, setSize] = createSignal<Dimension>({ width: 0, height: 0 })
  onMount(() => {
    const r = ref()
    if (r) {
      update(r)
    }
    window.addEventListener('resize', onResize)
  })

  createEffect(() => {
    const r = ref()
    if (r) {
      update(r)
    }
  })

  onCleanup(() => {
    window.removeEventListener('resize', onResize)
  })

  function onResize() {
    const r = ref()
    if (r) {
      update(r)
    }
  }

  function update(ref: HTMLDivElement) {
    const size = {
      width: ref.clientWidth,
      height: ref.clientHeight
    }
    setSize(size)
  }

  return [size, setRef]
}
