import {Component} from "solid-js";
import {DateTime} from "luxon";
import {YoutubeChannelData} from "@ycapp/model";

interface YoutubeChannelCardProps {
  data: YoutubeChannelData;
}

export const YoutubeChannelCard: Component<YoutubeChannelCardProps> = (props) => {
  const {channel, video} = props.data;

  return (
    <a
      class="flex bg-youtube hover:brightness-105 hover:scale-101 transition-all text-white rounded-2xl p-2 aspect-[8/1] w-full my-auto"
      href={`https://www.youtube.com/watch?v=${video.id}`}>
      <img
        class="h-full rounded-full mx-auto"
        src={channel.snippet.thumbnails.default.url} alt=""
      />
      <div class=" w-full my-auto ml-2">
        <div class=" font-medium">
          {channel.snippet.title}
        </div>
        <div class=" text-sm">
          {video.snippet.title}
        </div>
        <div class=" text-sm">
          Published {DateTime.fromISO(video.snippet.publishedAt).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
        </div>
      </div>
    </a>
  );
}
