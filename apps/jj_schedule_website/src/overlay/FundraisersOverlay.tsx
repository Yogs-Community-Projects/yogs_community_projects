import { Component, For, JSXElement, Match, Switch } from 'solid-js'
import { data } from '../assets/fundraiser_data.json'
import { Numeric } from 'solid-i18n'
import { FaBrandsTwitch } from 'solid-icons/fa'
import { excludedChannel, minAmount, useSpeed } from './overlay_signals'
import './marquee.css'
export const FundraisersOverlay: Component<{ speed?: number }> = props => {
  const e = excludedChannel()
  const useData = () =>
    data
      .filter(d => !e.includes(d.login))
      .filter(d => !e.includes(d.display_name))
      .filter(d => +d.amount > minAmount())

  const desc = () => {
    if (useData().length % 4 == 0) {
      return 4
    }
    return 3
  }
  const items = () => {
    const lst = useData()
    const result: JSXElement[] = []

    for (let i = 0; i < lst.length; i++) {
      const d = lst[i]
      if (i % desc() == 0) {
        if (i % (desc() * 2) == 0) {
          result.push(
            <div class={'flex h-full w-full flex-col items-center justify-center rounded-2xl bg-white p-2 shadow-2xl'}>
              <p class={'text-accent-500 font-bold'}>Community</p>
              <p class={'text-primary-500 font-bold'}>Fundraisers</p>
            </div>,
          )
        } else {
          result.push(
            <div
              class={
                'bg-primary-500 flex h-full w-full flex-col items-center justify-center rounded-2xl p-2 shadow-2xl'
              }
            >
              <p class={'text-xl font-bold text-white'}>jinglejam.tiltify.com</p>
            </div>,
          )
        }
      }
      result.push(
        <div class={'h-full w-full rounded-2xl bg-white p-2 shadow-2xl'}>
          <div class={'flex h-full w-full flex-row items-center justify-start'}>
            <img class={'h-12 w-12 rounded-lg'} alt={''} src={d.img} />
            <div class={'flex h-full w-full flex-col items-start justify-center overflow-hidden truncate pl-2'}>
              <Switch>
                <Match when={d.login}>
                  <div class={'text-twitch flex flex-row items-center font-bold'}>
                    <FaBrandsTwitch size={18} />
                    <span class={'text-accent'}>/{d.login}</span>
                  </div>
                </Match>
                <Match when={!d.login}>
                  <div class={'text-accent flex flex-row items-center font-bold'}>{d.display_name}</div>
                </Match>
              </Switch>
              <p class={'text-primary font-bold'}>
                Raised <Numeric value={+d.amount} numberStyle="currency" currency={'GBP'} />
              </p>
            </div>
          </div>
        </div>,
      )
    }

    return result
  }

  return (
    <div class="relative flex overflow-x-hidden">
      <div
        style={{
          animation: `marquee ${(props.speed ?? useSpeed()) * items().length}s linear infinite`,
        }}
        class="flex flex-row whitespace-nowrap"
      >
        <For each={items()}>
          {d => {
            return <div class="inline-block h-[72px] w-[256px] items-center justify-center px-2 py-1">{d}</div>
          }}
        </For>
      </div>
      <div
        style={{
          animation: `marquee2 ${(props.speed ?? useSpeed()) * items().length}s linear infinite`,
        }}
        class="absolute top-0 flex flex-row whitespace-nowrap"
      >
        <For each={items()}>
          {d => {
            return <div class="inline-block h-[72px] w-[256px] items-center justify-center px-2 py-1">{d}</div>
          }}
        </For>
      </div>
    </div>
  )
}

/*


      <Transition
        mode={'outin'}
        onEnter={(el, done) => {
          const a = el.animate(
            [
              { opacity: 1, transform: 'rotateX(-90deg) perspective(800px)' },
              { opacity: 1, transform: 'rotateX(0deg) perspective(0px)' },
            ],
            {
              duration: 700,
            },
          )
          a.finished.then(done)
        }}
        onExit={(el, done) => {
          const a = el.animate(
            [
              { opacity: 1, transform: 'rotateX(0deg) perspective(0px)' },
              { opacity: 1, transform: 'rotateX(90deg) perspective(800px)' },
            ],
            {
              duration: 700,
            },
          )
          a.finished.then(done)
        }}
      >
        <div id={current().login}>
          <Child data={current()} />
        </div>
      </Transition>
 */

interface ChildProps {
  data: any
}

const Child: Component<ChildProps> = props => {
  return (
    <div class={'h-full w-full rounded-2xl bg-white shadow-xl'}>
      <div class={'flex w-full items-center p-1'}>
        <img class={'h-12 w-12 rounded-lg'} alt={''} src={props.data.img} />
        <div class={'w-full pl-1'}>
          <div class={'flex flex-row items-center'}>
            <FaBrandsTwitch size={18} /> {' /'}
            {props.data.login}
          </div>
          <p class={'text-primary text-xs font-bold'}>
            Raised <Numeric value={+props.data.amount} numberStyle="currency" currency={'GBP'} />
          </p>
        </div>
      </div>
    </div>
  )
}
