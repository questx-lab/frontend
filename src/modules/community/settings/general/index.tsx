import { FC, useState } from 'react'

import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'
import tw from 'twin.macro'

import { updateCommunityApi } from '@/api/communitiy'
import Description from '@/modules/community/settings/general/description'
import DisplayName from '@/modules/community/settings/general/display-name'
import Logo from '@/modules/community/settings/general/logo'
import SocialConnection from '@/modules/community/settings/general/social-connections'
import { CommunityStore } from '@/store/local/community'
import NewCommunityStore, { stateToUpdateCommunityRequest } from '@/store/local/new-community'
import { GlobalStoreModel } from '@/store/store'
import { uploadFileForCommunity } from '@/utils/file'
import { PositiveButton } from '@/widgets/buttons'
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
  const avatar = NewCommunityStore.useStoreState((state) => state.avatar)
  const store = NewCommunityStore.useStore()

  // action
  const setSelectedCommunity = CommunityStore.useStoreActions(
    (action) => action.setSelectedCommunity
  )
  const updateCommunityCollab = useStoreActions<GlobalStoreModel>(
    (action) => action.updateCommunityCollab
  )

  // local state
  const [loading, setLoading] = useState<boolean>(false)

  const onSaveClicked = async () => {
    setLoading(true)

    if (avatar) {
      const result = await uploadFileForCommunity(avatar, community.handle)
      if (result.error) {
        toast.error(result.error)
        return
      }
    }

    const state = store.getState()

    const payload = stateToUpdateCommunityRequest(state, community.handle)
    const result = await updateCommunityApi(payload)
    if (result.code === 0 && result.data) {
      toast.success('Community is updaetd successfully')

      // update the community store
      setSelectedCommunity(result.data.community)

      // update the project collab so that it updates the navigation logo image
      updateCommunityCollab(result.data.community)
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
