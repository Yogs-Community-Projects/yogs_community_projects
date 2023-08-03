export interface Currency {
  dollars: number
  pounds: number
}

export interface CharityData {
  name: string
  desc: string
  img: string
  total: Currency
}
export interface JJAPIData {
  average: Currency
  bundles: {
    allocated: number
    available: number
    remaining: number
    sold: number
  }
  // campaigns: any[]
  date: string
  donations: {
    count: number
  }
  entire: {
    amount: Currency
    donations: number
  }
  fundraisers: Currency
  raised: Currency
  total: Currency
}
export interface JJData {
  jj_api: JJAPIData
  tiltify_campaign_data: CharityData[]
}

export interface FundraiserData {
  data: Fundraiser[]
}

export interface Fundraiser {
  display_name: string
  login?: string
  img: string
  desc?: string
  amount: string
}
