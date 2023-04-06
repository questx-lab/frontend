export type ReqNewProject = {
  name: string
  introdution?: string
  telegram?: string
  projectUrl?: string
  website?: string
  discord?: string
  twitter?: string
}

export type ReqUpdateProject = {
  id: string
  twitter?: string
  discord?: string
  telegram?: string
}

export type ProjectType = {
  id?: string
  created_at?: string
  updated_at?: string
  created_by?: string
  name?: string
  twitter?: string
  discord?: string
  telegram?: string
}

export type ListProjectsType = {
  projects: ProjectType[]
}
