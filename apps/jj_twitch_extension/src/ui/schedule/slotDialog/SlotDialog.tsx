import { Slot, SlotUtils } from '@ycapp/model'
import { Accessor, Component, lazy, Show, Suspense } from 'solid-js'
import { getTailwindTextColor, ModalSignal, useNow } from '@ycapp/common'
import { DateTime } from 'luxon'
import { Dialog } from '@kobalte/core'
import { CgClose } from 'solid-icons/cg'

const RelatedChannels = lazy(() => import('./RelatedChannels'))
const SlotDialogTwitchChannels = lazy(() => import('./SlotDialogTwitchChannels'))
const SlotMarkdownDesc = lazy(() => import('./SlotMarkdownDesc'))

interface SlotDialogProps {
  modalSignal: ModalSignal
  slot: Slot
}

const SlotDialog: Component<SlotDialogProps> = props => {
  // w-[80%] left-[10%] md:w-[60%] md:left-[20%] lg:w-[50%] lg:left-[25%]  lg:w-[30%] lg:left-[35%]
  const { slot, modalSignal } = props
  return (
    <Dialog.Root open={modalSignal.isOpen()} onOpenChange={modalSignal.setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay class={'fixed inset-0 z-50 bg-black bg-opacity-20'} />
        <div class={'fixed inset-0 z-50 flex items-center justify-center'}>
          <Dialog.Content class={'h-full w-full p-1'}>
            <SlotDialogBody open={modalSignal.open} onClose={modalSignal.close} slot={slot} />
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

interface SlotDialogBodyProps {
  open: Accessor<boolean>
  onClose: () => void
  slot: Slot
}

const SlotDialogBody: Component<SlotDialogBodyProps> = props => {
  const { onClose, slot } = props
  const now = useNow()
  const background = () => {
    return _parseColor(slot.style.background ?? slot.style.linearGradient?.colors[0] ?? 'ffff0000')
  }
  function textColor() {
    return getTailwindTextColor(background())
  }
  function _parseColor(c: string): string {
    return '#' + c.substring(2) //  + c.substring(0, 2)
  }
  const showCountdown = () => {
    return SlotUtils.isBefore(slot, now())
  }
  const countdown = () => {
    const diff = DateTime.fromISO(slot.start).diff(now())
    if (diff.as('day') < 7) {
      return DateTime.fromISO(slot.start).diff(now()).toFormat('hh:mm:ss')
    }
    return DateTime.fromISO(slot.start).diff(now()).toFormat("dd 'Days', hh:mm:ss")
  }

  return (
    <div class={`flex h-full w-full flex-col rounded-3xl bg-white`}>
      <div
        style={{
          background: background(),
        }}
        class={`${textColor()} flex h-[72px] items-center justify-center rounded-t-3xl p-2 shadow-xl`}
      >
        <button onClick={onClose}>
          <CgClose size={24} />
        </button>
        <div class={'flex-1'}></div>
        <h3 class={'line-clamp-1 text-center text-2xl'}>{slot.title}</h3>
        <div class={'flex-1'}></div>
        <div class={'w-[24px]'}></div>
      </div>
      <div class={'flex w-full flex-1 flex-col overflow-auto p-4 text-xs'}>
        <p class={'text-lg'}>{slot.subtitle}</p>
        <Show when={showCountdown()}>
          <p class={'text-lg'}>Starts in {countdown()}</p>
        </Show>
        <p class={'text-lg'}>
          {SlotUtils.nextStream(slot).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}{' '}
          {SlotUtils.nextStream(slot).toLocaleString({
            hour: 'numeric',
            minute: 'numeric',
            hourCycle: 'h23',
            timeZoneName: 'short',
          })}
        </p>
        <Show when={slot.markdownDesc && slot.markdownDesc !== ''}>
          <Suspense>
            <SlotMarkdownDesc slot={slot} />
          </Suspense>
        </Show>
        <hr class={'border-solid border-black'} />
        <Show when={slot.relations.twitchChannels.length > 0}>
          <Suspense fallback={<p>Loading Live Channels...</p>}>
            <SlotDialogTwitchChannels slot={slot} />
          </Suspense>
        </Show>
        <Show when={slot.relations.creators.length > 0}>
          <Suspense fallback={<p>Loading Related Channels...</p>}>
            <RelatedChannels slot={slot} />
          </Suspense>
        </Show>
      </div>
    </div>
  )
}

export default SlotDialog
