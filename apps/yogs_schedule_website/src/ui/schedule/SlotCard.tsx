import { Slot, SlotUtils, TwitchChannelData } from '@ycapp/model'
import { Component, createMemo, For, JSX, Match, Show, Switch } from 'solid-js'
import { BiLogosTwitch, BiLogosYoutube } from 'solid-icons/bi'
import { createModalSignal, getTextColor, isColorLight, useCreatorDB, useNow, useWindowSize } from '@ycapp/common'
import { DateTime } from 'luxon'
import { SlotDialog } from '../components/schedule/SlotDialog'

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
          // 'border-color': defaultBorder()
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

  const defaultBorder = () => `${_parseColor(slot.style.border ?? 'ffff0000')}`
  const border = () => {
    if (isColorLight(_parseColor(slot.style.background ?? 'ffff0000'))) {
      return slot.streamType == 'twitch'
        ? `hover:border-twitch-700`
        : slot.streamType == 'youtube'
        ? `hover:border-youtube-700`
        : ''
    } else {
      return slot.streamType == 'twitch'
        ? `hover:border-twitch-300`
        : slot.streamType == 'youtube'
        ? `hover:border-youtube-300`
        : ''
    }
  }

  const modalSignal = createModalSignal()

  const size = useWindowSize()

  return (
    <>
      <div class={'h-full w-full transition-all'}>
        <div
          style={{
            ...background(),
          }}
          class={
            'hover:scale-102 schedule-card group flex cursor-pointer flex-col justify-center rounded-2xl border-2 border-transparent p-1 text-center transition-all hover:brightness-105 ' +
            border()
          }
          onclick={modalSignal.toggle}
        >
          <div class={'flex h-full w-full flex-col justify-center text-center'}>
            <p class={'text-sm font-bold md:text-base ' + underline()}>{props.slot.title}</p>
            <div class={'hidden transition-all group-hover:block'}>
              <p class={'line-clamp-1 text-xs md:text-sm'}>{props.slot.subtitle}</p>
            </div>
            <Show
              when={
                !(props.slot.subtitle == '' || !props.slot.subtitle) &&
                props.showTime &&
                !SlotUtils.isLive(props.slot, useNow())
              }
            >
              <p class={'block font-mono text-xs transition-all group-hover:hidden md:text-sm'}>
                {nextStream().toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)}
              </p>
            </Show>
            <Show
              when={
                (props.slot.subtitle == '' || !props.slot.subtitle) &&
                props.showTime &&
                !SlotUtils.isLive(props.slot, useNow())
              }
            >
              <p class={'font-mono text-xs transition-all md:text-sm'}>
                {nextStream().toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)}
              </p>
            </Show>
            <Show when={props.showCountdown && !SlotUtils.isLive(props.slot, useNow())}>
              <p class={'text-xs md:text-sm'}>
                Starts in <span class={'font-mono'}>{countdown().toFormat('hh:mm:ss')}</span>
              </p>
            </Show>
          </div>
          <Show when={size().width >= 768 && slot.relations.creators.length > 1}>
            <CreatorIcons slot={slot} />
          </Show>
          <div class={'flex w-full flex-row justify-around p-1'}>
            <Show when={slot.relations.twitchChannels.length > 0}>
              <BiLogosTwitch size={16} />
            </Show>
            <Show when={slot.relations.youtubeChannels.length > 0}>
              <BiLogosYoutube size={16} />
            </Show>
          </div>
        </div>
      </div>
      <SlotDialog slot={slot} modalSignal={modalSignal} />
    </>
  )
}

interface TwitchSlotCardProps {
  channel: TwitchChannelData
}

export const TwitchSlotCard: Component<TwitchSlotCardProps> = props => {
  const { channel } = props
  const liveSince = () => {
    const started_at = channel?.stream?.stream.started_at
    if (!started_at) {
      return undefined
    }
    return useNow().diff(DateTime.fromISO(started_at))
  }
  return (
    <div class={'h-full w-full'}>
      <a
        href={`https://twitch.tv/${channel.channel.login}`}
        class={
          'bg-twitch-500 hover:scale-102 schedule-card group flex h-full cursor-pointer flex-row items-center justify-center rounded-2xl p-1 p-1 text-center text-white no-underline transition-all hover:text-white hover:brightness-105 md:flex-col'
        }
      >
        <img
          class="border-twitch-300 mx-auto h-10 w-10 rounded-full border-2 md:h-14 md:w-14"
          src={channel.channel.profile_image_url.replace('300x300', '70x70')}
          alt=""
        />
        <div class={'flex grow flex-col md:grow-0'}>
          <p class={'text-sm font-bold md:text-base'}>{channel.channel.display_name}</p>
          <div class={'hidden transition-all group-hover:block'}>
            <p class={'line-clamp-1 text-xs'}>{channel.stream.stream.game_name}</p>
          </div>
          <Show when={liveSince()}>
            <p class={'text-xs md:text-sm'}>
              Live for <span class={'font-mono'}>{liveSince().toFormat('hh:mm:ss')}</span>
            </p>
          </Show>
        </div>
      </a>
    </div>
  )
}

export const TwitchSlotCard2: Component<TwitchSlotCardProps> = props => {
  const { channel } = props
  const liveSince = () => {
    const started_at = props.channel?.stream?.stream.started_at
    if (!started_at) {
      return undefined
    }
    return useNow().diff(DateTime.fromISO(started_at))
  }
  return (
    <a
      class="bg-twitch hover:scale-101 hover:brightness-102 my-auto block flex aspect-[8/1] w-full flex-row items-center rounded-2xl p-2 text-white no-underline transition-all hover:text-white"
      href={`https://www.twitch.tv/${channel.channel.login}`}
    >
      <img
        class="mx-auto h-12 w-12 rounded-full"
        src={channel.channel.profile_image_url.replace('300x300', '70x70')}
        alt=""
      />
      <div class="my-auto ml-2 flex-1">
        <div class="text-lg font-medium">{channel.channel.display_name}</div>
        <Show when={liveSince()}>
          <p class={'text-xs md:text-sm'}>
            Live for <span class={'font-mono'}>{liveSince().toFormat('hh:mm:ss')}</span>
          </p>
        </Show>
      </div>
    </a>
  )
}

interface CreatorIconsProps {
  slot: Slot
}

const CreatorIcons: Component<CreatorIconsProps> = props => {
  const { slot } = props
  const creators = createMemo(() => useCreatorDB().readSome(slot.relations.creators))
  return (
    <Switch>
      <Match when={creators().data}>
        <div class={'row flex flex items-center justify-center -space-x-3 p-1 transition-all group-hover:space-x-1'}>
          <For
            each={[...creators().data].sort((a, b) =>
              a.creator.name.toLowerCase().localeCompare(b.creator.name.toLowerCase()),
            )}
          >
            {creator => (
              <img
                alt={creator.creator.name}
                class={'h-8 w-8 rounded-full border-[1px]'}
                src={creator.style.images.small.profileUrl}
              />
            )}
          </For>
        </div>
      </Match>
    </Switch>
  )
}
