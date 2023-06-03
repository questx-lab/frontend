import { FC } from 'react'

import tw from 'twin.macro'

import Description from '@/modules/community/settings/general/description'
import DisplayName from '@/modules/community/settings/general/display-name'
import Logo from '@/modules/community/settings/general/logo'
import SocialConnection from '@/modules/community/settings/general/social-connections'
import { VerticalFullWidth } from '@/widgets/orientation'

const VerticalFrame = tw(VerticalFullWidth)`
  w-2/3
  max-2xl:px-12
  max-lg:px-6
`

const General: FC = () => {
  // TODO: Complete this

  return (
    <VerticalFrame>
      <DisplayName />
      <Description />
      <Logo />
      <SocialConnection />
    </VerticalFrame>
  )
}

export default General
