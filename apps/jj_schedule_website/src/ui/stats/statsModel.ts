import { Slot } from '@ycapp/model'

export interface Donation {
  date: string
  yogs: number
  fundraiser: number
  total: number
}

export interface SlotDonation {
  slot: Slot
  donation: Donation
}

export interface DonationData {
  slots: SlotDonation[]
  hours: Donation[]
  total: Donation[]
}

/*

            "label": "Jingle Cats",
            "color": "#0078c2",
            "date": "2022-12-01T17:00:00.000+0000",
            "duration": 10800,
            "yogs": 635782.94,
            "fundraiser": 25002.71,
            "total": 660785.64
 */

/*

            "creator_id": "0w4JSboJK6RdTDmDKoYL",
            "name": "Pedguin",
            "color": "ff5babc7",
            "streams": 11,
            "minutes": 2400
 */

export interface Donation2 {
  yogs: number
  fundraiser: number
  total: number
}

export interface HourDonation2 extends Donation2 {
  date: string
  duration: number
}

export interface SlotDonation2 extends HourDonation2 {
  label: string
  color: string
}

export interface CreatorChartData {
  creator_id: string
  name: string
  color: string
  streams: number
  stream_percentage: number
  duration: number
  duration_percentage: number
}

export interface Summary extends Donation2 {
  duration: number
  total_number_of_streams: number
}

export interface DonationData2 {
  slots: SlotDonation2[]
  creator_data: CreatorChartData[]
  hours: HourDonation2[]
  summary: Summary
}
