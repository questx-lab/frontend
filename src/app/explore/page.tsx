'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import { FullWidthBtn } from '@/components/buttons/custom-btn.cpn'
import Layout from '@/components/layouts/layout'
import { RouterConst } from '@/constants/router.const'
import { Gap } from '@/styles/common.style'
import {
  ContentProjectBox,
  Description,
  FilterBox,
  ImageProjectBox,
  LeaderBoardBox,
  ProjectBox,
  SkeletonFirst,
  SkeletonSecond,
  Title,
  TitleProjectBox,
  Wrap,
  WrapProjects,
} from '@/styles/explore.style'
import { ProjectType } from '@/types/project.type'

import { listProjectsApi } from '../api/client/project'

export default function ExplorePage() {
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

  const listProject = projects.map((e) => (
    <ProjectBox key={e.id}>
      <ImageProjectBox />
      <ContentProjectBox>
        <TitleProjectBox>{e.name!.toUpperCase()}</TitleProjectBox>
        <SkeletonFirst />
        <SkeletonSecond />
        <FullWidthBtn
          text={'detail'.toUpperCase()}
          onClick={() => router.push(RouterConst.PROJECT + e.id)}
        />
      </ContentProjectBox>
    </ProjectBox>
  ))

  return (
    <Layout>
      <header>
        <title>{'Explore'}</title>
      </header>
      <Wrap>
        <Title>{'Explore (Show all Projects)'}</Title>
        <Gap />
        <Description>
          {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sem eros, scelerisque' +
            ' sed ultricies at, egestas quis dolor'}
        </Description>
        <Gap />
        <LeaderBoardBox>{'Leaderboard (for Projects)'}</LeaderBoardBox>
        <Gap />
        <Gap />
        <FilterBox>{'Filter / Sort'}</FilterBox>
        <Gap />

        {!loading && <WrapProjects>{listProject}</WrapProjects>}
      </Wrap>
    </Layout>
  )
}
