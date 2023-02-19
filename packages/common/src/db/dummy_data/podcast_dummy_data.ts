import { Podcast } from '@ycapp/model'

const podcasts = [
  {
    name: 'Zero Degrees ',
    links: [
      {
        icon: {
          codePoint: 62388,
          fontFamily: 'FontAwesomeBrands',
          fontPackage: 'font_awesome_flutter'
        },
        color: 'ff9e9e9e',
        url: 'https://podcasts.apple.com/podcast/id1624673080?app=podcast&at=1000lHKX&ct=linktree_http&itscg=30200&itsct=lt_p&ls=1&mt=2',
        name: 'iTunes'
      },
      {
        name: 'Spotify',
        color: 'ff1db954',
        icon: {
          fontFamily: 'FontAwesomeBrands',
          fontPackage: 'font_awesome_flutter',
          codePoint: 61884
        },
        url: 'https://open.spotify.com/show/4jJ7v0sgTumHh7bpj5cNn3'
      }
    ],
    episode: {
      title: 'The Bean Episode',
      url: 'https://traffic.megaphone.fm/NSR4900706177.mp3?updated=1675775657',
      pubDate: 'Tue, 07 Feb 2023 15:00:00 -0000',
      duration: 3571,
      id: 'edb28ade-a6e7-11ed-82d5-03d417cb0f2a'
    },
    url: 'https://cms.megaphone.fm/channel/NSR5480017509',
    relations: {
      podcasts: [],
      creators: ['eE4FNKcFiBhoc3jFb9Fo', 'vz0XWPLfxV9gFyChCgMO', '6oSnPSBKF79EBwS1G5DF'],
      youtubeChannels: [],
      twitchChannels: []
    },
    imageUrl:
      'https://megaphone.imgix.net/podcasts/7f79a22e-cfaf-11ec-809d-0fb8454ff4fa/image/Zero_Degrees_main.png?ixlib=rails-2.1.2&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
    id: '16adV0PdksqhMRH6xCPy',
    xmlUrl: 'https://feeds.megaphone.fm/NSR5480017509'
  },
  {
    imageUrl:
      'https://megaphone.imgix.net/podcasts/b072907c-ca95-11eb-b4a3-f71bfb3de22d/image/HR_PickaxeUpdated.png?ixlib=rails-2.1.2&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
    url: 'http://highrollersdnd.libsyn.com/website',
    id: '3rGszcuV7ngpymcIxBrt',
    episode: {
      url: 'https://traffic.megaphone.fm/NSR2470580892.mp3?updated=1675794631',
      pubDate: 'Tue, 07 Feb 2023 18:23:49 -0000',
      id: 'ce1b9cd8-a714-11ed-8d05-fb8216a693c4',
      title: 'High Rollers: Aerois #173 | Wolflions in the Night (Part 1)',
      duration: 5110
    },
    xmlUrl: 'http://feeds.megaphone.fm/NSR8625352094',
    relations: {
      youtubeChannels: [],
      creators: ['c9raygCH9eGa09OLB12t'],
      twitchChannels: []
    },
    name: 'High Rollers DnD'
  },
  {
    name: 'Triforce!',
    relations: {
      creators: ['o1gdP5407amAmS5vEXvP', 'Gq7a6r1Pq0loxIUiNk8v', '4ty8OfAA0hoXSV6trUY9'],
      podcasts: [],
      twitchChannels: [],
      youtubeChannels: ['UCgXiTWrFg05fTPfw1YLb5Ug']
    },
    id: '5F7GOIwN9KlUqR8V7fjj',
    links: [
      {
        color: 'ff1db954',
        icon: {
          fontFamily: 'FontAwesomeBrands',
          codePoint: 61884,
          fontPackage: 'font_awesome_flutter'
        },
        name: 'Spotify',
        url: 'https://open.spotify.com/show/4LNMdMhRsPmJhGGw6b1vTZ?si=d2e495d904f34539'
      }
    ],
    xmlUrl: 'https://feeds.megaphone.fm/NSR9016694791',
    url: 'http://yogpod.libsyn.com',
    episode: {
      duration: 4009,
      pubDate: 'Wed, 01 Feb 2023 16:30:00 -0000',
      url: 'https://traffic.megaphone.fm/NSR2154610326.mp3?updated=1675184292',
      id: 'bf2ff404-a187-11ed-9433-538fbb24eb05',
      title: 'Triforce! #245: The Saddest Kazoo in the World'
    },
    imageUrl:
      'https://megaphone.imgix.net/podcasts/7899c86e-ca95-11eb-a133-d7b38afd7bc7/image/Triforce_PickaxeUpdated.png?ixlib=rails-2.1.2&max-w=3000&max-h=3000&fit=crop&auto=format,compress'
  },
  {
    name: 'Feels on Meals',
    id: '5Fq82gWp7mrLdkxDaHT7',
    episode: {
      url: 'https://chrt.fm/track/C35921/traffic.megaphone.fm/NSR4880741076.mp3?updated=1669716018',
      title: '113 KTV feat. Pedguin',
      duration: 3848,
      pubDate: 'Mon, 28 Nov 2022 13:00:00 -0000',
      id: '3338097c-6e98-11ed-9ef9-cf9a113b26ad'
    },
    links: [
      {
        name: 'Spotify',
        url: 'https://open.spotify.com/show/2DKJJkiYNEy8FB1k3FAU6f?si=97d0851f813744b6',
        icon: {
          fontFamily: 'FontAwesomeBrands',
          codePoint: 61884,
          fontPackage: 'font_awesome_flutter'
        },
        color: 'ff1db954'
      },
      {
        color: 'ff9e9e9e',
        url: 'https://podcasts.apple.com/gb/podcast/feels-on-meals/id1620900881',
        icon: {
          codePoint: 62388,
          fontFamily: 'FontAwesomeBrands',
          fontPackage: 'font_awesome_flutter'
        },
        name: 'iTunes'
      }
    ],
    url: 'https://cms.megaphone.fm/channel/feels',
    xmlUrl: 'https://feeds.megaphone.fm/feels',
    relations: {
      youtubeChannels: [],
      podcasts: [],
      creators: ['yAmEX9kxAZTdKzwQcIsy', 'MsNyFTyL0zikJ4zKOZm2'],
      twitchChannels: []
    },
    imageUrl:
      'https://megaphone.imgix.net/podcasts/0eb9c6aa-b1db-11ec-851e-43596e154367/image/Feels_on_Meals_Icon_Artwork.jpg?ixlib=rails-2.1.2&max-w=3000&max-h=3000&fit=crop&auto=format,compress'
  },
  {
    relations: {
      twitchChannels: [],
      youtubeChannels: ['UCUCj1zyUUPefT18RytQxu3g'],
      creators: ['Hz3L8GFTsM0EFg0caGoG'],
      podcasts: []
    },
    imageUrl:
      'https://megaphone.imgix.net/podcasts/3a491830-da6c-11eb-a663-378eac6ebb3a/image/HatChat_PickaxeUpdated.png?ixlib=rails-2.1.2&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
    id: '9PQzKYvsiKn6QR3cr7b6',
    name: 'The Hat Chat Podcast',
    url: 'http://hatchat.libsyn.com/website',
    xmlUrl: 'https://feeds.megaphone.fm/NSR2241892924',
    episode: {
      pubDate: 'Sat, 04 Feb 2023 16:00:00 -0000',
      duration: 3401,
      title: 'Would you pay for a memory?',
      id: 'df80ffc4-a31b-11ed-85a8-674ff3992315',
      url: 'https://traffic.megaphone.fm/NSR5653764360.mp3?updated=1675358142'
    },
    links: [
      {
        color: 'ff1db954',
        url: 'https://open.spotify.com/show/68xugUltO1AS6azBq8Ni0B?si=a87875cfdaad42eb',
        name: 'Spotify',
        icon: {
          fontPackage: 'font_awesome_flutter',
          fontFamily: 'FontAwesomeBrands',
          codePoint: 61884
        }
      }
    ]
  },
  {
    xmlUrl: 'https://feeds.megaphone.fm/chance',
    relations: {
      schedules: [],
      youtubeChannels: ['UClhmd2Xe3zrYfuarqV-shKA'],
      twitchChannels: [],
      podcasts: [],
      creators: ['Dvsw8FJa8v3LjEXSXr9e']
    },
    url: 'https://cms.megaphone.fm/channel/chance',
    episode: {
      pubDate: 'Fri, 14 Oct 2022 16:00:00 -0000',
      duration: 3499,
      title: 'Season Two Roundtable',
      url: 'https://chrt.fm/track/C35921/traffic.megaphone.fm/NSR6607489042.mp3?updated=1665671632',
      id: '2071dffe-496b-11ed-8219-e7e2d6dd95f5'
    },
    links: [
      {
        url: 'https://open.spotify.com/show/65UpiCQtKNd3LY8kvfjqzF',
        name: 'Spotify',
        icon: {
          fontPackage: 'font_awesome_flutter',
          fontFamily: 'FontAwesomeBrands',
          codePoint: 61884
        },
        color: 'ff1db954'
      },
      {
        color: 'ff9e9e9e',
        url: 'https://podcasts.apple.com/podcast/id1622802398?ign-itscg=30200&ign-itsct=lt_p',
        icon: {
          fontPackage: 'font_awesome_flutter',
          codePoint: 62388,
          fontFamily: 'FontAwesomeBrands'
        },
        name: 'iTunes'
      }
    ],
    id: 'ZbvgXhoXmqwQ6cqqmmn6',
    name: 'Chance & Counters',
    imageUrl:
      'https://megaphone.imgix.net/podcasts/8d8c7c1a-b1e1-11ec-ad85-a7134aa5f124/image/CnC_Main_Art.jpg?ixlib=rails-2.1.2&max-w=3000&max-h=3000&fit=crop&auto=format,compress'
  },
  {
    imageUrl:
      'https://megaphone.imgix.net/podcasts/2b21c52a-8915-11ec-b2fd-534b45ab59e7/image/Pickaxe_Comfort_Zone.jpg?ixlib=rails-2.1.2&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
    name: "Kirsty and Briony's Comfort Zone",
    xmlUrl: 'https://feeds.megaphone.fm/thecz',
    links: [],
    id: 'amy9POTYCcaHnuU4ZuNJ',
    url: 'https://cms.megaphone.fm/channel/thecz',
    episode: {
      id: '20d21ad6-9d94-11ed-b690-875cbcccae4e',
      pubDate: 'Sat, 04 Feb 2023 10:00:00 -0000',
      url: 'https://chrt.fm/track/C35921/traffic.megaphone.fm/NSR8730803664.mp3?updated=1674749974',
      title: 'Dreams of Parcels',
      duration: 3962
    },
    relations: {
      youtubeChannels: [],
      podcasts: [],
      twitchChannels: [],
      creators: ['Gz3S1VJlA6iPISXuIl7p', 'zwBpk82qRo4y2Sf5Nvlf']
    }
  },
  {
    episode: {
      url: 'https://chrt.fm/track/C35921/traffic.megaphone.fm/NSR6508224798.mp3?updated=1671099555',
      title: 'Pitch, Please - Pitch of the Year 2022 (with Matthew Castle)',
      duration: 8497,
      id: 'db3e35a4-7c5a-11ed-9063-8329b2a40b8d',
      pubDate: 'Sun, 25 Dec 2022 06:00:00 -0000'
    },
    url: 'http://pitch-please.libsyn.com/',
    relations: {
      creators: ['kmVGNmGPDoQW8OWMLkmW'],
      podcasts: [],
      youtubeChannels: ['UCEXTAoHBfQpGC-iuEReSRPQ'],
      twitchChannels: []
    },
    links: [
      {
        name: 'Spotify',
        icon: {
          codePoint: 61884,
          fontFamily: 'FontAwesomeBrands',
          fontPackage: 'font_awesome_flutter'
        },
        color: 'ff1db954',
        url: 'https://open.spotify.com/show/2iO0B1QsPVm4K87vP31FHy?si=68958824d5704e87'
      },
      {
        color: 'ff9e9e9e',
        icon: {
          codePoint: 62388,
          fontPackage: 'font_awesome_flutter',
          fontFamily: 'FontAwesomeBrands'
        },
        name: 'iTunes',
        url: 'https://podcasts.apple.com/gb/podcast/pitch-please/id1498392864'
      }
    ],
    xmlUrl: 'https://feeds.megaphone.fm/NSR8204841163',
    id: 'kZVpteHZ80TK0BfuvZgO',
    imageUrl:
      'https://megaphone.imgix.net/podcasts/1e950b24-d019-11eb-9c74-13e38718bdcd/image/PitchPlease_PickaxeUpdated.png?ixlib=rails-2.1.2&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
    name: 'Pitch, Please'
  },
  {
    id: 'wbo7oG05vqQxGW3u1oEW',
    imageUrl:
      'https://megaphone.imgix.net/podcasts/5b09d474-d017-11eb-b988-978fec79649d/image/PP_PickaxeUpdated.png?ixlib=rails-2.1.2&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
    name: "Simon's Peculiar Portions",
    url: 'http://simonspp.libsyn.com/website',
    episode: {
      duration: 3753,
      id: '19e54a68-6a63-11ed-bd3f-27364bb2193c',
      title: "Simon's Christmas Portions 2022 - KFC-scented firewood",
      pubDate: 'Thu, 22 Dec 2022 16:00:00 -0000',
      url: 'https://traffic.megaphone.fm/NSR7114080466.mp3?updated=1669121572'
    },
    relations: {
      youtubeChannels: ['UCH-_hzb2ILSCo9ftVSnrCIQ', 'UCpKNM44gSRZ3U_hMd2JV9Kw'],
      twitchChannels: [],
      creators: ['QLpFsapfyzIU4TYdVmjM', 'Gq7a6r1Pq0loxIUiNk8v'],
      podcasts: []
    },
    links: [
      {
        icon: {
          codePoint: 61884,
          fontPackage: 'font_awesome_flutter',
          fontFamily: 'FontAwesomeBrands'
        },
        url: 'https://open.spotify.com/show/5KdK2yveOSMpEVQpJzSTOc?si=063c7e05e0184d59',
        color: 'ff1db954',
        name: 'Spotify'
      },
      {
        name: 'iTunes',
        color: 'ff9e9e9e',
        url: 'https://podcasts.apple.com/gb/podcast/simons-peculiar-portions/id1528174276',
        icon: {
          fontFamily: 'FontAwesomeBrands',
          fontPackage: 'font_awesome_flutter',
          codePoint: 62388
        }
      }
    ],
    xmlUrl: 'https://feeds.megaphone.fm/NSR6944084567'
  }
]
export const fetchDummyData = () => {
  return podcasts as unknown as Podcast[]
}
