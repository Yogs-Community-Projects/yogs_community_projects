import { Component, createSignal, onCleanup, Suspense, useTransition } from 'solid-js'
import { data } from '../assets/fundraiser_data.json'
import { Numeric } from 'solid-i18n'
import { FaBrandsTwitch } from 'solid-icons/fa'
import { excludedChannel } from './overlay_signals'

export const FundraisersOverlay: Component = () => {
  const [pending, start] = useTransition()
  const e = excludedChannel()

  const useData = () => data.filter(d => !e.includes(d.login))
  const length = () => useData().length
  const [index, setIndex] = createSignal(0)
  const current = () => useData()[index()]
  const timer = setInterval(() => start(() => setIndex((index() + 1) % length())), 8000)
  onCleanup(() => clearInterval(timer))
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div class={'h-16 w-full p-2'} classList={{ pending: pending() }}>
        <Child data={current()} />
      </div>
    </Suspense>
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
    <div class={'text-xxl rounded-2xl bg-white shadow-xl'}>
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
