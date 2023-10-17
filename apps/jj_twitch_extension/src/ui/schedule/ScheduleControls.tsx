import { isJJ, useDayIndexSetter } from './DayIndexProvider'
import { useCreatorFilter } from './CreatorFilterProvider'
import { Component, Match, Show, Switch } from 'solid-js'
import { FaSolidCalendarDay, FaSolidChevronLeft, FaSolidChevronRight, FaSolidFilter } from 'solid-icons/fa'
import { BiRegularReset } from 'solid-icons/bi'
import { FilterDialog } from './ScheduleCreatorFilterButton'
import { createModalSignal } from '@ycapp/common'
import { FiExternalLink } from 'solid-icons/fi'

const ScheduleControls: Component = () => {
  const [prev, next, today] = useDayIndexSetter()
  const modalSignal = createModalSignal()
  const { reset, isEmpty } = useCreatorFilter()

  return (
    <>
      <Switch>
        <Match when={isEmpty()}>
          <div style={{}} class={`schedule-card-white flex h-full flex-row`}>
            <button class={'schedule-controls-link has-tooltip rounded-l-2xl'} onclick={prev}>
              <span class={'tooltip bg-accent text-xxs -mt-20 rounded p-1 text-white shadow-lg'}>Previous Day</span>
              <FaSolidChevronLeft />
            </button>
            <button class={'schedule-controls-link has-tooltip'} onClick={modalSignal.open}>
              <span class={'tooltip bg-accent text-xxs -mt-20 rounded p-1 text-white shadow-lg'}>Filter</span>
              <FaSolidFilter />
            </button>
            <Show when={isJJ()}>
              <button class={'schedule-controls-link has-tooltip'} onclick={today}>
                <span class={'tooltip bg-accent text-xxs -mt-20 rounded p-1 text-white shadow-lg'}>Today</span>
                <FaSolidCalendarDay />
              </button>
            </Show>
            <a class={'schedule-controls-link has-tooltip'} href={'https://jj.yogs.app'} target={'_blank'}>
              <span class={'tooltip bg-accent text-xxs -mt-20 rounded p-1 text-white shadow-lg'}>
                https://jj.yogs.app
              </span>
              <FiExternalLink />
            </a>
            <button class={'schedule-controls-link has-tooltip rounded-r-2xl'} onclick={next}>
              <span class={'tooltip bg-accent text-xxs -mt-20 rounded p-1 text-white shadow-lg'}>Next day</span>
              <FaSolidChevronRight />
            </button>
          </div>
        </Match>
        <Match when={!isEmpty()}>
          <div class={`schedule-card-white flex h-full flex-row`}>
            <button class={'schedule-controls-link rounded-l-2xl'} onClick={modalSignal.open}>
              <FaSolidFilter />
            </button>
            <button
              class={'schedule-controls-link rounded-r-2xl'}
              onclick={() => {
                reset()
              }}
            >
              <BiRegularReset />
            </button>
          </div>
        </Match>
      </Switch>
      <FilterDialog modalSignal={modalSignal} />
    </>
  )
}

export default ScheduleControls
