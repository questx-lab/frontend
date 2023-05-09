'use client'

import { QuestTypeEnum } from '@/constants/project.const'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { Divider, Gap } from '@/styles/common.style'
import { InputInviteBox } from '@/styles/input.style'
import { LabelInput } from '@/styles/myProjects.style'
import { TBox, TCheckBox } from '@/styles/quest.style'
import { LabelCheckText, LabelDes, PICard } from '@/styles/questboard.style'
import { TextField } from '@/widgets/form'

import QuestQuiz from './quest-quiz'
import TwitterList from './twitter-list'

const QuestDetails = () => {
  // Data
  const questType = NewQuestStore.useStoreState((state) => state.questType)
  const textAutoValid = NewQuestStore.useStoreState(
    (state) => state.textAutoValid
  )
  const visitLink = NewQuestStore.useStoreState((state) => state.visitLink)
  const telegramLink = NewQuestStore.useStoreState(
    (state) => state.telegramLink
  )
  const anwser = NewQuestStore.useStoreState((state) => state.anwser)

  // Actions
  const setTextAutoValidation = NewQuestStore.useStoreActions(
    (actions) => actions.setTextAutoValidation
  )
  const setAnswer = NewQuestStore.useStoreActions(
    (actions) => actions.setAnswer
  )
  const setVisitLink = NewQuestStore.useStoreActions(
    (actions) => actions.setVisitLink
  )
  const setTelegramLink = NewQuestStore.useStoreActions(
    (actions) => actions.setTelegramLink
  )
  const setInvites = NewQuestStore.useStoreActions(
    (actions) => actions.setInvites
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
                setTextAutoValidation(e.target.checked)
              }}
              id='inline-checked-checkbox'
              type='checkbox'
            />
            <Gap width={4} />
            <LabelCheckText
              onClick={() => setTextAutoValidation(!textAutoValid)}
            >
              {'Autovalidate'}
            </LabelCheckText>
          </TBox>
          {textAutoValid && (
            <>
              <Gap height={4} />
              <LabelInput>{'Correct Answer'}</LabelInput>
              <Gap height={2} />
              <TextField
                onChange={(e) => setAnswer(e.target.value)}
                placeholder=''
                value={anwser}
                required
                errorMsg='This field is required'
              />
              <Gap height={2} />
              <LabelDes>{'Leave empty for accepting any value'}</LabelDes>
            </>
          )}
        </PICard>
      )
    case QuestTypeEnum.QUIZ:
      return (
        <PICard>
          <QuestQuiz />
        </PICard>
      )
    case QuestTypeEnum.VISIT_LINK:
      return (
        <>
          <Divider />
          <PICard>
            <LabelInput>{'LINK'}</LabelInput>
            <Gap height={2} />
            <TextField
              onChange={(e) => setVisitLink(e.target.value)}
              placeholder='https://example.com'
              value={visitLink}
              required
              errorMsg='You must have a url to visit link submission.'
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
              onChange={(e) => setTextAutoValidation(e.target.checked)}
              id='inline-checked-checkbox'
              type='checkbox'
            />
            <Gap width={4} />
            <LabelCheckText
              onClick={() => setTextAutoValidation(!textAutoValid)}
            >
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
            <TextField
              onChange={(e) => setTelegramLink(e.target.value)}
              placeholder='Telegram invite link'
              value={telegramLink}
              required
              errorMsg='You must have a url to telegramLink submission.'
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
              onChange={(e) => setInvites(parseInt(e.target.value ?? '0'))}
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
