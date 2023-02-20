import { FaBrandsDiscord, FaBrandsGithub, FaBrandsReddit, FaSolidEnvelope } from 'solid-icons/fa'
import { Component } from 'solid-js'

export const FeedbackButtons: Component = () => {
  return (
    <div class={'flex flex-row gap-4 p-2 text-white'}>
      <a
        class={'hover:text-accent hover:bg-primary rounded-full transition-all hover:scale-110'}
        href={'mailto:contact@yogs.app'}
      >
        <FaSolidEnvelope size={24} />
      </a>
      <a
        class={'hover:text-discord rounded-full transition-all hover:scale-110 hover:bg-white'}
        href={'https://discord.gg/D5eqweWQPs'}
      >
        <FaBrandsDiscord size={24} />
      </a>
      <a
        class={'hover:text-reddit rounded-full transition-all hover:scale-110 hover:bg-white'}
        href={'https://old.reddit.com/message/compose/?to=Ostof'}
      >
        <FaBrandsReddit size={24} />
      </a>
      <a
        class={'hover:text-github rounded-full transition-all hover:scale-110 hover:bg-white'}
        href={'https://github.com/Yogs-Community-Projects/yogs_community_projects'}
      >
        <FaBrandsGithub size={24} />
      </a>
    </div>
  )
}
