import { Component, createSignal, Setter } from 'solid-js'

import full_2022 from '../../assets/stats/full_2022.json'
import full_2021 from '../../assets/stats/full_2021.json'
import full_2020 from '../../assets/stats/full_2020.json'
import { DonationData, SlotDonation } from './statsModel'
import { ECharts } from 'echarts-solid'
import { EChartsOption } from 'echarts'
import { Slot } from '@ycapp/model'
import { DateTime } from 'luxon'
import { Checkbox, Select, ToggleButton } from '@kobalte/core'
import { AiOutlineCheck } from 'solid-icons/ai'
import { twMerge } from 'tailwind-merge'
import { Accessor } from 'solid-js/types/reactive/signal'

const StatsPage: Component = () => {
  return (
    <div class={'flex flex-col gap-4'}>
      <BarChartJJSchedule title={'Jingle Jam 2022'} data={full_2022 as DonationData} />
      <BarChartJJSchedule title={'Jingle Jam 2021'} data={full_2021 as DonationData} />
      <BarChartJJSchedule title={'Jingle Jam 2020'} data={full_2020 as DonationData} />
    </div>
  )
}

enum Bars {
  total = 'Total',
  total2 = 'Total With Highlighted Fundraiser',
  yogs = 'Yogs',
  fundraiser = 'Fundraiser',
}

enum ChartType {
  total = 'Total',
  amountPerMinute = 'Amount per minute',
}

