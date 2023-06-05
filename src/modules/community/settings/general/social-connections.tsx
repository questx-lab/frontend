import { FC } from 'react'

import tw from 'twin.macro'

import NewCommunityStore from '@/store/local/new-community.store'
import { TextField } from '@/widgets/form'
import { HorizontalFullWidth, Vertical } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { HeaderText3 } from '@/widgets/text'

const LeftColumn = tw(Vertical)`
  w-full
  pr-2
`

// TODO: Finish linking community's Twitter, Discord page.
const RightColumn = tw(Vertical)`
  w-1/2
  pl-2
`

const SocialConnection: FC = () => {
  // TODO: Complete this
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

      {
        // TODO: Finish linking community's Twitter, Discord page.
        /* <RightColumn>
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
      </RightColumn> */
      }
    </HorizontalFullWidth>
  )
}

export default SocialConnection
