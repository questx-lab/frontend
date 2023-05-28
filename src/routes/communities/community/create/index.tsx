import { CommunityRoleEnum } from '@/constants/common.const'
import { CreateOrEditQuest } from '@/modules/create-quest'
import { CommunityStore } from '@/store/local/community'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'

export const Index: FunctionComponent = () => {
  const navigate = useNavigate()
  const selectedCommunity = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const role = CommunityStore.useStoreState((state) => state.role)

  if (!selectedCommunity || role !== CommunityRoleEnum.OWNER) {
    navigate('../')
    return <></>
  }

  return <CreateOrEditQuest communityId={selectedCommunity.id}></CreateOrEditQuest>
}
