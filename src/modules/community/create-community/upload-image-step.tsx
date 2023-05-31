import { FunctionComponent, useState } from 'react'

import { useStoreActions } from 'easy-peasy'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { getMyCommunitiesApi } from '@/app/api/client/community'
import { RouterConst } from '@/constants/router.const'
import { AvatarUpload } from '@/modules/community/create-community/avatar-upload'
import { Main } from '@/modules/community/create-community/mini-widget'
import { NewCommunityStore } from '@/store/local/new-community.store'
import { GlobalStoreModel } from '@/store/store'
import { LabelInput } from '@/styles/input.style'
import { uploadFileForCommunity } from '@/utils/file'
import { PositiveButton } from '@/widgets/button'

export const UploadImageStep: FunctionComponent = () => {
  // data
  let [loading, setLoading] = useState<boolean>(false)

  const avatar = NewCommunityStore.useStoreState((state) => state.avatar)
  const createdCommunityHandle = NewCommunityStore.useStoreState(
    (state) => state.createdCommunityHandle
  )

  // action
  const setProjectCollab = useStoreActions<GlobalStoreModel>(
    (action) => action.setProjectCollab
  )

  let buttonText: string = 'Upload Community Profile'
  if (avatar.length === 0) {
    buttonText = 'Done'
  }

  const router = useRouter()
  const getMyProjects = async () => {
    try {
      const projects = await getMyCommunitiesApi()
      if (projects.error) {
        toast.error('Error when get your projects')
      } else {
        if (projects.data?.collaborators) {
          setProjectCollab(projects.data?.collaborators)
        }
      }
    } catch (error) {
      toast.error('Server error')
    }
  }

  const onUploadFile = async () => {
    setLoading(true)

    if (avatar && avatar.length > 0) {
      const tuple = await uploadFileForCommunity(
        avatar[0],
        createdCommunityHandle
      )
      if (tuple.error) {
        toast.error(tuple.error)
        return
      }
    }

    getMyProjects()
    router.push(RouterConst.PROJECT + createdCommunityHandle)
  }

  return (
    <Main>
      <LabelInput>{'UPLOAD COMMUNITY IMAGE'}</LabelInput>
      <AvatarUpload />
      <PositiveButton isFull={true} loading={loading} onClick={onUploadFile}>
        {buttonText}
      </PositiveButton>
    </Main>
  )
}
