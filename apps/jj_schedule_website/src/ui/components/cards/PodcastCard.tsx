import { Component } from 'solid-js'
import { DateTime } from 'luxon'
import { Podcast } from '@ycapp/model'

interface PodcastCardProps {
  data: Podcast
}

export const PodcastCard: Component<PodcastCardProps> = props => {
  const { episode, name, url, imageUrl } = props.data

  return (
    <a
      class="bg-pickaxe-grey-primary hover:scale-101 my-auto flex aspect-[8/1] w-full rounded-2xl p-2 text-white transition-all hover:brightness-105"
      href={url}
    >
      <img class="mx-auto h-full rounded-full" src={imageUrl} alt="" loading={'lazy'} />
      <div class=" my-auto ml-2 w-full">
        <div class=" font-medium">{name}</div>
        <div class=" text-sm">{episode.title}</div>
        <div class=" text-sm">
          Published {DateTime.fromISO(episode.pubDate).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
        </div>
      </div>
    </a>
  )
}
