import { FC, useEffect, useState } from 'react'

import tw from 'twin.macro'

import { Alphabet } from '@/constants/alphabet'
import { AnswerStatusEnum } from '@/constants/common.const'
import ActiveQuestStore from '@/store/local/active-quest'
import { QuestQuizType } from '@/types/quest'
import { PositiveButton } from '@/widgets/buttons'
import { AnswerBox } from '@/widgets/buttons/answer-box'
import { HorizontalStartCenter, Vertical, VerticalFullWidth } from '@/widgets/orientation'
import { Label, NormalText, SmallText } from '@/widgets/text'

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

const NextButtonStyle = tw.div`
  w-full
  flex
  items-end
  justify-end
`

const ErrorText = tw(SmallText)`
  text-danger-500
`

const ErrorMessage: FC<{ userAnswer: string; correct: boolean }> = ({ userAnswer, correct }) => {
  if (userAnswer === '' || correct) {
    return <></>
  }

  return <ErrorText>Please try again</ErrorText>
}

const NextButton: FC<{
  show: boolean
  enable: boolean
  onClick: () => void
}> = ({ show, enable, onClick }) => {
  if (!show) {
    return <></>
  }

  return (
    <NextButtonStyle>
      <PositiveButton block={!enable} onClick={onClick}>
        Next
      </PositiveButton>
    </NextButtonStyle>
  )
}

export const QuizItem: FC<{
  quiz: QuestQuizType
  quizNum: number
  canClaim: boolean
  isLastQuiz: boolean
  setQuizNum: (e: number) => void
}> = ({ quiz, quizNum, canClaim, isLastQuiz, setQuizNum }) => {
  // store
  const quizAnswers = ActiveQuestStore.useStoreState((state) => state.quizAnswers)
  const setQuizAnswers = ActiveQuestStore.useStoreActions((action) => action.setQuizAnswers)

  // local state
  const userAnswer = quizAnswers.length > quizNum ? quizAnswers[quizNum] : ''
  const correct = userAnswer !== '' && userAnswer === quiz.answers[0]

  // handler
  const onChange = (selectedAnswer: string) => {
    // Only enable the answer if user is a guest. Don't accept answer if this is an admin or not
    // logged in.
    if (canClaim) {
      if (quizAnswers.length > quizNum) {
        quizAnswers[quizNum] = selectedAnswer
      } else {
        quizAnswers.push(selectedAnswer)
      }

      setQuizAnswers([...quizAnswers])
    }
  }

  const onNextClicked = () => {
    setQuizNum(quizNum + 1)
  }

  const renderAnswers = quiz.options.map((option, i) => {
    let status = AnswerStatusEnum.DEFAULT
    if (userAnswer === option) {
      if (correct) {
        // correct answer
        status = AnswerStatusEnum.ACTIVE
      } else {
        // incorrect answer
        status = AnswerStatusEnum.DANGER
      }
    }

    return (
      <AnswerBox key={i} onClick={() => onChange(option)} status={status}>
        <SquareBox>{Alphabet[i]}</SquareBox>
        <AnswerText>{option}</AnswerText>
      </AnswerBox>
    )
  })

  return (
    <ContentBox>
      <Label>{'Question ❓'}</Label>
      <NormalText>{quiz.question}</NormalText>
      <Label>{'SUBMISSION 📝'}</Label>
      {renderAnswers}
      <ErrorMessage userAnswer={userAnswer} correct={correct} />
      <NextButton show={!isLastQuiz} enable={correct} onClick={onNextClicked} />
    </ContentBox>
  )
}

export const QuestQuiz: FC<{ quizzes: QuestQuizType[]; canClaim: boolean }> = ({
  quizzes,
  canClaim,
}) => {
  const [quizNum, setQuizNum] = useState<number>(0)
  const setQuizAnswers = ActiveQuestStore.useStoreActions((action) => action.setQuizAnswers)

  useEffect(() => {
    setQuizAnswers([])
  }, [])

  return (
    <QuizBox>
      <HeaderQuizBox>
        <Label>{`${quizNum + 1} of ${quizzes.length} quests completed`}</Label>
        <QuizItem
          quiz={quizzes[quizNum]}
          quizNum={quizNum}
          setQuizNum={setQuizNum}
          canClaim={canClaim}
          isLastQuiz={quizNum === quizzes.length - 1}
        />
      </HeaderQuizBox>
    </QuizBox>
  )
}
