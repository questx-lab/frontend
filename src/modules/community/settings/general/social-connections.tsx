import { FC } from 'react'

import tw from 'twin.macro'

import { ButtonSocialType } from '@/constants/common.const'
import { StorageConst } from '@/constants/storage.const'
import NewCommunityStore from '@/store/local/new-community.store'
import { Gap } from '@/styles/common.style'
import { SocialButton } from '@/widgets/buttons/button-social'
import { TextField } from '@/widgets/form'
import { Image } from '@/widgets/image'
import { HorizontalFullWidth, Vertical } from '@/widgets/orientation'
import { HeaderText3 } from '@/widgets/text'

const LeftColumn = tw(Vertical)`
  w-1/2
  pr-2
`

const RightColumn = tw(Vertical)`
  w-1/2
  pl-2
`

const SocialConnection: FC = () => {
  // data
  const websiteUrl = NewCommunityStore.useStoreState((state) => state.websiteUrl)

  // action
  const setWebsiteUrl = NewCommunityStore.useStoreActions((action) => action.setWebsiteUrl)

  return (
    <HorizontalFullWidth>
      <LeftColumn>
        <HeaderText3>WEBSITE URL</HeaderText3>
        <TextField value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)}></TextField>
        <Gap height={6} />
      </LeftColumn>

      <RightColumn>
        <HeaderText3>TWITTER</HeaderText3>
        <SocialButton btnType={ButtonSocialType.TWITTER} onClick={() => {}}>
          <Image
            width={30}
            height={30}
            src={StorageConst.TWITTER_DIR.src}
            alt={StorageConst.TWITTER_DIR.alt}
          />
          {'Connect Twitter'}
        </SocialButton>
      </RightColumn>
    </HorizontalFullWidth>
  )
}

export default SocialConnection
