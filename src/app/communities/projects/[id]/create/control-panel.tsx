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
  QuestRecurrence,
  QuestRewards,
  QuestTypeEnum,
  QuestTypes,
  SubmissionEnum,
  TwitterEnum,
} from '@/constants/project.const'

const ControlPanel: FunctionComponent<{}> = () => {
  return (
    <>
      <CSide>
        <PersonWrap>
          <ImageQuestBox
            width={80}
            height={80}
            src={'/images/dummy/1.svg'}
            alt={'Avatar'}
          />
          <Gap height={6} />
          <PersonInfoBox>
            <PersonName>{'ThanhChi'}</PersonName>
            <Gap width={1} />
            <LvBox>{'lvl.3'}</LvBox>
          </PersonInfoBox>
          <Gap height={3} />
          <PersonDes>
            {'Short description. Lorem ipsum dolor sit amt, consectetur'}
          </PersonDes>
        </PersonWrap>
        <Divider />
        <CPBox>
          <ItemSide>
            <Image
              width={30}
              height={30}
              src={'/images/icons/bolt.svg'}
              alt={'logo'}
            />
            <Gap width={2} />
            {'QUESTS'}
          </ItemSide>
          <ItemSide>
            <Image
              width={30}
              height={30}
              src={'/images/icons/bolt.svg'}
              alt={'logo'}
            />
            <Gap width={2} />
            {'REVIEW SUBMISSION'}
          </ItemSide>
          <ItemSide>
            <Image
              width={30}
              height={30}
              src={'/images/icons/bolt.svg'}
              alt={'logo'}
            />
            <Gap width={2} />
            {'SETTINGS'}
          </ItemSide>
        </CPBox>
      </CSide>
    </>
  )
}

export default ControlPanel
