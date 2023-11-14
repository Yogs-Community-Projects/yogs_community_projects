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
