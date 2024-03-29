import { Slot, SlotUtils } from '@ycapp/model'
import { Accessor, Component, For, Match, Show, Switch } from 'solid-js'
import { CgClose } from 'solid-icons/cg'
import { DateTime } from 'luxon'
import SolidMarkdown from 'solid-markdown'
import { getTailwindTextColor, ModalSignal, useCreatorDB, useTwitchDB, useYoutubeDB } from '@ycapp/common'
import { Dialog } from '@kobalte/core'
import { A } from '@solidjs/router'
import { CreatorTile } from '../tiles/CreatorTile'
import { TwitchTile, YoutubeTile } from '../tiles/ChannelTile'
import './slotDialog.css'
import remarkGfm from 'remark-gfm'

interface SlotDialogProps {
  modalSignal: ModalSignal
  slot: Slot
}

export const SlotDialog: Component<SlotDialogProps> = props => {
  // w-[80%] left-[10%] md:w-[60%] md:left-[20%] lg:w-[50%] lg:left-[25%]  lg:w-[30%] lg:left-[35%]
  const { slot, modalSignal } = props
  return (
    <Dialog.Root open={modalSignal.isOpen()} onOpenChange={modalSignal.setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay class={'fixed inset-0 z-50 bg-black bg-opacity-20'} />
        <div class={'fixed inset-0 z-50 flex items-center justify-center'}>
          <Dialog.Content class={'h-full w-full max-w-[500px] p-2 lg:w-[min(calc(100vw_-_16px),_500px)] lg:p-16'}>
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

  const background = () => {
    return _parseColor(slot.style.background ?? slot.style.linearGradient?.colors[0] ?? 'ffff0000')
  }

  function textColor() {
    return getTailwindTextColor(background())
  }

  function _parseColor(c: string): string {
    return '#' + c.substring(2) //  + c.substring(0, 2)
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
        <h3 class={'line-clamp-1 text-2xl'}>{slot.title}</h3>
        <div class={'flex-1'}></div>
        <div class={'w-[24px]'}></div>
      </div>
      <div class={'flex w-full flex-1 flex-col overflow-auto p-4'}>
        <p class={'text-xl'}>{slot.subtitle}</p>
        <p class={'text-xl'}>{SlotUtils.nextStream(slot).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</p>
        <p class={'text-xl'}>{SlotUtils.nextStream(slot).toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)}</p>
        <SolidMarkdown children={slot.markdownDesc} remarkPlugins={[remarkGfm]} />
        <hr class={'border-solid border-black'} />
        <Show when={slot.relations.twitchChannels}>
          <TwitchSection slot={slot} />
        </Show>
        <Show when={slot.relations.youtubeChannels}>
          <YoutubeSection slot={slot} />
        </Show>
        <Show when={slot.relations.creators}>
          <CreatorSection slot={slot} />
        </Show>
      </div>
    </div>
  )
}

interface CreatorSectionProps {
  slot: Slot
}

const CreatorSection: Component<CreatorSectionProps> = props => {
  const creators = useCreatorDB().readSome(props.slot.relations.creators)

  return (
    <Show when={props.slot.relations.creators.length > 0}>
      <p class={'text-2xl'}>Creators</p>
      <Switch>
        <Match when={creators.data}>
          <div class={'grid grid-cols-3 gap-2'}>
            <For each={creators.data}>
              {result => (
                <A href={'/creators/' + result.creator.creatorId} class={'no-underline hover:text-white'}>
                  <CreatorTile creator={result.creator} style={result.style} />
                </A>
              )}
            </For>
          </div>
        </Match>
      </Switch>
    </Show>
  )
}

interface TwitchSectionProps {
  slot: Slot
}

const TwitchSection: Component<TwitchSectionProps> = props => {
  const channels = useTwitchDB().readSome(props.slot.relations.twitchChannels)
  return (
    <Show when={props.slot.relations.twitchChannels.length > 0}>
      <p class={'text-2xl'}>Twitch Channel</p>
      <Switch>
        <Match when={channels.data}>
          <div class={'grid grid-cols-3 gap-2'}>
            <For each={channels.data}>{result => <TwitchTile data={result} />}</For>
          </div>
        </Match>
      </Switch>
    </Show>
  )
}
const YoutubeSection: Component<TwitchSectionProps> = props => {
  const channels = useYoutubeDB().readSome(props.slot.relations.youtubeChannels)
  return (
    <Show when={props.slot.relations.youtubeChannels.length > 0}>
      <p class={'text-2xl'}>Youtube Channel</p>
      <Switch>
        <Match when={channels.data}>
          <div class={'grid grid-cols-3 gap-2'}>
            <For each={channels.data}>{result => <YoutubeTile data={result} />}</For>
          </div>
        </Match>
      </Switch>
    </Show>
  )
}
