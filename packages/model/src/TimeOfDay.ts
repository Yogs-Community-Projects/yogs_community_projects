import { DateTime, Duration } from 'luxon'
import { Time } from './Schedule'

export class TimeOfDay {
  static minutesPerHour = 60
  hour: number
  minute: number

  constructor(hour: number, minute: number) {
    this.hour = hour
    this.minute = minute
  }

  get minOfDay() {
    return this.minute + this.hour * TimeOfDay.minutesPerHour
  }

  static fromDateTime(dateTime: DateTime) {
    return new TimeOfDay(dateTime.hour, dateTime.minute)
  }

  static fromString(dateTime: string) {
    return TimeOfDay.fromDateTime(DateTime.fromISO(dateTime))
  }

  static fromScheduleTimeStart(time: Time) {
    return this.fromDateTime(DateTime.fromISO(time.start))
  }

  static fromScheduleTimeEnd(time: Time) {
    return this.fromDateTime(DateTime.fromISO(time.start).plus({ second: time.duration }))
  }

  isBefore(other: TimeOfDay) {
    return this.minOfDay < other.minOfDay
  }

  isAfter(other: TimeOfDay) {
    return this.minOfDay >= other.minOfDay
  }

  isBetween(a: TimeOfDay, b: TimeOfDay) {
    return this.isAfter(a) && this.isBefore(b)
  }

  difference(other: TimeOfDay) {
    return Duration.fromDurationLike({
      minute: this.minOfDay - other.minOfDay,
    })
  }

  durationTo(other: TimeOfDay) {
    const m = this.minOfDay
    const o = other.minOfDay
    if (o < m) {
      const d = 60 * 24 - (m - o)
      return Duration.fromDurationLike({ minutes: d })
    } else {
      const d = o - m
      return Duration.fromDurationLike({ minutes: d })
    }
  }
}
