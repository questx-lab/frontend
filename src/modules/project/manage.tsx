'use client'

import { listQuestApi } from '@/app/api/client/quest'
import ProjectSide from '@/components/sidebar'
import { RouterConst } from '@/constants/router.const'
import { Quests } from '@/modules/quests/quest-list'
import { NewProjectStore } from '@/store/local/project.store'
import { PSave } from '@/styles/button.style'
import { Gap } from '@/styles/common.style'
import { HeaderText } from '@/styles/home.style'
import {
  BtnUseT,
  CCBox,
  CHeadling,
  CardBox,
  MBox,
  MHeader,
  MMain,
  MPadding,
  MTitleBox,
  Mtemplate,
  SeeAllText,
  Wrap,
} from '@/styles/questboard.style'
import { ProjectType, QuestType } from '@/types/project.type'
import { TemplateModal } from '@/widgets/modal'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ControlPanel from '../new-quest/control-panel'
import QuestFrame from '../new-quest/quest-frame'

export default function ManageProject({ project }: { project: ProjectType }) {
  const router = useRouter()
  const [questList, setListQuests] = useState<QuestType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [openTemplate, setOpenTemplate] = useState<boolean>(false)

  // actions
  const setProject = NewProjectStore.useStoreActions(
    (actions) => actions.setProject
  )

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

            <Quests questList={questList} show={!loading} />
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
    </Wrap>
  )
}
