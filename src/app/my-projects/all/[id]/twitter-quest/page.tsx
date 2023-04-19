'use client'
import { Fragment, useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { DotLoader } from 'react-spinners'

import { newQuestApi } from '@/app/api/client/quest'
import Layout from '@/components/layouts/layout'
import { Spinner } from '@/components/spinner/spinner'
import { StorageConst } from '@/constants/storage.const'
import { useStoreState } from '@/store/store'
import { PSave } from '@/styles/button.style'
import {
  ColSWrap,
  Divider,
  Gap,
  LargeText,
  LightText,
  MediumText,
  MediumTitle,
  RowBSWrap,
  RowCWrap,
  RowSWrap,
  SpinnerStyle,
} from '@/styles/common.style'
import { InputBox, MulInputBox } from '@/styles/input.style'
import {
  DesModal,
  DialogPannel,
  ModalBg,
  ModalContent,
  ModalWrap,
  TitleModal,
  WrapProgressBar,
} from '@/styles/modal.style'
import { LabelInput } from '@/styles/myProjects.style'
import {
  TActions,
  TBox,
  TCheckBox,
  TEBox,
  TEEBox,
  TEText,
  TEWrap,
  TImg,
  TMain,
  TWrap,
} from '@/styles/quest.style'
import { ProjectType, ReqNewQuestType } from '@/types/project.type'
import { Dialog, Transition } from '@headlessui/react'

type ActionType = {
  name: string
  des: string
  label: string
  key: string
}

const ActionList: ActionType[] = [
  {
    name: 'Follow',
    des: 'This is a subtitle',
    label: 'Twitter Handle',
    key: 'account_url',
  },
  {
    name: 'Like',
    des: 'This is a subtitle',
    label: 'Tweet URL',
    key: 'tweet_url',
  },
  {
    name: 'Reply',
    des: 'This is a subtitle',
    label: 'Twitter Handle',
    key: 'tweet_url',
  },
  {
    name: 'Retweet',
    des: 'This is a subtitle',
    label: 'Tweet URL',
    key: 'tweet_url',
  },
  {
    name: 'Tweet',
    des: 'This is a subtitle',
    label: 'Default tweet',
    key: 'default_tweet',
  },
  {
    name: 'Join Space',
    des: 'This is a subtitle',
    label: 'Space URL',
    key: 'space_url',
  },
]

export default function TwitterQuest({ params }: { params: { id: string } }) {
  const projectState = useStoreState((state) => state.project.curProject)
  const [project, setProject] = useState<ProjectType>()
  const [actionActive, setActionActive] = useState<number[]>([])
  const titleRef = useRef<HTMLInputElement>(null)
  const followRef = useRef<HTMLInputElement>(null)
  const likeRef = useRef<HTMLInputElement>(null)
  const replyRef = useRef<HTMLInputElement>(null)
  const retweetRef = useRef<HTMLInputElement>(null)
  const tweetRef = useRef<HTMLInputElement>(null)
  const joinSpaceRef = useRef<HTMLInputElement>(null)
  const instructionRef = useRef<HTMLTextAreaElement>(null)
  const pointRewardRef = useRef<HTMLInputElement>(null)
  let [isOpen, setIsOpen] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    setProject(projectState)
  }, [projectState])

  const listActions = ActionList.map((e, i) => {
    let block = false

    if (actionActive.includes(0)) {
      if (i !== 0) {
        block = true
      } else {
        block = false
      }
    }

    if (actionActive.includes(4)) {
      if (i !== 4) {
        block = true
      } else {
        block = false
      }
    }

    if (actionActive.includes(5)) {
      if (i !== 5) {
        block = true
      } else {
        block = false
      }
    }

    if (
      actionActive.includes(1) ||
      actionActive.includes(2) ||
      actionActive.includes(3)
    ) {
      if (i !== 1 && i !== 2 && i !== 3) {
        block = true
      } else {
        block = false
      }
    }

    return (
      <TEWrap key={i}>
        <TBox>
          <TCheckBox
            disabled={block}
            defaultChecked={false}
            onChange={(val) => {
              if (val.target.checked) {
                setActionActive([...actionActive, i])
              } else {
                setActionActive(actionActive.filter((e) => e !== i))
              }
            }}
            id='inline-checked-checkbox'
            type='checkbox'
          />
          <Gap width={4} height={0} />
          <TEBox>
            <TImg disable={block} />
            <TEEBox>
              <MediumText>{e.name}</MediumText>
              <Gap height={4} width={0} />
              <TEText>{e.des}</TEText>
            </TEEBox>
          </TEBox>
        </TBox>
        {actionActive.includes(i) && (
          <>
            <Gap width={0} height={4} />
            <LabelInput>{e.label}</LabelInput>
            <Gap width={0} height={2} />
            {e.name === 'Follow' && (
              <InputBox
                defaultValue={'https://twitter.com/elonmusk'}
                ref={followRef}
                placeholder='This is a placeholder'
              />
            )}
            {e.name === 'Like' && (
              <InputBox ref={likeRef} placeholder='This is a placeholder' />
            )}
            {e.name === 'Reply' && (
              <InputBox ref={replyRef} placeholder='This is a placeholder' />
            )}
            {e.name === 'Retweet' && (
              <InputBox ref={retweetRef} placeholder='This is a placeholder' />
            )}
            {e.name === 'Tweet' && (
              <InputBox ref={tweetRef} placeholder='This is a placeholder' />
            )}
            {e.name === 'Join Space' && (
              <InputBox
                ref={joinSpaceRef}
                placeholder='This is a placeholder'
              />
            )}
          </>
        )}
      </TEWrap>
    )
  })

  const handleSubmit = async () => {
    setIsOpen(true)
    const validations: any = {}
    let type = ''
    let like = false,
      reply = false,
      retweet = false
    actionActive.forEach((e) => {
      switch (ActionList[e].name) {
        case 'Follow':
          validations['twitter_handle'] = followRef.current?.value ?? ''
          type = 'twitter_follow'
          break
        case 'Like':
          if (ActionList[e].name === 'Like') {
            like = true
          }
          validations['tweet_url'] = likeRef.current?.value ?? ''
          validations['like'] = like

          type = 'twitter_reaction'
          break
        case 'Reply':
          if (ActionList[e].name === 'Reply') {
            reply = true
          }
          validations['tweet_url'] = replyRef.current?.value ?? ''
          validations['reply'] = reply

          type = 'twitter_reaction'
          break
        case 'Retweet':
          if (ActionList[e].name === 'Retweet') {
            retweet = true
          }
          validations['tweet_url'] = retweetRef.current?.value ?? ''
          validations['retweet'] = retweet

          type = 'twitter_reaction'
          break
        case 'Tweet':
          validations['included_words'] = []
          validations['default_tweet'] = tweetRef.current?.value ?? ''
          type = 'twitter_tweet'
          break
        case 'Join Space':
          validations['space_url'] = joinSpaceRef.current?.value ?? ''
          type = 'twitter_join_space'
          break
      }
    })

    const payload: ReqNewQuestType = {
      project_id: params.id,
      type,
      title: titleRef.current?.value ?? '',
      description: instructionRef.current?.value ?? '',
      categories: [],
      recurrence: 'once',
      awards: [
        {
          type: 'points',
          value: pointRewardRef.current?.value ?? '0',
        },
      ],
      validation_data: validations,
      condition_op: 'and',
      conditions: [],
    }

    try {
      const data = await newQuestApi(payload)
      if (data.error) {
        setIsOpen(false)
        toast.error(data.error)
      }
      if (data.data) {
        router.back()
      }
    } catch (error) {
      setIsOpen(false)
      toast.error('Error while creating quest')
    }
  }

  return (
    <Layout>
      <header>
        <title>{'Create twitter quest'}</title>
      </header>
      {project && (
        <TWrap>
          <TMain>
            <RowSWrap>
              <Image
                width={30}
                height={30}
                src={StorageConst.TWITTER_DIR.src}
                alt={StorageConst.TWITTER_DIR.alt}
              />
              <Gap width={2} height={0} />
              <LargeText>{project.name}</LargeText>
            </RowSWrap>
            <Gap height={6} width={0} />
            <InputBox ref={titleRef} placeholder='Twitter quest name' />
            <Gap height={6} width={0} />
            <MediumTitle>{'Quests to Complete'}</MediumTitle>
            <Divider />
            <TActions>{listActions}</TActions>
            <RowBSWrap>
              <ColSWrap>
                <MediumTitle>{'Instruction'}</MediumTitle>
                <Divider />
                <MulInputBox ref={instructionRef} rows={3} />
              </ColSWrap>
              <Gap width={12} height={8} />
              <ColSWrap>
                <MediumTitle>{'Rewards'}</MediumTitle>
                <Divider />
                <InputBox
                  ref={pointRewardRef}
                  defaultValue={1}
                  type='number'
                  min={1}
                />
                <Gap height={4} width={0} />
                <LightText>
                  {
                    'This is an auto quest. The rewards will be distributed to users after the Quest is completed'
                  }
                </LightText>
              </ColSWrap>
            </RowBSWrap>
            <Gap height={9} />
            <RowCWrap>
              <PSave onClick={handleSubmit} isBlock={false}>
                {'CREATE QUEST'}
              </PSave>
            </RowCWrap>
            <Gap height={9} />
          </TMain>
        </TWrap>
      )}
      {!project && <Spinner />}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <ModalBg />
          </Transition.Child>
          <ModalWrap>
            <ModalContent>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <DialogPannel>
                  <WrapProgressBar>
                    <DotLoader
                      color={'#000'}
                      loading={true}
                      cssOverride={SpinnerStyle}
                      size={150}
                      aria-label='Loading Spinner'
                      data-testid='loader'
                    />
                  </WrapProgressBar>
                  <Gap height={6} />
                  <TitleModal>{'Hang in there'}</TitleModal>
                  <Gap height={6} />
                  <DesModal>{"We're creating quest,"}</DesModal>
                  <DesModal>{'It might take some minutes.'}</DesModal>
                </DialogPannel>
              </Transition.Child>
            </ModalContent>
          </ModalWrap>
        </Dialog>
      </Transition>
    </Layout>
  )
}
