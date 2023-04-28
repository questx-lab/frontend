'use client'

import { Fragment, useEffect, useRef, useState, FunctionComponent } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { DotLoader } from 'react-spinners'

import { getProjectApi } from '@/app/api/client/project'
import { newQuestApi } from '@/app/api/client/quest'
import Editor from '@/components/editor/page'
import Layout from '@/components/layouts/layout'
import SidebarCustom from '@/components/layouts/sidebar'
import { Spinner } from '@/components/spinner/spinner'
import {
  ActionList,
  ActiveEnum,
  QuestRecurrences,
  QuestRewards,
  QuestTypeEnum,
  QuestTypes,
} from '@/constants/project.const'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import { useStoreState } from '@/store/store'
import { BtnCreateQuest, BtnDraft } from '@/styles/button.style'
import { Divider, Gap, SpinnerStyle } from '@/styles/common.style'
import { InputBox } from '@/styles/input.style'
import {
  DesModal,
  DialogPannel,
  ModalBg,
  ModalContent,
  ModalWrap,
  TitleModal,
  WrapProgressBar,
} from '@/styles/modal.style'
import { LabelInput } from '@/styles/myProjects.style'
import { TBox, TCheckBox } from '@/styles/quest.style'
import {
  BlockBox,
  BtnUseT,
  BtnWrap,
  CBox,
  CCard,
  CHeadling,
  CMain,
  CPBox,
  CSide,
  CSideCard,
  ICard,
  ImageQuestBox,
  ItemSide,
  ITypeBox,
  LabelCheckText,
  LabelDes,
  LvBox,
  PersonDes,
  PersonInfoBox,
  PersonName,
  PersonWrap,
  PICard,
  PointBox,
  PointInput,
  TitleBox,
  TypeBox,
  UnderText,
  Wrap,
} from '@/styles/questboard.style'
import { ProjectType, ReqNewQuestType, RewardType } from '@/types/project.type'
import { Dialog, Transition } from '@headlessui/react'
import ControlPanel from './control-panel'

import QuestTypeView from './quest-type'
import QuestDetails from './quest-details'

import { NewQuestStore } from './store'

const QuestFrame: FunctionComponent<{ id: string }> = ({ id }) => {
  const router = useRouter()

  // Data
  const title = NewQuestStore.useStoreState((state) => state.title)

  // Actions
  const onTitleChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onTitleChanged
  )
  const onDescriptionChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onDescriptionChanged
  )

  const store = NewQuestStore.useStore()
  const handleSubmit = (e: any) => {
    let state = store.getState()
    console.log('state = ', state)
  }

  return (
    <>
      <CBox>
        <CCard>
          <TitleBox>
            <Image
              className='cursor-pointer'
              onClick={() => router.push(RouterConst.PROJECT + id)}
              width={35}
              height={35}
              src={StorageConst.ARROW_BACK_ICON.src}
              alt={StorageConst.ARROW_BACK_ICON.alt}
            />
            <Gap width={3} />
            <CHeadling>{'Create Quest'}</CHeadling>
          </TitleBox>
          <Gap height={8} />

          <ICard>
            <PICard>
              <LabelInput>{'QUEST TITLE'}</LabelInput>
              <Gap />
              <InputBox
                value={title}
                placeholder='The name of the quest is written here.'
                onChange={(e) => {
                  onTitleChanged(e.target.value)
                }}
              />
              <Gap height={6} />
              <LabelInput>{'QUEST DESCRIPTION'}</LabelInput>
              <Gap />
              <Editor onChange={(value) => onDescriptionChanged(value)} />
            </PICard>
          </ICard>
          <Gap height={8} />

          <QuestTypeView />
          <Gap height={8} />

          <QuestDetails />

          {/* <ICard>
            <PICard>
              <LabelInput>{'RECURRENCE'}</LabelInput>
              <Gap height={2} />
              <ITypeBox>{listRecurrenceItems}</ITypeBox>
            </PICard>
          </ICard>
          <Gap height={8} /> */}

          <BtnWrap>
            <BtnDraft>{'Draft'}</BtnDraft>
            <BtnCreateQuest onClick={handleSubmit}>{'Publish'}</BtnCreateQuest>
          </BtnWrap>
        </CCard>

        <CSideCard>
          <BtnUseT>{'Use Template'}</BtnUseT>
          <Gap height={5} />
          <ICard>
            <PICard>
              {/* <LabelInput>{'REWARD'}</LabelInput>
              <Gap height={2} />
              <ITypeBox>{listRewards}</ITypeBox>
              <Gap height={6} />
              <PointBox>
                <Image
                  width={30}
                  height={30}
                  src={StorageConst.POINT_ICON.src}
                  alt={StorageConst.POINT_ICON.alt}
                />
                <Gap width={2} />
                <PointInput
                  ref={pointRewardRef}
                  type='number'
                  min={1}
                  defaultValue={100}
                />
              </PointBox> */}

              <Gap height={6} />
              <UnderText>
                {'Learn more here about how the levels are calculated.'}
              </UnderText>
            </PICard>
          </ICard>
        </CSideCard>
      </CBox>
    </>
  )
}

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
