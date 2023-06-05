import { FunctionComponent, useState } from 'react'

import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { getMyCommunitiesApi } from '@/api/communitiy'
import { RouterConst } from '@/constants/router.const'
import { AvatarUpload } from '@/modules/create-community/avatar-upload'
import { Main } from '@/modules/create-community/mini-widget'
import NewCommunityStore from '@/store/local/new-community.store'
import { GlobalStoreModel } from '@/store/store'
import { uploadFileForCommunity } from '@/utils/file'
import { PositiveButton } from '@/widgets/buttons'
import { LabelInput } from '@/widgets/text'

export const UploadImageStep: FunctionComponent = () => {
  // hook
  const [loading, setLoading] = useState<boolean>(false)
  const navigator = useNavigate()

  // data
  const avatar = NewCommunityStore.useStoreState((state) => state.avatar)
  const createdCommunityHandle = NewCommunityStore.useStoreState(
    (state) => state.createdCommunityHandle
  )

  // action
  const setCommunitiesCollab = useStoreActions<GlobalStoreModel>(
    (action) => action.setCommunitiesCollab
  )

  let buttonText: string = 'Upload Community Profile'
  if (avatar) {
    buttonText = 'Done'
  }

  const getMyProjects = async () => {
    try {
      const projects = await getMyCommunitiesApi()
      if (projects.error) {
        // Don't show a toast here as we will navigate to the community.
      } else {
        if (projects.data?.collaborators) {
          setCommunitiesCollab(projects.data?.collaborators)
        }
      }
    } catch (error) {
      // Do nothing.
    }
  }

  const onUploadFile = async () => {
    setLoading(true)

    if (avatar) {
      const tuple = await uploadFileForCommunity(avatar, createdCommunityHandle)
      if (tuple.error) {
        toast.error(tuple.error)
        return
      }
    }

    getMyProjects()
    setLoading(false)
    navigator(RouterConst.COMMUNITIES + createdCommunityHandle)
  }

  return (
    <Main>
      <LabelInput>{'UPLOAD COMMUNITY IMAGE'}</LabelInput>
      <AvatarUpload imageSize={100} />
      <PositiveButton isFull={true} loading={loading} onClick={onUploadFile}>
        {buttonText}
      </PositiveButton>
    </Main>
  )
}
