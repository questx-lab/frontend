import { FunctionComponent } from 'react'

import { useNavigate } from 'react-router-dom'

import { CommunityRoleEnum } from '@/constants/common.const'
import { RouterConst } from '@/constants/router.const'
import { CreateOrEditQuest } from '@/modules/create-quest'
import { CommunityStore } from '@/store/local/community'

export const Index: FunctionComponent = () => {
  const navigate = useNavigate()
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const role = CommunityStore.useStoreState((state) => state.role)

  if (!community || role !== CommunityRoleEnum.OWNER) {
    navigate('../')
    return <></>
  }

  return (
    <CreateOrEditQuest
      communityHandle={community.handle}
      onQuestCreated={() => {
        navigate(RouterConst.PROJECT + community.handle)
      }}
    ></CreateOrEditQuest>
  )
}
