import { Relations } from './Relations'
import { DateTime, Duration } from 'luxon'

export interface ScheduleData {
  id: string
  schedule: Schedule
  style: Style2
  settings: Settings
  relations: Relations
  name: string
  urlName: string
  visible: boolean
  updatedAt: string
}

export interface Schedule {
  weeks: Week[]
  times: Time[]
}

export interface Week {
  days: Day[]
  times: Time[]
}

export interface Day {
  dayOfWeek: number
  start: string
  slots: Slot[]
}

export interface Slot {
  id: string
  start: string
  duration: number
  title: string
  subtitle: string
  desc?: string
  markdownDesc?: string
  relations: Relations
  style: Style
  visible: boolean
  gridTileSize: number
  type: string
  streamType: string
  showYoutubeIcon: boolean
  showTwitchIcon: boolean
  showHighlightIcon: boolean
}

export interface Style {
  linearGradient?: LinearGradient
  background?: string
  border?: string
  elevation?: number
  borderRadius?: number
  spacing?: number
  gridSize?: number
}

export interface LinearGradient {
  colors: string[]
  begin: Begin
  end: End
}

export interface Begin {
  x: number
  y: number
}

export interface End {
  x: number
  y: number
}

export interface Time {
  start: string
  duration: number
}

export interface Style2 {
  slotStyle: SlotStyle
  timeStyle: TimeStyle
  gridStyle: GridStyle
}

export interface SlotStyle {
  background: string
  border: string
  elevation: number
  borderRadius: number
  spacing: number
}

export interface TimeStyle {
  size: number
  borderWidth: number
  spacing: number
  elevation: number
  borderRadius: number
}

export interface GridStyle {
  dataSize: number
}

export interface Settings {
  type: string
  appearance: string
  firstDayOfTheWeek: number
  showSlotTimes: boolean
  showEmptyDays: boolean
  startDate: string
}

export class SlotUtils {
  static duration(slot: Slot) {
    return Duration.fromDurationLike({ second: slot.duration })
  }

  static start(slot: Slot) {
    return DateTime.fromISO(slot.start)
  }

  static sortByNextStream(a: Slot, b: Slot, now?: DateTime) {
    if (SlotUtils.isLive(a, now) && !SlotUtils.isLive(b, now)) {
      return -1
    }
    if (SlotUtils.isLive(b, now) && !SlotUtils.isLive(a, now)) {
      return 1
    }

    const startA = SlotUtils.nextStream(a, now)
    const startB = SlotUtils.nextStream(b, now)
    return startA.diff(startB).as('second')
  }

  static nextStream(slot: Slot, now?: DateTime) {
    if (!now) {
      now = DateTime.now()
    }
    const start = SlotUtils.start(slot)
    const duration = SlotUtils.duration(slot)

    const add = start.diff(now).as('day') % 7
    switch (slot.type) {
      case 'weekly':
        const targetDay1 = now.plus(Duration.fromDurationLike({ day: add }))
        let nextWeek1 = DateTime.fromObject({
          year: targetDay1.year,
          month: targetDay1.month,
          day: targetDay1.day,
          hour: start.hour,
          minute: start.minute,
        })
        if (now > nextWeek1.plus(duration)) {
          nextWeek1 = nextWeek1.plus(
            Duration.fromDurationLike({
              day: 7,
            }),
          )
        }
        return nextWeek1
      case 'biweekly':
        const targetDay2 = now.plus(Duration.fromDurationLike({ days: add }))
        let nextWeek2 = DateTime.fromObject({
          year: targetDay2.year,
          month: targetDay2.month,
          day: targetDay2.day,
          hour: start.hour,
          minute: start.minute,
        })
        const mod = nextWeek2.diff(start).as('days') % 14
        if (mod != 0) {
          nextWeek2 = nextWeek2.plus(
            Duration.fromDurationLike({
              day: 7,
            }),
          )
        }
        if (now > nextWeek2.plus(duration)) {
          nextWeek2 = nextWeek2.plus(
            Duration.fromDurationLike({
              day: 14,
            }),
          )
        }
        return nextWeek2
      case 'special':
        return start
      default:
        return start
    }
  }

  static nextStreamEnd(slot: Slot, now?: DateTime) {
    return SlotUtils.nextStream(slot, now).plus(SlotUtils.duration(slot))
  }

  static isLive(slot: Slot, now?: DateTime) {
    if (!now) {
      now = DateTime.now()
    }
    const start = SlotUtils.nextStream(slot, now)
    const end = SlotUtils.nextStreamEnd(slot, now)
    return now > start && now < end
  }

  static isOver(slot: Slot, now?: DateTime) {
    now ??= DateTime.now()
    if (slot.type == 'special') {
      return now > SlotUtils.start(slot).plus(SlotUtils.duration(slot))
    }
    return now > SlotUtils.nextStream(slot, now).plus(SlotUtils.duration(slot))
  }

  static isBefore(slot: Slot, now?: DateTime) {
    now ??= DateTime.now()
    if (slot.type == 'special') {
      return now < SlotUtils.start(slot).plus(SlotUtils.duration(slot))
    }
    return now < SlotUtils.nextStream(slot, now).plus(SlotUtils.duration(slot))
  }
}
