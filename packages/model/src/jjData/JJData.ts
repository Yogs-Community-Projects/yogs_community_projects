export interface JJData {
  date: string
  avgConversionRate: number
  causes: Cause[]
  donations: Donations
  collections: Collections
  raised: Raised2
  event: Event
}

export interface Cause {
  id: number
  name: string
  logo: string
  description: string
  url: string
  raised: Raised
}

export interface Raised {
  yogscast: number
  fundraisers: number
}

export interface Donations {
  count: number
}

export interface Collections {
  redeemed: number
  total: number
}

export interface Raised2 {
  yogscast: number
  fundraisers: number
}

export interface Event {
  year: number
  start: string
  end: string
}
