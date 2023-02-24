import { Component, createMemo, ErrorBoundary, For, JSX, Match, Show, Switch } from 'solid-js'
import { getTextColor, RemoteData, useCreatorDB, usePodcastDB, useTwitchDB, useYoutubeDB } from '@ycapp/common'
import { Loading } from '../components/loading/Loading'
import { FaBrandsTwitch, FaBrandsYoutube, FaSolidPeopleGroup, FaSolidPodcast } from 'solid-icons/fa'
import { A, useParams } from '@solidjs/router'
import {
  CreatorDetailProvider,
  useAccent,
  useCreator,
  useCreatorRelations,
  useLinks,
  usePrimaryPallet,
  useStyle,
} from './CreatorDetailPageProvider'
import { CreatorLinkButton } from '../components/tiles/CreatorLinkButton'
import { CreatorData } from '@ycapp/model'
import { CreatorTile } from '../components/tiles/CreatorTile'
import { PodcastCard, TwitchOfflineCard, YoutubeChannelCard } from '@ycapp/commonui'
import { Title } from '@solidjs/meta'

const CreatorDetailPage: Component = () => {
  // const tiles = useCreatorRouteData();
  const params = useParams()
  const id = () => params.id

  const creator = createMemo(() => useCreatorDB().read(id()))

  return <CreatorDetailPageBody data={creator()} />
}

interface CreatorDetailPageBodyProps {
  data: RemoteData<CreatorData>
}

const CreatorDetailPageBody: Component<CreatorDetailPageBodyProps> = props => {
  return (
    <Switch>
      <Match when={props.data.data}>
        <CreatorDetailProvider creator={props.data.data}>
          <div class={'w-full p-2 md:p-0'}>
            <Title>{props.data.data.creator.name}</Title>
            <div class={'mx-auto flex flex-col items-center md:max-w-[500px]'}>
              <Header />
              <div class={'h-4'} />
              <LinksSection />
              <div class={'h-4'} />
              <ChannelsSection />
              <div class={'h-4'} />
              <ErrorBoundary fallback={<p></p>}>
                <RelatedCreatorsSection />
              </ErrorBoundary>
            </div>
          </div>
        </CreatorDetailProvider>
      </Match>
      <Match when={props.data.error}>
        <p>Error</p>
      </Match>
      <Match when={props.data.error}>
        <div class={'min-h-screen'}>
          <Loading />
        </div>
      </Match>
    </Switch>
  )
}

const Header: Component = () => {
  return (
    <div
      class={'mb-4 flex w-full flex-col items-center rounded-2xl p-2 shadow-xl hover:motion-safe:animate-pulse'}
      style={{
        background: `linear-gradient(105deg, ${usePrimaryPallet().shade300}, ${usePrimaryPallet().shade700})`,
      }}
    >
      <div class={'aspect-square h-[64px] lg:h-[94px]'}>
        <img
          class={'rounded-full border-2 hover:motion-safe:animate-pulse'}
          style={{
            'border-color': useAccent().toString({ format: 'hex' }),
          }}
          src={useStyle().images.large.profileUrl}
          alt={useCreator().creator.name + ' profile image'}
        />
      </div>
      <div class={'h-[30px] w-full flex-none text-center'}>
        <p
          class={'text-2xl'}
          style={{
            color: getTextColor(usePrimaryPallet().shade500),
          }}
        >
          {useCreator().creator.name}
        </p>
      </div>
    </div>
  )
}

const LinksSection: Component = props => {
  return (
    <div class={'grid w-full grid-cols-1 place-items-center gap-2 md:grid-cols-2'}>
      <For each={useLinks().links}>{link => <CreatorLinkButton link={link} />}</For>
    </div>
  )
}

