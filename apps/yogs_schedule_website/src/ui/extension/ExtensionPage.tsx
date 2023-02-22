import { Component } from 'solid-js'
import img1 from '../../assets/extension/img1.png'
import img2 from '../../assets/extension/img2.png'
import img3 from '../../assets/extension/img3.png'
import { FeedbackButtons } from '../components/FeedbackButtons'

const ExtensionPage: Component = () => {
  return (
    <div class={'mx-auto flex flex-col items-center p-1 text-center text-base text-white md:w-[75%] md:text-2xl'}>
      <p class={'p-2 text-2xl font-bold md:text-4xl'}>Unofficial Yogscast Stream Team Twitch Extension</p>
      <p class={'font-bold'}>This extension is still in development</p>
      <p class={'text-xl'}>If you want to help and test the extension use these links.</p>
      <p class={'text-xl'}>Each tester needs to be given access manually.</p>
      <FeedbackButtons />
      <div class={'flex flex-wrap items-start justify-center gap-2'}>
        <div class={'flex w-52 flex-col items-center justify-center'}>
          <img class={'w-52'} src={img1} alt={'Extension Image 1, Twitch Channel'} />
          <p class={'text-base'}>All Twitch Channel and who is live</p>
        </div>
        <div class={'flex w-52 flex-col items-center justify-center'}>
          <img class={'w-52'} src={img2} alt={'Extension Image 2, Planed Streams'} />
          <p class={'text-base'}>All regular planed streams across the network</p>
        </div>
        <div class={'flex w-52 flex-col items-center justify-center'}>
          <img class={'w-52'} src={img3} alt={'Extension Image 3, Stream Details'} />
          <p class={'text-base'}>Who is part of a stream</p>
        </div>
      </div>
      <div class={'justify-start text-left'}>
        <p>Currently planed features</p>
        <ul class={'list-disc text-base'}>
          <li>Way to show special one-of streams</li>
          <li>Way to add/switch to a special stream/events schedule</li>
        </ul>
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
