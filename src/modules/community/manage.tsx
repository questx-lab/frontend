'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { listQuestApi } from '@/app/api/client/quest'
import ProjectSide from '@/components/sidebar'
import { RouterConst } from '@/constants/router.const'
import { Templates } from '@/modules/community/templates'
import { Quests } from '@/modules/quests/quest-list'
import { CommunityStore } from '@/store/local/community.store'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { PSave } from '@/styles/button.style'
import { Gap } from '@/styles/common.style'
import {
  BtnUseT,
  CardBox,
  CCBox,
  CHeadling,
  MBox,
  MHeader,
  MMain,
  MPadding,
  Wrap,
} from '@/styles/questboard.style'
import { QuestType } from '@/utils/type'
import { BasicModal } from '@/widgets/modal'

import ControlPanel from '../new-quest/control-panel'
import QuestFrame from '../new-quest/quest-frame'
import Category from './category'

export default function ManageProject() {
  const router = useRouter()
  const [questList, setListQuests] = useState<QuestType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [openTemplate, setOpenTemplate] = useState<boolean>(false)

  const project = CommunityStore.useStoreState((state) => state.project)

  useEffect(() => {
    getQuests()
  }, [])

  const getQuests = async () => {
    try {
      const data = await listQuestApi(project.id, '')
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
      <ProjectSide activeCommunityId={project.id} />
      <NewQuestStore.Provider>
        <MMain>
          <ControlPanel communityId={project.id} />
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
                        router.push(
                          RouterConst.PROJECT + project.id + '/create'
                        )
                      }
                      isBlock={false}
                    >
                      {'+  Create Quest'}
                    </PSave>
                  </CardBox>
                </MHeader>
              </MPadding>
              <Gap height={6} />
              <Templates setOpenTemplate={setOpenTemplate} />

              <Gap height={6} />
              <MPadding>
                <Category />
                <Quests questList={questList} show={!loading} />
              </MPadding>
            </MBox>
          </CCBox>
        </MMain>
        <BasicModal
          title={`🎉 Template`}
          isOpen={openTemplate}
          onClose={() => setOpenTemplate(false)}
          styled='flex flex-col !justify-start !items-start !w-5/6'
        >
          <QuestFrame isTemplate id={project.id} />
        </BasicModal>
      </NewQuestStore.Provider>
    </Wrap>
  )
}
