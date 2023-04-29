'use client'

import { QuestTypeEnum } from '@/constants/project.const'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { Divider, Gap } from '@/styles/common.style'
import { InputBox, InputInviteBox } from '@/styles/input.style'
import { LabelInput } from '@/styles/myProjects.style'
import { TBox, TCheckBox } from '@/styles/quest.style'
import { LabelCheckText, LabelDes, PICard } from '@/styles/questboard.style'

import TwitterList from './twitter-list'

const QuestDetails = () => {
  // Data
  const questType = NewQuestStore.useStoreState((state) => state.questType)
  const textAutoValid = NewQuestStore.useStoreState(
    (state) => state.textAutoValid
  )

  // Actions
  const onTextAutoValid = NewQuestStore.useStoreActions(
    (actions) => actions.onTextAutoValid
  )
  const onAnswerChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onAnswerChanged
  )
  const onVisitLinkChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onVisitLinkChanged
  )
  const onTelegramLinkChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onTelegramLinkChanged
  )
  const onInvitesChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onInvitesChanged
  )

  switch (questType) {
    case QuestTypeEnum.URL:
      return <></>
    case QuestTypeEnum.IMAGE:
      return <></>
    case QuestTypeEnum.TEXT:
      return (
        <PICard>
          <Gap height={6} />
          <TBox>
            <TCheckBox
              checked={textAutoValid}
              onChange={(e) => {
                onTextAutoValid(e.target.checked)
              }}
              id='inline-checked-checkbox'
              type='checkbox'
            />
            <Gap width={4} />
            <LabelCheckText onClick={() => onTextAutoValid(!textAutoValid)}>
              {'Autovalidate'}
            </LabelCheckText>
          </TBox>
          {textAutoValid && (
            <>
              <Gap height={4} />
              <LabelInput>{'Correct Answer'}</LabelInput>
              <Gap height={2} />
              <InputBox
                onChange={(e) => onAnswerChanged(e.target.value)}
                placeholder=''
              />
              <Gap height={2} />
              <LabelDes>{'Leave empty for accepting any value'}</LabelDes>
            </>
          )}
        </PICard>
      )
    case QuestTypeEnum.QUIZ:
      return <></>
    case QuestTypeEnum.VISIT_LINK:
      return (
        <>
          <Divider />
          <PICard>
            <LabelInput>{'LINK'}</LabelInput>
            <Gap height={2} />
            <InputBox
              onChange={(e) => onVisitLinkChanged(e.target.value)}
              placeholder='https://example.com'
            />
          </PICard>
        </>
      )
    case QuestTypeEnum.EMPTY:
      return (
        <PICard>
          <Gap height={6} />
          <TBox>
            <TCheckBox
              checked={textAutoValid}
              onChange={(e) => onTextAutoValid(e.target.checked)}
              id='inline-checked-checkbox'
              type='checkbox'
            />
            <Gap width={4} />
            <LabelCheckText onClick={() => onTextAutoValid(!textAutoValid)}>
              {'Autovalidate'}
            </LabelCheckText>
          </TBox>
        </PICard>
      )
    case QuestTypeEnum.TWITTER:
      return <TwitterList />
    case QuestTypeEnum.JOIN_TELEGRAM:
      return (
        <>
          <Divider />
          <PICard>
            <LabelInput>{'JOIN TELEGRAM'}</LabelInput>
            <Gap height={2} />
            <InputBox
              onChange={(e) => onTelegramLinkChanged(e.target.value)}
              placeholder='Telegram invite link'
            />
            <Gap height={2} />
            <LabelDes>
              {'Invite link should be in the format https://t.me/groupid'}
            </LabelDes>
          </PICard>
        </>
      )
    case QuestTypeEnum.INVITES:
      return (
        <>
          <Divider />
          <PICard>
            <LabelInput>{'INVITES'}</LabelInput>
            <Gap height={2} />
            <InputInviteBox
              onChange={(e) =>
                onInvitesChanged(parseInt(e.target.value ?? '0'))
              }
              defaultValue={10}
              type='number'
            />
            <Gap height={2} />
            <LabelDes>
              {'Invited user needs to complete 1 quest for invite to count'}
            </LabelDes>
          </PICard>
        </>
      )
  }
  return <></>
}

export default QuestDetails
