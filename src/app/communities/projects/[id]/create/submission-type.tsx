'use client'

import { Fragment, useEffect, useRef, useState, FunctionComponent } from 'react'
import Image from 'next/image'
import { LabelInput } from '@/styles/myProjects.style'
import { Divider, Gap, SpinnerStyle } from '@/styles/common.style'
import {
  BlockBox,
  BtnUseT,
  BtnWrap,
  CBox,
  CCard,
  CHeadling,
  CMain,
  CPBox,
  CSide,
  CSideCard,
  ICard,
  ImageQuestBox,
  ItemSide,
  ITypeBox,
  LabelCheckText,
  LabelDes,
  LvBox,
  PersonDes,
  PersonInfoBox,
  PersonName,
  PersonWrap,
  PICard,
  PointBox,
  PointInput,
  TitleBox,
  TwitterBox,
  TypeBox,
  UnderText,
  Wrap,
} from '@/styles/questboard.style'

import {
  ActionList,
  ActiveEnum,
  QuestRecurrences,
  QuestRewards,
  QuestTypeEnum,
  QuestTypes,
  SubmissionEnum,
  TwitterEnum,
} from '@/constants/project.const'

const SubmissionType: FunctionComponent<{
  activeType: number
}> = ({ activeType }) => {
  const listTypeItems = QuestTypes.map((e, i) => (
    <TypeBox
      active={activeType === i}
      key={i}
      onClick={() => {
        // setActiveType(i)
      }}
    >
      {e}
    </TypeBox>
  ))

  return (
    <ICard>
      <PICard>
        <LabelInput>{'SUBMISSION TYPE'}</LabelInput>
        <Gap height={2} />
        <ITypeBox>{listTypeItems}</ITypeBox>
      </PICard>
    </ICard>
  )
}

export default SubmissionType
