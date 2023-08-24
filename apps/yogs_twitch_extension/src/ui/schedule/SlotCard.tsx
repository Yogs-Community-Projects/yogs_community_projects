import { Slot, SlotUtils, TwitchChannelData } from '@ycapp/model'
import { Accessor, Component, createMemo, For, JSX, Match, Show, Switch } from 'solid-js'
import { BiLogosTwitch, BiLogosYoutube } from 'solid-icons/bi'
import { BsHeart } from 'solid-icons/bs'
import {
  createModalSignal,
  getTailwindTextColor,
  getTextColor,
  ModalSignal,
  RemoteData,
  useCreatorDB,
  useNow,
  useTwitchDB,
} from '@ycapp/common'
import { DateTime } from 'luxon'
import { TwitchTile } from '../components/tiles/TwitchTile'
import { Dialog } from '@kobalte/core'
import { CgClose } from 'solid-icons/cg'
import SolidMarkdown from 'solid-markdown'

interface SlotCardProps {
  slot: Slot
  showCountdown?: boolean
  showTime?: boolean
}

export const SlotCard: Component<SlotCardProps> = props => {
  const slot = props.slot

  function textColor(background: string) {
    return getTextColor(background)
  }

  function _parseColor(c: string): string {
    return '#' + c.substring(2) //  + c.substring(0, 2)
  }

  const background = () => {
    let gradientStyle: JSX.CSSProperties | undefined
    if (slot.style.linearGradient) {
      const linearGradient = slot.style.linearGradient
      gradientStyle = {
        background: `linear-gradient(180deg, ${linearGradient.colors.map(_parseColor).join(', ')})`,
        color: textColor(_parseColor(slot.style.background ?? linearGradient.colors[0] ?? 'ffff0000')),
        height: '100%',
      }
    } else {
      if (slot.style.background) {
        gradientStyle = {
          background: `${_parseColor(slot.style.background ?? 'ffff0000')}`,
          // background: _parseColor(slot.style.background)
          color: textColor(_parseColor(slot.style.background ?? 'ffff0000')),
          height: '100%',
        }
      }
    }
    return gradientStyle
  }

  const isLive = () => {
    return SlotUtils.isLive(props.slot, useNow())
  }

  const underline = () => {
    if (isLive()) {
      return 'underline'
    }
    return ''
  }

  const nextStream = () => {
    return SlotUtils.nextStream(props.slot, useNow())
  }
  const countdown = () => {
    return nextStream().diff(useNow())
  }

  const isOver = () => {
    return SlotUtils.isOver(props.slot)
  }

  const hasSubtitle = () => props.slot.subtitle && props.slot.subtitle.length > 0

  const modalSignal = createModalSignal()
  return (
    <>
      <div class={'h-full w-full transition-all'}>
        <div
          class={
            'hover:scale-102 schedule-card group group flex cursor-pointer flex-col justify-center rounded-2xl p-1 text-center transition-all hover:brightness-105'
          }
          style={{
            ...background(),
          }}
          onclick={modalSignal.toggle}
        >
          <div class={'flex h-full w-full flex-col justify-center text-center'}>
            <p class={'line-clamp-1 text-sm font-bold md:text-base ' + underline()}>{props.slot.title}</p>
            <Show when={props.showTime && !SlotUtils.isLive(props.slot, useNow())}>
              <Show when={hasSubtitle()}>
                <p class={'block font-mono text-xs group-hover:hidden md:text-sm'}>
                  {nextStream().toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)}
                </p>
                <p class={'hidden text-xs group-hover:line-clamp-1 group-hover:block md:text-sm'}>
                  {props.slot.subtitle}
                </p>
              </Show>
              <Show when={!hasSubtitle()}>
                <p class={'font-mono text-xs md:text-sm'}>
                  {nextStream().toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)}
                </p>
              </Show>
            </Show>
            <Show when={props.showCountdown && !SlotUtils.isLive(props.slot, useNow()) && !isOver()}>
              <p class={'text-xs md:text-sm'}>
                Starts in <span class={'font-mono'}>{countdown().toFormat('hh:mm:ss')}</span>
              </p>
            </Show>
          </div>
          <Show when={slot.relations.creators.length > 1}>
            <TwitchIcons slot={slot} />
          </Show>
          <div class={'flex w-full flex-row justify-around'}>
            <Show when={slot.showTwitchIcon} fallback={<div />}>
              <BiLogosTwitch size={18} />
            </Show>
            <Show when={slot.showHighlightIcon} fallback={<div />}>
              <BsHeart size={18} />
            </Show>
            <Show when={slot.showYoutubeIcon} fallback={<div />}>
              <BiLogosYoutube size={18} />
            </Show>
          </div>
        </div>
      </div>
      <SlotDialog slot={slot} modalSignal={modalSignal} />
    </>
  )
}

