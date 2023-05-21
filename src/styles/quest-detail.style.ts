import Image from 'next/image'
import styled from 'styled-components'
import tw from 'twin.macro'

import { ButtonSocialType } from '@/constants/project.const'
import { Horizontal, Vertical, VerticalFullWidth } from '@/widgets/orientation'

export const Title = tw.div`
  text-lg
  font-medium
  font-semibold
  uppercase
`

export const Description = tw.div`
  text-xs
  font-normal
  text-gray-500
`

export const HeaderBox = tw(Horizontal)`
  items-center
`

export const PointText = tw.span`
  text-[#FF7B05]
  text-lg
  font-medium
`

export const ContentBox = tw(Vertical)`
  gap-3
  text-lg
  font-bold
  text-black
  border
  border-solid
  border-gray-300
  rounded-lg
  w-2/3
  p-6
`

export const ReviewBox = tw(Vertical)`
  w-1/3
  gap-6
`

export const RewardBox = tw(Vertical)`
  w-full
  border
  border-solid
  rounded-lg
  border-gray-300
  p-4
  justify-center
`

export const QuestDetailWrap = tw(Horizontal)`
  w-full
  gap-5
  p-6
`

export const QuizzesWrap = tw.div`
  w-full
`

export const ProgressWrap = tw.div`
  flex
  border-b-2
  pb-5
  px-6
`

export const ProgressText = tw.div`
  w-full
  text-sm
  text-gray-500
`
export const ProgressBar = tw.div`
  flex
  items-center
  w-full
`

export const ProgressBarBg = tw.div`
  h-2
  w-full
  bg-gray-200
  rounded-lg
`
export const ProgressBarTotal = tw.div`
  h-2
  bg-success
  rounded-lg
`

export const Px6 = tw.div`
  px-6
`

export const WrapBtn = tw(Horizontal)`
  w-full
  gap-2
`

export const UrlBox = tw(Horizontal)`
  w-full
  border
  border-primary
  border-solid
  p-3
  rounded-lg
  items-center
`

export const ContentCard = tw(VerticalFullWidth)`
  gap-3
`

export const SectionUploadImg = tw.section`
  w-full
  h-32
  border-2
  border-dotted
  rounded-lg
  justify-center
  items-center
  outline-0
`

export const WrapUploadImg = tw(Vertical)`
  w-full
  h-32
  justify-center
  items-center
  text-sm
  font-normal
  text-gray-700
  gap-3
  outline-0
`

export const AddFileBtn = tw.button`
  bg-primary-100
  text-sm
  font-medium
  text-primary-700
  px-6
  py-2
  rounded-lg
  outline-0
`

export const UploadInput = tw.input`
  outline-0
  ring-0
  outline-offset-0
  w-full
  h-full
`

export const ShowImg = styled(Image)(tw`
  rounded-lg
  w-full
  h-80
`)

export const UploadImgBox = tw(VerticalFullWidth)`
  justify-center
  items-center
  gap-3
`

export const SocialBtn = styled.button<{ btnType?: number }>(
  ({ btnType = ButtonSocialType.DISCORD }) => [
    tw`
      text-lg
      w-full
      font-medium
      bg-white
      py-2
      rounded-lg
      flex
      flex-row
      justify-center
      items-center
      outline-0
      gap-3
    `,
    btnType === ButtonSocialType.DISCORD &&
      tw`
        border
        border-solid
        border-primary
        hover:bg-primary-100
        text-primary
      `,
    btnType === ButtonSocialType.TWITTER &&
      tw`
        border
        border-solid
        border-info
        hover:bg-info-100
        text-info
      `,
    btnType === ButtonSocialType.VISIT_LINK &&
      tw`
        border
        border-solid
        border-warning
        hover:bg-warning-100
        text-warning
      `,
  ]
)
