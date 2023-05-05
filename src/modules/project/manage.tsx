'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { listQuestApi } from '@/app/api/client/quest'
import SidebarCustom from '@/components/sidebar'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import { QuestDetail } from '@/modules/project/quest-detail'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { NewProjectStore } from '@/store/local/project.store'
import { PSave } from '@/styles/button.style'
import { Gap } from '@/styles/common.style'
import { HeaderText } from '@/styles/home.style'
import { QTWrap } from '@/styles/leaderboard.style'
import { MDHead, ModalBox, ModalContent } from '@/styles/quest-review.style'
import {
  Boarding,
  BoardingCard,
  BtnUseT,
  Card,
  CardBox,
  CCBox,
  CHeadling,
  DesQ,
  EndBoarding,
  HeaderBox,
  MBox,
  MHeader,
  MMain,
  MPadding,
  Mtemplate,
  MTitleBox,
  PointText,
  QuestboardBox,
  SeeAllText,
  StartBoarding,
  TitleQuestBox,
  Wrap,
  WrapQuestboard,
} from '@/styles/questboard.style'
import { ProjectType, QuestType } from '@/types/project.type'
import { BaseModal, TemplateModal } from '@/widgets/modal'
import { SmallSpinner } from '@/widgets/spinner'
import { XMarkIcon } from '@heroicons/react/20/solid'

import ControlPanel from '../new-quest/control-panel'
import QuestFrame from '../new-quest/quest-frame'

export default function ManageProject({ project }: { project: ProjectType }) {
  const router = useRouter()
  const [questList, setListQuests] = useState<QuestType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [openTemplate, setOpenTemplate] = useState<boolean>(false)

  // data
  const submisisonModalState = NewQuestStore.useStoreState(
    (state) => state.submissionModal
  )
  const questActiveState = NewQuestStore.useStoreState(
    (state) => state.questActive
  )

  // actions
  const onProjectChanged = NewProjectStore.useStoreActions(
    (actions) => actions.onProjectChanged
  )
  const onQuestActiveChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onQuestActiveChanged
  )
  const onSubmissionModalChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onSubmissionModalChanged
  )

  // Handler
  const onCloseModal = () => {
    onSubmissionModalChanged(false)
  }
  const onClickQuestItem = (e: QuestType) => {
    onQuestActiveChanged(e)
    onSubmissionModalChanged(true)
  }

  useEffect(() => {
    onProjectChanged(project)
    getQuests()
  }, [])

  const getQuests = async () => {
    try {
      const data = await listQuestApi(project.id)
      if (data.error) {
        toast.error(data.error)
      }
      if (data.data) {
        setListQuests(data.data?.quests ?? [])
        setLoading(false)
      }
    } catch (error) {
      toast.error('error')
    }
  }

  const listQuests = questList && [
    <QuestboardBox
      onClick={() => router.push(RouterConst.PROJECT + project.id + '/create')}
      key={'x'}
    >
      <Image
        width={50}
        height={50}
        src={StorageConst.ADD_ICON.src}
        alt={StorageConst.ADD_ICON.alt}
      />
    </QuestboardBox>,
    ...questList.map((e) => (
      <QuestboardBox key={e.id} onClick={() => onClickQuestItem(e)}>
        <StartBoarding>
          <Gap height={4} />
          <TitleQuestBox>{`🎉 ${e.title}`}</TitleQuestBox>
          <Gap height={4} />
          <DesQ>
            {e.description ?? 'Please visit Manta Network official website'}
          </DesQ>
        </StartBoarding>
        <EndBoarding>
          <HeaderBox>
            <Image
              width={25}
              height={25}
              src={StorageConst.POINT_ICON.src}
              alt={StorageConst.POINT_ICON.alt}
            />
            <Gap width={2} />
            <PointText>{`300 Gems`}</PointText>
          </HeaderBox>
          {e.recurrence && (
            <CardBox>
              <Card>{e.recurrence.toUpperCase()}</Card>
              <Gap width={2} />
            </CardBox>
          )}
        </EndBoarding>
      </QuestboardBox>
    )),
  ]

  const listBoarding = [0, 1, 2, 3].map((e) => (
    <BoardingCard manage key={e}>
      <StartBoarding>
        <TitleQuestBox>{'Join Discord 👾'}</TitleQuestBox>
        <Gap height={4} />
        <DesQ>
          {'Get a Discord Role and introduce yourself to the community.'}
        </DesQ>
      </StartBoarding>
      <EndBoarding>
        <HeaderBox>
          <Image
            width={25}
            height={25}
            src={StorageConst.POINT_ICON.src}
            alt={StorageConst.POINT_ICON.alt}
          />
          <Gap width={2} />
          <PointText>{'N/A'}</PointText>
        </HeaderBox>
        <CardBox>
          <Card>{'DAILY'}</Card>
          <Gap width={2} />
        </CardBox>
      </EndBoarding>
    </BoardingCard>
  ))

  const EmptyQuest = () => <div>{'There are currently no quests'}</div>

  return (
    <Wrap>
      <SidebarCustom />
      <MMain>
        <ControlPanel projectId={project.id} />
        <CCBox>
          <MBox>
            <MPadding>
              <MHeader>
                <CHeadling>{'Quest'}</CHeadling>
                <CardBox>
                  <BtnUseT onClick={() => setOpenTemplate(true)}>
                    {'Use Template'}
                  </BtnUseT>
                  <Gap width={4} />
                  <PSave
                    onClick={() =>
                      router.push(RouterConst.PROJECT + project.id + '/create')
                    }
                    isBlock={false}
                  >
                    {'+  Create Quest'}
                  </PSave>
                </CardBox>
              </MHeader>
            </MPadding>
            <Gap height={6} />
            <Mtemplate>
              <MTitleBox>
                <HeaderText>{'🌟 Templates'}</HeaderText>
                <SeeAllText>{'See all Templates'}</SeeAllText>
              </MTitleBox>
              <Gap height={6} />
              <Boarding>{listBoarding}</Boarding>
            </Mtemplate>
            <Gap height={6} />

            <MPadding>
              <QTWrap>
                <HeaderText>{'👋 Onboarding'}</HeaderText>
                <Gap height={6} />
                {/* <Divider /> */}
                {loading && <SmallSpinner />}
                {!loading && (
                  <WrapQuestboard>
                    {!questList.length ? <EmptyQuest /> : listQuests}
                  </WrapQuestboard>
                )}
                <Gap height={6} />
                <HeaderText>{'👌 Invite'}</HeaderText>
                <Gap height={6} />
                {/* <Divider /> */}
                {loading && <SmallSpinner />}
                {!loading && (
                  <WrapQuestboard>
                    {!questList.length ? <EmptyQuest /> : listQuests}
                  </WrapQuestboard>
                )}
              </QTWrap>
            </MPadding>
          </MBox>
        </CCBox>
      </MMain>
      <TemplateModal
        title='Template'
        isOpen={openTemplate}
        onClose={() => setOpenTemplate(false)}
      >
        <QuestFrame isTemplate id={project.id} />
      </TemplateModal>
      <BaseModal isOpen={submisisonModalState}>
        <ModalBox>
          <ModalContent>
            <MDHead>
              {'Invite 2 fren to join our crew3 🤲'}
              <XMarkIcon
                className='w-7 h-7 cursor-pointer'
                onClick={onCloseModal}
              />
            </MDHead>
            <QuestDetail quest={questActiveState} />
          </ModalContent>
        </ModalBox>
      </BaseModal>
    </Wrap>
  )
}
