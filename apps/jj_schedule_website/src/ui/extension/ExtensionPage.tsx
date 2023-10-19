import { Component } from 'solid-js'
import extensionStats from '../../assets/ext_stats.png'
import screenshot from '../../assets/extension/screenshot.png'
import { FeedbackButtons } from '../components/FeedbackButtons'

const ExtensionPage: Component = () => {
  return (
    <div class={'mx-auto flex flex-col items-center p-1 text-center text-white md:w-[75%]'}>
      <p class={'p-2 text-2xl font-bold md:text-4xl'}>Jingle Jam Community Twitch Extension</p>
      <FeedbackButtons />
      <div class={'flex flex-col items-center p-2'}>
        <img class={'md:w-[50%]'} src={screenshot} alt={'Discovery'} />
        <a class={'p-1 md:p-4'} href={'https://dashboard.twitch.tv/extensions/7m5fitr4o8raxn6fv59lndv2iy0uuz-0.0.5'}>
          Get the current version of the extension on Twitch
        </a>

        <p>This Extension is for everyone who participates in the Jingle Jam.</p>
        <p>It allow you to see the charities, community fundraiser & the Yogscast Jingle Jam Schedule</p>
        <p>Streamers can rearrange or disable tabs.</p>
        <p>This new version is also available in the Twitch mobile app.</p>

        <p>
          Thanks to <a href={'https://www.twitch.tv/nairdwoody'}>Nairdwood</a> for making the Extension assets. And
          thanks to <a href={'https://www.twitch.tv/no1mann'}>No1mann</a> for the access to the Jingle Jam Donation
          Tracker.
        </p>
      </div>

      <div class={'flex flex-col items-center p-2'}>
        <h2 class={'text-2xl'}>Previous version</h2>
        <p>
          Development of the extension started in August 2022 and a first test version was released in early September.
        </p>
        <p class={'font-bold'}>
          The Extension was used by the <a href={'https://www.twitch.tv/yogscast'}>Yogscast</a> during the Jingle Jam
          2022.
        </p>
        <p>
          It was tested by people from the community and <a href={'https://www.twitch.tv/wil_co'}>Wilco</a>,{' '}
          <a href={'https://www.twitch.tv/brionykay'}>Briony</a> & <a href={'https://www.twitch.tv/fionn'}>Fionn</a>{' '}
          allowed me to test it on their channel. And thanks to <a href={'https://www.twitch.tv/no1mann'}>No1mann</a>{' '}
          for the access to the Jingle Jam Donation Tracker.
        </p>
        <img class={'md:w-[50%]'} src={extensionStats} alt={'Extension statistics'} />
        <p>Stats from 2022</p>
      </div>
      <div class={'flex flex-col items-center p-2'}>
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
    </div>
  )
}

export default ExtensionPage
