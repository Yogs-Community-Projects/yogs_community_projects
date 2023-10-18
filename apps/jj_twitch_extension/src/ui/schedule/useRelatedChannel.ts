import { RemoteData, useCreatorDB, useTwitchDB } from '@ycapp/common'
import { Slot, TwitchChannelData } from '@ycapp/model'
import { createStore } from 'solid-js/store'
import { batch, createEffect, createRoot } from 'solid-js'

export const useRelatedChannel = (slot: Slot) => {
  const twitchDB = useTwitchDB()
  const creatorDB = useCreatorDB()

  const [relatedTwitchChannel, setRelatedTwitchChannel] = createStore<RemoteData<TwitchChannelData[]>>({
    loading: true,
    data: null,
    error: null,
  })
  const creators = creatorDB.readSome(slot.relations.creators)
  const ids = () => {
    if (!creators.data) {
      return []
    }
    const cs = creators.data
    if (cs.length == 0) {
      return []
    }
    if (cs.every(c => c.creator.relations.twitchChannels.length == 0)) {
      return []
    }
    return cs.map(c => c.creator.relations.twitchChannels).reduce((a, b) => a.concat(b))
  }

  createEffect(() => {
    if (creators.data) {
      createRoot(() => {
        const twitch = twitchDB.readSome(ids())
        createEffect(() => {
          batch(() => {
            setRelatedTwitchChannel('data', twitch.data)
            setRelatedTwitchChannel('loading', twitch.loading)
            setRelatedTwitchChannel('error', twitch.error)
          })
        })
      })
    }
  })

  return relatedTwitchChannel
}
