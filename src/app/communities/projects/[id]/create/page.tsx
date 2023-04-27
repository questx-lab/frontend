'use client'

import { Fragment, useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { DotLoader } from 'react-spinners'

import { getProjectApi } from '@/app/api/client/project'
import { newQuestApi } from '@/app/api/client/quest'
import Editor from '@/components/editor/page'
import Layout from '@/components/layouts/layout'
import SidebarCustom from '@/components/layouts/sidebar'
import { Spinner } from '@/components/spinner/spinner'
import {
  ActionList,
  ActiveEnum,
  QuestRecurrences,
  QuestRewards,
  QuestTypeEnum,
  QuestTypes,
  SubmissionEnum,
  TwitterEnum,
} from '@/constants/project.const'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import { useStoreState } from '@/store/store'
import { BtnCreateQuest, BtnDraft } from '@/styles/button.style'
import { Divider, Gap, SpinnerStyle } from '@/styles/common.style'
import {
  InputBox,
  InputInviteBox,
  InputTeleBox,
  MulInputBox,
} from '@/styles/input.style'
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
import { TBox, TCheckBox } from '@/styles/quest.style'
import {
  BlockBox,
  BtnUseT,
  BtnWrap,
  CBox,
  CCard,
  CHeadling,
  CMain,
  CPBox,
  CSide,
  CSideCard,
  ICard,
  ImageQuestBox,
  ItemSide,
  ITypeBox,
  LabelCheckText,
  LabelDes,
  LvBox,
  PersonDes,
  PersonInfoBox,
  PersonName,
  PersonWrap,
  PICard,
  PointBox,
  PointInput,
  TitleBox,
  TwitterBox,
  TypeBox,
  UnderText,
  Wrap,
} from '@/styles/questboard.style'
import {
  ProjectType,
  ReqNewQuestType,
  ValidationQuest,
} from '@/types/project.type'
import { Dialog, Transition } from '@headlessui/react'

export default function Questboard({ params }: { params: { id: string } }) {
  const [activeType, setActiveType] = useState<number>(0)
  const [activeRecurrence, setActiveRecurrence] = useState<number>(0)
  const [actionTwitter, setActionTwitter] = useState<number[]>([])
  const [activeReward, setActiveReward] = useState<number>(0)
  const [activeSide, setActiveSide] = useState<number>(0)
  const [project, setProject] = useState<ProjectType>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [textAutoValid, setTextAutoValid] = useState<boolean>(false)
  const [questDescription, setQuestDescription] = useState<string>('')
  const [emptyAutoValid, setEmptyAutoValid] = useState<boolean>(true)
  const [pendingPermission, setPendingPermission] = useState<boolean>(true)
  const [hasPermission, setHasPermission] = useState<boolean>(false)

  const projectState = useStoreState((state) => state.project.curProject)
  const userState = useStoreState((state) => state.userSession.user)

  const titleRef = useRef<HTMLInputElement>(null)
  const followTwRef = useRef<HTMLInputElement>(null)
  const tweetTwRef = useRef<HTMLInputElement>(null)
  const replyTwRef = useRef<HTMLTextAreaElement>(null)
  const contentTwRef = useRef<HTMLTextAreaElement>(null)
  const joinSpaceTwRef = useRef<HTMLInputElement>(null)
  const visitLinkRef = useRef<HTMLInputElement>(null)
  const pointRewardRef = useRef<HTMLInputElement>(null)
  const textAnserRef = useRef<HTMLInputElement>(null)
  const telegramLinkRef = useRef<HTMLInputElement>(null)
  const inviteRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

  useEffect(() => {
    projectState && setProject(projectState)
  }, [projectState])

  useEffect(() => {
    getProject()
  }, [])

  const getProject = async () => {
    try {
      setPendingPermission(true)
      const rs = await getProjectApi(params.id)
      if (rs.error) {
        setHasPermission(false)
      } else {
        if (userState && userState.id === rs.data?.project.created_by) {
          setHasPermission(true)
        } else {
          setHasPermission(false)
        }
      }
      setPendingPermission(false)
    } catch (error) {
      toast.error('error')
      setPendingPermission(false)
    }
  }

  const listTypeItems = QuestTypes.map((e, i) => (
    <TypeBox
      active={activeType === i}
      key={i}
      onClick={() => {
        setActiveType(i)
      }}
    >
      {e}
    </TypeBox>
  ))

  const onChangeEditor = (val: string) => {
    setQuestDescription(val)
  }

  const listRewards = QuestRewards.map((e, i) => (
    <TypeBox
      active={activeReward === i}
      key={i}
      onClick={() => {
        setActiveReward(i)
      }}
    >
      {e}
    </TypeBox>
  ))

  const listRecurrenceItems = QuestRecurrences.map((e, i) => (
    <TypeBox
      active={activeRecurrence === i}
      key={i}
      onClick={() => {
        setActiveRecurrence(i)
      }}
    >
      {e}
    </TypeBox>
  ))

  const listTwitterAction = ActionList.map((e, i) => {
    let block = false

    if (actionTwitter.includes(TwitterEnum.FOLLOW)) {
      if (i !== TwitterEnum.FOLLOW) {
        block = true
      } else {
        block = false
      }
    }

    if (actionTwitter.includes(TwitterEnum.TWEET)) {
      if (i !== TwitterEnum.TWEET) {
        block = true
      } else {
        block = false
      }
    }

    if (actionTwitter.includes(TwitterEnum.JOIN_SPACE)) {
      if (i !== 5) {
        block = true
      } else {
        block = false
      }
    }

    if (
      actionTwitter.includes(TwitterEnum.LIKE) ||
      actionTwitter.includes(TwitterEnum.REPLY) ||
      actionTwitter.includes(TwitterEnum.RETWEET)
    ) {
      if (
        i !== TwitterEnum.LIKE &&
        i !== TwitterEnum.REPLY &&
        i !== TwitterEnum.RETWEET
      ) {
        block = true
      } else {
        block = false
      }
    }

    const handleActive = () => {
      if (!actionTwitter.includes(i)) {
        setActionTwitter([...actionTwitter, i])
      } else {
        setActionTwitter(actionTwitter.filter((e) => e !== i))
      }
    }

    let active = ActiveEnum.NONE

    if (block) {
      active = ActiveEnum.BLOCK
    }

    if (actionTwitter.includes(i)) {
      active = ActiveEnum.ACTIVE
    }

    return (
      <TwitterBox
        active={active}
        key={i}
        onClick={block ? undefined : handleActive}
      >
        {e.name}
      </TwitterBox>
    )
  })

  const actionView = () => {
    switch (activeType) {
      case SubmissionEnum.URL:
        return <></>
      case SubmissionEnum.TEXT:
        return (
          <PICard>
            <Gap height={6} />
            <TBox>
              <TCheckBox
                checked={textAutoValid}
                onChange={(e) => setTextAutoValid(e.target.checked)}
                id='inline-checked-checkbox'
                type='checkbox'
              />
              <Gap width={4} />
              <LabelCheckText onClick={() => setTextAutoValid(!textAutoValid)}>
                {'Autovalidate'}
              </LabelCheckText>
            </TBox>
            {textAutoValid && (
              <>
                <Gap height={4} />
                <LabelInput>{'Correct Answer'}</LabelInput>
                <Gap height={2} />
                <InputBox ref={textAnserRef} placeholder='' />
                <Gap height={2} />
                <LabelDes>{'Leave empty for accepting any value'}</LabelDes>
              </>
            )}
          </PICard>
        )
      case SubmissionEnum.VISIT_LINK:
        return (
          <>
            <Divider />
            <PICard>
              <LabelInput>{'LINK'}</LabelInput>
              <Gap height={2} />
              <InputBox ref={visitLinkRef} placeholder='https://example.com' />
            </PICard>
          </>
        )

      case SubmissionEnum.TWITTER:
        return (
          <>
            <Divider />
            <PICard>
              <LabelInput>{'ACTION'}</LabelInput>
              <Gap height={2} />
              <ITypeBox>{listTwitterAction}</ITypeBox>
            </PICard>
            {actionTwitter.includes(TwitterEnum.FOLLOW) && (
              <>
                <Divider />
                <PICard>
                  <LabelInput>{'ACCOUNT URL'}</LabelInput>
                  <Gap height={3} />
                  <InputBox
                    ref={followTwRef}
                    placeholder='https://twitter.com/elon.musk'
                  />
                </PICard>
              </>
            )}
            {(actionTwitter.includes(TwitterEnum.LIKE) ||
              actionTwitter.includes(TwitterEnum.REPLY) ||
              actionTwitter.includes(TwitterEnum.RETWEET)) && (
              <>
                <Divider />
                <PICard>
                  <LabelInput>{'TWEET URL'}</LabelInput>
                  <Gap height={3} />
                  <InputBox
                    ref={tweetTwRef}
                    placeholder='https://twitter.com/abc'
                  />
                  <Gap height={3} />
                  <LabelDes>{'Post to like/reply/retweet'}</LabelDes>
                </PICard>
              </>
            )}
            {actionTwitter.includes(TwitterEnum.REPLY) && (
              <>
                <Divider />
                <PICard>
                  <LabelInput>{'DEFAULT REPLY'}</LabelInput>
                  <Gap height={3} />
                  <MulInputBox
                    ref={replyTwRef}
                    rows={3}
                    placeholder='Check this out @mantanetworl, @dzucle, @yugih, so cool!'
                  />
                  <Gap height={3} />
                  <LabelDes>
                    {'We will prepare a pre-filled reply for the users'}
                  </LabelDes>
                </PICard>
              </>
            )}
            {actionTwitter.includes(TwitterEnum.TWEET) && (
              <>
                <Divider />
                <PICard>
                  <LabelInput>{'TWEET CONTENT'}</LabelInput>
                  <Gap height={3} />
                  <MulInputBox
                    ref={contentTwRef}
                    rows={3}
                    placeholder='Check this out @mantanetworl, @dzucle, @yugih, so cool!'
                  />
                </PICard>
              </>
            )}
          </>
        )
      case SubmissionEnum.EMPTY:
        return (
          <PICard>
            <Gap height={6} />
            <TBox>
              <TCheckBox
                checked={emptyAutoValid}
                onChange={(e) => setEmptyAutoValid(e.target.checked)}
                id='inline-checked-checkbox'
                type='checkbox'
              />
              <Gap width={4} />
              <LabelCheckText
                onClick={() => setEmptyAutoValid(!emptyAutoValid)}
              >
                {'Autovalidate'}
              </LabelCheckText>
            </TBox>
          </PICard>
        )
      case SubmissionEnum.JOIN_TELEGRAM:
        return (
          <>
            <Divider />
            <PICard>
              <LabelInput>{'JOIN TELEGRAM'}</LabelInput>
              <Gap height={2} />
              <InputTeleBox
                ref={telegramLinkRef}
                placeholder='Telegram invite link'
              />
              <Gap height={2} />
              <LabelDes>
                {'Invite link should be in the format https://t.me/groupid'}
              </LabelDes>
            </PICard>
          </>
        )
      case SubmissionEnum.INVITES:
        return (
          <>
            <Divider />
            <PICard>
              <LabelInput>{'INVITES'}</LabelInput>
              <Gap height={2} />
              <InputInviteBox ref={inviteRef} defaultValue={10} type='number' />
              <Gap height={2} />
              <LabelDes>
                {'Invited user needs to complete 1 quest for invite to count'}
              </LabelDes>
            </PICard>
          </>
        )
      default:
        return <></>
    }
  }

  const handleSubmit = async () => {
    setIsOpen(true)
    let type = 'url'
    const validations: ValidationQuest = {}
    let like = false,
      reply = false,
      retweet = false
    switch (activeType) {
      case SubmissionEnum.URL:
        type = QuestTypeEnum.URL
        break
      case SubmissionEnum.IMAGE:
        type = QuestTypeEnum.IMAGE
        break
      case SubmissionEnum.TEXT:
        type = QuestTypeEnum.TEXT
        validations.auto_validate = textAutoValid
        validations.answer = textAnserRef.current?.value ?? ''
        break
      case SubmissionEnum.QUIZ:
        type = QuestTypeEnum.QUIZ
        break
      case SubmissionEnum.VISIT_LINK:
        type = QuestTypeEnum.VISIT_LINK
        validations.link = visitLinkRef.current?.value ?? ''
        break
      case SubmissionEnum.EMPTY:
        type = QuestTypeEnum.EMPTY
        validations.auto_validate = emptyAutoValid
        break
      case SubmissionEnum.TWITTER:
        actionTwitter.forEach((e) => {
          switch (ActionList[e].name) {
            case 'Follow':
              validations.twitter_handle = followTwRef.current?.value ?? ''
              type = QuestTypeEnum.TWITTER_FOLLOW
              break
            case 'Like':
              if (ActionList[e].name === 'Like') {
                like = true
              }
              validations.tweet_url = tweetTwRef.current?.value ?? ''
              validations.like = like

              type = QuestTypeEnum.TWITTER_REACTION
              break
            case 'Reply':
              if (ActionList[e].name === 'Reply') {
                reply = true
              }
              validations.tweet_url = replyTwRef.current?.value ?? ''
              validations.reply = reply

              type = QuestTypeEnum.TWITTER_REACTION
              break
            case 'Retweet':
              if (ActionList[e].name === 'Retweet') {
                retweet = true
              }
              validations.tweet_url = tweetTwRef.current?.value ?? ''
              validations.retweet = retweet

              type = QuestTypeEnum.TWITTER_REACTION
              break
            case 'Tweet':
              validations.included_words = []
              validations.default_tweet = contentTwRef.current?.value ?? ''
              type = QuestTypeEnum.TWITTER_TWEET
              break
            case 'Join Space':
              validations.space_url = joinSpaceTwRef.current?.value ?? ''
              type = QuestTypeEnum.TWITTER_JOIN_SPACE
              break
          }
        })

        break
      case SubmissionEnum.JOIN_DISCORD:
        type = QuestTypeEnum.JOIN_DISCORD
        break
      case SubmissionEnum.JOIN_TELEGRAM:
        type = QuestTypeEnum.JOIN_TELEGRAM
        validations.invite_link = telegramLinkRef.current?.value ?? ''
        break
      case SubmissionEnum.INVITES:
        type = QuestTypeEnum.INVITES
        validations.number = parseInt(inviteRef.current?.value ?? '0')
        break
    }

    const payload: ReqNewQuestType = {
      project_id: params.id,
      type,
      title: titleRef.current?.value ?? '',
      description: questDescription,
      categories: [],
      recurrence: QuestRecurrences[activeRecurrence].toLowerCase(),
      rewards: [
        {
          type: 'points',
          data: {
            points: parseInt(pointRewardRef.current?.value ?? '1', 10),
          },
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
        router.push(RouterConst.PROJECT + params.id)
      }
    } catch (error) {
      setIsOpen(false)
      toast.error('Error while creating quest')
    }
  }

  const BlockPermission = () => (
    <BlockBox>{'You do not permission to access this page'}</BlockBox>
  )

  return (
    <Layout>
      <header>
        <title>{'Create Questboard'}</title>
      </header>
      {pendingPermission && (
        <Wrap>
          <BlockBox>
            <Spinner />
          </BlockBox>
        </Wrap>
      )}
      {!pendingPermission && !hasPermission && (
        <Wrap>
          <BlockPermission />
        </Wrap>
      )}
      {!pendingPermission && hasPermission && (
        <Wrap>
          <SidebarCustom />
          <CMain>
            <CSide>
              <PersonWrap>
                <ImageQuestBox
                  width={80}
                  height={80}
                  src={'/images/dummy/1.svg'}
                  alt={'Avatar'}
                />
                <Gap height={6} />
                <PersonInfoBox>
                  <PersonName>{'ThanhChi'}</PersonName>
                  <Gap width={1} />
                  <LvBox>{'lvl.3'}</LvBox>
                </PersonInfoBox>
                <Gap height={3} />
                <PersonDes>
                  {'Short description. Lorem ipsum dolor sit amt, consectetur'}
                </PersonDes>
              </PersonWrap>
              <Divider />
              <CPBox>
                <ItemSide
                  onClick={() => setActiveSide(0)}
                  active={activeSide === 0}
                >
                  <Image
                    width={30}
                    height={30}
                    src={'/images/icons/bolt.svg'}
                    alt={'logo'}
                  />
                  <Gap width={2} />
                  {'QUESTS'}
                </ItemSide>
                <ItemSide
                  onClick={() => setActiveSide(1)}
                  active={activeSide === 1}
                >
                  <Image
                    width={30}
                    height={30}
                    src={'/images/icons/bolt.svg'}
                    alt={'logo'}
                  />
                  <Gap width={2} />
                  {'REVIEW SUBMISSION'}
                </ItemSide>
                <ItemSide
                  onClick={() => setActiveSide(2)}
                  active={activeSide === 2}
                >
                  <Image
                    width={30}
                    height={30}
                    src={'/images/icons/bolt.svg'}
                    alt={'logo'}
                  />
                  <Gap width={2} />
                  {'SETTINGS'}
                </ItemSide>
              </CPBox>
            </CSide>
            <CBox>
              <CCard>
                <TitleBox>
                  <Image
                    className='cursor-pointer'
                    onClick={() => router.push(RouterConst.PROJECT + params.id)}
                    width={35}
                    height={35}
                    src={StorageConst.ARROW_BACK_ICON.src}
                    alt={StorageConst.ARROW_BACK_ICON.alt}
                  />
                  <Gap width={3} />
                  <CHeadling>{'Create Quest'}</CHeadling>
                </TitleBox>
                <Gap height={8} />
                <ICard>
                  <PICard>
                    <LabelInput>{'QUEST TITLE'}</LabelInput>
                    <Gap />
                    <InputBox
                      ref={titleRef}
                      placeholder='The name of the quest is written here.'
                    />
                    <Gap height={6} />
                    <LabelInput>{'QUEST DESCRIPTION'}</LabelInput>
                    <Gap />
                    <Editor onChange={onChangeEditor} />
                  </PICard>
                </ICard>
                <Gap height={8} />
                <ICard>
                  <PICard>
                    <LabelInput>{'SUBMISSION TYPE'}</LabelInput>
                    <Gap height={2} />
                    <ITypeBox>{listTypeItems}</ITypeBox>
                  </PICard>
                  {actionView()}
                </ICard>
                <Gap height={8} />
                <ICard>
                  <PICard>
                    <LabelInput>{'RECURRENCE'}</LabelInput>
                    <Gap height={2} />
                    <ITypeBox>{listRecurrenceItems}</ITypeBox>
                  </PICard>
                </ICard>
                <Gap height={8} />
                <BtnWrap>
                  <BtnDraft>{'Draft'}</BtnDraft>
                  <BtnCreateQuest onClick={handleSubmit}>
                    {'Publish'}
                  </BtnCreateQuest>
                </BtnWrap>
              </CCard>
              <CSideCard>
                <BtnUseT>{'Use Template'}</BtnUseT>
                <Gap height={5} />
                <ICard>
                  <PICard>
                    <LabelInput>{'REWARD'}</LabelInput>
                    <Gap height={2} />
                    <ITypeBox>{listRewards}</ITypeBox>
                    <Gap height={6} />
                    <PointBox>
                      <Image
                        width={30}
                        height={30}
                        src={StorageConst.POINT_ICON.src}
                        alt={StorageConst.POINT_ICON.alt}
                      />
                      <Gap width={2} />
                      <PointInput
                        ref={pointRewardRef}
                        type='number'
                        min={1}
                        defaultValue={100}
                      />
                    </PointBox>

                    <Gap height={6} />
                    <UnderText>
                      {'Learn more here about how the levels are calculated.'}
                    </UnderText>
                  </PICard>
                </ICard>
              </CSideCard>
            </CBox>
          </CMain>
        </Wrap>
      )}
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
