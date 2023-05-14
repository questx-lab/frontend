'use client'
import { FunctionComponent, useState } from 'react'

import tw from 'twin.macro'

import { Layout } from '@/components/layout'
import ProjectSide from '@/components/sidebar'
import FollowingProject from '@/modules/my-projects/following-project'
import CreateProject from '@/modules/project/create-community'
import { CommunityStore } from '@/store/local/community.store'
import { Divider } from '@/styles/common.style'
import { TitleCreatedProject } from '@/styles/myProjects.style'
import { ModalBox } from '@/styles/quest-review.style'
import { BaseModal } from '@/widgets/modal'
import { PlusIcon } from '@heroicons/react/24/outline'

const Wrap = tw.div`
  flex
  flex-col
  min-h-screen
  pt-[70px]
`

const Main = tw.div`
  flex
  flex-col
  px-[120px]
  pb-[30px]
  max-xl:px-[100px]
`

const TitleBox = tw.div`
  px-[120px]
  py-6
  max-xl:px-[100px]
  flex
  flex-row
  w-full
  justify-between
`

const CreateProjectBtn = tw.div`
  flex 
  flex-row 
  gap-2 
  border  
  border-solid
  border-gray-300 
  rounded-lg 
  justify-center 
  items-center 
  py-2 
  px-4 
  text-lg 
  text-black 
  font-medium  
  cursor-pointer
`

const CreateCommunity: FunctionComponent<{
  setOpen: (value: boolean) => void
}> = ({ setOpen }) => {
  return (
    <CreateProjectBtn onClick={() => setOpen(true)}>
      <PlusIcon className={'w-5 h-5 text-black'} />
      {'Create Project'}
    </CreateProjectBtn>
  )
}

export default function MyProjects() {
  const [isOpen, setOpen] = useState<boolean>(false)

  return (
    <Layout>
      <header>
        <title>{'My Projects'}</title>
      </header>
      <Wrap>
        <ProjectSide />
        <TitleBox>
          <TitleCreatedProject>{'👋 Communities'}</TitleCreatedProject>
          <CreateCommunity setOpen={setOpen} />
        </TitleBox>
        <Divider />
        <Main>
          <CommunityStore.Provider>
            <FollowingProject />
          </CommunityStore.Provider>
        </Main>
        <BaseModal isOpen={isOpen}>
          <ModalBox>
            <CreateProject setOpen={setOpen} />
          </ModalBox>
        </BaseModal>
      </Wrap>
    </Layout>
  )
}
