import { FunctionComponent } from 'react'
import tw from 'twin.macro'

import { FieldTitle } from '@/modules/create-quest/mini-widget'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { Gap } from '@/styles/common.style'
import { MultipleTextField } from '@/widgets/form'
import { HorizontalBetweenCenterFullWidth, VerticalFullWidth } from '@/widgets/orientation'
import { NormalText } from '@/widgets/text'
import { XMarkIcon } from '@heroicons/react/24/outline'
import AnswerItem from '@/modules/create-quest/quest-type/quiz-answer-item'

const QuestQuizBox = tw(VerticalFullWidth)`
  gap-2
  mt-4
  border
  border-solid
  border-gray-300
  rounded-lg
  p-4
`

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
      <NormalText>
        {'Add possible answers to the quiz. Click on a single letter for correct answer'}
      </NormalText>
      <Gap />

      <AnswerItem quizIndex={quizIndex} />
    </QuestQuizBox>
  )
}

export default QuestQuiz
