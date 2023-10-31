import { Component, For, Show } from 'solid-js'
import { AlertDialog, Button, RadioGroup, TextField } from '@kobalte/core'
import { createModalSignal, useJJConfig } from '@ycapp/common'
import { CgClose } from 'solid-icons/cg'
import { ThemeSelection } from './ThemeConfig'
import { useTwitchConfig } from './useTwitchConfig'
import { TabType } from './TwitchConfig'
import { JJExtensionDesktop } from '../../JJExtensionDesktop'

export const ConfigBody: Component = () => {
  const jjConfig = useJJConfig()
  const { config, setConfig, save, validConfig, edited } = useTwitchConfig()
  const modalSignal = createModalSignal()
  const validateDonationUrl = () => {
    const urlRegex = /\bhttps?:\/\/(?:\w+\.)?tiltify\.com\b/
    return (
      ((config.donationUrl.includes('tiltify.com') && config.donationUrl.startsWith('https://')) ||
        config.donationUrl === '') &&
      urlRegex.test(config.donationUrl)
    )
  }

  return (
    <div class={'bg-primary-500 flex flex-row p-1'}>
      <div class={'text-white'}>
        <div class={'p-2'}>
          <p>Set the contents for each tab</p>
          <div class={'flex flex-row'}>
            <TabSelect
              showNone={false}
              index={1}
              tab={config.tab1}
              onChange={v => {
                setConfig({ tab1: v as TabType })
              }}
            />
            <TabSelect
              showNone={true}
              index={2}
              tab={config.tab2}
              onChange={v => {
                setConfig({ tab2: v as TabType })
              }}
            />
            <TabSelect
              showNone={true}
              index={3}
              tab={config.tab3}
              onChange={v => {
                setConfig({ tab3: v as TabType })
              }}
            />
          </div>
        </div>
        <div class={'p-2'}>
          <ThemeSelection />
        </div>
        <div class={'flex flex-col p-1'}>
          <p>The donation link will disappear after the Jingle Jam ends.</p>
          <div class={'flex flex-row items-center justify-normal gap-2'}>
            <TextField.Root
              class={'flex flex-col gap-1'}
              value={config.donationUrl}
              onChange={v => {
                setConfig({ donationUrl: v })
              }}
              validationState={validateDonationUrl() ? 'valid' : 'invalid'}
            >
              <TextField.Label>Donation URL</TextField.Label>
              <TextField.Input class={'text-black'} />
              <TextField.Description>Enter your custom Jingle Jam Donation URL here.</TextField.Description>
              <TextField.ErrorMessage>Invalid tiltify url</TextField.ErrorMessage>
            </TextField.Root>
            <a
              target={'_blank'}
              class={'bg-accent rounded-2xl p-2 text-white disabled:bg-gray-400'}
              href={jjConfig.jingleJamRegistrationUrl}
            >
              Register as a Jingle Jam Fundraiser
            </a>
          </div>
        </div>
        <Show when={!validConfig()}>
          <p>Make sure to show something different in each tab</p>
        </Show>
        <div class={'p-2'}>
          <Button.Root
            class={'bg-accent rounded-2xl p-2 text-white disabled:bg-gray-400'}
            onClick={() => {
              save()
              modalSignal.toggle()
            }}
            disabled={!validateDonationUrl() || !validConfig()}
          >
            Save
          </Button.Root>
        </div>
        <Show when={edited()}>
          <p>You have unsaved changes</p>
        </Show>
      </div>
      <div class={'p-2'}>
        <p class={'text-white'}>Preview</p>
        <div class={'from-primary-300 to-primary-700 h-[496px] w-[316px] overflow-hidden bg-gradient-to-b'}>
          <JJExtensionDesktop />
        </div>
      </div>

      <AlertDialog.Root open={modalSignal.isOpen()} onOpenChange={modalSignal.setOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay class="fixed inset-0 z-50 bg-black bg-opacity-20" />
          <div class="fixed inset-0 z-50 flex items-center justify-center">
            <AlertDialog.Content class="z-50 max-w-[min(calc(100vw_-_16px),500px)] rounded-md border border-solid border-zinc-300 bg-[white] p-4 shadow-lg">
              <div class="mb-3 flex items-baseline justify-between">
                <AlertDialog.Title class="text-xl font-medium text-zinc-900">Configuration Saved</AlertDialog.Title>
                <AlertDialog.CloseButton class="h-4 w-4 text-zinc-600">
                  <CgClose size={24} />
                </AlertDialog.CloseButton>
              </div>
              <AlertDialog.Description class=" text-base text-zinc-700">
                Jingle Jam Community Extension Extension Configuration Saved
              </AlertDialog.Description>
            </AlertDialog.Content>
          </div>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  )
}

const TabSelect: Component<{
  showNone: boolean
  index: number
  tab: TabType
  onChange: (value: string) => void
}> = props => {
  const options: { value: TabType; label: string }[] = [
    {
      value: 'yogs',
      label: 'Yogs Schedule',
    },
    {
      value: 'charities',
      label: 'JJ Charities',
    },
    {
      value: 'community',
      label: 'Community Streamer',
    },
  ]

  return (
    <RadioGroup.Root class="row col gap-4 p-2" value={props.tab} onChange={props.onChange}>
      <RadioGroup.Label class="">Tab {props.index}</RadioGroup.Label>
      <div class={'flex flex-col gap-2'}>
        <For each={options}>
          {item => (
            <RadioGroup.Item value={item.value} class="flex items-center hover:cursor-pointer">
              <RadioGroup.ItemInput class="flex h-4 w-4 items-center justify-center rounded-full border-4 border-white bg-white" />
              <RadioGroup.ItemControl class="flex h-4 w-4 items-center justify-center rounded-full border-4 border-white bg-white">
                <RadioGroup.ItemIndicator class="border-1 bg-accent h-2 w-2 rounded-full border-black" />
              </RadioGroup.ItemControl>
              <RadioGroup.ItemLabel class="ml-2 hover:cursor-pointer">{item.label}</RadioGroup.ItemLabel>
            </RadioGroup.Item>
          )}
        </For>
        <Show when={props.showNone}>
          <RadioGroup.Item value={'none'} class="flex items-center hover:cursor-pointer">
            <RadioGroup.ItemInput class="flex h-4 w-4 items-center justify-center rounded-full border-4 border-white bg-white" />
            <RadioGroup.ItemControl class="flex h-4 w-4 items-center justify-center rounded-full border-4 border-white bg-white">
              <RadioGroup.ItemIndicator class="border-1 bg-accent h-2 w-2 rounded-full border-black" />
            </RadioGroup.ItemControl>
            <RadioGroup.ItemLabel class="ml-2 hover:cursor-pointer">Hide</RadioGroup.ItemLabel>
          </RadioGroup.Item>
        </Show>
      </div>
    </RadioGroup.Root>
  )
}
