import {TwitchChannelData} from "@ycapp/model";
import {Component, createContext, Match, ParentComponent, Switch, useContext} from "solid-js";
import {DateTime} from "luxon";


const TwitchChannelDataContext = createContext<TwitchChannelData>();

interface TwitchChannelDataProps {
  data: TwitchChannelData

}

const TwitchChannelDataProvider: ParentComponent<TwitchChannelDataProps> = (props) => {
  return (
    <TwitchChannelDataContext.Provider value={props.data}>
      {props.children}
    </TwitchChannelDataContext.Provider>
  );
}
const useTwitchChannelData = () => useContext(TwitchChannelDataContext)!;

interface TwitchCardProps {
  data: TwitchChannelData
}

export const TwitchCard: Component<TwitchCardProps> = (props) => {
  return (
    <TwitchChannelDataProvider data={props.data}>
      <TwitchChannelCardBody/>
    </TwitchChannelDataProvider>
  );
}


const TwitchChannelCardBody: Component = () => {
  const {stream} = useTwitchChannelData();
  const isLive = () => stream !== undefined;
  return (
    <Switch>
      <Match when={!isLive()}>
        <LastStreamCard/>
      </Match>
      <Match when={isLive()}>
        <StreamCard/>
      </Match>
    </Switch>
  );
}

const LastStreamCard: Component = () => {
  const {channel, lastStream} = useTwitchChannelData()
  return (
    <a
      class="flex bg-twitch hover:brightness-105 hover:scale-101 transition-all text-white rounded-2xl p-2 aspect-[8/1] w-full my-auto"
      href={`https://www.twitch.tv/${channel.login}`}
    >
      <img
        class="h-full aspect-square rounded-full mx-auto"
        src={channel.profile_image_url.replace('300x300', '70x70')} alt=""
      />
      <div class="w-full my-auto ml-2">
        <div class="font-medium text-lg">
          {channel.display_name}
        </div>
        <div class="text-sm">
          Last Live {DateTime.fromISO(lastStream!.endedAt).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
        </div>
      </div>
    </a>

  );
}

const StreamCard: Component = () => {
  const {channel, stream} = useTwitchChannelData()
  return (
    <a
      class="flex bg-twitch hover:brightness-105 hover:scale-101 transition-all text-white rounded-2xl p-2 aspect-[8/1] w-full my-auto"
      href={`https://www.twitch.tv/${channel.login}`}
    >
      <img
        class="h-full rounded-full mx-auto"
        src={channel.profile_image_url.replace('300x300', '70x70')} alt=""
      />
      <div class=" w-full my-auto ml-2">
        <div class=" font-medium">
          {channel.display_name}
        </div>
        <div class=" text-sm">
          {stream!.stream.title}
        </div>
        <div class=" text-sm">
          Live since {DateTime.fromISO(stream!.stream.started_at).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
        </div>
      </div>
    </a>
  );
}
