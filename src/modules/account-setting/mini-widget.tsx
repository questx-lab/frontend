import tw from 'twin.macro'

import { Horizontal, Vertical } from '@/widgets/orientation'

export const BodyFrame = tw.div`
  w-full
  pl-80
  h-full
  mt-[70px]
  divide-y
  divide-gray-200
`

export enum SocialType {
  DISCORD = 'discord',
  TWITTER = 'twitter',
  GOOGLE = 'google',
  METAMASK = 'wallet',
}

export const ButtonBox = tw(Horizontal)`
  w-full
  gap-3
  justify-end
  items-center
`

export const PaddingHorizontal = tw(Vertical)`
  py-6
  px-24
`

export const RowBox = tw(Horizontal)`
  gap-6
`

export const ColumnBox = tw(Vertical)`
  gap-3
`

export enum SettingEnum {
  GENERAL,
  ACHIEVEMENTS,
}
