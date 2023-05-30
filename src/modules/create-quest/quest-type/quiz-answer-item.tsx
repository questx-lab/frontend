import { Alphabet } from '@/constants/alphabet'
import { AnswerStatusEnum } from '@/constants/common.const'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { QuestQuizType } from '@/utils/type'
import { AnswerBox } from '@/widgets/buttons/answer-box'
import { HorizontalCenter, VerticalFullWidth } from '@/widgets/orientation'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { FunctionComponent } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const SquareBox = tw(HorizontalCenter)`
  w-12
  h-12
  text-lg
  font-medium
  text-black
  bg-gray-100
  rounded-lg
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

const AnswerItem: FunctionComponent<{ quizIndex: number }> = ({ quizIndex }) => {
  // data
  const quizzes = NewQuestStore.useStoreState((state) => state.quizzes)
  const options = quizzes[quizIndex].options
  const quiz = quizzes[quizIndex]

  // action
  const setQuizzes = NewQuestStore.useStoreActions((action) => action.setQuizzes)
  const setOptions = NewQuestStore.useStoreActions((action) => action.setOptions)

  // called when user types answer
  const onOptionChanged = (value: string, index: number) => {
    const copy: string[] = Object.assign([], quiz.options)
    copy[index] = value
    setOptions({ quizIndex, options: copy })
  }

  const onRemoveOption = (i: number) => {
    quiz.options.splice(i, 1)

    const copy: QuestQuizType[] = JSON.parse(JSON.stringify(quizzes))
    setQuizzes(copy)
  }

  const onAnswerSelected = (index: number) => {
    if (options[index].trim().length === 0) {
      return
    }

    quiz.answers = [options[index]]
    const copy: QuestQuizType[] = JSON.parse(JSON.stringify(quizzes))
    setQuizzes(copy)
  }

  const listAnswer = options.map((option, i) => {
    let status = AnswerStatusEnum.DEFAULT
    if (options[i] === '') {
      status = AnswerStatusEnum.DANGER
    } else if (quiz.answers.length > 0 && options[i] === quiz.answers[0]) {
      status = AnswerStatusEnum.ACTIVE
    }

    return (
      <AnswerBox key={i} status={status} onClick={() => onAnswerSelected(i)}>
        <input type='radio' checked={status === AnswerStatusEnum.ACTIVE} onChange={() => {}} />
        <SquareBox>{Alphabet[i]}</SquareBox>
        <AnswerInput
          value={option}
          onChange={(e) => onOptionChanged(e.target.value, i)}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          placeholder='The answer of the question is written here.'
        />
        <XMarkIcon
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onRemoveOption(i)
          }}
          className='w-7 h-7 cursor-pointer'
        />
      </AnswerBox>
    )
  })

  const addAnswerStatus = options.length < 10 ? AnswerStatusEnum.DEFAULT : AnswerStatusEnum.BLOCK

  return (
    <AnswerWrap>
      {listAnswer}
      <AnswerBox
        status={addAnswerStatus}
        onClick={() => {
          if (options.length < 10) {
            const copy: QuestQuizType[] = Object.assign([], quizzes)
            console.log('copy[quizIndex].options = ', copy[quizIndex].options)
            copy[quizIndex].options.push('')

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

export default AnswerItem
