import { FunctionComponent } from 'react'
import { AnswerWrap, AlphabetOrderWrap } from './quiz.style'
import { Gap } from '@/styles/common.style'

export type AnswerType = {
  id?: string
  content?: string
}

export const Answers: FunctionComponent<{
  answers: string[]
  quiz_id?: string
  onChoose: (answer_id: string) => void
}> = ({ answers, onChoose }) => {
  return (
    <div>
      {answers.map((answer, idx) => (
        <Answer
          answer={answer}
          key={`quiz-${idx}`}
          idx={idx}
          onChoose={onChoose}
        />
      ))}
    </div>
  )
}

const Answer: FunctionComponent<{
  answer: string
  idx: integer
  onChoose: (answer_id: string) => void
}> = ({ answer, idx, onChoose }) => {
  return (
    <AnswerWrap>
      <div className='flex' onClick={() => onChoose(answer || '')}>
        <AlphabetOrderWrap>{convertToAlphabet(idx)}</AlphabetOrderWrap>
        <Gap height={4} />
        <div className='flex items-center'>{answer} </div>
      </div>
    </AnswerWrap>
  )
}

const convertToAlphabet = (idx: integer) => {
  let character = 'A'.charCodeAt(0)
  return String.fromCharCode(character + idx)
}
