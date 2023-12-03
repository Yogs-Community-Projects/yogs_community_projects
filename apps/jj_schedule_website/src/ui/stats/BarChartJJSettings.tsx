import { Component } from 'solid-js'
import { useBarChartFilter, useChartOnStreamFilter } from './BarChartFilterProvider'
import { Select, ToggleButton } from '@kobalte/core'
import { ChartTimeType, ChartValueType, ChartDataType, OnStreamType } from './BarChartEnums'
import { AiOutlineCheck } from 'solid-icons/ai'
import { twMerge } from 'tailwind-merge'

export const BarChartJJSettings: Component = () => {
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
    dataType,
    setDataType,
  } = useBarChartFilter()
  return (
    <div class={'flex flex-1 flex-row items-center gap-4 p-2 text-white'}>
      <Select.Root<ChartDataType>
        class="row col w-32 gap-4 p-2"
        value={bars()}
        placeholder="Select a Theme"
        onChange={setBars}
        options={[
          ChartDataType.total,
          ChartDataType.yogs,
          ChartDataType.fundraiser,
          ChartDataType.collections,
          ChartDataType.donations,
          ChartDataType.avgDonationAmount,
        ]}
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
      <Select.Root<ChartValueType>
        class="row col w-32 gap-4 p-2"
        value={type()}
        placeholder="Select a Theme"
        onChange={setType}
        options={[ChartValueType.total, ChartValueType.amountPerMinute, ChartValueType.percentageOfTotal]}
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
      />
      <JJToggle
        enabledTitle={'Exclude Nights'}
        disabledTitle={'Include Nights'}
        pressed={excludeNights()}
        onChange={setExcludeNights}
      />
      <JJToggle
        enabledTitle={'Yogs Streams'}
        disabledTitle={'Hourly'}
        pressed={dataType() === ChartTimeType.yogsStreams}
        onChange={b => {
          if (b) {
            setDataType(ChartTimeType.yogsStreams)
          } else {
            setDataType(ChartTimeType.hourly)
          }
          return !b
        }}
      />
    </div>
  )
}

export const BarChartOnStreamSettings: Component = () => {
  const { bars, setBars, sortByAmount, setSortByAmount, top15, setTop15 } = useChartOnStreamFilter()
  return (
    <div class={'flex flex-1 flex-row items-center justify-center gap-4 p-2 text-white'}>
      <Select.Root<OnStreamType>
        class="row col gap-4 p-2"
        value={bars()}
        placeholder="Select a Theme"
        onChange={setBars}
        options={[
          OnStreamType.appearances,
          OnStreamType.hoursStreamed,
          OnStreamType.percentageOfHours,
          OnStreamType.percentageOfStreams,
        ]}
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
    </div>
  )
}

const JJToggle: Component<{
  enabledTitle: string
  disabledTitle: string
  pressed: boolean
  onChange: (pressed: boolean) => void
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
              'rounded-l-2xl bg-white p-1 text-xs text-black opacity-75 transition-all',
              !state.pressed() && 'bg-accent text-white opacity-100',
            )}
          >
            {props.disabledTitle}
          </div>
          <div
            class={twMerge(
              'rounded-r-2xl bg-white p-1 text-xs text-black opacity-75 transition-all',
              state.pressed() && 'bg-accent text-white opacity-100',
            )}
          >
            {props.enabledTitle}
          </div>
        </>
      )}
    </ToggleButton.Root>
  )
}
