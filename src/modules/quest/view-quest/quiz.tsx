import { FunctionComponent, useState } from 'react'

import tw from 'twin.macro'

import { Alphabet } from '@/constants/alphabet'
import { AnswerStatusEnum } from '@/constants/common.const'
import { ActiveQuestStore } from '@/store/local/active-quest'
import { QuestQuizType } from '@/utils/type'
import { AnswerBox } from '@/widgets/buttons/answer-box'
import {
  HorizontalCenter,
  HorizontalStartCenter,
  Vertical,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { Label, NormalText } from '@/widgets/text'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

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

export const QuizItem: FunctionComponent<{
  quiz: QuestQuizType
  quizNum: number
  setQuizNum: (e: number) => void
}> = ({ quiz, setQuizNum, quizNum }) => {
  // store
  const quizAnswers = ActiveQuestStore.useStoreState((state) => state.quizAnswers)
  const setQuizAnswers = ActiveQuestStore.useStoreActions((action) => action.setQuizAnswers)

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

export const QuestQuiz: FunctionComponent<{ quizzes: QuestQuizType[] }> = ({ quizzes }) => {
  const [quizNum, setQuizNum] = useState<number>(0)

  if (quizNum === quizzes.length) {
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
        <Label>{`${quizNum + 1} of ${quizzes.length} quests completed`}</Label>
        <QuizItem quiz={quizzes[quizNum]} quizNum={quizNum} setQuizNum={setQuizNum} />
      </HeaderQuizBox>
    </QuizBox>
  )
}
