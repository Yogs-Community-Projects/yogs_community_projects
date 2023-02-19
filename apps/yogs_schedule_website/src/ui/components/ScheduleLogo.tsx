import { Component } from 'solid-js'
import image from '../../assets/yogs_schedule_header.png'

export const ScheduleLogo: Component = () => {
  return (
    <div class={'w-full pt-2'}>
      <div class={'grid place-items-center'}>
        <img class={'h-[80px] lg:h-[100px]'} src={image} alt={'Jingle Jam Logo'} />
      </div>
    </div>
  )
}