export const SpecialSlotCard: Component<SlotCardProps> = props => {
  const slot = props.slot

  function textColor(background: string) {
    return getTextColor(background)
  }

  function _parseColor(c: string): string {
    return '#' + c.substring(2) //  + c.substring(0, 2)
  }

  const background = () => {
    let gradientStyle: JSX.CSSProperties | undefined
    if (slot.style.linearGradient) {
      const linearGradient = slot.style.linearGradient
      gradientStyle = {
        background: `linear-gradient(180deg, ${linearGradient.colors.map(_parseColor).join(', ')})`,
        color: textColor(_parseColor(slot.style.background ?? linearGradient.colors[0] ?? 'ffff0000')),
        height: '100%',
      }
    } else {
      if (slot.style.background) {
        gradientStyle = {
          background: `${_parseColor(slot.style.background ?? 'ffff0000')}`,
          // background: _parseColor(slot.style.background)
          color: textColor(_parseColor(slot.style.background ?? 'ffff0000')),
          height: '100%',
        }
      }
    }
    return gradientStyle
  }

  const isLive = () => {
    return SlotUtils.isLive(props.slot, useNow())
  }

  const underline = () => {
    if (isLive()) {
      return 'underline'
    }
    return ''
  }

  const nextStream = () => {
    return SlotUtils.nextStream(props.slot, useNow())
  }
  const countdown = () => {
    return nextStream().diff(useNow())
  }

  const isOver = () => {
    return SlotUtils.isOver(props.slot)
  }

  const modalSignal = createModalSignal()
  return (
    <>
      <div class={'h-full w-full transition-all'}>
        <div
          class={
            'hover:scale-102 schedule-card flex cursor-pointer flex-col justify-center rounded-2xl p-1 text-center transition-all hover:brightness-105'
          }
          style={{
            ...background(),
          }}
          onclick={modalSignal.toggle}
        >
          <div class={'flex h-full w-full flex-col justify-center text-center'}>
            <p class={'text-sm font-bold md:text-base ' + underline()}>{props.slot.title}</p>
            <Show when={props.showTime && !SlotUtils.isLive(props.slot, useNow())}>
              <p class={'font-mono text-xs md:text-sm'}>
                {nextStream().toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)}
              </p>
            </Show>
            <Show when={props.showCountdown && !SlotUtils.isLive(props.slot, useNow()) && !isOver()}>
              <p class={'text-xs md:text-sm'}>
                Starts in <span class={'font-mono'}>{countdown().toFormat('hh:mm:ss')}</span>
              </p>
            </Show>
          </div>
          <div class={'flex w-full flex-row justify-around'}>
            <Show when={slot.showTwitchIcon} fallback={<div />}>
              <BiLogosTwitch size={18} />
            </Show>
            <Show when={slot.showHighlightIcon} fallback={<div />}>
              <BsHeart size={18} />
            </Show>
            <Show when={slot.showYoutubeIcon} fallback={<div />}>
              <BiLogosYoutube size={18} />
            </Show>
          </div>
        </div>
      </div>
      <SlotDialog slot={slot} modalSignal={modalSignal} />
    </>
  )
}

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

  const creators = useCreatorDB().readSome(slot.relations.creators)

  const ids = () => {
    if (!creators.data) {
      return []
    }
    const cs = creators.data
    if (cs.length == 0) {
      return []
    }
    if (cs.every(c => c.creator.relations.twitchChannels.length == 0)) {
      return []
    }
    return cs
      .map(c => c.creator.relations.twitchChannels)
      .reduce((a, b) => a.concat(b))
      .sort()
  }

  const showTwitchChannel = () => {
    const twitchIds1 = slot.relations.twitchChannels
    const twitchIds2 = ids()

    if (twitchIds1.length !== twitchIds2.length) {
      return true
    }
    return !(twitchIds1.every(id => twitchIds2.includes(id)) && twitchIds2.every(id => twitchIds1.includes(id)))
  }

  const background = () => {
    return _parseColor(slot.style.background ?? slot.style.linearGradient?.colors[0] ?? 'ffff0000')
  }

  function textColor() {
    return getTailwindTextColor(background())
  }

  function _parseColor(c: string): string {
    return '#' + c.substring(2) //  + c.substring(0, 2)
  }

  const liveChannel = useTwitchDB().readSome(slot.relations.twitchChannels)

  const relatedTwitchChannel = createMemo(() => {
    if (!showTwitchChannel()) {
      return {
        data: [],
        loading: false,
        error: null,
      }
    }
    return useTwitchDB().readSome(ids().filter(id => !slot.relations.twitchChannels.includes(id)))
  })

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
        <h3 class={'text-2xl'}>{slot.title}</h3>
        <div class={'flex-1'}></div>
        <div class={'w-[24px]'}></div>
      </div>
      <div class={'flex w-full flex-1 flex-col overflow-auto p-4'}>
        <p class={'text-xl'}>{slot.subtitle}</p>
        <p class={'text-xl'}>{SlotUtils.nextStream(slot).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</p>
        <p class={'text-xl'}>{SlotUtils.nextStream(slot).toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)}</p>
        <Show when={slot.markdownDesc}>
          <SolidMarkdown class={'md'} children={slot.markdownDesc} />
        </Show>
        <hr class={'border-solid border-black'} />
        <Show when={slot.relations.twitchChannels.length > 0}>
          <p class={'text-2xl'}>Twitch Channel</p>
          <div class={'grid grid-cols-3 gap-1'}>
            <Switch>
              <Match when={liveChannel.data}>
                <For each={liveChannel.data}>{channel => <TwitchTile data={channel} />}</For>
              </Match>
            </Switch>
          </div>
        </Show>
        <Show when={ids().length > 0 && showTwitchChannel()}>
          <p class={'text-2xl'}>Related Channel</p>
          <RelatedChannel data={relatedTwitchChannel()} />
        </Show>
      </div>
    </div>
  )
}