const BarChartJJSchedule: Component<{ title: string; data: DonationData }> = props => {
  const [bars, setBars] = createSignal<Bars>(Bars.total)
  const [type, setType] = createSignal<ChartType>(ChartType.total)

  const [sortByAmount, setSortByAmount] = createSignal<boolean>(false)
  const [top15, setTop15] = createSignal<boolean>(false)
  const [excludeDay1, setExcludeDay1] = createSignal<boolean>(false)
  const [excludeNights, setExcludeNights] = createSignal<boolean>(false)

  const isNight = (s: SlotDonation) => {
    return s.slot.title.includes('Night ') && s.slot.style.background === 'aaaaaa'
  }

  const isNotNight = (s: SlotDonation) => !isNight(s)

  const sortByAmountFunc = (a: SlotDonation, b: SlotDonation) => {
    if (showYogs() && !showFundraiser()) {
      return yogsValue(a) - yogsValue(b)
    } else if (!showYogs() && showFundraiser()) {
      return fundraiserValue(a) - fundraiserValue(b)
    }
    return totalValue(a) - totalValue(b)
  }
  const sortByDateFunc = (a: SlotDonation, b: SlotDonation) => {
    return DateTime.fromISO(b.slot.start).toMillis() - DateTime.fromISO(a.slot.start).toMillis()
  }
  const slots = () => {
    let slots = props.data.slots.sort(sortByAmountFunc).reverse()
    if (excludeNights()) {
      slots = slots.filter(isNotNight)
    }
    if (excludeDay1()) {
      slots = slots.filter(s => {
        const date = DateTime.fromISO(s.slot.start)
        return date.day !== 1
      })
    }
    if (top15()) {
      slots = slots.sort(sortByAmountFunc).reverse().slice(0, 15)
    }
    if (!sortByAmount()) {
      slots = slots.sort(sortByDateFunc).reverse()
    }
    return slots
  }

  const color = (s: Slot) => {
    const color = s.style?.linearGradient?.colors[0]?.substring(2) ?? s.style?.background?.substring(2)
    return '#' + (color ?? 'aaaaaa')
  }
  const labels = () =>
    slots().map(s => {
      if (s.slot.title.length > 15) {
        return s.slot.title.substring(0, 12) + '...'
      }
      return s.slot.title
    })

  const totalValue = (s: SlotDonation) => {
    if (type() === ChartType.amountPerMinute) {
      // const duration = SlotUtils.duration(s.slot)
      return s.donation.total / (s.slot.duration / 60)
    }
    return s.donation.total
  }
  const yogsValue = (s: SlotDonation) => {
    if (type() === ChartType.amountPerMinute) {
      // const duration = SlotUtils.duration(s.slot)
      return s.donation.yogs / (s.slot.duration / 60)
    }
    return s.donation.yogs
  }
  const fundraiserValue = (s: SlotDonation) => {
    if (type() === ChartType.amountPerMinute) {
      // const duration = SlotUtils.duration(s.slot)
      return s.donation.fundraiser / (s.slot.duration / 60)
    }
    return s.donation.fundraiser
  }
  const yogs = () => {
    return slots().map(s => {
      return {
        value: yogsValue(s),
        itemStyle: {
          color: color(s.slot),
        },
      }
    })
  }
  const fundraiser = () => {
    return slots().map(s => {
      return {
        value: fundraiserValue(s),
        itemStyle: {
          color: bars() === Bars.total2 ? '#ff0000' : color(s.slot),
        },
        tooltip: {
          show: true,
        },
      }
    })
  }

  const showYogs = () => bars() === Bars.yogs || bars() === Bars.total || bars() === Bars.total2
  const showFundraiser = () => bars() === Bars.fundraiser || bars() === Bars.total || bars() === Bars.total2
  const chartOptions = (): EChartsOption => {
    return {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        show: false,
        selected: {
          Yogs: showYogs(),
          Fundraiser: showFundraiser(),
        },
      },
      grid: {
        show: true,
        top: '4px',
        left: '10px',
        right: '4px',
        bottom: '4px',
        containLabel: true,
      },
      yAxis: {
        name: 'Amounts raised in Pounds',
        position: 'top',
        type: 'value',
        show: true,
        splitLine: {
          lineStyle: {
            type: 'solid',
            width: 2,
          },
        },
        axisLabel: {
          rotate: 45,
          hideOverlap: false,
          fontSize: 10,
        },
      },
      xAxis: {
        axisLabel: {
          rotate: 45,
          hideOverlap: false,
          fontSize: top15() ? 12 : 8,
        },
        splitLine: {
          lineStyle: {
            type: 'solid',
            width: 2,
          },
        },
        type: 'category',
        data: labels(),
      },
      series: [
        {
          name: 'Yogs',
          type: 'bar',
          stack: 'total',
          label: {
            show: false,
          },
          emphasis: {
            // focus: 'series',
          },
          tooltip: {
            show: true,
            valueFormatter: value => value + '£',
          },
          data: yogs(),
        },
        {
          name: 'Fundraiser',
          type: 'bar',
          stack: 'total',
          label: {
            show: false,
          },
          emphasis: {
            // focus: 'series',
          },
          data: fundraiser(),
        },
      ],
    }
  }

  return (
    <div class={'flex w-full flex-col gap-2'}>
      <p class={'text-xl text-white'}>{props.title}</p>
      <div class={'bg-white'}>
        <ECharts height={400} width={1200} option={chartOptions()} />
      </div>
      <div class={'flex flex-1 flex-row items-start gap-4 p-2 text-white'}>
        <Select.Root<Bars>
          class="row col w-32 gap-4 p-2"
          value={bars()}
          placeholder="Select a Theme"
          onChange={setBars}
          options={[Bars.total, Bars.total2, Bars.yogs, Bars.fundraiser]}
          itemComponent={props => (
            <Select.Item
              class={'flex w-full flex-row justify-between p-1 text-white hover:cursor-pointer'}
              item={props.item}
            >
              <Select.ItemLabel>{props.item.rawValue.toString()}</Select.ItemLabel>
              <Select.ItemIndicator>
                <AiOutlineCheck />
              </Select.ItemIndicator>
            </Select.Item>
          )}
        >
          <Select.Trigger class="flex w-32 flex-row items-center justify-between" aria-label="Fruit">
            <Select.Value<string>>{state => state.selectedOption()}</Select.Value>
            <Select.Icon class="select__icon">
              <svg
                fill="currentColor"
                stroke-width="0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                height="2em"
                width="2em"
                style="overflow: visible; --darkreader-inline-fill: currentColor;"
                data-darkreader-inline-fill=""
              >
                <path
                  fill="currentColor"
                  d="m12 15-4.243-4.242 1.415-1.414L12 12.172l2.828-2.828 1.415 1.414L12 15.001Z"
                  data-darkreader-inline-fill=""
                  style="--darkreader-inline-fill: currentColor;"
                ></path>
              </svg>
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content class="bg-accent-500 rounded shadow">
              <Select.Listbox class="flex flex-col gap-1" />
            </Select.Content>
          </Select.Portal>
        </Select.Root>
        <Select.Root<ChartType>
          class="row col w-32 gap-4 p-2"
          value={type()}
          placeholder="Select a Theme"
          onChange={setType}
          options={[ChartType.total, ChartType.amountPerMinute]}
          itemComponent={props => (
            <Select.Item
              class={'flex w-full flex-row justify-between p-1 text-white hover:cursor-pointer'}
              item={props.item}
            >
              <Select.ItemLabel>{props.item.rawValue.toString()}</Select.ItemLabel>
              <Select.ItemIndicator>
                <AiOutlineCheck />
              </Select.ItemIndicator>
            </Select.Item>
          )}
        >
          <Select.Trigger class="flex w-32 flex-row items-center justify-between" aria-label="Fruit">
            <Select.Value<string>>{state => state.selectedOption()}</Select.Value>
            <Select.Icon class="select__icon">
              <svg
                fill="currentColor"
                stroke-width="0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                height="2em"
                width="2em"
                style="overflow: visible; --darkreader-inline-fill: currentColor;"
                data-darkreader-inline-fill=""
              >
                <path
                  fill="currentColor"
                  d="m12 15-4.243-4.242 1.415-1.414L12 12.172l2.828-2.828 1.415 1.414L12 15.001Z"
                  data-darkreader-inline-fill=""
                  style="--darkreader-inline-fill: currentColor;"
                ></path>
              </svg>
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content class="bg-accent-500 rounded shadow">
              <Select.Listbox class="flex flex-col gap-1" />
            </Select.Content>
          </Select.Portal>
        </Select.Root>
        <JJToggle enabledTitle={'Top 15'} disabledTitle={'All'} pressed={top15()} onChange={setTop15} />
        <JJToggle enabledTitle={'Amount'} disabledTitle={'Date'} pressed={sortByAmount()} onChange={setSortByAmount} />
        <JJToggle
          enabledTitle={'Exclude Day 1'}
          disabledTitle={'Include Day 1'}
          pressed={excludeDay1()}
          onChange={setExcludeDay1}
        />{' '}
        <JJToggle
          enabledTitle={'Exclude Nights'}
          disabledTitle={'Include Nights'}
          pressed={excludeNights()}
          onChange={setExcludeNights}
        />
      </div>
    </div>
  )
}

