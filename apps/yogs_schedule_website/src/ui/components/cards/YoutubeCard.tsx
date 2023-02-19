import { Component } from 'solid-js'
import { DateTime } from 'luxon'
import { YoutubeChannelData } from '@ycapp/model'

interface YoutubeChannelCardProps {
  data: YoutubeChannelData
}

export const YoutubeChannelCard: Component<YoutubeChannelCardProps> = props => {
  const { channel, video } = props.data

  return (
    <a
      class="bg-youtube hover:scale-101 my-auto flex aspect-[8/1] w-full rounded-2xl p-2 text-white transition-all hover:brightness-105"
      href={`https://www.youtube.com/watch?v=${video.id}`}
    >
      <img class="mx-auto h-16 w-16 rounded-full" src={channel.snippet.thumbnails.default.url} alt="" />
      <div class=" my-auto ml-2 w-full">
        <div class=" font-medium">{channel.snippet.title}</div>
        <div class=" text-sm">{video.snippet.title}</div>
        <div class=" text-sm">
          Published {DateTime.fromISO(video.snippet.publishedAt).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
        </div>
      </div>
    </a>
  )
}
