import { FunctionComponent, useEffect, useState } from 'react'

import tw from 'twin.macro'

import { Alphabet } from '@/constants/alphabet'
import ActiveQuestStore from '@/store/local/active-quest'
import { QuestQuizType } from '@/types/quest'
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
  canClaim: boolean
  setQuizNum: (e: number) => void
}> = ({ quiz, setQuizNum, quizNum, canClaim }) => {
  // store
  const quizAnswers = ActiveQuestStore.useStoreState((state) => state.quizAnswers)
  const setQuizAnswers = ActiveQuestStore.useStoreActions((action) => action.setQuizAnswers)

  // handler
  const onChange = (choose: string) => {
    // Only enable the answer if user is a guest. Don't accept answer if this is an admin or not
    // logged in.
    if (canClaim) {
      setQuizAnswers([...quizAnswers, choose])
      setQuizNum(quizNum + 1)
    }
  }

  const renderAnswers = quiz.options.map((e, i) => (
    <AnswerBox key={i} onClick={() => onChange(e)}>
      <SquareBox>{Alphabet[i]}</SquareBox>
      <AnswerText>{e}</AnswerText>
    </AnswerBox>
  ))

  return (
    <ContentBox>
      <Label>{'Question ❓'}</Label>
      <NormalText>{quiz.question}</NormalText>
      <Label>{'SUBMISSION 📝'}</Label>
      {renderAnswers}
    </ContentBox>
  )
}

export const QuestQuiz: FunctionComponent<{ quizzes: QuestQuizType[]; canClaim: boolean }> = ({
  quizzes,
  canClaim,
}) => {
  const [quizNum, setQuizNum] = useState<number>(0)
  const setQuizAnswers = ActiveQuestStore.useStoreActions((action) => action.setQuizAnswers)

  useEffect(() => {
    setQuizAnswers([])
  }, [])

  if (quizNum === quizzes.length) {
    return (
      <HorizontalCenter>
        <CheckCircleIcon className='w-10 h-10 text-success' />
        {'You could submit your answer'}
      </HorizontalCenter>
    )
  }

  return (
    <QuizBox>
      <HeaderQuizBox>
        <Label>{`${quizNum + 1} of ${quizzes.length} quests completed`}</Label>
        <QuizItem
          quiz={quizzes[quizNum]}
          quizNum={quizNum}
          setQuizNum={setQuizNum}
          canClaim={canClaim}
        />
      </HeaderQuizBox>
    </QuizBox>
  )
}
