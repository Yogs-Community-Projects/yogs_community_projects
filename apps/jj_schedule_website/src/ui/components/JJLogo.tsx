import { Component } from 'solid-js'
import jjImage from '../../assets/images/Jingle_Jam_Logo_White_Large.png'

export const JJLogo: Component = () => {
  return (
    <div class={'w-full pt-2'}>
      <div class={'grid place-items-center'}>
        <img class={'h-[80px] lg:h-[100px]'} src={jjImage} alt={'Jingle Jam Logo'} />
      </div>
    </div>
  )
}
