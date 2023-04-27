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
  SubmissionEnum,
} from '@/constants/project.const'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import { useStoreState } from '@/store/store'
import { BtnCreateQuest, BtnDraft } from '@/styles/button.style'
import { Divider, Gap, SpinnerStyle } from '@/styles/common.style'
import {
  InputBox,
  InputInviteBox,
  InputTeleBox,
  MulInputBox,
} from '@/styles/input.style'
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
  TwitterBox,
  TypeBox,
  UnderText,
  Wrap,
} from '@/styles/questboard.style'
import {
  ProjectType,
  ReqNewQuestType,
  ValidationQuest,
} from '@/types/project.type'
import { Dialog, Transition } from '@headlessui/react'
import ControlPanel from './control-panel'
import SubmissionType from './submission-type'

const ActionView: FunctionComponent<{ activeType: SubmissionEnum }> = ({
  activeType,
}) => {
  switch (activeType) {
    case SubmissionEnum.URL:
      return <></>
    case SubmissionEnum.TEXT:
      return (
        <PICard>
          <Gap height={6} />
          <TBox>
            <TCheckBox
              // checked={textAutoValid}
              // onChange={}
              id='inline-checked-checkbox'
              type='checkbox'
            />
            <Gap width={4} />
            <LabelCheckText>{'Autovalidate'}</LabelCheckText>
          </TBox>

          {/* {textAutoValid && (
            <>
              <Gap height={4} />
              <LabelInput>{'Correct Answer'}</LabelInput>
              <Gap height={2} />
              <InputBox ref={textAnserRef} placeholder='' />
              <Gap height={2} />
              <LabelDes>{'Leave empty for accepting any value'}</LabelDes>
            </>
          )} */}
        </PICard>
      )
  }
  return <></>
}

export default function Questboard({ params }: { params: { id: string } }) {
  const [quest, setQuest] = useState<{}>({})

  const [activeType, setActiveType] = useState<number>(0)
  const [activeRecurrence, setActiveRecurrence] = useState<number>(0)
  const [activeReward, setActiveReward] = useState<number>(0)
  const [activeSide, setActiveSide] = useState<number>(0)
  const [project, setProject] = useState<ProjectType>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [questDescription, setQuestDescription] = useState<string>('')
  const [emptyAutoValid, setEmptyAutoValid] = useState<boolean>(true)
  const [pendingPermission, setPendingPermission] = useState<boolean>(true)
  const [hasPermission, setHasPermission] = useState<boolean>(false)

  const projectState = useStoreState((state) => state.project.curProject)
  const userState = useStoreState((state) => state.userSession.user)

  const titleRef = useRef<HTMLInputElement>(null)
  const followTwRef = useRef<HTMLInputElement>(null)
  const tweetTwRef = useRef<HTMLInputElement>(null)
  const replyTwRef = useRef<HTMLTextAreaElement>(null)
  const contentTwRef = useRef<HTMLTextAreaElement>(null)
  const joinSpaceTwRef = useRef<HTMLInputElement>(null)
  const visitLinkRef = useRef<HTMLInputElement>(null)
  const pointRewardRef = useRef<HTMLInputElement>(null)
  const textAnserRef = useRef<HTMLInputElement>(null)
  const telegramLinkRef = useRef<HTMLInputElement>(null)
  const inviteRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

  useEffect(() => {
    projectState && setProject(projectState)
  }, [projectState])

  useEffect(() => {
    getProject()
  }, [])

  const getProject = async () => {
    try {
      setPendingPermission(true)
      const rs = await getProjectApi(params.id)
      if (rs.error) {
        setHasPermission(false)
      } else {
        if (userState && userState.id === rs.data?.project.created_by) {
          setHasPermission(true)
        } else {
          setHasPermission(false)
        }
      }
      setPendingPermission(false)
    } catch (error) {
      toast.error('error')
      setPendingPermission(false)
    }
  }

  const listTypeItems = QuestTypes.map((e, i) => (
    <TypeBox
      active={activeType === i}
      key={i}
      onClick={() => {
        setActiveType(i)
      }}
    >
      {e}
    </TypeBox>
  ))

  const onChangeEditor = (val: string) => {
    setQuestDescription(val)
  }

  const listRewards = QuestRewards.map((e, i) => (
    <TypeBox
      active={activeReward === i}
      key={i}
      onClick={() => {
        setActiveReward(i)
      }}
    >
      {e}
    </TypeBox>
  ))

  const listRecurrenceItems = QuestRecurrences.map((e, i) => (
    <TypeBox
      active={activeRecurrence === i}
      key={i}
      onClick={() => {
        setActiveRecurrence(i)
      }}
    >
      {e}
    </TypeBox>
  ))

  return (
    <Layout>
      <header>
        <title>{'Create Questboard'}</title>
      </header>

      <Wrap>
        <SidebarCustom />
        <CMain>
          <ControlPanel />

          <CBox>
            <CCard>
              <TitleBox>
                <Image
                  className='cursor-pointer'
                  onClick={() => router.push(RouterConst.PROJECT + params.id)}
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
                    ref={titleRef}
                    placeholder='The name of the quest is written here.'
                  />
                  <Gap height={6} />
                  <LabelInput>{'QUEST DESCRIPTION'}</LabelInput>
                  <Gap />
                  <Editor onChange={onChangeEditor} />
                </PICard>
              </ICard>
              <Gap height={8} />

              <SubmissionType activeType={0} />
              <Gap height={8} />

              <ActionView activeType={0} />

              <ICard>
                <PICard>
                  <LabelInput>{'RECURRENCE'}</LabelInput>
                  <Gap height={2} />
                  <ITypeBox>{listRecurrenceItems}</ITypeBox>
                </PICard>
              </ICard>
              <Gap height={8} />
              <BtnWrap>
                <BtnDraft>{'Draft'}</BtnDraft>
                <BtnCreateQuest>{'Publish'}</BtnCreateQuest>
              </BtnWrap>
            </CCard>

            <CSideCard>
              <BtnUseT>{'Use Template'}</BtnUseT>
              <Gap height={5} />
              <ICard>
                <PICard>
                  <LabelInput>{'REWARD'}</LabelInput>
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
                  </PointBox>

                  <Gap height={6} />
                  <UnderText>
                    {'Learn more here about how the levels are calculated.'}
                  </UnderText>
                </PICard>
              </ICard>
            </CSideCard>
          </CBox>
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
