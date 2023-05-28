import { FunctionComponent } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

import { AnswerStatusEnum } from '@/constants/common.const'
import { FieldTitle } from '@/modules/create-quest/mini-widget'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { Gap } from '@/styles/common.style'
import { QuestQuizType } from '@/utils/type'
import { MultipleTextField } from '@/widgets/form'
import { HorizontalBetweenCenterFullWidth, VerticalFullWidth } from '@/widgets/orientation'
import { NormalText } from '@/widgets/text'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'

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

const AnswerItem: FunctionComponent<{ quizId: number; id: number }> = ({ quizId, id }) => {
  // data
  const quizzes = NewQuestStore.useStoreState((state) => state.quizzes)
  const quizAnswers = quizzes[quizId].answers

  // action
  const setQuizzes = NewQuestStore.useStoreActions((action) => action.setQuizzes)

  // called when user types answer
  const onChangeAnswser = (e: string, i: number) => {
    const copy: QuestQuizType[] = Object.assign([], quizzes)
    copy[quizId].answers[i] = e

    setQuizzes(copy)
  }

  const onRemoveAnswer = (i: number) => {
    const shadowAnswer = quizAnswers
    shadowAnswer.splice(i, 1)

    const copy: QuestQuizType[] = JSON.parse(JSON.stringify(quizzes))
    copy[quizId].answers = shadowAnswer

    setQuizzes(copy)
  }

  const listAnswer = quizAnswers.map((answer, i) => {
    let status = AnswerStatusEnum.DEFAULT
    if (quizAnswers[i] === '') {
      status = AnswerStatusEnum.DANGER
    }

    return (
      <AnswerBox key={i} status={status}>
        <SquareBox>{Alphabet[i]}</SquareBox>
        <AnswerInput
          value={answer}
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
            const copy: QuestQuizType[] = Object.assign([], quizzes)
            copy[quizId].answers.push('')

            setQuizzes(copy)
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

const QuestQuiz: FunctionComponent<{ quizIndex: number }> = ({ quizIndex }) => {
  const quizzes = NewQuestStore.useStoreState((state) => state.quizzes)
  const setQuizzes = NewQuestStore.useStoreActions((action) => action.setQuizzes)

  const onRemove = () => {
    const copyQuizz = quizzes.filter((e) => e.id !== quizzes[quizIndex].id)
    setQuizzes([...copyQuizz])
  }

  const onChange = (e: string) => {
    const copyQuizz = quizzes
    copyQuizz.forEach((quiz) => {
      if (quiz.id === quizzes[quizIndex].id) {
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
        value={quizzes[quizIndex].question ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Write a question'
        errorMsg='You must have a question to create this quest.'
      />
      <Gap />
      <FieldTitle title={'ANSWERS'} required={true} />
      <NormalText>{'Add answer to the quiz.'}</NormalText>
      <Gap />
      <AnswerItem quizId={quizIndex} id={quizIndex} />
    </QuestQuizBox>
  )
}

export default QuestQuiz
