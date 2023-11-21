import { useJJStartCountdown, useNextJJStartDate } from '@ycapp/common'
import { Component } from 'solid-js'

const Disclaimer: Component = () => {
  return (
    <div class={'flex flex-col px-4 pb-8 text-base md:text-xl lg:px-32'}>
      <p class={'p-4'}>Once the Official Yogscast Jingle Jam schedule is published it will be shown here.</p>
      <p class={''}>
        This site <strong>is maintained by the community</strong>. If you find errors or see that a stream is missing
        use the contact info below. Streams that appear here are not guaranteed to happen or might be delayed. For more
        information visit the Jingle Jam Twitter page. This site is a{' '}
        <strong>fan Project and not associated with the Jingle Jam, the Yogscast or their partners.</strong>
      </p>
    </div>
  )
}

const HomePage: Component = () => {
  const nextJJStartDate = useNextJJStartDate()
  const jjStartCountdown = useJJStartCountdown()
  return (
    <div class={'mx-auto flex w-fit flex-col items-center p-1 text-center text-base text-white md:w-[50%] md:text-2xl'}>
      <p class={'p-1 text-2xl font-bold md:p-2 md:text-4xl'}>Yogscast Jingle Jam Countdown</p>
      <p class={'text-xl md:text-3xl'}>{nextJJStartDate().toLocal().toFormat('DDDD')}</p>
      <p class={'text-xl md:text-3xl'}>{nextJJStartDate().toLocal().toFormat('ttt')}</p>
      <p class={''}>{nextJJStartDate().toFormat('DDDD')}</p>
      <p class={''}>{nextJJStartDate().toFormat('ttt')}</p>
      <div class={'flex flex-col items-center p-1 text-white md:p-4'}>
        <p class={'text-2xl md:text-4xl'}>Jingle Jam {nextJJStartDate().year} starts in</p>
        <p class={'font-mono text-2xl md:text-4xl'}>{jjStartCountdown().toFormat("dd'd' hh'h' mm'm' ss's'")}</p>
      </div>
      <Disclaimer />
    </div>
  )
}

const Countdown: Component = () => {
  const nextJJStartDate = useNextJJStartDate()
  const jjStartCountdown = useJJStartCountdown()
  const seconds = () => Math.round(jjStartCountdown().as('seconds') % 60)
  const minutes = () => Math.round(jjStartCountdown().as('minutes') % 60)
  const hours = () => Math.round(jjStartCountdown().as('hours') % 60)
  const days = () => Math.round(jjStartCountdown().as('days'))
  return (
    <div class="grid auto-cols-max grid-flow-col gap-5 text-center">
      <div class="flex flex-col">
        <span class="relative top-[calc(var(--value)_*_-1em)] inline-flex h-[1em] whitespace-pre font-mono text-3xl">
          <span style={{ '--value': days() }}>{days()}</span>
        </span>
        days
      </div>
      <div class="flex flex-col">
        <span class="countdown font-mono text-3xl">
          <span style={{ '--value': hours() }}></span>
        </span>
        hours
      </div>
      <div class="flex flex-col">
        <span class="countdown font-mono text-3xl">
          <span style={{ '--value': minutes() }}></span>
        </span>
        min
      </div>
      <div class="flex flex-col">
        <span class="countdown font-mono text-3xl">
          <span style={{ '--value': seconds() }}></span>
        </span>
        sec
      </div>
    </div>
  )
}

export default HomePage
