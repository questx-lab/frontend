'use client'
import { FunctionComponent } from 'react'

import { useStoreState } from 'easy-peasy'
import tw from 'twin.macro'

import { ActiveQuestStore } from '@/store/local/active-quest.store'
import { GlobalStoreModel } from '@/store/store'
import { QuestType } from '@/utils/type'
import CarouselList from '@/widgets/carousel'
import CategoryBox from '@/widgets/CategoryBox'
import { Horizontal } from '@/widgets/orientation'

import { QuestView } from '../quests/single-quest'

export const Mtemplate = tw.div`
  px-16
  bg-gray-100
  border
  border-[1px]
  border-solid
  border-gray-200
  py-6
`

export const MTitleBox = tw(Horizontal)`
  justify-between
  items-center
`

export const SeeAllText = tw.p`
  text-lg
  text-primary
  font-medium
  cursor-pointer
`

export const Templates: FunctionComponent<{
  setOpenTemplate?: (e: boolean) => void
}> = ({ setOpenTemplate }) => {
  const templates = useStoreState<GlobalStoreModel>((state) => state.templates)

  if (templates === undefined || templates.length === 0) {
    return <></>
  }

  return (
    <Mtemplate>
      <CategoryBox title='🌟 Templates' onClick={() => {}}>
        <ActiveQuestStore.Provider>
          <CarouselList
            data={templates}
            renderItemFunc={(quest: QuestType) => {
              return (
                <QuestView
                  quest={quest}
                  isTemplate
                  setOpenTemplateModel={setOpenTemplate}
                />
              )
            }}
          />
        </ActiveQuestStore.Provider>
      </CategoryBox>
    </Mtemplate>
  )
}
