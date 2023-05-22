'use client'

import { FunctionComponent } from 'react'

import { signIn } from 'next-auth/react'

import { QuestTypeEnum } from '@/constants/project.const'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { FullWidthBtn } from '@/styles/button.style'
import { Divider, Gap } from '@/styles/common.style'
import { InputInviteBox } from '@/styles/input.style'
import { TBox, TCheckBox } from '@/styles/quest.style'
import { LabelCheckText, LabelDes, PICard } from '@/styles/questboard.style'
import { NegativeButton } from '@/widgets/button'
import { TextField } from '@/widgets/form'
import { Label, NormalText } from '@/widgets/text'
import { PlusIcon } from '@heroicons/react/24/outline'

import QuestQuiz from './quest-quiz'
import TwitterList from './twitter-list'

const AddQuestQuiz: FunctionComponent = () => {
  const quizzes = NewQuestStore.useStoreState((state) => state.quizzes)
  const setQuizzes = NewQuestStore.useStoreActions(
    (action) => action.setQuizzes
  )

  let block = true
  const quiz = quizzes[quizzes.length - 1]

  // Validate quest before add more
  if (quiz.question !== '' && quiz.answers.length && quiz.question.length) {
    block = false
  }

  const AddQuiz = () => {
    setQuizzes([
      ...quizzes,
      {
        id: quizzes.length,
        question: '',
        answers: [],
        options: [],
      },
    ])
  }

  return (
    <NegativeButton block={block} isFull onClick={AddQuiz}>
      {'Add more Quiz'}
      <PlusIcon className='w-5 h-5' />
    </NegativeButton>
  )
}

const ListQuizzes: FunctionComponent = () => {
  const quizzes = NewQuestStore.useStoreState((state) => state.quizzes)
  const renderQuizzes = quizzes.map((e, i) => <QuestQuiz key={i} id={i} />)
  return <>{renderQuizzes}</>
}

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

  const project = NewQuestStore.useStoreState((state) => state.project)

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

  const onConnectDiscord = () => {
    signIn('discord', {}, { withDiscordServer: 'true' })
  }
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
              <Label>{'Correct Answer'}</Label>
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
          <ListQuizzes />
          <AddQuestQuiz />
        </PICard>
      )
    case QuestTypeEnum.VISIT_LINK:
      return (
        <>
          <Divider />
          <PICard>
            <Label>{'LINK'}</Label>
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
            <Label>{'JOIN TELEGRAM'}</Label>
            <TextField
              onChange={(e) => setTelegramLink(e.target.value)}
              placeholder='Telegram invite link'
              value={telegramLink}
              required
              errorMsg='You must have a url to telegramLink submission.'
            />
            <NormalText>
              {'Invite link should be in the format https://t.me/groupid'}
            </NormalText>
          </PICard>
        </>
      )
    case QuestTypeEnum.INVITES:
      return (
        <>
          <Divider />
          <PICard>
            <Label>{'INVITES'}</Label>
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
    case QuestTypeEnum.DISCORD:
      return (
        <>
          {!project.discord && (
            <FullWidthBtn className='mt-3' onClick={onConnectDiscord}>
              Connect with Discord
            </FullWidthBtn>
          )}
        </>
      )
  }
  return <></>
}

export default QuestDetails
