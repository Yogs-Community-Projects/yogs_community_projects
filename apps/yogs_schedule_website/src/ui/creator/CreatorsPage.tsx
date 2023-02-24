import { A } from '@solidjs/router'
import { Component, createEffect, For, Match, Switch } from 'solid-js'
import { CreatorTile } from '@ycapp/commonui'
import { useCreatorDB } from '@ycapp/common'

import { Loading } from '../components/loading/Loading'
import { CreatorData } from '@ycapp/model'
import { Title } from '@solidjs/meta'

const CreatorsPage: Component = () => {
  const state = useCreatorDB().readAll()
  createEffect(() => {
    if (state.error) {
      console.error('CreatorsPageBody', 'error', 'state', state)
    }
  })
  return (
    <div class={'flex flex-col gap-2'}>
      <Title>Yogscast Creators</Title>
      <div class={'grid h-full w-full grid-cols-[repeat(auto-fit,_minmax(120px,_1fr))] gap-1 px-2 md:gap-2'}>
        <Switch>
          <Match when={state.loading}>
            <Loading />
          </Match>
          <Match when={state.error}>
            <p>Error: {JSON.stringify(state.error)}</p>
          </Match>
          <Match when={state.data}>
            <Body creators={state.data} />
          </Match>
        </Switch>
      </div>
    </div>
  )
}

interface BodyProps {
  creators: CreatorData[]
}

const Body: Component<BodyProps> = props => {
  const creators = () => {
    return [...props.creators].sort((a, b) => {
      return a.creator.name.toLowerCase().localeCompare(b.creator.name.toLowerCase())
    })
  }

  return (
    <For each={creators()}>
      {data => (
        <A href={'/creators/' + data.creator.creatorId} class={'no-underline'}>
          <CreatorTile creator={data.creator} style={data.style} />
        </A>
      )}
    </For>
  )
}
export default CreatorsPage
