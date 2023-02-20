import { Component } from 'solid-js'

export const BetaBanner: Component = () => {
  return (
    <div class={'bg-accent w-full rounded-3xl p-2 text-center text-2xl text-white'}>
      <p>
        This is a new version of jj.yogs.app. It is currently being tested and many things are not final. Please report
        problems using{' '}
        <a href={'mailto:contact@yogs.app'} class={'underline'}>
          this email
        </a>{' '}
        or DM Ostof on{' '}
        <a href={'https://discord.gg/D5eqweWQPs'} class={'underline'}>
          Discord
        </a>{' '}
        or{' '}
        <a href={'https://old.reddit.com/message/compose/?to=Ostof'} class={'underline'}>
          Reddit
        </a>
      </p>
    </div>
  )
}
