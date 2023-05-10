import { FunctionComponent, useState } from 'react'
import Image from 'next/image'
import { StorageConst } from '@/constants/storage.const'
import {
  FullWidthBtn,
  GotoTwitterBtn,
  EditButton,
  DeleteBtn,
} from '@/styles/button.style'
import {
  Title,
  Description,
  HeaderBox,
  PointText,
  ContentContainer,
  QuestDetailWrap,
  QuizzesWrap,
  ProgressWrap,
  ProgressText,
  ProgressBar,
  ProgressBarBg,
  ProgressBarTotal,
  Px6,
} from '@/styles/quest-detail.style'
import { uploadImageApi } from '@/app/api/client/upload'
import { claimRewardApi } from '@/app/api/client/reward'
import { Gap } from '@/styles/common.style'
import { QuestType } from '@/types/project.type'
import { toast } from 'react-hot-toast'
import { InputBox } from '@/styles/input.style'
import { Answers } from './quiz'
import { useDropzone } from 'react-dropzone'
import { QuestTypeEnum } from '@/constants/project.const'

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
      case QuestTypeEnum.IMAGE:
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
      case QuestTypeEnum.QUIZ:
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
      <QuizzesWrap>
        <ProgressWrap>
          <ProgressText>
            {currentQuiz} of {quizzes.length} quests completed
          </ProgressText>
          <ProgressBar>
            <ProgressBarBg>
              <ProgressBarTotal
                style={{
                  width: `${(currentQuiz / quizzes.length) * 100}%`,
                }}
              ></ProgressBarTotal>
            </ProgressBarBg>
          </ProgressBar>
        </ProgressWrap>
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
      </QuizzesWrap>
    )
  }

  const withText = () => {
    return (
      <Px6>
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
        {quest?.type === QuestTypeEnum.IMAGE && (
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

        {quest?.type === QuestTypeEnum.TEXT && (
          <InputBox value={input} onChange={onChangeInput} placeholder='YES' />
        )}

        {quest?.type === QuestTypeEnum.URL && (
          <InputBox
            value={input}
            onChange={onChangeInput}
            placeholder='https://twitter.com/'
          />
        )}
      </Px6>
    )
  }

  const withTwitter = () => {
    return (
      <Px6>
        <Title>Mission 🎯</Title>
        <Gap height={2} />
        <Description>
          Just like reply and retweet the post, this quest will auto validate
          when you finish.
        </Description>
        <Gap height={4} />
        <a href={quest?.title} target='_blank'>
          <GotoTwitterBtn>
            <div className='flex'>
              <Image
                width={30}
                height={30}
                src={StorageConst.TWITTER_DIR.src}
                alt={StorageConst.TWITTER_DIR.alt}
              />
              <Gap width={2} />
              <div className='flex items-center'>Connect Twitter </div>
            </div>
          </GotoTwitterBtn>
        </a>
      </Px6>
    )
  }

  const withDiscord = () => {
    return (
      <Px6>
        <Title>Mission 🎯</Title>
        <Gap height={2} />
        <Description>
          Just like reply and retweet the post, this quest will auto validate
          when you finish.
        </Description>
        <Gap height={4} />
        <a href={quest?.title} target='_blank'>
          <GotoTwitterBtn>
            <div className='flex'>
              <Image
                width={30}
                height={30}
                src={StorageConst.DISCORD_DIR.src}
                alt={StorageConst.DISCORD_DIR.alt}
              />
              <Gap width={2} />
              <div className='flex items-center'>Connect Discord </div>
            </div>
          </GotoTwitterBtn>
        </a>
      </Px6>
    )
  }
  const withEmpty = () => {
    return (
      <Px6>
        <Title>Mission 🎯</Title>
        <Gap height={2} />
        <Description>
          This is our easiest quest! Just connect to Xquest and claim this one
          every day.
        </Description>
      </Px6>
    )
  }

  const getDescription = () => {
    console.log(quest?.type)

    switch (quest?.type) {
      case QuestTypeEnum.QUIZ:
        return withQuizzes()
      case (QuestTypeEnum.TWITTER,
      QuestTypeEnum.TWITTER_TWEET,
      QuestTypeEnum.TWITTER_FOLLOW,
      QuestTypeEnum.TWITTER_JOIN_SPACE,
      QuestTypeEnum.TWITTER_REACTION):
        return withTwitter()
      case QuestTypeEnum.EMPTY:
        return withEmpty()
      case (QuestTypeEnum.TEXT, QuestTypeEnum.IMAGE, QuestTypeEnum.URL):
        return withText()
      case QuestTypeEnum.DISCORD:
        return withDiscord()
      default:
        console.error('unsupport quest type')
        return <></>
    }
  }

  return (
    <QuestDetailWrap>
      <div className='col-span-2'>
        <ContentContainer
          className={QuestTypeEnum.QUIZ ? 'px-0' : '' + ' w-full'}
        >
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
          {
            <div className='grip grip-cols-2 gap-2'>
              <EditButton> Edit </EditButton>
              <DeleteBtn> Delete </DeleteBtn>
            </div>
          }
          <FullWidthBtn onClick={submit} className='h-10'>
            Claim Reward
          </FullWidthBtn>
        </div>
      </div>
    </QuestDetailWrap>
  )
}
