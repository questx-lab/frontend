'use client'

import { Fragment, useEffect, useRef, useState, FunctionComponent } from 'react'
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

const TwitterList: FunctionComponent<{
  pendingPermission: boolean
  hasPermission: boolean
}> = ({ pendingPermission, hasPermission }) => {
  return <></>
  // const listTwitterAction = ActionList.map((e, i) => {
  //   let block = false

  //   if (actionTwitter.includes(TwitterEnum.FOLLOW)) {
  //     if (i !== TwitterEnum.FOLLOW) {
  //       block = true
  //     } else {
  //       block = false
  //     }
  //   }

  //   if (actionTwitter.includes(TwitterEnum.TWEET)) {
  //     if (i !== TwitterEnum.TWEET) {
  //       block = true
  //     } else {
  //       block = false
  //     }
  //   }

  //   if (actionTwitter.includes(TwitterEnum.JOIN_SPACE)) {
  //     if (i !== 5) {
  //       block = true
  //     } else {
  //       block = false
  //     }
  //   }

  //   if (
  //     actionTwitter.includes(TwitterEnum.LIKE) ||
  //     actionTwitter.includes(TwitterEnum.REPLY) ||
  //     actionTwitter.includes(TwitterEnum.RETWEET)
  //   ) {
  //     if (
  //       i !== TwitterEnum.LIKE &&
  //       i !== TwitterEnum.REPLY &&
  //       i !== TwitterEnum.RETWEET
  //     ) {
  //       block = true
  //     } else {
  //       block = false
  //     }
  //   }

  //   const handleActive = () => {
  //     if (!actionTwitter.includes(i)) {
  //       setActionTwitter([...actionTwitter, i])
  //     } else {
  //       setActionTwitter(actionTwitter.filter((e) => e !== i))
  //     }
  //   }

  //   let active = ActiveEnum.NONE

  //   if (block) {
  //     active = ActiveEnum.BLOCK
  //   }

  //   if (actionTwitter.includes(i)) {
  //     active = ActiveEnum.ACTIVE
  //   }

  //   return (
  //     <TwitterBox
  //       active={active}
  //       key={i}
  //       onClick={block ? undefined : handleActive}
  //     >
  //       {e.name}
  //     </TwitterBox>
  //   )
  // })

  // return (
  //   <>
  //     <PICard>
  //       <LabelInput>{'ACTION'}</LabelInput>
  //       <Gap height={2} />
  //       <ITypeBox>{listTwitterAction}</ITypeBox>
  //     </PICard>
  //   </>
  // )
}

export default TwitterList
