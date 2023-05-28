import { FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

import { AnswerStatusEnum } from '@/constants/common.const'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { Gap } from '@/styles/common.style'
import { RequireSignal } from '@/styles/input.style'
import { MultipleTextField } from '@/widgets/form'
import { HorizontalBetweenCenterFullWidth, VerticalFullWidth } from '@/widgets/orientation'
import { Label, NormalText } from '@/widgets/text'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { FieldTitle } from '@/modules/create-quest/mini-widget'

export const Alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K']

const AnswerBox = styled.button<{ status?: number; block?: boolean }>(
  ({ status = AnswerStatusEnum.DEFAULT, block = false }) => {
    const style = [
      tw`
      outline-0
      p-2
      flex
      flex-row
      items-center
      gap-2
      rounded-lg
      border
      border-solid
      border-gray-300
      cursor-pointer
      w-full
    `,
    ]

    switch (status) {
      case AnswerStatusEnum.DANGER:
        style.push(tw`
          border-danger-500
        `)
        break
      case AnswerStatusEnum.DEFAULT:
        style.push(tw`
          border-gray-300
        `)
        break
      case AnswerStatusEnum.ACTIVE:
        style.push(tw`
          border-success-500
          border-2
        `)
        break
    }

    if (block) {
      style.push(tw`text-gray-300 bg-gray-50 hover:cursor-not-allowed`)
    }

    return style
  }
)

const SquareBox = tw.div`
  w-12
  h-12
  text-lg
  font-medium
  text-black
  bg-gray-100
  rounded-lg
  flex
  justify-center
  items-center
`

const AnswerInput = tw.input`
  border-0
  outline-0
  ring-0
  w-full
  h-full
  text-lg
`

const AnswerWrap = tw(VerticalFullWidth)`
  gap-3
`

const AnswerText = styled.div<{ status?: number }>(({ status = AnswerStatusEnum.DEFAULT }) => {
  switch (status) {
    case AnswerStatusEnum.DEFAULT:
      return tw`
        w-full
        h-full
        text-lg
        font-normal
        text-gray-700
      `
    case AnswerStatusEnum.BLOCK:
      return tw`
        w-full
        h-full
        text-lg
        font-normal
        text-gray-300
      `
    default:
      return tw``
  }
})

const QuestQuizBox = tw(VerticalFullWidth)`
  gap-2
  mt-4
  border
  border-solid
  border-gray-300
  rounded-lg
  p-4
`

const AnswerItem: FunctionComponent<{ id: number }> = ({ id }) => {
  const quizzes = NewQuestStore.useStoreState((state) => state.quizzes)
  const setQuizzes = NewQuestStore.useStoreActions((action) => action.setQuizzes)

  // hook
  const [quizAnswers, setQuizAnswers] = useState<string[]>([])
  const [quizCorrectAnswers, setQuizCorrectAnswers] = useState<string[]>([])

  useEffect(() => {
    const copyQuizz = quizzes
    copyQuizz.forEach((quiz, i) => {
      if (i === id) {
        quiz.answers = quizCorrectAnswers
        quiz.options = quizAnswers
      }
    })
    setQuizzes([...copyQuizz])
  }, [quizAnswers, quizCorrectAnswers])

  useEffect(() => {
    setQuizCorrectAnswers(quizzes[id].answers)
    setQuizAnswers(quizzes[id].options)
  }, [quizzes])

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
      <AnswerBox key={i} status={status} onClick={() => handleCorrectAnswers(e)}>
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
        <XMarkIcon onClick={() => onRemoveAnswer(i)} className='w-7 h-7 cursor-pointer' />
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

const QuestQuiz: FunctionComponent<{ id: number }> = ({ id }) => {
  const quizzes = NewQuestStore.useStoreState((state) => state.quizzes)
  const setQuizzes = NewQuestStore.useStoreActions((action) => action.setQuizzes)

  const onRemove = () => {
    const copyQuizz = quizzes.filter((e) => e.id !== quizzes[id].id)
    setQuizzes([...copyQuizz])
  }

  const onChange = (e: string) => {
    const copyQuizz = quizzes
    copyQuizz.forEach((quiz) => {
      if (quiz.id === quizzes[id].id) {
        quiz.question = e
      }
    })
    setQuizzes([...copyQuizz])
  }

  return (
    <QuestQuizBox>
      <HorizontalBetweenCenterFullWidth>
        <FieldTitle title={'QUESTION'} required={true} />
        <XMarkIcon onClick={onRemove} className='w-6 h-6 cursor-pointer' />
      </HorizontalBetweenCenterFullWidth>
      <MultipleTextField
        required
        value={quizzes[id].question ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Write a question'
        errorMsg='You must have a question to create this quest.'
      />
      <Gap />
      <FieldTitle title={'ANSWERS'} required={true} />
      <NormalText>
        {'Click to select a correct answer, otherwise any answer will be accepted e.g. for a vote.'}
      </NormalText>
      <Gap />
      <AnswerItem id={id} />
    </QuestQuizBox>
  )
}

export default QuestQuiz
