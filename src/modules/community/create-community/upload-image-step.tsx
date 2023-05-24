import { FunctionComponent } from 'react'

import { useStoreActions } from 'easy-peasy'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { getMyCommunitiesApi } from '@/app/api/client/community'
import { RouterConst } from '@/constants/router.const'
import { AvatarUpload } from '@/modules/community/create-community/avatar-upload'
import { NewCommunityStore } from '@/store/local/new-community.store'
import { GlobalStoreModel } from '@/store/store'
import { FullWidthBtn } from '@/styles/button.style'
import { LabelInput } from '@/styles/input.style'
import { uploadFileForCommunity } from '@/utils/file'

export const UploadImageStep: FunctionComponent = () => {
  // data
  const avatar = NewCommunityStore.useStoreState((state) => state.avatar)
  const createdCommunityId = NewCommunityStore.useStoreState(
    (state) => state.createdCommunityId
  )

  // action
  const setProjectCollab = useStoreActions<GlobalStoreModel>(
    (action) => action.setProjectCollab
  )

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
    const tuple = await uploadFileForCommunity(avatar[0], createdCommunityId)
    if (tuple.error) {
      toast.error(tuple.error)
    } else {
      console.log('tuple.value = ', tuple.value)
      getMyProjects()
      router.push(RouterConst.PROJECT + createdCommunityId + '/create')
    }
  }

  return (
    <>
      <LabelInput>{'UPLOAD COMMUNITY IMAGE'}</LabelInput>
      <AvatarUpload />
      <FullWidthBtn onClick={onUploadFile}>
        Upload Community Profile
      </FullWidthBtn>
    </>
  )
}
