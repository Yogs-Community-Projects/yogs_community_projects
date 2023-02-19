import { createSignal, Setter } from 'solid-js'

export interface ModalSignal {
  setOpen: Setter<boolean>
  isOpen: () => boolean
  toggle: () => boolean
  close: () => false
  open: () => true
}

export const createModalSignal = (init = false): ModalSignal => {
  const [isOpen, setOpen] = createSignal(init)
  const close = () => setOpen(false)
  const open = () => setOpen(true)
  const toggle = () => setOpen(!isOpen())

  return { isOpen, close, open, toggle, setOpen }
}
