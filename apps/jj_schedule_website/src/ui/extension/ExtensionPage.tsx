import { Component } from 'solid-js'
import extensionStats from '../../assets/ext_stats.png'
import extensionImg from '../../assets/ext_img.png'
import { FeedbackButtons } from '../components/FeedbackButtons'

const ExtensionPage: Component = () => {
  return (
    <div class={'mx-auto flex flex-col items-center p-1 text-center text-base text-white md:w-[75%] md:text-2xl'}>
      <p class={'p-2 text-2xl font-bold md:text-4xl'}>Unofficial Jingle Jam Schedule Twitch Extension</p>
      <p>A new version is in development</p>
      <p class={'text-xl'}>If you want to help and test the extension use these links.</p>
      <p class={'text-xl'}>Each tester needs to be given access manually.</p>
      <FeedbackButtons />
      <img class={'md:w-[50%]'} src={extensionImg} alt={'Images of the extension'} />
      <a class={'p-1 md:p-4'} href={'https://dashboard.twitch.tv/extensions/7m5fitr4o8raxn6fv59lndv2iy0uuz-0.0.4'}>
        The current version of the extension on Twitch
      </a>
      <p>This extension allows any Streamer too add the Yogs Jingle Jam schedule to their channel.</p>
      <p>In addition it show the current amount raised and a list of Streamers participating.</p>

      <p>
        Development of the extension started in August 2022 and a first test version was released in early September.
      </p>
      <p>
        It was tested by people from the community and <a href={'https://www.twitch.tv/wil_co'}>Wilco</a>,{' '}
        <a href={'https://www.twitch.tv/brionykay'}>Briony</a> & <a href={'https://www.twitch.tv/fionn'}>Fionn</a>{' '}
        allowed me to test it on their channel. And thanks to <a href={'https://www.twitch.tv/no1mann'}>No1mann</a> for
        the access to the Jingle Jam Donation Tracker.
      </p>
      <img class={'md:w-[50%]'} src={extensionStats} alt={'Extension statistics'} />
      <p>
        The Extension was added to the <a href={'https://www.twitch.tv/yogscast'}>Yogscast channel</a> on Dec 1. 2022
        during the OTTD Stream. It was used by 70K+ people during the two weeks of Jingle Jam.
      </p>
      <div class={'justify-start text-left'}>
        <p>Twitch extension limitations</p>
        <ul class={'list-disc text-base'}>
          <li>Every update must be reviewed by Twitch which can take up to 3 days</li>
          <li>No outgoing links are allow except Twitch links</li>
          <ul class={'ml-2 list-disc'}>
            <li>YouTube</li>
            <li>Social Media</li>
            <li>Merch</li>
            <li>Sites where you can spend money (incl. charity afaik)</li>
          </ul>
        </ul>
      </div>
    </div>
  )
}

export default ExtensionPage
