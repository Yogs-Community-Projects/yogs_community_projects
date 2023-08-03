import { Component, createSignal, For, Show } from 'solid-js'
import { useCreatorIds, useDays } from './providers/ScheduleDataProvider'
import { Dialog } from '@kobalte/core'
import { CgClose } from 'solid-icons/cg'
import { createModalSignal, ModalSignal, useCreatorDB } from '@ycapp/common'
import { FaRegularCalendar, FaRegularSquare, FaSolidSquareCheck } from 'solid-icons/fa'
import { CreatorData, Slot } from '@ycapp/model'
import { DateTime, Duration } from 'luxon'
import ical from 'ical-generator'
import { ICalAlarmType } from 'ical-generator/dist/alarm'

export const CalendarExportButton: Component = () => {
  const modalSignal = createModalSignal()

  return (
    <>
      <div class={'w-slot h-data p-schedule'}>
        <div class={'schedule-card-white flex flex-row'}>
          <button
            class={'hover:bg-accent-50 flex flex-1 flex-col items-center justify-center rounded-2xl hover:scale-105'}
            onclick={modalSignal.open}
          >
            <div class={'flex w-full flex-row items-center justify-around'}>
              <p>Export</p> <FaRegularCalendar />
            </div>
          </button>
        </div>
      </div>
      <CalendarDialog modalSignal={modalSignal} />
    </>
  )
}

interface CalendarDialogDialogProps {
  modalSignal: ModalSignal
}

const CalendarDialog: Component<CalendarDialogDialogProps> = props => {
  const { modalSignal } = props

  return (
    <Dialog.Root isOpen={modalSignal.isOpen()} onOpenChange={modalSignal.setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay class={'fixed inset-0 z-50 bg-black bg-opacity-20'} />
        <div class={'fixed inset-0 z-50 flex items-center justify-center'}>
          <Dialog.Content class={'h-full w-full max-w-[500px] p-2 lg:w-[min(calc(100vw_-_16px),_500px)] lg:p-16'}>
            <CalendarDialogDialogBody onClose={modalSignal.close} />
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

interface CalendarDialogDialogBodyProps {
  onClose: () => void
}

const CalendarDialogDialogBody: Component<CalendarDialogDialogBodyProps> = props => {
  const { onClose } = props
  const days = useDays()
  const creators = useCreatorDB().readSome(useCreatorIds())
  const [selectedSlots, setSelectedSlots] = createSignal<Slot[]>([])
  const [search, setSearch] = createSignal('')

  const creatorMap = () => {
    const map = new Map<string, CreatorData>()
    if (!creators.data) {
      return map
    }
    for (const c of creators.data) {
      map.set(c.creator.creatorId, c)
    }
    return map
  }
  const creatorNames = (slot: Slot) => {
    const map = creatorMap()
    return slot.relations.creators
      .map(id => map.get(id))
      .filter(c => c !== undefined)
      .map(c => c!.creator.name)
  }
  const download = () => {
    const s = icalString()
    const start = DateTime.fromISO(days[0].slots[0].start)
    downloadFile(`MyJJSchedule${start.year}.ics`, s)
  }
  const downloadFile = (filename: string, text: string) => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/calendar;charset=utf8,' + encodeURIComponent(text))
    element.setAttribute('download', filename)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
  }
  const includes = (slot: Slot) => {
    return selectedSlots().find(s => s.start == slot.start) !== undefined
  }
  const toggle = (slot: Slot) => {
    if (includes(slot)) {
      setSelectedSlots([...selectedSlots().filter(s => s.start != slot.start)])
    } else {
      setSelectedSlots([...selectedSlots(), slot])
    }
  }
  const isInSearch = (slot: Slot) => {
    if (search() == '') {
      return true
    }
    const names = creatorNames(slot)
    return (
      slot.title.toLowerCase().includes(search().toLowerCase()) ||
      names.some(n => n.toLowerCase().includes(search().toLowerCase()))
    )
  }

  const icalString = () => {
    const calendar = ical({ name: 'My JJ Schedule' })
    for (const slot of selectedSlots()) {
      const start = DateTime.fromISO(slot.start)
      const end = start.plus(Duration.fromObject({ seconds: slot.duration }))
      calendar.createEvent({
        id: `jjstream${start.year}${start.year}_${start.month}_${start.day}_${start.hour}_${start.minute}`,
        url: 'https://twitch.tv/yogscast',
        start: start,
        end: end,
        summary: `Jingle Jam ${start.year} - ${slot.title}`,
        alarms: [
          {
            type: ICalAlarmType.display,
            triggerBefore: start.minus(Duration.fromObject({ minutes: 15 })),
          },
        ],
      })
    }
    return calendar.toString()
  }

  return (
    <div class={'flex h-full w-full flex-col rounded-3xl bg-white'}>
      <div class={`bg-primary flex h-[72px] items-center justify-center rounded-t-3xl p-2 text-white shadow-xl`}>
        <button onClick={onClose}>
          <CgClose size={24} class={''} />
        </button>
        <div class={'flex-1'}></div>
        <h3 class={'text-2xl'}>Calendar Export (iCAL)</h3>
        <div class={'flex-1'}></div>
        <div class={'w-[24px]'}></div>
      </div>
      <div class="p-4">
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
      <div class={'flex w-full flex-1 flex-col gap-2 overflow-auto p-4'}>
        <For each={days}>
          {day => {
            const start = DateTime.fromISO(day.start)
            const slots = day.slots
            const hasSlots = () => slots.some(s => isInSearch(s))
            return (
              <>
                <Show when={hasSlots()}>
                  <>
                    <p>
                      {start.toLocaleString({
                        day: '2-digit',
                        month: 'short',
                        weekday: 'short',
                      })}
                    </p>
                    <For each={day.slots}>
                      {slot => {
                        const start = DateTime.fromISO(slot.start)
                        return (
                          <Show when={isInSearch(slot)}>
                            <button
                              class={'hover:bg-accent-50 border-accent-50 rounded-xl border-2 p-4 hover:brightness-105'}
                              onClick={() => toggle(slot)}
                            >
                              <div class={'flex flex-row items-center'}>
                                <p class={'flex-1 text-left'}>
                                  {slot.title} ({start.toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET)})
                                </p>
                                <div class={'text-accent-500'}>
                                  <Show when={includes(slot)}>
                                    <FaSolidSquareCheck size={24} />
                                  </Show>
                                  <Show when={!includes(slot)}>
                                    <FaRegularSquare size={24} />
                                  </Show>
                                </div>
                              </div>
                            </button>
                          </Show>
                        )
                      }}
                    </For>
                  </>
                </Show>
              </>
            )
          }}
        </For>
      </div>
      <div class={'flex h-[72px] flex-row items-center justify-end gap-2 p-4'}>
        <button
          class={'bg-primary rounded-xl p-2 text-white'}
          onclick={() => {
            onClose()
          }}
        >
          Close
        </button>
        <button
          disabled={selectedSlots().length == 0}
          class={'bg-primary rounded-xl p-2 text-white disabled:bg-gray-500 disabled:opacity-75'}
          onclick={download}
        >
          Download
        </button>
      </div>
    </div>
  )
}
