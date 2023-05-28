import { FunctionComponent } from 'react'

import { OuterBox } from '@/modules/create-quest/quest-type/mini-widget'
import QuestQuiz from '@/modules/create-quest/quest-type/quiz'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { NegativeButton } from '@/widgets/button'
import { PlusIcon } from '@heroicons/react/24/outline'

const AddQuestQuiz: FunctionComponent = () => {
  const quizzes = NewQuestStore.useStoreState((state) => state.quizzes)
  const setQuizzes = NewQuestStore.useStoreActions((action) => action.setQuizzes)

  let block = true
  const quiz = quizzes[quizzes.length - 1]

  console.log('quiz.question = ', quiz.question)
  console.log('quiz.answers = ', quiz.answers)

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

const Quizzes: FunctionComponent = () => {
  return (
    <OuterBox>
      <ListQuizzes />
      <AddQuestQuiz />
    </OuterBox>
  )
}

export default Quizzes
