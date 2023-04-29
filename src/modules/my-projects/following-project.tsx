import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { listProjectsApi } from '@/app/api/client/project'
import { RouterConst } from '@/constants/router.const'
import { FullWidthBtn } from '@/styles/button.style'
import {
  Gap,
  LightText,
  RowBWrap,
  SmallTitle,
  VDevider,
} from '@/styles/common.style'
import {
  ContentProjectBox,
  ImageProjectBox,
  ProjectBox,
  TitleProjectBox,
  WrapProjects,
} from '@/styles/explore.style'
import {
  DescriptionCreatedProject,
  TitleCreatedProject,
  WrapCreatedProject,
} from '@/styles/myProjects.style'
import { ProjectType } from '@/types/project.type'

export default function FollowingProject() {
  const [projects, setProjects] = useState<ProjectType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    fetchListProjects()
  }, [])

  const fetchListProjects = async () => {
    try {
      const list = await listProjectsApi()
      setProjects(list.data!.projects)
      setLoading(false)
    } catch (error) {
      toast.error('Error while fetching projects')
      setLoading(false)
    }
  }
  const listProject =
    projects &&
    projects.map((e) => (
      <ProjectBox key={e.id}>
        <ImageProjectBox />
        <ContentProjectBox>
          <TitleProjectBox>{e.name!.toUpperCase()}</TitleProjectBox>
          <Gap height={3} />
          <LightText>{'Intro-2 Lines'}</LightText>
          <LightText>
            {'Lorem ipsum dolor sit amet, consectetur adipisc'}
          </LightText>
          <Gap height={5} />
          <RowBWrap>
            <SmallTitle>{'46 Quests'}</SmallTitle>
            <VDevider />
            <SmallTitle>{'6.54K Followers'}</SmallTitle>
          </RowBWrap>
          <Gap height={5} />
          <FullWidthBtn onClick={() => router.push(RouterConst.PROJECT + e.id)}>
            {'DETAIL'}
          </FullWidthBtn>
        </ContentProjectBox>
      </ProjectBox>
    ))

  return (
    <WrapCreatedProject>
      <TitleCreatedProject>{'Following Projects'}</TitleCreatedProject>
      <Gap />
      <DescriptionCreatedProject>
        {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sem eros, scelerisque' +
          ' sed ultricies at, egestas quis dolor'}
      </DescriptionCreatedProject>
      {!loading && <WrapProjects>{listProject}</WrapProjects>}
    </WrapCreatedProject>
  )
}
