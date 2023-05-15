'use client'
import { FunctionComponent } from 'react'

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
import { QuestType } from '@/types/project.type'

const OuterBox = styled.div<{ isTemplate: boolean; manage: boolean }>(
  ({ isTemplate, manage }) => {
    if (!isTemplate) {
      return tw`
        cursor-pointer
        border
        rounded-lg
        border-solid
        border-gray-200
        border-[1px]
        h-[250px]
        max-lg:h-[300px]
        w-full
        flex
        flex-col
        hover:shadow-lg
        justify-center
        items-center
      `
    }

    if (manage) {
      return tw`
        cursor-pointer
        border
        rounded-lg
        border-solid
        border-gray-200
        border-[1px]
        h-[280px]
        bg-white
        max-lg:h-[350px]
        flex
        flex-col
        w-64
        mr-4
        hover:shadow-lg
      `
    }

    return tw`
      cursor-pointer
      border
      rounded-lg
      border-solid
      border-gray-200
      border-[1px]
      h-[280px]
      max-lg:h-[350px]
      flex
      flex-col
      w-64
      mr-4
      hover:shadow-lg
    `
  }
)

export const QuestCard: FunctionComponent<{
  quest: QuestType
  isTemplate: boolean
  manage: boolean
  onClick?: (e: QuestType) => void
}> = ({ quest, isTemplate, manage, onClick }) => {
  return (
    <OuterBox isTemplate={isTemplate} manage={manage} onClick={onClick}>
      <StartBoarding>
        <TitleQuestBox>{quest.title}</TitleQuestBox>
        <Gap height={4} />
        <DesQ>{quest.description}</DesQ>
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
