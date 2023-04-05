import { EnvVariables } from '@/constants/env.const'
import { Rsp } from '@/types/common.type'
import { ReqNewProject } from '@/types/project.type'

import { api } from '../config/api'

export const NewProjectApi = async (
  body: ReqNewProject
): Promise<Rsp<{ id: string }>> => {
  const rs = await api.post(
    EnvVariables.NEXT_PUBLIC_API_URL + '/createProject',
    body
  )
  return rs.data
}
