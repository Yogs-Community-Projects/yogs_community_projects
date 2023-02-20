import { CreatorStyle, YcLink } from '@ycapp/model'
import { Component } from 'solid-js'
import {
  FaBrandsBandcamp,
  FaBrandsDiscord,
  FaBrandsInstagram,
  FaBrandsPatreon,
  FaBrandsReddit,
  FaBrandsSpotify,
  FaBrandsSquareSteam,
  FaBrandsTiktok,
  FaBrandsTwitter,
  FaSolidBagShopping,
} from 'solid-icons/fa'
import { CgWebsite } from 'solid-icons/cg'
import { getTextColor } from '@ycapp/common'

enum CreatorLinkButtonMode {
  brand,
  creator,
}

interface CreatorLinkButtonProps {
  link: YcLink
  style?: CreatorStyle
  mode?: CreatorLinkButtonMode
}

/*
Twitter 61593 FontAwesomeBrands font_awesome_flutter

Tiktok 57467 FontAwesomeBrands font_awesome_flutter

Instagram 61805 FontAwesomeBrands font_awesome_flutter

Reddit 61857 FontAwesomeBrands font_awesome_flutter

Website 60884 MaterialIcons
Merch 62096 FontAwesomeSolid font_awesome_flutter
 */
export const CreatorLinkButton: Component<CreatorLinkButtonProps> = props => {
  const { link } = props
  let icon
  switch (link.icon.codePoint) {
    case 61593: // Twitter
      icon = <FaBrandsTwitter />
      break
    case 57467: // Tiktok
      icon = <FaBrandsTiktok />
      break
    case 61805: // Instagram
      icon = <FaBrandsInstagram />
      break
    case 61857: // Reddit
      icon = <FaBrandsReddit />
      break
    case 62354: // Discprd
      icon = <FaBrandsDiscord />
      break
    case 62425: // Patreon
      icon = <FaBrandsPatreon />
      break
    case 62096: // Patreon
      icon = <FaSolidBagShopping />
      break
    case 60884: // Website
      icon = <CgWebsite />
      break
    case 61884: // Playlist
      icon = <FaBrandsSpotify />
      break
    case 61878: // Steam
      icon = <FaBrandsSquareSteam />
      break
    case 62165: // Bandcamp
      icon = <FaBrandsBandcamp />
      break
    default:
      icon = <p>{link.icon.codePoint}</p>
  }

  const mode = props.mode ?? CreatorLinkButtonMode.brand
  let backgroundColor = ''
  switch (mode) {
    case CreatorLinkButtonMode.brand:
      backgroundColor = '#' + link.color.substring(2)
      break
    case CreatorLinkButtonMode.creator:
      backgroundColor = '#' + (props.style?.accentColor.substring(2) ?? link.color.substring(2))
      break
  }
  return (
    <a
      href={link.url}
      style={{
        background: backgroundColor,
        color: getTextColor(backgroundColor),
      }}
      class={
        'hover:scale-101 inline-flex w-full items-center justify-between rounded-full py-2 px-4 font-bold text-gray-800 transition-all hover:brightness-105'
      }
    >
      <p>{link.name}</p>
      {icon}
    </a>
  )
}
