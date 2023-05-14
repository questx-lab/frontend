'use client'
import { FunctionComponent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import tw from 'twin.macro'

import { getTemplates } from '@/app/api/client/quest'
import { QuestCard } from '@/modules/project/quest-card'
import { Gap } from '@/styles/common.style'
import { HeaderText } from '@/styles/home.style'
import { QuestType } from '@/types/project.type'

export const Mtemplate = tw.div`
  px-16
  bg-gray-100
  border
  border-[1px]
  border-solid
  border-gray-200
  py-6
`

export const MTitleBox = tw.div`
  flex
  flex-row
  justify-between
  items-center
`

export const SeeAllText = tw.p`
  text-lg
  text-primary
  font-medium
  cursor-pointer
`

export const Templates: FunctionComponent<{}> = ({}) => {
  const [templates, setTemplates] = useState<QuestType[]>([])

  useEffect(() => {
    getQuests()
  }, [])

  const getQuests = async () => {
    try {
      const data = await getTemplates()
      if (data.error) {
        toast.error(data.error)
      }
      if (data.data) {
        console.log('Data = ', data.data)
        setTemplates(data.data.quests)
      }
    } catch (error) {
      toast.error('error')
    }
  }

  const cardList = templates.map((e, i) => (
    <QuestCard quest={e} manage={true} isTemplate={true} key={i}></QuestCard>
  ))

  return (
    <Mtemplate>
      <MTitleBox>
        <HeaderText>{'🌟 Templates'}</HeaderText>
        <SeeAllText>{'See all Templates'}</SeeAllText>
      </MTitleBox>
      <Gap height={6} />

      {cardList}
    </Mtemplate>
  )
}
