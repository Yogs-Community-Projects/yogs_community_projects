import { Component, Setter } from 'solid-js'

import full_2022 from '../../assets/stats/full_2022.json'
import full_2021 from '../../assets/stats/full_2021.json'
import full_2020 from '../../assets/stats/full_2020.json'
import { DonationData } from './statsModel'
import { ECharts } from 'echarts-solid'
import { Select, ToggleButton } from '@kobalte/core'
import { AiOutlineCheck } from 'solid-icons/ai'
import { twMerge } from 'tailwind-merge'
import { Bars, ChartType } from './BarChartEnums'
import { BarChartFilterProvider, useBarChartFilter } from './BarChartFilterProvider'
import { BarChartProvider, useBarChart } from './BarChartProvider'

const StatsPage: Component = () => {
  return (
    <BarChartFilterProvider>
      <div class={'flex flex-col gap-4'}>
        <BarChartProvider data={full_2022 as DonationData}>
          <BarChartJJSchedule title={'Jingle Jam 2022'} />
        </BarChartProvider>
        <BarChartProvider data={full_2021 as DonationData}>
          <BarChartJJSchedule title={'Jingle Jam 2021'} />
        </BarChartProvider>
        <BarChartProvider data={full_2020 as DonationData}>
          <BarChartJJSchedule title={'Jingle Jam 2020'} />
        </BarChartProvider>
      </div>
    </BarChartFilterProvider>
  )
}

const BarChartJJSchedule: Component<{ title: string }> = props => {
  const chartOptions = useBarChart()
  return (
    <div class={'flex w-full flex-col gap-2'}>
      <p class={'text-xl text-white'}>{props.title}</p>
      <div class={'bg-white'}>
        <ECharts height={400} width={1200} option={chartOptions()} />
      </div>
      <Settings />
    </div>
  )
}

const Settings: Component = () => {
  const {
    bars,
    setBars,
    type,
    setType,
    sortByAmount,
    setSortByAmount,
    top15,
    setTop15,
    excludeDay1,
    setExcludeDay1,
    excludeNights,
    setExcludeNights,
  } = useBarChartFilter()
  return (
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