const ChannelsSection: Component = () => {
  //const twitch = useTwitchDB().readSome(useCreator().relations.twitchChannels)
  // const youtube = useYoutubeDB().readSome(useCreator().relations.youtubeChannels)
  // const podcast = usePodcastDB().readSome(useCreator().relations.podcasts)
  return (
    <div class={'grid w-full grid-cols-1 gap-1 p-1'}>
      <Show when={useCreatorRelations().twitchChannels.length > 0}>
        <TwitchSection />
      </Show>
      <Show when={useCreatorRelations().youtubeChannels.length > 0}>
        <YoutubeSection />
      </Show>
      <Show when={useCreatorRelations().podcasts.length > 0}>
        <PodcastSection />
      </Show>
    </div>
  )
}
const TwitchSection: Component = () => {
  const twitch = useTwitchDB().readSome(useCreatorRelations().twitchChannels)
  return (
    <>
      <Switch>
        <Match when={twitch.loading}>
          <p>Loading</p>
        </Match>
        <Match when={twitch.error}>
          <p>Error: {JSON.stringify(twitch.error)}</p>
        </Match>
        <Match when={twitch.data}>
          <div class={'grid w-full grid-cols-1 gap-1 p-1'}>
            <SectionHeader icon={<FaBrandsTwitch />} header={'Twitch'} />
            <For each={twitch.data}>{channel => <TwitchOfflineCard data={channel} />}</For>
          </div>
        </Match>
      </Switch>
    </>
  )
}
const YoutubeSection: Component = () => {
  const youtube = useYoutubeDB().readSome(useCreatorRelations().youtubeChannels)
  return (
    <>
      <Switch>
        <Match when={youtube.loading}>
          <p>Loading</p>
        </Match>
        <Match when={youtube.error}>
          <p>Error: {JSON.stringify(youtube.error)}</p>
        </Match>
        <Match when={youtube.data}>
          <div class={'grid w-full grid-cols-1 gap-1 p-1'}>
            <SectionHeader icon={<FaBrandsYoutube />} header={'Youtube'} />
            <For each={youtube.data}>{channel => <YoutubeChannelCard data={channel} />}</For>
          </div>
        </Match>
      </Switch>
    </>
  )
}

const PodcastSection: Component = () => {
  const podcast = usePodcastDB().readSome(useCreatorRelations().podcasts)
  return (
    <>
      <Switch>
        <Match when={podcast.loading}>
          <p>Loading</p>
        </Match>
        <Match when={podcast.error}>
          <p>Error: {JSON.stringify(podcast.error)}</p>
        </Match>
        <Match when={podcast.data}>
          <div class={'grid w-full grid-cols-1 gap-1 p-1'}>
            <SectionHeader icon={<FaSolidPodcast />} header={'Podcast'} />
            <For each={podcast.data}>{channel => <PodcastCard data={channel} />}</For>
          </div>
        </Match>
      </Switch>
    </>
  )
}

const RelatedCreatorsSection: Component = () => {
  const creators = useCreatorDB().readSome(useCreatorRelations().creators)

  return (
    <>
      <Switch>
        <Match when={creators.loading}>
          <p>Loading</p>
        </Match>
        <Match when={creators.error}>
          <p>Error: {JSON.stringify(creators.error)}</p>
        </Match>
        <Match when={creators.data}>
          <div class={'grid w-full grid-cols-1 p-1'}>
            <SectionHeader icon={<FaSolidPeopleGroup />} header={'Related Creators'} />
            <div class={'grid h-full w-full grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] gap-1 md:gap-2'}>
              <For
                each={creators.data
                  .filter(c => c.creator.type == 'Yogs')
                  .sort((a, b) => {
                    return a.creator.name.toLowerCase().localeCompare(b.creator.name.toLowerCase())
                  })}
              >
                {creator => (
                  <A href={'/creators/' + creator.creator.creatorId} class={'no-underline hover:text-white'}>
                    <CreatorTile creator={creator.creator} style={creator.style} />
                  </A>
                )}
              </For>
            </div>
          </div>
        </Match>
      </Switch>
    </>
  )
}

interface SectionHeaderProps {
  header: string
  icon?: JSX.Element
}

const SectionHeader: Component<SectionHeaderProps> = props => {
  return (
    <div class={'flex flex-row items-center p-0.5 text-white'}>
      {props.icon}
      <p class={'ml-2 text-xl font-semibold'}>{props.header}</p>
    </div>
  )
}
export default CreatorDetailPage
