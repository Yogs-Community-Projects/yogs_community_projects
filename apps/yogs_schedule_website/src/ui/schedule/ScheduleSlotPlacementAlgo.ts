import { Slot, Time, TimeOfDay } from '@ycapp/model'
import { DateTime, Duration } from 'luxon'

export class PlacementAlgo {
  slots: Slot[]
  times: Time[]
  relatedMap: Map<number, Set<number>>
  possibilitiesMap: Map<number, Set<number>>
  relatedIds: Set<number>
  ids: Set<number>
  map: Map<number, Event>

  constructor(slots: Slot[], times: Time[]) {
    this.slots = slots.filter(s => s.visible)
    this.times = times
    this.ids = new Set()
    this.map = new Map()
    for (let i = 0; i < this.slots.length; i++) {
      this.ids.add(i)
      const slot = this.slots[i]
      const event = Event.fromSlot(i, slot)
      this.map.set(i, event)
    }
    this.initMaps()
    this.initRelatedMap()
  }

  private initMaps() {
    const ids = this.ids

    function initMap() {
      const map = new Map<number, Set<number>>()
      for (const id of ids) {
        map.set(id, new Set())
      }
      return map
    }

    this.relatedMap = initMap()
  }

  private initRelatedMap() {
    for (const id1 of this.ids) {
      for (const id2 of this.ids) {
        if (id1 != id2) {
          const p1 = this.map.get(id1)
          const p2 = this.map.get(id2)
          if (!p1.overlaps(p2)) {
            const c1 = new Set(p1.slot.relations.creators)
            const c2 = new Set(p2.slot.relations.creators)
            const t1 = new Set(p1.slot.relations.twitchChannels)
            const t2 = new Set(p2.slot.relations.twitchChannels)
            if (intersection(c1, c2).size > 0 || intersection(t1, t2).size > 0) {
              this.relatedMap.get(id1).add(id2)
              this.relatedMap.get(id2).add(id1)
              // console.log('related', p1.title, p2.title);
            }
          }
        }
      }
    }
  }

  lanes() {
    /*
    1. Related channel in the same lane
    2. Avoid gaps
     */

    const relatedMap = this.relatedMap
    const ids = this.ids

    function hasRelated(id: number) {
      return relatedMap.get(id).size > 0
    }

    const overlapEdges = new Map<number, Set<number>>()
    const noOverlapEdges = new Map<number, Set<number>>()

    for (const id of ids) {
      overlapEdges.set(id, new Set<number>())
      noOverlapEdges.set(id, new Set<number>())
    }

    for (const id1 of ids) {
      for (const id2 of this.ids) {
        if (id1 != id2) {
          const e1 = this.map.get(id1)
          const e2 = this.map.get(id2)
          const noOverlap = e1.end <= e2.start || e1.start >= e2.end
          // console.log('test', e1.title, e2.title, noOverlap);
          if (noOverlap) {
            noOverlapEdges.get(id1).add(id2)
            noOverlapEdges.get(id2).add(id1)
            // console.log('noOverlap', e1.title, e2.title);
          } else {
            overlapEdges.get(id1).add(id2)
            overlapEdges.get(id2).add(id1)
            // console.log('overlapEdges', e1.title, e2.title);
          }
        }
      }
    }

    function toVisitSort(id1: number, id2: number) {
      if (hasRelated(id1) && hasRelated(id2)) {
        return overlapEdges.get(id2).size - overlapEdges.get(id1).size
      }
      if (hasRelated(id1)) {
        return -1
      }
      if (hasRelated(id2)) {
        return 1
      }
      return overlapEdges.get(id2).size - overlapEdges.get(id1).size
    }

    const toVisit: number[] = [...ids].sort(toVisitSort)

    const lanes: Lane[] = []
    while (toVisit.length > 0) {
      const id = toVisit.shift()
      const event = this.map.get(id)
      const related = [...relatedMap.get(id)]
      if (lanes.length == 0) {
        const lane = new Lane()
        lane.add(event)
        lanes.push(lane)
      } else {
        const possibleLanes = lanes
          .map((_, i) => i)
          .filter(laneId => {
            const lane = lanes[laneId]
            return !lane.overlaps(event)
          })
        const relatedLanes = possibleLanes.filter(laneId => {
          const lane = lanes[laneId]
          const laneEventIds = lane.ids
          return laneEventIds.some(e => related.includes(e))
        })
        const connectedLanes = possibleLanes.filter(laneId => {
          const lane = lanes[laneId]
          return lane.connects(event)
        })

        if (possibleLanes.length > 0) {
          if (relatedLanes.length > 0) {
            lanes[relatedLanes[0]].add(event)
          } else if (connectedLanes.length > 0) {
            lanes[connectedLanes[0]].add(event)
          } else {
            lanes[possibleLanes[0]].add(event)
          }
        } else {
          const lane = new Lane()
          lane.add(event)
          lanes.push(lane)
        }
      }
    }

    lanes.sort((a, b) => {
      return a.first.start - b.first.start
    })

    return lanes
  }

