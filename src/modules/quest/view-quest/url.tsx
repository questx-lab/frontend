import { FC } from 'react'

import tw from 'twin.macro'

import { CommunityRoleEnum } from '@/constants/common.const'
import ActiveQuestStore from '@/store/local/active-quest'
import CommunityStore from '@/store/local/community'
import { TextField } from '@/widgets/form'
import { Horizontal } from '@/widgets/orientation'

const UrlBox = tw(Horizontal)`
  w-full
  border
  border-primary
  border-solid
  p-3
  rounded-lg
  items-center
`

const QuestUrl: FC = () => {
  // data
  const role = CommunityStore.useStoreState((state) => state.role)
  const urlSubmit = ActiveQuestStore.useStoreState((state) => state.url)

  // action
  const setUrlSubmit = ActiveQuestStore.useStoreActions((action) => action.setUrlSubmit)

  if (role === CommunityRoleEnum.GUEST) {
    return (
      <TextField
        msg='This field is required'
        placeholder='Input url'
        required
        onChange={(e) => setUrlSubmit(e.target.value)}
        value={urlSubmit}
      />
    )
  }

  return <UrlBox>{'https://sample-link.com'}</UrlBox>
}

export default QuestUrl
