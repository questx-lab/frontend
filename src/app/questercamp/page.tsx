'use client'

import { useEffect, useState } from 'react'

import tw from 'twin.macro'

import { listQuestApi } from '@/app/api/client/quest'
import { QuestListView } from '@/modules/quests/quest-list'
import { CommunityStore } from '@/store/local/community.store'
import { Divider, Main, TitleBox } from '@/styles/common.style'
import { WrapQuestboard } from '@/styles/questboard.style'
import { QuestType } from '@/utils/type'
import { MainLayout } from '@/widgets/main-layout'
import { Horizontal, Vertical } from '@/widgets/orientation'
import { SearchInput } from '@/widgets/search-input'
import { Large3xlText } from '@/widgets/text'
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
        <Large3xlText>{'⚡ QuesterCamp'}</Large3xlText>
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
