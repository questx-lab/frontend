'use client'
import {
  FunctionComponent,
  useState,
} from 'react';

import tw from 'twin.macro';

import Communities from '@/modules/community/communities';
import CreateCommunity from '@/modules/community/create-community';
import { CommunityStore } from '@/store/local/community.store';
import {
  Divider,
  TitleBox,
} from '@/styles/common.style';
import { ModalBox } from '@/styles/quest-review.style';
import { MainLayout } from '@/widgets/main-layout';
import { BaseModal } from '@/widgets/modal';
import {
  Horizontal,
  Vertical,
} from '@/widgets/orientation';
import { PlusIcon } from '@heroicons/react/24/outline';

const Main = tw(Vertical)`
  max-sm:px-2
  md:px-8
  xl:w-[980px]
  pb-[30px]
  w-full
`

const SuperLargeText = tw.p`
  text-3xl
  text-black
  font-bold
  max-sm:text-2xl
`


const CreateProjectBtn = tw(Horizontal)`
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

const NewCommunity: FunctionComponent<{
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
    <MainLayout title='👋 Communities'>
      <TitleBox>
        <SuperLargeText>{'👋 Communities'}</SuperLargeText>
        <NewCommunity setOpen={setOpen} />
      </TitleBox>
      <Divider />
      <Main>
        <CommunityStore.Provider>
          <Communities />
        </CommunityStore.Provider>
      </Main>

      <BaseModal isOpen={isOpen}>
        <ModalBox>
          <CreateCommunity setOpen={setOpen} />
        </ModalBox>
      </BaseModal>
    </MainLayout>
  )
}
