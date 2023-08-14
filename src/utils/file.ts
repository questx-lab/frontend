import { uploadAvatarUserApi, uploadCommunityLogo, uploadImageApi } from '@/api/upload'
import { ReturnTuple, Rsp, UploadCommunityLogoResponse } from '@/types'

export async function uploadFile(fileUpload: File[]): Promise<ReturnTuple<string>> {
  let formData = new FormData()
  if (fileUpload.length === 0) {
    return {
      error: 'Must upload file',
    }
  }

  const file = fileUpload[0]
  formData.append('image', file || '')
  try {
    const data = await uploadImageApi(formData)
    if (data.error) {
      return {
        error: data.error,
      }
    }
    return {
      value: data?.data?.url || '',
    }
  } catch (error) {
    return {
      error: 'Error while upload file',
    }
  }
}

export async function uploadFileForCommunity(
  file: File,
  communityHandle: string
): Promise<Rsp<UploadCommunityLogoResponse>> {
  let formData = new FormData()
  if (file.length === 0) {
    return {
      code: -2,
      error: 'Must upload file',
    }
  }

  formData.append('image', file || '')
  formData.append('community_handle', communityHandle)
  try {
    const result = await uploadCommunityLogo(formData)
    return result
  } catch (error) {
    console.log('error', error)
    return {
      code: -1,
      error: 'Error while upload file',
    }
  }
}

export async function uploadFileForUser(file: File): Promise<Rsp<UploadCommunityLogoResponse>> {
  let formData = new FormData()
  if (file.length === 0) {
    return {
      code: -2,
      error: 'Must upload file',
    }
  }

  formData.append('image', file || '')

  try {
    const result = await uploadAvatarUserApi(formData)
    return result
  } catch (error) {
    return {
      code: -1,
      error: 'Error while upload file',
    }
  }
}
