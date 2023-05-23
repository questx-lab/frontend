import { FunctionComponent, useState } from 'react'

import tw from 'twin.macro'

import { AnswerStatusEnum } from '@/constants/project.const'
import { ActiveQuestStore } from '@/store/local/active-quest.store'
import { AnswerBox, SquareBox } from '@/styles/quest.style'
import { QuestQuizType } from '@/types/project.type'
import {
  HorizontalCenter,
  HorizontalStartCenter,
  Vertical,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { NormalText } from '@/widgets/text'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

import { Alphabet } from '../new-quest/quest-quiz'
import { Label } from '../users/style'

const QuizBox = tw(Vertical)`
  w-full
  divide-y
  divide-gray-300
  gap-3
`

const ContentBox = tw(VerticalFullWidth)`
  gap-3
  py-3
`

const HeaderQuizBox = tw(Vertical)`
  w-full
  gap-2
  py-3
`

const AnswerText = tw(HorizontalStartCenter)`
  w-full
  text-lg
  font-normal
  text-gray-700
`

export const QuizItem: FunctionComponent<{
  quiz: QuestQuizType
  quizNum: number
  setQuizNum: (e: number) => void
}> = ({ quiz, setQuizNum, quizNum }) => {
  // store
  const quizAnswers = ActiveQuestStore.useStoreState(
    (state) => state.quizAnswers
  )
  const setQuizAnswers = ActiveQuestStore.useStoreActions(
    (action) => action.setQuizAnswers
  )

  // hook
  const [status, setStatus] = useState<number[]>(
    Array.from(quiz.options).map((e) => AnswerStatusEnum.DEFAULT)
  )
  const [block, setBlock] = useState<boolean>(false)

  // handler
  const onChange = (choose: string, index: number) => {
    setQuizAnswers([...quizAnswers, choose])
    if (quiz.answers.includes(choose)) {
      setQuizNum(quizNum + 1)
    } else {
      setBlock(true)
      const cpy = status
      cpy.forEach((_, i) => {
        if (index === i) {
          cpy[i] = AnswerStatusEnum.DANGER
        } else {
          cpy[i] = AnswerStatusEnum.ACTIVE
        }
      })
      setStatus([...cpy])
    }
  }

  const renderAnsers =
    quiz &&
    quiz.options.map((e, i) => (
      <AnswerBox
        block={block}
        disabled={block}
        key={i}
        onClick={() => onChange(e, i)}
        status={status[i]}
      >
        <SquareBox>{Alphabet[i]}</SquareBox>
        <AnswerText>{e}</AnswerText>
      </AnswerBox>
    ))

  return (
    <ContentBox>
      <Label>{'Question ❓'}</Label>
      <NormalText>{quiz.question}</NormalText>
      <Label>{'SUBMISSION 📝'}</Label>
      {renderAnsers}
    </ContentBox>
  )
}

export const QuestQuiz: FunctionComponent<{ quizs: QuestQuizType[] }> = ({
  quizs,
}) => {
  const [quizNum, setQuizNum] = useState<number>(0)

  if (quizNum === quizs.length) {
    return (
      <HorizontalCenter>
        <CheckCircleIcon className='w-10 h-10 text-success' />
        {'Success to claim quest'}
      </HorizontalCenter>
    )
  }

  return (
    <QuizBox>
      <HeaderQuizBox>
        <Label>{`${quizNum + 1} of ${quizs.length} quests completed`}</Label>
        <QuizItem
          quiz={quizs[quizNum]}
          quizNum={quizNum}
          setQuizNum={setQuizNum}
        />
      </HeaderQuizBox>
    </QuizBox>
  )
}
