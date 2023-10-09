import { createModalSignal, getTextColor, ModalSignal, useNewsDB, useNow } from '@ycapp/common'
import { News, newsToSlot } from '@ycapp/model'
import { Accessor, Component, createEffect, createSignal, For, Match, onCleanup, Show, Switch } from 'solid-js'
import { DateTime } from 'luxon'
import { SlotDialog } from './schedule/SlotDialog'
import { twMerge } from 'tailwind-merge'

interface NewsWrapper {
  news: News
  signal: ModalSignal
}

export const ScheduleNewsTop: Component = () => {
  const useScheduleNewsTop = useNewsDB().read(['ScheduleWebTop'])

  const [currentNews, setCurrentNews] = createSignal(0)

  createEffect(() => {
    console.log(useScheduleNewsTop.data)
  })
  const newsList = (): NewsWrapper[] => {
    if (!useScheduleNewsTop.data) {
      return []
    }

    return useScheduleNewsTop.data.map(news => {
      return {
        news,
        signal: createModalSignal(),
      }
    })
  }
  const interval = setInterval(() => {
    setCurrentNews(i => (i + 1) % newsList().length)
  }, 10000)

  onCleanup(() => {
    clearInterval(interval)
  })

  return (
    <Switch>
      <Match when={useScheduleNewsTop.data}>
        <For each={newsList()}>
          {(news, i) => {
            const slot = () => newsToSlot(news.news)
            return (
              <div class={'p-1'}>
                <Show when={currentNews() == i()}>
                  <NewsTile news={() => news} />
                </Show>
                <Show when={slot()}>
                  <SlotDialog slot={slot()} modalSignal={news.signal} />
                </Show>
              </div>
            )
          }}
        </For>
      </Match>
    </Switch>
  )
}

/*

    <Switch>
      <Match when={useScheduleNewsTop().data}>
        <Show when={useScheduleNewsTop().data.length > 0}>
          <div class={'p-4'}>
            <Slider options={{ loop: true }}>
              <div>Slide 1</div>
              <div>Slide 2</div>
              <div>Slide 3</div>
            </Slider>
          </div>
        </Show>
      </Match>
    </Switch>
 */

interface NewsTileProps {
  news: Accessor<NewsWrapper>
}

const NewsTile: Component<NewsTileProps> = props => {
  const { news } = props

  const textColor = () => {
    return getTextColor(background())
  }

  const background = () => '#' + news().news.style?.background?.substring(2) ?? 'ff0000'
  const border = () => '#' + news().news.style?.border?.substring(2) ?? 'ff0000'
  const showCountDown = () => {
    if (news().news.countdown != undefined) {
      return countdown().as('seconds') > 0
    }
    return false
  }
  const countdownDate = () => DateTime.fromMillis(news().news.countdown)
  const hasSubtitle = () => {
    return news().news.subtitle && news().news.subtitle !== ''
  }

  const countdown = () => countdownDate().diff(useNow())
  if (news().news.type === 'Link' && news().news.url) {
    return (
      <a
        href={news().news.url}
        target={'_blank'}
        style={{
          background: background(),
          'border-color': border(),
          color: textColor(),
        }}
        class={
          'hover:scale-102 hover:brightness-102 group flex h-24 w-full flex-col items-center justify-center rounded-2xl border-2 p-2 no-underline transition-all hover:cursor-pointer md:aspect-[6]'
        }
      >
        <p class={'text-xl'}>{news().news.title}</p>
        <Show when={hasSubtitle()}>
          <p class={twMerge('text-md', showCountDown() ? 'group-hover:hidden' : '')}>{news().news.subtitle}</p>
        </Show>
        <Show when={showCountDown()}>
          <p class={twMerge('text-xs md:text-sm', hasSubtitle() ? 'hidden group-hover:block' : '')}>
            <span>{countdownDate().toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</span>,{' '}
            <span class={'font-mono'}>{countdown().toFormat('hh:mm:ss')}</span>
          </p>
        </Show>
      </a>
    )
  }
  return (
    <div
      onclick={news().signal.toggle}
      style={{
        background: background(),
        'border-color': border(),
        color: textColor(),
      }}
      class={
        'hover:scale-102 hover:brightness-102 group flex h-24 w-full flex-col items-center justify-center rounded-2xl border-2 p-2 no-underline transition-all hover:cursor-pointer md:aspect-[6]'
      }
    >
      <p class={'text-xl'}>{news().news.title}</p>
      <Show when={hasSubtitle()}>
        <p class={'text-md group-hover:hidden'}>{news().news.subtitle}</p>
      </Show>
      <Show when={showCountDown()}>
        <p class={twMerge('text-xs md:text-sm', hasSubtitle() ? 'hidden group-hover:block' : '')}>
          <span>{countdownDate().toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</span>,{' '}
          <span class={'font-mono'}>{countdown().toFormat('hh:mm:ss')}</span>
        </p>
      </Show>
    </div>
  )
}

interface NewsDialogsProps {
  newsList: NewsWrapper[]
}

const NewsDialogs: Component<NewsDialogsProps> = props => {
  return (
    <For each={props.newsList}>
      {newsWrapper => {
        const slot = () => newsToSlot(newsWrapper.news)
        return (
          <>
            <p>{newsWrapper.news.title}</p>
            <p>{JSON.stringify(slot())}</p>
            <Show when={slot()}>
              <SlotDialog slot={slot()} modalSignal={newsWrapper.signal} />
            </Show>
          </>
        )
      }}
    </For>
  )
}
