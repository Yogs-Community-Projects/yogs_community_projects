import {Component} from "solid-js";
import {DateTime} from "luxon";
import {Podcast} from "@ycapp/model";

interface PodcastCardProps {
  data: Podcast;
}

export const PodcastCard: Component<PodcastCardProps> = (props) => {
  const {episode, name, url, imageUrl} = props.data;

  return (
    <a
      class="flex bg-pickaxe-grey-primary hover:brightness-105 hover:scale-101 transition-all text-white rounded-2xl p-2 aspect-[8/1] w-full my-auto"
      href={url}>
      <img
        class="h-full rounded-full mx-auto"
        src={imageUrl} alt=""
      />
      <div class=" w-full my-auto ml-2">
        <div class=" font-medium">
          {name}
        </div>
        <div class=" text-sm">
          {episode.title}
        </div>
        <div class=" text-sm">
          Published {DateTime.fromISO(episode.pubDate).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
        </div>
      </div>
    </a>
  );
}