interface RelatedChannelProps {
  data: RemoteData<TwitchChannelData[]>
}

const RelatedChannel: Component<RelatedChannelProps> = props => {
  return (
    <Show when={props.data}>
      <div class={'grid grid-cols-3 gap-1'}>
        <Switch>
          <Match when={props.data.data}>
            <For each={props.data.data}>{channel => <TwitchTile data={channel} />}</For>
          </Match>
        </Switch>
      </div>
    </Show>
  )
}

interface TwitchIconsProps {
  slot: Slot
}

const TwitchIcons: Component<TwitchIconsProps> = props => {
  const { slot } = props
  const ids = () => slot.relations.creators
  const showPlus = () => {
    return ids().length > 4
  }
  const visibleIds = () => {
    if (showPlus()) {
      return ids().slice(0, 3)
    }
    return ids()
  }
  const creators = createMemo(() => useCreatorDB().readSome(visibleIds()))

  return (
    <Switch>
      <Match when={creators().data}>
        <div class={'row flex flex items-center justify-center -space-x-2 p-1 transition-all group-hover:space-x-1'}>
          <For
            each={[...creators().data].sort((a, b) =>
              a.creator.name.toLowerCase().localeCompare(b.creator.name.toLowerCase()),
            )}
          >
            {creator => (
              <img
                alt={creator.creator.name}
                class={'h-6 w-6 rounded-full border-[1px] text-xs'}
                src={creator.style.images.small.profileUrl}
              />
            )}
          </For>
          <Show when={showPlus()}>
            <div class={'bg-accent h-6 w-6 rounded-full border-[1px] group-hover:hidden'}>+{ids().length - 3}</div>
          </Show>
        </div>
      </Match>
    </Switch>
  )
}
