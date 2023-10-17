import { DateTime } from 'luxon'
import { useDatetimeLondonNow, useNow } from './now_signal'

const london = 'Europe/London'

export const useNextJJStartDate = (init?: DateTime) => {
  const now = useDatetimeLondonNow(init)
  const isAfterJJEnd = useIsAfterJJEnd(init)
  return () => {
    if (!isAfterJJEnd()) {
      return DateTime.fromObject(
        {
          year: now().year,
          month: 12,
          day: 1,
          hour: 17,
        },
        {
          zone: london,
        },
      )
    }
    return DateTime.fromObject(
      {
        year: now().year + 1,
        month: 12,
        day: 1,
        hour: 17,
      },
      {
        zone: london,
      },
    )
  }
}

export const useNextJJEndDate = (init?: DateTime) => {
  const now = useDatetimeLondonNow(init)
  return () => {
    return DateTime.fromObject(
      {
        year: now().year,
        month: 12,
        day: 15,
        hour: 0,
        minute: 0,
        second: 0,
      },
      {
        zone: london,
      },
    )
  }
}
export const useIsAfterJJEnd = (init?: DateTime) => {
  const now = useDatetimeLondonNow(init)
  const nextJJEndDate = useNextJJEndDate(init)

  return () => {
    return nextJJEndDate() < now()
  }
}

export const useIsBeforeJJ = (init?: DateTime) => {
  const nextJJStartDate = useNextJJStartDate(init)
  const now = useDatetimeLondonNow(init)
  return () => {
    return nextJJStartDate() > now()
  }
}

export const useIsJJ = (init?: DateTime) => {
  const isAfter = useIsAfterJJEnd(init)
  const isBefore = useIsBeforeJJ(init)
  return () => {
    return !isBefore() && !isAfter()
  }
}

export const useJJStartCountdown = (init?: DateTime) => {
  const jjStartDate = useNextJJStartDate(init)
  const now = useNow(init)
  return () => {
    return jjStartDate().diff(now())
  }
}
