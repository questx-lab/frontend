import { FunctionComponent, useState, useRef, ChangeEvent } from 'react'
import Image from 'next/image'
import { StorageConst } from '@/constants/storage.const'
import { FullWidthBtn } from '@/styles/button.style'
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
}

// mock quizzes
const quizzes = [
  {
    id: '1',
    content: '',
    answers: [
      {
        id: '1',
        content: 'We are doing good 1',
      },
      {
        id: '2',
        content: 'We will have roadmap 1',
      },
      {
        id: '3',
        content: 'We will have feature 1',
      },
    ],
  },
  {
    id: '2',
    content: '',
    answers: [
      {
        id: '1',
        content: 'We are doing good 2',
      },
      {
        id: '2',
        content: 'We will have roadmap 2',
      },
      {
        id: '3',
        content: 'We will have feature 2',
      },
    ],
  },
  {
    id: '3',
    content: '',
    answers: [
      {
        id: '1',
        content: 'We are doing good 3',
      },
      {
        id: '2',
        content: 'We will have roadmap 3',
      },
      {
        id: '3',
        content: 'We will have feature 3',
      },
    ],
  },
]

export const QuestDetail: FunctionComponent<{
  quest: QuestType | null
  onClose: () => void
}> = ({ quest, onClose }) => {
  const [file, setFile] = useState<Blob>()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [currentQuiz, setCurrentQuiz] = useState<number>(0)
  const [chosenAnswers, setChosenAnswers] = useState<string[]>([])
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  const handleUploadClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }

    setFile(e.target.files[0])
  }

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ))

  const chooseAnswer = (answer_id: string) => {
    setChosenAnswers([...chosenAnswers, answer_id])
    if (currentQuiz < quizzes.length) setCurrentQuiz(currentQuiz + 1)
  }

  const submit = async () => {
    let input = inputRef.current?.value ?? ''
    if (quest?.type === claimType.IMAGE) {
      var formData = new FormData()
      formData.append('image', file || '')
      try {
        const data = await uploadImageApi(formData)
        input = data?.data?.url || ''
      } catch (error) {
        toast.error('Error while upload file')
        return
      }
    }
    try {
      const data = await claimRewardApi({
        quest_id: quest?.id,
        input: input,
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
      <div className='px-6 pt-6'>
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
                <div className='px-32 pt-9'>
                  <FullWidthBtn> Add files</FullWidthBtn>
                </div>
                <Gap height={2} />
                <div className='px-32 pb-9'>Accepts .gif, .jpg, and .png</div>
              </div>
            </div>
            <aside>
              <h4>Files</h4>
              <ul>{files}</ul>
            </aside>
          </section>
        )}

        {quest?.type === claimType.TEXT && (
          <InputBox ref={inputRef} placeholder='YES' />
        )}

        {quest?.type === claimType.URL && (
          <InputBox ref={inputRef} placeholder='https://twitter.com/' />
        )}
      </div>
    )
  }
  return (
    <div className='grid gap-1 grid-cols-2 w-full'>
      <ContentContainer className={claimType.QUIZ ? 'px-0' : '' + ' w-480'}>
        {quest?.type === claimType.QUIZ ? withQuizzes() : withText()}
      </ContentContainer>
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
