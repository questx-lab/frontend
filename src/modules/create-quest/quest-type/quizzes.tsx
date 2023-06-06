import { FunctionComponent } from 'react'

import { OuterBox } from '@/modules/create-quest/quest-type/mini-widget'
import QuestQuiz from '@/modules/create-quest/quest-type/quiz'
import NewQuestStore from '@/store/local/new-quest'
import { QuestQuizType } from '@/types/quest'
import { NegativeButton } from '@/widgets/buttons'
import { PlusIcon } from '@heroicons/react/24/outline'

const canAddMoreQuiz = (quizzes: QuestQuizType[]): boolean => {
  for (var quiz of quizzes) {
    if (quiz.question.length === 0 || quiz.answers.length === 0) {
      return false
    }

    let allAnswerEmpty = true
    for (var answer of quiz.answers) {
      if (answer.trim().length > 0) {
        allAnswerEmpty = false
        break
      }
    }

    if (allAnswerEmpty) {
      return false
    }
  }

  return true
}

const AddQuestQuiz: FunctionComponent = () => {
  const quizzes = NewQuestStore.useStoreState((state) => state.quizzes)
  const setQuizzes = NewQuestStore.useStoreActions((action) => action.setQuizzes)

  let allowAddMore = canAddMoreQuiz(quizzes)

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
    <NegativeButton block={!allowAddMore} isFull onClick={AddQuiz}>
      {'Add more Quiz'}
      <PlusIcon className='w-5 h-5' />
    </NegativeButton>
  )
}

const ListQuizzes: FunctionComponent = () => {
  const quizzes = NewQuestStore.useStoreState((state) => state.quizzes)
  const renderQuizzes = quizzes.map((e, i) => <QuestQuiz key={i} quizIndex={i} />)

  return <>{renderQuizzes}</>
}

const Quizzes: FunctionComponent = () => {
  return (
    <OuterBox>
      <ListQuizzes />
      <AddQuestQuiz />
    </OuterBox>
  )
}

export default Quizzes
