import { FunctionComponent } from 'react'

import { AnswerStatusEnum } from '@/constants/project.const'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { Gap } from '@/styles/common.style'
import { LabelInput, RequireSignal } from '@/styles/input.style'
import {
  AnswerBox,
  AnswerInput,
  AnswerText,
  AnswerWrap,
  QuestQuizBox,
  SquareBox,
} from '@/styles/quest.style'
import { LabelDes } from '@/styles/questboard.style'
import { MultipleTextField } from '@/widgets/form'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'

const Alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K']

const AnswerItem: FunctionComponent = () => {
  // data
  const quizAnswers = NewQuestStore.useStoreState((state) => state.quizAnswers)
  const quizCorrectAnswers = NewQuestStore.useStoreState(
    (state) => state.quizCorrectAnswers
  )

  // action
  const setQuizAnswers = NewQuestStore.useStoreActions(
    (action) => action.setQuizAnswers
  )
  const setQuizCorrectAnswers = NewQuestStore.useStoreActions(
    (action) => action.setQuizCorrectAnswers
  )

  // handler
  const handleCorrectAnswers = (value: string) => {
    if (value !== '') {
      if (quizCorrectAnswers.includes(value)) {
        setQuizCorrectAnswers(quizCorrectAnswers.filter((e) => e !== value))
      } else {
        setQuizCorrectAnswers([...quizCorrectAnswers, value])
      }
    }
  }

  const onChangeAnswser = (e: string, i: number) => {
    const shadowAnswer = quizAnswers
    shadowAnswer[i] = e
    setQuizAnswers([...shadowAnswer])
  }

  const onRemoveAnswer = (i: number) => {
    const shadowAnswer = quizAnswers
    shadowAnswer.splice(i, 1)
    setQuizAnswers([...shadowAnswer])
  }

  const listAnswer = quizAnswers.map((e, i) => {
    let status = AnswerStatusEnum.DEFAULT
    if (quizCorrectAnswers.includes(e)) {
      status = AnswerStatusEnum.ACTIVE
    }
    if (quizAnswers[i] === '') {
      status = AnswerStatusEnum.DANGER
    }

    return (
      <AnswerBox
        key={i}
        status={status}
        onClick={() => handleCorrectAnswers(e)}
      >
        <SquareBox>{Alphabet[i]}</SquareBox>
        <AnswerInput
          value={e}
          onChange={(e) => onChangeAnswser(e.target.value, i)}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          placeholder='The answer of the question is written here.'
        />
        <XMarkIcon
          onClick={() => onRemoveAnswer(i)}
          className='w-7 h-7 cursor-pointer'
        />
      </AnswerBox>
    )
  })

  const addAnswerStatus =
    quizAnswers.length < 10 ? AnswerStatusEnum.DEFAULT : AnswerStatusEnum.BLOCK

  return (
    <AnswerWrap>
      {listAnswer}
      <AnswerBox
        status={addAnswerStatus}
        onClick={() => {
          if (quizAnswers.length < 10) {
            setQuizAnswers([...quizAnswers, ''])
          }
        }}
      >
        <SquareBox>
          <PlusIcon className='w-6 h-6' />
        </SquareBox>
        <AnswerText status={addAnswerStatus}>{'Add answer'}</AnswerText>
      </AnswerBox>
    </AnswerWrap>
  )
}

const QuestQuiz: FunctionComponent = () => {
  // data
  const quizQuestion = NewQuestStore.useStoreState(
    (state) => state.quizQuestion
  )

  // action
  const setQuizQuestion = NewQuestStore.useStoreActions(
    (action) => action.setQuizQuestion
  )

  return (
    <QuestQuizBox>
      <LabelInput>
        {'QUESTION'}
        <RequireSignal>{'*'}</RequireSignal>
      </LabelInput>
      <MultipleTextField
        required
        value={quizQuestion}
        onChange={(e) => setQuizQuestion(e.target.value)}
        placeholder='Write a question'
        errorMsg='You must have a question to create this quest.'
      />
      <Gap />
      <LabelInput>
        {'ANSWERS'}
        <RequireSignal>{'*'}</RequireSignal>
      </LabelInput>
      <LabelDes>
        {
          'Click to select a correct answer, otherwise any answer will be accepted e.g. for a vote.'
        }
      </LabelDes>
      <Gap />
      <AnswerItem />
    </QuestQuizBox>
  )
}

export default QuestQuiz
