'use client'
import { FunctionComponent } from 'react'

import parseHtml from 'html-react-parser'
import Image from 'next/image'
import styled from 'styled-components'
import tw from 'twin.macro'

import { StorageConst } from '@/constants/storage.const'
import { Gap } from '@/styles/common.style'
import {
  Card,
  CardBox,
  DesQ,
  EndBoarding,
  HeaderBox,
  PointText,
  StartBoarding,
  TitleQuestBox,
} from '@/styles/questboard.style'
import { QuestType } from '@/utils/type'

const OuterBox = styled.div<{
  isTemplate: boolean
}>(({ isTemplate }) => [
  tw`
    cursor-pointer
    rounded-lg
    border-solid
    border-gray-200
    border-[1px]
    h-[300px]
    max-lg:h-[300px]
    w-full
    flex
    flex-col
    hover:shadow-lg
    justify-center
    items-center
  `,
  isTemplate && tw`bg-white border-gray-200`,
])

export const QuestCard: FunctionComponent<{
  quest: QuestType
  isTemplate: boolean
  onClick?: (e: QuestType) => void
}> = ({ quest, isTemplate, onClick }) => {
  return (
    <OuterBox isTemplate={isTemplate} onClick={onClick}>
      <StartBoarding>
        <TitleQuestBox>{quest.title}</TitleQuestBox>
        <Gap height={4} />
        <DesQ>{parseHtml(quest.description ?? '')}</DesQ>
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
          <PointText>
            {quest.rewards?.length && quest.rewards[0].data.points}
          </PointText>
        </HeaderBox>
        <CardBox>
          {quest.recurrence && (
            <CardBox>
              <Card>{quest.recurrence.toUpperCase()}</Card>
              <Gap width={2} />
            </CardBox>
          )}
          <Gap width={2} />
        </CardBox>
      </EndBoarding>
    </OuterBox>
  )
}
