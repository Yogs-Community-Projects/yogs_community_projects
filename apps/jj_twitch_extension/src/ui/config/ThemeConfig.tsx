import { Component, For } from 'solid-js'
import { RadioGroup, Select } from '@kobalte/core'
import { AiOutlineCheck } from 'solid-icons/ai'
import { useTwitchConfig } from './useTwitchConfig'

const optionsMap = new Map<string, string>([
  ['red', 'Red'],
  ['red_dark', 'Dark Red'],
  ['blue', 'Blue'],
  ['blue_dark', 'Dark Blue'],
  ['dark', 'Dark'],
  ['rainbow', 'Rainbow'],
])

const themeOptions = (): { theme: string; name: string }[] => {
  const keys = [...optionsMap.keys()]
  return keys.map(key => {
    return { theme: key, name: optionsMap[key] as string }
  })
  /*
  return [
    {
      theme: 'red',
      name: 'Red',
    },
    {
      theme: 'red_dark',
      name: 'Dark Red',
    },
    {
      theme: 'blue',
      name: 'Blue',
    },
    {
      theme: 'blue_dark',
      name: 'Dark Blue',
    },
    {
      theme: 'dark',
      name: 'Dark',
    },
    {
      theme: 'rainbow',
      name: 'Rainbow',
    },
  ]
  */
}
export const ThemeRadioButtons: Component = () => {
  const { config, setConfig } = useTwitchConfig()

  return (
    <RadioGroup.Root
      class="row col gap-4 p-2"
      value={config.theme}
      onChange={v => {
        setConfig({
          theme: v as 'red' | 'blue',
        })
      }}
    >
      <RadioGroup.Label class="">Theme</RadioGroup.Label>
      <div class={'flex flex-col gap-2'}>
        <For each={themeOptions()}>
          {({ theme, name }) => {
            return (
              <RadioGroup.Item value={theme} class="flex items-center hover:cursor-pointer">
                <RadioGroup.ItemInput class="flex h-4 w-4 items-center justify-center rounded-full border-4 border-white bg-white" />
                <RadioGroup.ItemControl class="flex h-4 w-4 items-center justify-center rounded-full border-4 border-white bg-white">
                  <RadioGroup.ItemIndicator class="border-1 bg-accent h-2 w-2 rounded-full border-black" />
                </RadioGroup.ItemControl>
                <RadioGroup.ItemLabel class="ml-2 hover:cursor-pointer">{name}</RadioGroup.ItemLabel>
              </RadioGroup.Item>
            )
          }}
        </For>
      </div>
    </RadioGroup.Root>
  )
}

export const ThemeSelection: Component = () => {
  const { config, setConfig } = useTwitchConfig()

  const options = () => [...optionsMap.keys()]

  return (
    <div class={'flex flex-col'}>
      <p>Theme</p>
      <Select.Root<string>
        class="row col w-32 gap-4 p-2"
        value={config.theme}
        placeholder="Select a Theme"
        onChange={v => {
          setConfig({
            theme: v as 'red' | 'blue',
          })
        }}
        options={options()}
        itemComponent={props => (
          <Select.Item
            class={'flex w-full flex-row justify-between p-1 text-white hover:cursor-pointer'}
            item={props.item}
          >
            <Select.ItemLabel>{optionsMap.get(props.item.rawValue)}</Select.ItemLabel>
            <Select.ItemIndicator>
              <AiOutlineCheck />
            </Select.ItemIndicator>
          </Select.Item>
        )}
      >
        <Select.Trigger class="flex w-32 flex-row items-center justify-between" aria-label="Fruit">
          <Select.Value<string>>{state => optionsMap.get(state.selectedOption())}</Select.Value>
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
    </div>
  )
}
