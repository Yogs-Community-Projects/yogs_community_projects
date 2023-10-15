export type TabType = 'yogs' | 'charities' | 'community' | 'none'
export type Theme = 'red' | 'blue' | 'dark' | 'red_dark' | 'blue_dark' | 'rainbow'
export interface TwitchConfig {
  tab1: TabType
  tab2: TabType
  tab3: TabType
  theme: Theme
}

export const defaultConfig: TwitchConfig = {
  tab1: 'yogs',
  tab2: 'charities',
  tab3: 'community',
  theme: 'red',
}
