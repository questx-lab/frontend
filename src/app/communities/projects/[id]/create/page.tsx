'use client'

import { Fragment, useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import { DotLoader } from 'react-spinners'

import { getProjectApi } from '@/app/api/client/project'
import Layout from '@/components/layouts/layout'
import SidebarCustom from '@/components/layouts/sidebar'

import { useStoreState } from '@/store/store'
import { Gap, SpinnerStyle } from '@/styles/common.style'
import {
  DesModal,
  DialogPannel,
  ModalBg,
  ModalContent,
  ModalWrap,
  TitleModal,
  WrapProgressBar,
} from '@/styles/modal.style'
import { CMain, Wrap } from '@/styles/questboard.style'
import { ProjectType } from '@/types/project.type'
import { Dialog, Transition } from '@headlessui/react'

import ControlPanel from '../../../../../modules/new-quest/control-panel'
import { NewQuestStore } from '@/modules/new-quest/store'
import QuestFrame from '@/modules/new-quest/new-quest'

export default function Questboard({ params }: { params: { id: string } }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [project, setProject] = useState<ProjectType>()

  const projectState = useStoreState((state) => state.project.curProject)

  useEffect(() => {
    projectState && setProject(projectState)
  }, [projectState])

  useEffect(() => {
    getProject()
  }, [])

  const getProject = async () => {
    try {
      const rs = await getProjectApi(params.id)
    } catch (error) {
      toast.error('error')
    }
  }

  return (
    <Layout>
      <header>
        <title>{'Create Questboard'}</title>
      </header>

      <Wrap>
        <SidebarCustom />
        <CMain>
          <ControlPanel />

          <NewQuestStore.Provider>
            <QuestFrame id={params.id} />
          </NewQuestStore.Provider>
        </CMain>
      </Wrap>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <ModalBg />
          </Transition.Child>
          <ModalWrap>
            <ModalContent>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <DialogPannel>
                  <WrapProgressBar>
                    <DotLoader
                      color={'#000'}
                      loading={true}
                      cssOverride={SpinnerStyle}
                      size={150}
                      aria-label='Loading Spinner'
                      data-testid='loader'
                    />
                  </WrapProgressBar>
                  <Gap height={6} />
                  <TitleModal>{'Hang in there'}</TitleModal>
                  <Gap height={6} />
                  <DesModal>{"We're creating quest,"}</DesModal>
                  <DesModal>{'It might take some minutes.'}</DesModal>
                </DialogPannel>
              </Transition.Child>
            </ModalContent>
          </ModalWrap>
        </Dialog>
      </Transition>
    </Layout>
  )
}
