import { FC, useState } from 'react'

import toast from 'react-hot-toast'
import tw from 'twin.macro'

import { updateCommunityApi } from '@/app/api/client/communitiy'
import Description from '@/modules/community/settings/general/description'
import DisplayName from '@/modules/community/settings/general/display-name'
import Logo from '@/modules/community/settings/general/logo'
import SocialConnection from '@/modules/community/settings/general/social-connections'
import { CommunityStore } from '@/store/local/community'
import NewCommunityStore, { stateToUpdateCommunityRequest } from '@/store/local/new-community.store'
import { PositiveButton } from '@/widgets/buttons/button'
import { HorizontalFullWidth, VerticalFullWidth } from '@/widgets/orientation'

const VerticalFrame = tw(VerticalFullWidth)`
  w-2/3
  max-2xl:px-12
  max-lg:px-6
`

const HorizontalFullWidthEnd = tw(HorizontalFullWidth)`
  justify-end
  items-end
`

const General: FC = () => {
  // data
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const store = NewCommunityStore.useStore()

  // local state
  const [loading, setLoading] = useState<boolean>(false)

  const onSaveClicked = async () => {
    setLoading(true)
    const state = store.getState()

    const payload = stateToUpdateCommunityRequest(state, community.handle)
    const result = await updateCommunityApi(payload)
    if (result.code === 0) {
      toast.success('Community is updaetd successfully')
    }

    setLoading(false)
  }

  return (
    <VerticalFrame>
      <DisplayName />
      <Description />
      <Logo />
      <SocialConnection />
      <HorizontalFullWidthEnd>
        <PositiveButton onClick={onSaveClicked} loading={loading}>
          Save
        </PositiveButton>
      </HorizontalFullWidthEnd>
    </VerticalFrame>
  )
}

export default General
