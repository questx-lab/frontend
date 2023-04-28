'use client'

import { Fragment, FunctionComponent, useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Editor from '@/components/editor/page'
import { QuestTypeEnum, QuestTypeStringMap } from '@/constants/project.const'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import { useStoreState } from '@/store/store'
import { BtnCreateQuest, BtnDraft } from '@/styles/button.style'
import { Gap, SpinnerStyle } from '@/styles/common.style'
import { InputBox } from '@/styles/input.style'
import { LabelInput } from '@/styles/myProjects.style'
import {
  BtnWrap,
  CBox,
  CCard,
  CHeadling,
  ICard,
  PICard,
  TitleBox,
} from '@/styles/questboard.style'

import QuestReward from './quest-reward'
import QuestTypeView from './quest-type'
import Recurrence from './recurrence'
import { NewQuestStore } from './store'

const QuestFrame: FunctionComponent<{ id: string }> = ({ id }) => {
  const router = useRouter()

  // Data
  const title = NewQuestStore.useStoreState((state) => state.title)

  // Actions
  const onTitleChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onTitleChanged
  )
  const onDescriptionChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onDescriptionChanged
  )

  const store = NewQuestStore.useStore()
  const handleSubmit = (e: any) => {
    const state = store.getState()
    const type =
      state.questType !== QuestTypeStringMap.get(QuestTypeEnum.TWITTER)
        ? state.questType
        : state.twitterType
    // const payload: ReqNewQuestType = {
    //   project_id: id,
    //   type,
    //   title: state.title,
    //   description: state.description,
    //   categories: [],
    //   recurrence: state.recurrence,
    //   rewards: [
    //     {
    //       type: 'points',
    //       data: {
    //         points: state.pointReward,
    //       },
    //     },
    //   ],
    //   condition_op: 'and',
    //   conditions: [],
    // }
    // TODO: Convert the state to a model that can be submitted to the server side.
  }

  return (
    <>
      <CBox>
        <CCard>
          <TitleBox>
            <Image
              className='cursor-pointer'
              onClick={() => router.push(RouterConst.PROJECT + id)}
              width={35}
              height={35}
              src={StorageConst.ARROW_BACK_ICON.src}
              alt={StorageConst.ARROW_BACK_ICON.alt}
            />
            <Gap width={3} />
            <CHeadling>{'Create Quest'}</CHeadling>
          </TitleBox>
          <Gap height={8} />

          <ICard>
            <PICard>
              <LabelInput>{'QUEST TITLE'}</LabelInput>
              <Gap />
              <InputBox
                value={title}
                placeholder='The name of the quest is written here.'
                onChange={(e) => onTitleChanged(e.target.value)}
              />
              <Gap height={6} />
              <LabelInput>{'QUEST DESCRIPTION'}</LabelInput>
              <Gap />
              <Editor onChange={(value) => onDescriptionChanged(value)} />
            </PICard>
          </ICard>
          <Gap height={8} />

          <QuestTypeView />
          <Gap height={8} />

          <Recurrence />
          <Gap height={8} />

          <BtnWrap>
            <BtnDraft>{'Draft'}</BtnDraft>
            <BtnCreateQuest onClick={handleSubmit}>{'Publish'}</BtnCreateQuest>
          </BtnWrap>
        </CCard>
        <QuestReward />
      </CBox>
    </>
  )
}

export default QuestFrame
