import { uploadCommunityLogo, uploadImageApi } from '@/app/api/client/upload'
import { ReturnTuple } from '@/utils/type'

export async function uploadFile(
  fileUpload: File[]
): Promise<ReturnTuple<string>> {
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
  communityId: string
): Promise<ReturnTuple<string>> {
  let formData = new FormData()
  if (file.length === 0) {
    return {
      error: 'Must upload file',
    }
  }

  formData.append('image', file || '')
  formData.append('community_handle', communityId)
  try {
    const data = await uploadCommunityLogo(formData)
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
