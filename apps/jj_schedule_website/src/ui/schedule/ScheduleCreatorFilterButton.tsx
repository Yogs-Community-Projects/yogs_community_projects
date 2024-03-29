import { Component, createSignal, For, Match, Show, Switch } from 'solid-js'
import { useScheduleData, useSlots } from './providers/ScheduleDataProvider'
import { useCreatorFilter } from './providers/CreatorFilterProvider'
import { Dialog, ToggleButton, Tooltip } from '@kobalte/core'
import { CgClose } from 'solid-icons/cg'
import { FaRegularSquare, FaSolidSquareCheck } from 'solid-icons/fa'
import { createModalSignal, ModalSignal } from '@ycapp/common'
import { useAnalytics } from '../../AnalyticsProvider'
import { twMerge } from 'tailwind-merge'
import { BsPeopleFill } from 'solid-icons/bs'
import { BiRegularReset, BiRegularShare } from 'solid-icons/bi'

const useCopyFilterUrl = () => {
  const { makeLink } = useCreatorFilter()
  const { log } = useAnalytics()

  return async () => {
    const url = makeLink()
    try {
      let copyValue = ''

      if (url) {
        copyValue = url
      }

      await navigator.clipboard.writeText(copyValue)
    } catch (e) {
      console.log(e.toString())
    }
    try {
      log('filter_copy', {
        filter_url: url,
      })
      window.alert(`Copied ${url} to your clipboard`)
    } catch (e) {
      console.log(e.toString())
    }
  }
}

export const FilterResetButton: Component = () => {
  const { isEmpty, reset } = useCreatorFilter()
  return (
    <Show when={!isEmpty()}>
      <div class={'w-data h-data p-schedule'}>
        <div class={'schedule-card-white flex flex-row'}>
          <Tooltip.Root openDelay={300} closeDelay={300}>
            <Tooltip.Trigger
              class={
                'hover:bg-accent-50 flex flex-1 flex-col items-center justify-center rounded-2xl transition-all hover:scale-105'
              }
              onClick={reset}
            >
              <div class={'flex w-full flex-row items-center justify-around'}>
                <BiRegularReset />
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content class={'bg-accent rounded p-2 text-white'}>
                <Tooltip.Arrow />
                <p>Reset Filter</p>
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </div>
      </div>
    </Show>
  )
}
export const FilterShareButton: Component = () => {
  const { isEmpty } = useCreatorFilter()
  const copy = useCopyFilterUrl()
  return (
    <Show when={!isEmpty() && navigator.clipboard}>
      <div class={'w-data h-data p-schedule'}>
        <div class={'schedule-card-white flex flex-row'}>
          <Tooltip.Root openDelay={300} closeDelay={300}>
            <Tooltip.Trigger
              class={
                'hover:bg-accent-50 flex flex-1 flex-col items-center justify-center rounded-2xl transition-all hover:scale-105'
              }
              onClick={copy}
            >
              <div class={'flex w-full flex-row items-center justify-around'}>
                <BiRegularShare />
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content class={'bg-accent rounded p-2 text-white'}>
                <Tooltip.Arrow />
                <p>Share Schedule Link</p>
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </div>
      </div>
    </Show>
  )
}

export const FilterButton: Component = () => {
  const modalSignal = createModalSignal()

  return (
    <>
      <div class={'w-slot h-data p-schedule'}>
        <div class={'schedule-card-white flex flex-row'}>
          <button
            class={
              'hover:bg-accent-50 flex flex-1 flex-col items-center justify-center rounded-2xl transition-all hover:scale-105'
            }
            onclick={modalSignal.open}
          >
            <div class={'flex w-full flex-row items-center justify-around'}>
              <p>Filter</p>
              <BsPeopleFill />
            </div>
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

export const FilterDialog: Component<FilterDialogProps> = props => {
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
  const schedule = useScheduleData()
  const { creators, includes, toggle, reset, filter, makeLink, creatorList, appearanceCount, isSlotPartOfFilter } =
    useCreatorFilter()
  const [search, setSearch] = createSignal('')
  const copy = useCopyFilterUrl()

  const { log } = useAnalytics()

  const slots = useSlots()

  const filteredSlots = () => slots.filter(isSlotPartOfFilter)

  const searchCreatorList = () => {
    if (search() === '') {
      return creatorList()
    }
    return creatorList().filter(c => {
      return c.creator.name.toLowerCase().includes(search().toLowerCase())
    })
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
            <p>Filtered streams: {filteredSlots().length}</p>
            <div class={'flex flex-row items-center justify-stretch gap-2'}>
              <SortToggle />
              <AndToggle />
            </div>
            <div class="p-2">
              <label class="mb-2 block text-sm font-bold text-gray-700" for="search">
                Search
              </label>
              <input
                class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="search"
                type="text"
                placeholder="Search"
                value={search()}
                onInput={e => {
                  const target = e.target as HTMLInputElement
                  if (target) {
                    setSearch(target.value)
                  }
                }}
              />
            </div>
            <For each={searchCreatorList()}>
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
        <Show when={navigator.clipboard}>
          <button
            class={'bg-primary rounded-xl p-2 text-white disabled:bg-gray-500 disabled:opacity-75'}
            disabled={filter().length == 0}
            onclick={copy}
          >
            Share Link
          </button>
        </Show>
        <button
          class={'bg-primary rounded-xl p-2 text-white'}
          onclick={() => {
            reset()
          }}
        >
          Reset
        </button>
        <button
          class={'bg-primary rounded-xl p-2 text-white'}
          onclick={() => {
            onClose()
            log('filter_schedule', {
              filter: filter().join(','),
              filter_url: makeLink(),
              schedule: schedule.name,
            })
          }}
        >
          Done
        </button>
      </div>
    </div>
  )
}

const AndToggle = () => {
  const { and, toggleAnd } = useCreatorFilter()

  return (
    <ToggleButton.Root
      class={
        'border-accent-50 flex flex-1 flex-row items-stretch justify-stretch rounded-full border-2 text-sm text-white transition-all'
      }
      pressed={and()}
      onChange={toggleAnd}
    >
      {state => (
        <>
          <div
            class={twMerge(
              'flex-1 rounded-l-2xl bg-gray-400 p-1 opacity-60 transition-all',
              !state.pressed() && 'bg-primary opacity-100',
            )}
          >
            <p>OR</p>
          </div>
          <div
            class={twMerge(
              'flex-1 rounded-r-2xl bg-gray-400 p-1 opacity-60 transition-all',
              state.pressed() && 'bg-primary opacity-100',
            )}
          >
            <p>AND</p>
          </div>
        </>
      )}
    </ToggleButton.Root>
  )
}

const SortToggle = () => {
  const { sortByName, toggleSortByName } = useCreatorFilter()

  return (
    <ToggleButton.Root
      class={'border-accent-50 flex flex-1 flex-row rounded-full border-2 text-sm text-white transition-all'}
      pressed={sortByName()}
      onChange={toggleSortByName}
    >
      {state => (
        <>
          <div
            class={twMerge(
              'flex-1 rounded-l-2xl bg-gray-400 p-1 opacity-60 transition-all',
              !state.pressed() && 'bg-primary opacity-100',
            )}
          >
            <p>Appearance</p>
          </div>
          <div
            class={twMerge(
              'flex-1 rounded-r-2xl bg-gray-400 p-1 opacity-60 transition-all',
              state.pressed() && 'bg-primary opacity-100',
            )}
          >
            <p>Name</p>
          </div>
        </>
      )}
    </ToggleButton.Root>
  )
}
