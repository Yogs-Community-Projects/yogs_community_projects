import { createModalSignal, getTextColor, ModalSignal, useNewsDB, useNow } from '@ycapp/common'
import { News, newsToSlot } from '@ycapp/model'
import { Accessor, Component, createSignal, For, Match, onCleanup, Show, Switch } from 'solid-js'
import { DateTime } from 'luxon'
import { SlotDialog } from '../schedule/SlotCard'

interface NewsWrapper {
  news: News
  signal: ModalSignal
}

export const NewsComponent: Component = () => {
  const useScheduleNewsTop = useNewsDB().read(['TwitchExtensionCommunityFundraiser'])

  const [currentNews, setCurrentNews] = createSignal(0)

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
              <div class={'p-2'}>
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
  const countdown = () => countdownDate().diff(useNow())
  const hasSubtitle = () => news().news.subtitle && news().news.subtitle.length > 0
  return (
    <div
      onclick={news().signal.toggle}
      style={{
        background: background(),
        'border-color': border(),
        color: textColor(),
      }}
      class={
        'hover:scale-102 hover:brightness-102 group flex h-24 w-full flex-col items-center justify-center rounded-2xl border-2 p-2 text-center transition-all hover:cursor-pointer md:aspect-[6]'
      }
    >
      <p class={'text-xl'}>{news().news.title}</p>
      <Show when={showCountDown()}>
        <p class={'text-xs md:text-sm'}>
          <Show when={hasSubtitle()}>
            <span class={'block group-hover:hidden'}>
              {countdownDate().toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
            </span>
            <span class={'hidden group-hover:block'}>{news().news.subtitle}</span>
          </Show>
          <Show when={!hasSubtitle()}>
            <span class={'block group-hover:hidden'}>
              {countdownDate().toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
            </span>
          </Show>
        </p>
        <Show when={countdown().as('hours') >= 24}>
          <p class={'text-xs md:text-sm'}>
            <span class={'font-mono'}>{countdown().toFormat("d 'days' hh:mm:ss")}</span>
          </p>
        </Show>
        <Show when={countdown().as('hours') < 24}>
          <p class={'text-xs md:text-sm'}>
            <span class={'font-mono'}>{countdown().toFormat('hh:mm:ss')}</span>
          </p>
        </Show>
      </Show>
      <Show when={!showCountDown() && hasSubtitle()}>
        <p class={'text-xs md:text-sm'}>
          <span>{news().news.subtitle}</span>
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
