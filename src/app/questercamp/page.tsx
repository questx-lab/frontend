'use client'

import { useEffect, useState } from 'react'

import tw from 'twin.macro'

import { listQuestApi } from '@/app/api/client/quest'
import { QuestListView } from '@/modules/quests/quest-list'
import { CommunityStore } from '@/store/local/community.store'
import { Divider } from '@/styles/common.style'
import { TitleCreatedProject } from '@/styles/myProjects.style'
import { TitleBox, WrapQuestboard } from '@/styles/questboard.style'
import { QuestType } from '@/types/project.type'
import { MainLayout } from '@/widgets/main-layout'
import { Horizontal, Vertical } from '@/widgets/orientation'
import { SearchInput } from '@/widgets/search-input'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'

const FSearchWrap = tw(Horizontal)`
  w-full gap-3 py-3
`

const FWrap = tw(Vertical)`
  py-2
  w-full
`
const FFitlerBox = tw(Horizontal)`
  gap-3
  border
  border-solid
  border-gray-300
  py-2 px-3
  rounded-lg
  items-center
`

const Main = tw(Vertical)`
  px-64
  3xl:px-96
  pb-[30px]
  max-xl:px-[100px]
  w-full
`

export default function QuestCamp() {
  const [quests, setQuests] = useState<QuestType[]>([])

  const setQuery = async (value: string) => {
    const data = await listQuestApi('', value)
    if (data && data.data) {
      setQuests(data.data.quests)
    }
  }

  useEffect(() => {
    setQuery('')
  }, [])

  return (
    <MainLayout title='⚡ QuesterCamp'>
      <TitleBox>
        <TitleCreatedProject>{'⚡ QuesterCamp'}</TitleCreatedProject>
      </TitleBox>
      <Divider />

      <Main>
        <FWrap>
          <FSearchWrap>
            <SearchInput
              hint={'Search Community'}
              onChanged={(value) => setQuery(value)}
            />
            <FFitlerBox>
              <AdjustmentsHorizontalIcon className='w-5 h-5' />
              {'Filter'}
            </FFitlerBox>
          </FSearchWrap>
        </FWrap>
        <WrapQuestboard>
          <CommunityStore.Provider>
            <QuestListView questList={quests} />
          </CommunityStore.Provider>
        </WrapQuestboard>
      </Main>
    </MainLayout>
  )
}
