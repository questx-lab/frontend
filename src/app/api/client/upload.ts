import { EnvVariables } from '@/constants/env.const'
import { Rsp } from '@/utils/type'

import { api } from '../config/api'

export const uploadImageApi = async (
  body: FormData
): Promise<Rsp<{ url: string }>> => {
  const { data } = await api.post(
    EnvVariables.NEXT_PUBLIC_API_URL + '/uploadImage',
    body,
    {
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    }
  )
  return data
}
