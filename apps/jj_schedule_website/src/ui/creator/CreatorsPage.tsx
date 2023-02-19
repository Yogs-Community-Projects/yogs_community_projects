import { A } from '@solidjs/router'
import { Component, For, Match, Switch } from 'solid-js'
import { useCreatorsRouteData } from './CreatorDetailRouteData'
import { Loading } from '../components/loading/Loading'
import { CreatorTile } from '../components/tiles/CreatorTile'

const CreatorsPageBody: Component = () => {
  const creators = useCreatorsRouteData()
  return (
    <div class={'flex flex-col gap-2'}>
      <div class={'grid h-full w-full grid-cols-[repeat(auto-fit,_minmax(120px,_1fr))] gap-1 px-2 md:gap-2'}>
        <Switch>
          <Match when={creators().loading}>
            <Loading />
          </Match>
          <Match when={creators().error}>
            <p>Error: {creators().error?.message}</p>
          </Match>
          <Match when={creators().data}>
            <For each={creators().data!.sort((a, b) => a.creator.name.localeCompare(b.creator.name))}>
              {data => (
                <A href={'/creators/' + data.creator.creatorId}>
                  <CreatorTile creator={data.creator} style={data.style} />
                </A>
              )}
            </For>
          </Match>
        </Switch>
      </div>
    </div>
  )
}

const CreatorsPage: Component = props => {
  return <CreatorsPageBody />
}
export default CreatorsPage