/*
const BackChartCreatorFilter = () => {
  const { creators, toggle, includes } = useChartCreatorFilter()

  return (
    <Show when={creators.data}>
      <div class={'text-xxs grid grid-cols-6'}>
        <For each={creators.data}>
          {creator => {
            return (
              <button
                class={'hover:bg-accent-50 rounded-xl p-1 hover:brightness-105'}
                onClick={() => toggle(creator.creator.creatorId)}
              >
                <div class={'flex flex-row items-center'}>
                  <p class={'overflow-none flex-1 text-left'}>{creator.creator.name}</p>
                  <div class={'text-accent-500'}>
                    <Show when={includes(creator.creator.creatorId)}>
                      <FaSolidSquareCheck size={10} />
                    </Show>
                    <Show when={!includes(creator.creator.creatorId)}>
                      <FaRegularSquare size={10} />
                    </Show>
                  </div>
                </div>
              </button>
            )
          }}
        </For>
      </div>
    </Show>
  )
}
*/

const JJCheckbox: Component<{
  label: string
  checked: Accessor<boolean>
  onChange: Setter<boolean>
}> = props => {
  return (
    <Checkbox.Root checked={props.checked()} onChange={props.onChange} class={'flex flex-row items-center gap-2'}>
      <Checkbox.Input class={'w-full hover:cursor-pointer'} />
      <Checkbox.Control
        class={'h-5 w-5 items-center justify-center rounded border-2 border-white hover:cursor-pointer'}
      >
        <Checkbox.Indicator class={'hover:cursor-pointer'}>
          <AiOutlineCheck />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label class={'hover:cursor-pointer'}>{props.label}</Checkbox.Label>
    </Checkbox.Root>
  )
}

const JJToggle: Component<{
  enabledTitle: string
  disabledTitle: string
  pressed: boolean
  onChange: Setter<boolean>
}> = props => {
  return (
    <ToggleButton.Root
      class={'flex flex-row text-white transition-all'}
      pressed={props.pressed}
      onChange={props.onChange}
    >
      {state => (
        <>
          <div
            class={twMerge(
              'rounded-l-2xl bg-white p-1 text-black opacity-100 transition-all',
              !state.pressed() && 'bg-primary text-white opacity-100',
            )}
          >
            {props.disabledTitle}
          </div>
          <div
            class={twMerge(
              'rounded-r-2xl bg-white p-1 text-black opacity-100 transition-all',
              state.pressed() && 'bg-primary text-white opacity-100',
            )}
          >
            {props.enabledTitle}
          </div>
        </>
      )}
    </ToggleButton.Root>
  )
}
export default StatsPage
