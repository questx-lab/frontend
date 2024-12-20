import { FC, useState } from 'react'

import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'
import tw from 'twin.macro'

import { updateCommunityApi } from '@/api/communitiy'
import { SizeEnum } from '@/constants/common.const'
import Description from '@/modules/community/settings/general/description'
import DisplayName from '@/modules/community/settings/general/display-name'
import Logo from '@/modules/community/settings/general/logo'
import SocialConnection from '@/modules/community/settings/general/social-connections'
import CommunityStore from '@/store/local/community'
import NewCommunityStore, { stateToUpdateCommunityRequest } from '@/store/local/new-community'
import { GlobalStoreModel } from '@/store/store'
import { uploadFileForCommunity } from '@/utils/file'
import { PositiveButton } from '@/widgets/buttons'
import { HorizontalFullWidth, VerticalFullWidth } from '@/widgets/orientation'
import { Divider, Gap } from '@/widgets/separator'

const VerticalFrame = tw(VerticalFullWidth)`
  w-2/3
  max-2xl:px-12
  max-lg:px-6
  max-md:w-full
  py-4
  px-36
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
  const updateMyCommunities = useStoreActions<GlobalStoreModel>(
    (action) => action.updateMyCommunities
  )

  // local state
  const [loading, setLoading] = useState<boolean>(false)

  const onSaveClicked = async () => {
    setLoading(true)

    try {
      // upload avatar
      if (avatar) {
        const result = await uploadFileForCommunity(avatar, community.handle)
        if (result.error) {
          toast.error(result.error)
          return
        }
      }

      const state = store.getState()

      const payload = stateToUpdateCommunityRequest(state, community.handle)

      const { error, data } = await updateCommunityApi(payload)
      if (error) {
        toast.error(error)
        setLoading(false)
        return
      }

      if (data) {
        // update the community store
        setSelectedCommunity(data.community)

        // update the my communities so that it updates the navigation logo image
        updateMyCommunities(data.community)
        toast.success('Community is updated successfully')
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <VerticalFrame>
      <DisplayName />
      <Gap />
      <Description />
      <Gap />
      <Logo />
      <SocialConnection />
      <Gap />
      <Divider />
      <Gap />
      <HorizontalFullWidthEnd>
        <PositiveButton width={SizeEnum.x48} onClick={onSaveClicked} loading={loading}>
          {'Save'}
        </PositiveButton>
      </HorizontalFullWidthEnd>
    </VerticalFrame>
  )
}

export default General
