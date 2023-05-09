import { FunctionComponent, useState } from 'react'
import Image from 'next/image'
import { StorageConst } from '@/constants/storage.const'
import { FullWidthBtn, GotoTwitterBtn } from '@/styles/button.style'
import {
  Title,
  Description,
  HeaderBox,
  PointText,
  ContentContainer,
} from '@/styles/quest-detail.style'
import { uploadImageApi } from '@/app/api/client/upload'
import { claimRewardApi } from '@/app/api/client/reward'
import { Gap } from '@/styles/common.style'
import { QuestType } from '@/types/project.type'
import { toast } from 'react-hot-toast'
import { InputBox } from '@/styles/input.style'
import { Answers } from './quiz'
import { useDropzone } from 'react-dropzone'

const claimType = {
  TEXT: 'text',
  IMAGE: 'image',
  URL: 'url',
  QUIZ: 'quiz',
  TWITTER: 'twitter_follow',
}

// mock quizzes
const quizzes = [
  {
    id: '1',
    question: '',
    options: [
      'We are doing good 1',
      'We will have roadmap 1',
      'We will have feature 1',
    ],
    answers: ['We are doing good 1'],
  },
  {
    id: '2',
    question: '',
    options: [
      'We are doing good 2',
      'We will have roadmap 2',
      'We will have feature 2',
    ],
    answers: ['We will have roadmap 2'],
  },
  {
    id: '3',
    question: '',
    options: [
      'We are doing good 3',
      'We will have roadmap 3',
      'We will have feature 3',
    ],
    answers: ['We will have feature 3'],
  },
]

export const QuestDetail: FunctionComponent<{
  quest: QuestType | undefined
  onClose: () => void
}> = ({ quest, onClose }) => {
  const [input, setInput] = useState<string>('')
  const [currentQuiz, setCurrentQuiz] = useState<number>(0)
  const [chosenAnswers, setChosenAnswers] = useState<string[]>([])
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  const chooseAnswer = (answer: string) => {
    setChosenAnswers([...chosenAnswers, answer])
    if (currentQuiz < quizzes.length) {
      if (!quizzes[currentQuiz].answers.includes(answer)) {
        toast.error('Wrong answer')
        return
      }
      setCurrentQuiz(currentQuiz + 1)
    }
  }

  const onChangeInput = (e: any) => {
    setInput(e.target?.value)
  }

  const submit = async () => {
    let inp = input
    switch (quest?.type) {
      case claimType.IMAGE:
        let formData = new FormData()
        if (acceptedFiles.length == 0) {
          toast.error('Must upload file')
          return
        }
        const file = acceptedFiles[0]
        formData.append('image', file || '')
        try {
          const data = await uploadImageApi(formData)
          inp = data?.data?.url || ''
        } catch (error) {
          toast.error('Error while upload file')
          return
        }
        break
      case claimType.QUIZ:
        inp = JSON.stringify(chosenAnswers)

      default:
        break
    }
    try {
      const data = await claimRewardApi({
        quest_id: quest?.id,
        input: inp,
      })
      if (data.error) {
        toast.error(data.error)
        return
      }
      toast.success('Claim reward successfully')
      onClose()
    } catch (error) {
      toast.error('Error while claim')
    }
  }

  const withQuizzes = () => {
    return (
      <div className='w-full'>
        <div className='flex border-b-2 pb-5 px-6'>
          <div className='w-full text-md text-gray-500'>
            {currentQuiz} of {quizzes.length} quests completed
          </div>
          <div className='flex items-center w-full'>
            <div className=' h-2 w-full bg-gray-200 rounded-lg'>
              <div
                className='h-2 bg-success rounded-lg'
                style={{
                  width: `${(currentQuiz / quizzes.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className='px-6 pt-6'>
          {currentQuiz === quizzes.length ? (
            <div>all quest have completed</div>
          ) : (
            <div>
              <Title>
                Question {currentQuiz + 1}/{quizzes.length} ❓
              </Title>
              <Gap height={2} />
              <Description>Join the community Weekly event.</Description>
              <Gap height={4} />
              <Title>Submission 📝</Title>
              <Gap height={2} />
              <Description>Choose the best answer:</Description>
              <Answers
                answers={quizzes[currentQuiz]?.answers || []}
                onChoose={chooseAnswer}
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  const withText = () => {
    return (
      <div className='px-6'>
        <Title>Mission</Title>
        <Gap height={2} />
        <Description>Join the community Weekly event.</Description>
        <Gap height={4} />
        <Title>Guild</Title>
        <Gap height={2} />
        <Description>Join in the community weekly event.</Description>
        <Gap height={4} />
        <Title>Submission</Title>
        <Gap height={2} />
        <Description>
          Type “YES” if you participate in the event in the text area.
        </Description>
        <Gap height={4} />
        {quest?.type === claimType.IMAGE && (
          <section className='container'>
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <div className='w-full h-32 border-2 border-dotted rounded'>
                <div className='pt-9 flex justify-center'>
                  <FullWidthBtn className='w-32'> Add files</FullWidthBtn>
                </div>
                <Gap height={2} />
                <div className='text-center'>Accepts .gif, .jpg, and .png</div>
              </div>
            </div>
          </section>
        )}

        {quest?.type === claimType.TEXT && (
          <InputBox value={input} onChange={onChangeInput} placeholder='YES' />
        )}

        {quest?.type === claimType.URL && (
          <InputBox
            value={input}
            onChange={onChangeInput}
            placeholder='https://twitter.com/'
          />
        )}
      </div>
    )
  }

  const withTwitter = () => {
    return (
      <div className='px-6'>
        <Title>Mission 🎯</Title>
        <Gap height={2} />
        <Description>
          Just like reply and retweet the post, this quest will auto validate
          when you finish.
        </Description>
        <Gap height={4} />
        <GotoTwitterBtn>
          <div className='flex'>
            <Image
              width={30}
              height={30}
              src={StorageConst.TWITTER_DIR.src}
              alt={StorageConst.TWITTER_DIR.alt}
              color='#1DA1F2'
            />
            <Gap width={2} />
            <div className='flex items-center'>Connect Twitter </div>
          </div>
        </GotoTwitterBtn>
      </div>
    )
  }

  const getDescription = () => {
    console.log(quest?.type)

    switch (quest?.type) {
      case claimType.QUIZ:
        return withQuizzes()
      case claimType.TWITTER:
        return withTwitter()

      default:
        return withText()
    }
  }

  return (
    <div className='grid gap-1 grid-cols-3 w-full'>
      <div className='col-span-2'>
        <ContentContainer className={claimType.QUIZ ? 'px-0' : '' + ' w-full'}>
          {getDescription()}
        </ContentContainer>
      </div>
      <div>
        <ContentContainer>
          <Title>Reward</Title>
          <Gap height={4} />
          <HeaderBox>
            <Image
              width={40}
              height={40}
              src={StorageConst.POINT_ICON.src}
              alt={StorageConst.POINT_ICON.alt}
            />
            <Gap width={2} />
            <PointText>{'300 Points'}</PointText>
          </HeaderBox>
        </ContentContainer>
        <div className='p-6 pt-2'>
          <FullWidthBtn onClick={submit} className='h-10'>
            Claim Reward
          </FullWidthBtn>
        </div>
      </div>
    </div>
  )
}
