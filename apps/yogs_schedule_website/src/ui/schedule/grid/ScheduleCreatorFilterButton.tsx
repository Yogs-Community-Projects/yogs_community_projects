import { Component, createSignal, For, Match, Show, Switch } from 'solid-js'
import { useCreatorIds, useSlots } from './providers/ScheduleDataProvider'
import { useCreatorFilter } from './providers/CreatorFilterProvider'
import { Dialog } from '@kobalte/core'
import { CgClose } from 'solid-icons/cg'
import { FaRegularSquare, FaSolidSquareCheck } from 'solid-icons/fa'
import { createModalSignal, ModalSignal, useCreatorDB } from '@ycapp/common'

export const FilterButton: Component = () => {
  const modalSignal = createModalSignal()

  return (
    <>
      <div class={'w-slot h-data p-schedule'}>
        <div class={'schedule-card-white flex flex-row'}>
          <button
            class={'hover:bg-accent-50 flex flex-1 flex-col items-center justify-center rounded-2xl hover:scale-105'}
            onclick={modalSignal.open}
          >
            Filter
          </button>
        </div>
      </div>
      <FilterDialog modalSignal={modalSignal} />
    </>
  )
}

interface FilterDialogProps {
  modalSignal: ModalSignal
}

const FilterDialog: Component<FilterDialogProps> = props => {
  const { modalSignal } = props

  return (
    <Dialog.Root open={modalSignal.isOpen()} onOpenChange={modalSignal.setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay class={'fixed inset-0 z-50 bg-black bg-opacity-20'} />
        <div class={'fixed inset-0 z-50 flex items-center justify-center'}>
          <Dialog.Content class={'h-full w-full max-w-[500px] p-2 lg:w-[min(calc(100vw_-_16px),_500px)] lg:p-16'}>
            <FilterDialogBody onClose={modalSignal.close} />
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

interface FilterDialogBodyProps {
  onClose: () => void
}

const FilterDialogBody: Component<FilterDialogBodyProps> = props => {
  const { onClose } = props
  const slots = useSlots()
  const creators = useCreatorDB().readSome(useCreatorIds())
  const { includes, toggle, reset } = useCreatorFilter()
  const appearanceCount = (id: string) => {
    return slots.filter(s => s.relations.creators.includes(id)).length
  }

  const [sortByName, setSortByName] = createSignal(true)

  const creatorList = () => {
    if (!creators.data) {
      return []
    }

    if (sortByName()) {
      return [...creators.data].sort((a, b) => {
        return a.creator.name.toLowerCase().localeCompare(b.creator.name.toLowerCase())
      })
    } else {
      return [...creators.data].sort((a, b) => {
        const aAppearance = appearanceCount(a.creator.creatorId)
        const bAppearance = appearanceCount(b.creator.creatorId)
        if (a == b) {
          return a.creator.name.toLowerCase().localeCompare(b.creator.name.toLowerCase())
        }
        return bAppearance - aAppearance
      })
    }
  }

  return (
    <div class={'flex h-full w-full flex-col rounded-3xl bg-white'}>
      <div class={`bg-primary flex h-[72px] items-center justify-center rounded-t-3xl p-2 text-white shadow-xl`}>
        <button onClick={onClose}>
          <CgClose size={24} class={''} />
        </button>
        <div class={'flex-1'}></div>
        <h3 class={'text-2xl'}>Creator Filter</h3>
        <div class={'flex-1'}></div>
        <div class={'w-[24px]'}></div>
      </div>
      <div class={'flex w-full flex-1 flex-col gap-2 overflow-auto p-4'}>
        <Switch>
          <Match when={creators.data}>
            <div class={'grid grid-cols-2 gap-2'}>
              <button
                class={'hover:bg-accent-50 border-accent-50 rounded-full border-2'}
                onclick={() => setSortByName(true)}
              >
                Sort by name
              </button>
              <button
                class={'hover:bg-accent-50 border-accent-50 rounded-full border-2'}
                onclick={() => setSortByName(false)}
              >
                Sort by appearance
              </button>
            </div>
            <For each={creatorList()}>
              {creator => (
                <>
                  <button
                    class={'hover:bg-accent-50 border-accent-50 rounded-xl border-2 p-4 hover:brightness-105'}
                    onClick={() => toggle(creator.creator.creatorId)}
                  >
                    <div class={'flex flex-row items-center'}>
                      <p class={'flex-1 text-left'}>
                        {creator.creator.name} ({appearanceCount(creator.creator.creatorId)})
                      </p>
                      <div class={'text-accent-500'}>
                        <Show when={includes(creator.creator.creatorId)}>
                          <FaSolidSquareCheck size={24} />
                        </Show>
                        <Show when={!includes(creator.creator.creatorId)}>
                          <FaRegularSquare size={24} />
                        </Show>
                      </div>
                    </div>
                  </button>
                </>
              )}
            </For>
          </Match>
        </Switch>
      </div>
      <div class={'flex h-[72px] flex-row items-center justify-end gap-2 p-4'}>
        <button
          class={'bg-primary rounded-xl p-2 text-white'}
          onclick={() => {
            reset()
            onClose()
          }}
        >
          Reset
        </button>
        <button class={'bg-primary rounded-xl p-2 text-white'} onclick={onClose}>
          Done
        </button>
      </div>
    </div>
  )
}
