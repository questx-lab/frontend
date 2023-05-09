'use client'

import { useEffect, useState, FunctionComponent } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { listQuestApi } from '@/app/api/client/quest'
import ProjectSide from '@/components/sidebar'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import { QuestDetail } from '@/modules/project/quest-detail'
import { NewProjectStore } from '@/store/local/project.store'
import { PSave } from '@/styles/button.style'
import { Gap } from '@/styles/common.style'
import { HeaderText } from '@/styles/home.style'
import { QTWrap } from '@/styles/leaderboard.style'
import { MDHead, ModalBox, ModalContent } from '@/styles/quest-review.style'
import {
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

const QuestListView: FunctionComponent<{
  questList: QuestType[]
  project: ProjectType
  onClickQuestItem: (e: QuestType) => void
}> = ({ questList, project, onClickQuestItem }) => {
  if (!questList) {
    return <div>{'There are currently no quests'}</div>
  }

  const questListView = questList.map((e) => (
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
  ))

  return <>{questListView}</>
}

export default function ManageProject({ project }: { project: ProjectType }) {
  const router = useRouter()
  const [questList, setListQuests] = useState<QuestType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [openTemplate, setOpenTemplate] = useState<boolean>(false)
  const [selectedQuest, setSelectedQuest] = useState<QuestType>()

  // data

  // actions
  const setProject = NewProjectStore.useStoreActions(
    (actions) => actions.setProject
  )

  // Handler
  const onCloseModal = () => {
    setSelectedQuest(undefined)
  }

  useEffect(() => {
    setProject(project)
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

  const onItemSelected = (quest: QuestType) => {
    console.log('Quest = ', quest)
    setSelectedQuest(quest)
  }

  return (
    <Wrap>
      <ProjectSide />
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
                    <QuestListView
                      questList={questList}
                      project={project}
                      onClickQuestItem={onItemSelected}
                    />
                  </WrapQuestboard>
                )}
                <Gap height={6} />
                <HeaderText>{'👌 Invite'}</HeaderText>
                <Gap height={6} />
                {/* <Divider /> */}
                {loading && <SmallSpinner />}
                {!loading && (
                  <WrapQuestboard>
                    <QuestListView
                      questList={questList}
                      project={project}
                      onClickQuestItem={onItemSelected}
                    />
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
      <BaseModal isOpen={selectedQuest != undefined}>
        <ModalBox>
          <ModalContent className='w-2/3'>
            <MDHead>
              {'Invite 2 fren to join our crew3 🤲'}
              <XMarkIcon
                className='w-7 h-7 cursor-pointer'
                onClick={onCloseModal}
              />
            </MDHead>
            <QuestDetail quest={selectedQuest} onClose={onCloseModal} />
          </ModalContent>
        </ModalBox>
      </BaseModal>
    </Wrap>
  )
}