  printMap(s: string, map: Map<number, Set<number>>) {
    const pMap = new Map<string, Set<string>>()
    for (const id of this.ids) {
      const s = this.map.get(id)
      const l = map.get(id)
      pMap.set(s.slot.title, new Set([...l].map(i => this.map.get(i).slot.title)))
    }
  }
}

export class Event {
  id: number
  slot: Slot
  start: number
  end: number

  constructor(id: number, slot: Slot, start: number, end: number) {
    this.id = id
    this.slot = slot
    this.start = start
    this.end = end
  }

  static fromSlot(id: number, slot: Slot) {
    const slotStart = DateTime.fromISO(slot.start)
    const slotStartTime = TimeOfDay.fromDateTime(slotStart)
    const duration = Duration.fromDurationLike({ second: slot.duration })
    return new Event(id, slot, slotStartTime.minOfDay, slotStartTime.minOfDay + duration.as('minutes'))
  }

  get title() {
    return this.slot.title
  }

  overlaps(pos: Event) {
    return this.timeOverlaps(pos)
  }

  timeOverlaps(pos: Event) {
    return (
      isBetween(this.start, pos.start, pos.end) ||
      isBetween(this.end, pos.start, pos.end) ||
      isBetween(pos.start, this.start, this.end) ||
      isBetween(pos.end, this.start, this.end)
    )
  }

  exactTimeOverlaps(pos: Event) {
    return (
      isBetweenE(this.start, pos.start, pos.end) ||
      isBetweenE(this.end, pos.start, pos.end) ||
      isBetweenE(pos.start, this.start, this.end) ||
      isBetweenE(pos.end, this.start, this.end)
    )
  }
}

export class Lane {
  events: Event[] = []

  add(event: Event) {
    this.events.push(event)
  }

  overlaps(e2: Event) {
    if (this.events.length == 0) {
      return false
    }
    return this.events.some(e1 => {
      const noOverlap = e1.end <= e2.start || e1.start >= e2.end
      return !noOverlap
    })
  }

  connects(e1: Event) {
    if (this.overlaps(e1)) {
      return false
    }
    for (const e2 of this.events) {
      const connect = e1.end == e2.start || e1.start == e2.end
      if (connect) {
        return true
      }
    }
    return false
  }

  get ids() {
    return this.events.map(e => e.id)
  }

  get titles() {
    return this.events.map(e => e.title)
  }

  get first() {
    return this.events.reduce((a, b) => {
      if (a.start < b.start) {
        return a
      }
      return b
    })
  }

  get last() {
    return this.events.reduce((a, b) => {
      if (a.end > b.end) {
        return a
      }
      return b
    })
  }
}

const intersection = (a: Set<any>, b: Set<any>) => new Set<any>([...a].filter(x => b.has(x)))

const union = (a: Set<any>, b: Set<any>) => new Set<any>([...a, ...b])

const union3 = (a: Set<any>, b: Set<any>, c: Set<any>) => new Set<any>([...a, ...b, ...c])

function isBetween(v: number, min: number, max: number) {
  return v > min && v < max
}

function isBetweenE(v: number, min: number, max: number) {
  return v >= min && v <= max
}
