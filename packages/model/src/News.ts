import { Slot } from './Schedule'
import { DateTime, Duration } from 'luxon'

export interface News {
  twitchChannel: string[]
  creators: string[]
  countdown: number | undefined
  display: string[]
  type: 'Link' | 'TwitchStream,'
  show: boolean
  id: string
  title: string
  subtitle: string
  style: NewsStyle
}

export interface NewsStyle {
  border: string
  background: string
}

export function newsToSlot(news: News): Slot | undefined {
  if (news.type == 'Link') {
    return undefined
  }
  return <Slot>{
    title: news.title,
    start: DateTime.fromMillis(news.countdown).toISO(),
    type: 'special',
    duration: Duration.fromObject({ hour: 3 }).as('seconds'),
    subtitle: news.subtitle,
    style: {
      background: news.style.background,
      border: news.style.border,
    },
    relations: {
      creators: news.creators,
      twitchChannels: news.twitchChannel,
    },
  }
}
