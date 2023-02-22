import { Slot, SlotUtils, TwitchChannelData } from '@ycapp/model'
import { Component, JSX, Show } from 'solid-js'
import { BiLogosTwitch, BiLogosYoutube } from 'solid-icons/bi'
import { createModalSignal, getTextColor, isColorLight, useNow } from '@ycapp/common'
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

  return (
    <>
      <div class={'h-full w-full transition-all'}>
        <div
          style={{
            ...background(),
          }}
          class={
            'hover:scale-102 schedule-card flex cursor-pointer flex-col justify-center rounded-2xl border-2 border-transparent p-1 text-center transition-all hover:brightness-105 ' +
            border()
          }
          onclick={modalSignal.toggle}
        >
          <div class={'flex h-full w-full flex-col justify-center text-center'}>
            <p class={'text-sm font-bold md:text-base ' + underline()}>{props.slot.title}</p>
            <Show when={props.showTime && !SlotUtils.isLive(props.slot, useNow())}>
              <p class={'font-mono text-xs md:text-sm'}>
                {nextStream().toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)}
              </p>
            </Show>
            <Show when={props.showCountdown && !SlotUtils.isLive(props.slot, useNow())}>
              <p class={'text-xs md:text-sm'}>
                Starts in <span class={'font-mono'}>{countdown().toFormat('hh:mm:ss')}</span>
              </p>
            </Show>
          </div>
          <div class={'flex w-full flex-row justify-around'}>
            <Show when={slot.relations.twitchChannels.length > 0}>
              <BiLogosTwitch size={18} />
            </Show>
            <Show when={slot.relations.youtubeChannels.length > 0}>
              <BiLogosYoutube size={18} />
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
    const started_at = props.channel?.stream?.stream.started_at
    if (!started_at) {
      return undefined
    }
    return useNow().diff(DateTime.fromISO(started_at))
  }
  return (
    <div class={'h-full w-full transition-all'}>
      <a
        href={`https://twitch.tv/${props.channel.channel.login}`}
        class={
          'bg-twitch-500 hover:scale-102 schedule-card flex cursor-pointer flex-row items-center justify-center rounded-2xl p-1 p-1 text-center text-white no-underline transition-all hover:text-white hover:brightness-105 md:flex-col'
        }
      >
        <img
          class="border-twitch-300 mx-auto h-10 w-10 rounded-full border-2 md:h-12 md:w-12"
          src={props.channel.channel.profile_image_url.replace('300x300', '70x70')}
          alt=""
        />
        <div class={'flex grow flex-col'}>
          <p class={'text-base md:text-lg'}>{props.channel.channel.display_name}</p>
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
