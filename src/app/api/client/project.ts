import { EnvVariables } from '@/constants/env.const'
import { ReqNewProject } from '@/types/project.type'

import { api } from '../config/api'

export const NewProjectApi = async (body: ReqNewProject) => {
  console.log(body)
  const rs = await api.post(
    EnvVariables.NEXT_PUBLIC_API_URL + '/createProject',
    body
  )
  return rs.data
}
