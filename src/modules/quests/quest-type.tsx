import { FunctionComponent, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Dropzone from 'react-dropzone'
import styled from 'styled-components'
import tw from 'twin.macro'

import {
  ButtonSocialType,
  ColorEnum,
  ProjectRoleEnum,
  SizeEnum,
  TwitterEnum,
} from '@/constants/common.const'
import { StorageConst } from '@/constants/storage.const'
import { ActiveQuestStore } from '@/store/local/active-quest.store'
import { CommunityStore } from '@/store/local/community.store'
import { GlobalStoreModel } from '@/store/store'
import { DeleteBtn } from '@/styles/button.style'
import {
  AddFileBtn,
  SectionUploadImg,
  ShowImg,
  SocialBtn,
  UploadImgBox,
  UploadInput,
  UrlBox,
  WrapUploadImg,
} from '@/styles/quest-detail.style'
import { getUserLocal } from '@/utils/helper'
import { QuestTwitterActionType } from '@/utils/type'
import { NegativeButton, PositiveButton } from '@/widgets/button'
import { TextField } from '@/widgets/form'
import {
  HorizontalBetweenCenter,
  HorizontalStartCenter,
  VerticalBetween,
  VerticalCenter,
  VerticalFullWidth,
  VerticalFullWidthBetween,
  VerticalFullWidthCenter,
} from '@/widgets/orientation'
import { NormalText } from '@/widgets/text'
import {
  ArrowPathRoundedSquareIcon,
  ChatBubbleLeftRightIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  HeartIcon,
  LinkIcon,
} from '@heroicons/react/24/outline'

const WrapBtn = tw(VerticalBetween)`
  w-full
  gap-6
`

const ConnectBox = tw(VerticalCenter)`
  w-full
  gap-3
`

const ActionTwitterBox = tw(HorizontalBetweenCenter)`
  gap-4
  w-full
`

const WarningBox = styled(HorizontalStartCenter)<{ boxColor?: number }>(
  ({ boxColor = ColorEnum.NONE }) => [
    tw`
  w-full
  rounded-lg
  bg-white
  border
  border-solid
  border-gray-300
  p-3
  text-lg
  font-normal
  text-gray-700
  text-start
`,
    boxColor === ColorEnum.PRIMARY &&
      tw`
        bg-primary-50
        border-primary
      `,
    boxColor === ColorEnum.WARNING &&
      tw`
        bg-warning-50
        border-warning
      `,
    boxColor === ColorEnum.DANGER &&
      tw`
        bg-danger-50
        border-danger
      `,
  ]
)

const VerticalAction = tw(VerticalFullWidthCenter)`
  gap-4
`

export const QuestText: FunctionComponent = () => {
  // data
  const role = CommunityStore.useStoreState((state) => state.role)
  const textSubmit = ActiveQuestStore.useStoreState((state) => state.textSubmit)

  // action
  const setTextSubmit = ActiveQuestStore.useStoreActions(
    (action) => action.setTextSubmit
  )

  if (role === ProjectRoleEnum.GUEST) {
    return (
      <TextField
        errorMsg='This field is required'
        placeholder='Input your text'
        required
        onChange={(e) => setTextSubmit(e.target.value)}
        value={textSubmit}
      />
    )
  }

  return <UrlBox>{'Text input'}</UrlBox>
}

export const QuestUrl: FunctionComponent = () => {
  // data
  const role = CommunityStore.useStoreState((state) => state.role)
  const urlSutmit = ActiveQuestStore.useStoreState((state) => state.urlSubmit)

  // action
  const setUrlSubmit = ActiveQuestStore.useStoreActions(
    (action) => action.setUrlSubmit
  )

  if (role === ProjectRoleEnum.GUEST) {
    return (
      <TextField
        errorMsg='This field is required'
        placeholder='Input url'
        required
        onChange={(e) => setUrlSubmit(e.target.value)}
        value={urlSutmit}
      />
    )
  }

  return <UrlBox>{'https://sample-link.com'}</UrlBox>
}

export const QuestImage: FunctionComponent = () => {
  // data
  const role = CommunityStore.useStoreState((state) => state.role)
  const fileUpload = ActiveQuestStore.useStoreState((state) => state.fileUpload)

  // handler
  const onRemoveImg = () => {
    setFileUpload([])
  }
  const setFileUpload = ActiveQuestStore.useStoreActions(
    (action) => action.setFileUpload
  )

  const ShowImage: FunctionComponent = () => {
    if (fileUpload.length > 0) {
      return (
        <UploadImgBox>
          <ShowImg
            height={100}
            width={100}
            alt='img'
            src={(fileUpload[0] as any).preview}
          />
          <DeleteBtn onClick={onRemoveImg}>{'Remove image'}</DeleteBtn>
        </UploadImgBox>
      )
    }

    return (
      <Dropzone
        onDrop={(acceptedFiles) => {
          setFileUpload(
            acceptedFiles.map((upFile) =>
              Object.assign(upFile, {
                preview: URL.createObjectURL(upFile),
              })
            )
          )
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <SectionUploadImg
            {...getRootProps({
              className: 'dropzone outline-none cursor-pointer',
            })}
          >
            <UploadInput {...getInputProps()} />
            <WrapUploadImg>
              <AddFileBtn> {'Add files'}</AddFileBtn>
              {'Accepts .gif, .jpg, and .png'}
            </WrapUploadImg>
          </SectionUploadImg>
        )}
      </Dropzone>
    )
  }

  if (role === ProjectRoleEnum.GUEST) {
    return <ShowImage />
  }

  return (
    <SectionUploadImg>
      <WrapUploadImg>{'Upload Image'}</WrapUploadImg>
    </SectionUploadImg>
  )
}

export const QuestDiscord: FunctionComponent<{ link: string }> = ({ link }) => {
  const onConnect = async () => {
    signIn('discord')
  }
  const user = getUserLocal()
  return (
    <WrapBtn>
      {!user.services?.discord && (
        <SocialBtn btnType={ButtonSocialType.DISCORD} onClick={onConnect}>
          <Image
            width={30}
            height={30}
            src={StorageConst.DISCORD_DIR.src}
            alt={StorageConst.DISCORD_DIR.alt}
          />
          {'Connect Discord'}
        </SocialBtn>
      )}
      <Link href={link} target='_blank' className='w-full'>
        <SocialBtn btnType={ButtonSocialType.DISCORD}>
          {'Go to Discord'}
        </SocialBtn>
      </Link>
    </WrapBtn>
  )
}

export const QuestTwitterAction: FunctionComponent<{
  actions: QuestTwitterActionType[]
}> = ({ actions }) => {
  // hook
  const [warningRetweet, setWarningRetweet] = useState<boolean>(false)
  const [inputReply, setInputReply] = useState<boolean>(false)

  // data
  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  const replyUrlSubmit = ActiveQuestStore.useStoreState(
    (state) => state.replyUrlSubmit
  )

  // action
  const setReplyUrlSubmit = ActiveQuestStore.useStoreActions(
    (action) => action.setReplyUrlSubmit
  )

  const WarnigRetweetBox: FunctionComponent = () => {
    if (warningRetweet) {
      return (
        <WarningBox boxColor={ColorEnum.DANGER}>
          <ExclamationTriangleIcon className='w-7 h-7 text-danger' />
          {
            'Be sure to claim this quest right after your retweet, as we are only looking at your 50 last retweets'
          }
        </WarningBox>
      )
    }
    return <></>
  }

  const InputReplyPost: FunctionComponent = () => {
    if (inputReply) {
      return (
        <TextField
          required
          value={replyUrlSubmit}
          onChange={(e) => setReplyUrlSubmit(e.target.value)}
          placeholder='https://twitter.com/abc/status/1660098343148699649'
          errorMsg='Input your Link after reply success'
        />
      )
    }
    return <></>
  }

  if (!user.services?.twitter) {
    return <></>
  }

  const renderActions = actions.map((e) => {
    switch (e.action) {
      case TwitterEnum.FOLLOW:
        return (
          <Link href={e.link} target='_blank'>
            <ActionTwitterBox>
              <HorizontalStartCenter>
                <LinkIcon className='h-5 w-5' />
                <NormalText>{e.link}</NormalText>
              </HorizontalStartCenter>
              <PositiveButton block={!user.services?.twitter}>
                {e.action}
              </PositiveButton>
            </ActionTwitterBox>
          </Link>
        )
      case TwitterEnum.TWEET:
        return (
          <div onClick={() => setInputReply(true)}>
            <VerticalFullWidth>
              <Link className='w-full' href={e.link} target='_blank'>
                <VerticalFullWidth>
                  <HorizontalStartCenter>
                    <NormalText>
                      {'Be sure to include the following words :'}
                    </NormalText>
                  </HorizontalStartCenter>
                  <PositiveButton block={!user.services?.twitter} isFull>
                    {'Tweet about us'}
                  </PositiveButton>
                </VerticalFullWidth>
              </Link>
              <InputReplyPost />
            </VerticalFullWidth>
          </div>
        )
      case TwitterEnum.LIKE:
        return (
          <Link href={e.link} target='_blank'>
            <ActionTwitterBox>
              <HorizontalStartCenter>
                <HeartIcon className='h-7 w-7 text-info' />
                <NormalText>{'Like this post'}</NormalText>
              </HorizontalStartCenter>
              <NegativeButton
                block={!user.services?.twitter}
                width={SizeEnum.x32}
              >
                {e.action}
              </NegativeButton>
            </ActionTwitterBox>
          </Link>
        )
      case TwitterEnum.REPLY:
        return (
          <div onClick={() => setInputReply(true)}>
            <VerticalFullWidth>
              <Link href={e.link} target='_blank' className='w-full'>
                <ActionTwitterBox>
                  <HorizontalStartCenter>
                    <ChatBubbleLeftRightIcon className='h-7 w-7 text-info' />
                    <NormalText>{'Reply to this post'}</NormalText>
                  </HorizontalStartCenter>

                  <NegativeButton
                    block={!user.services?.twitter}
                    width={SizeEnum.x32}
                  >
                    {e.action}
                  </NegativeButton>
                </ActionTwitterBox>
              </Link>
              <InputReplyPost />
            </VerticalFullWidth>
          </div>
        )
      case TwitterEnum.RETWEET:
        return (
          <div onClick={() => setWarningRetweet(true)}>
            <VerticalFullWidth>
              <Link href={e.link} target='_blank' className='w-full'>
                <ActionTwitterBox>
                  <HorizontalStartCenter>
                    <ArrowPathRoundedSquareIcon className='h-7 w-7 text-info' />
                    <NormalText>{'Retweet this post'}</NormalText>
                  </HorizontalStartCenter>
                  <NegativeButton
                    block={!user.services?.twitter}
                    width={SizeEnum.x32}
                  >
                    {e.action}
                  </NegativeButton>
                </ActionTwitterBox>
              </Link>

              <WarnigRetweetBox />
            </VerticalFullWidth>
          </div>
        )
      default:
        return (
          <Link href={e.link} target='_blank'>
            <ActionTwitterBox>
              <HorizontalStartCenter>
                <NormalText>{'join space'}</NormalText>
              </HorizontalStartCenter>
              <NegativeButton
                block={!user.services?.twitter}
                width={SizeEnum.x48}
              >
                {e.action}
              </NegativeButton>
            </ActionTwitterBox>
          </Link>
        )
    }
  })

  return (
    <VerticalAction>
      <NormalText>{'To complete this challenge:'}</NormalText>
      <VerticalFullWidthBetween>{renderActions}</VerticalFullWidthBetween>
      <WarningBox boxColor={ColorEnum.WARNING}>
        <ExclamationCircleIcon className='w-7 h-7 text-warning' />
        {'After completion, it can take up to 10s before your claim succeeds.'}
      </WarningBox>
    </VerticalAction>
  )
}

export const QuestTwitter: FunctionComponent<{
  actions: QuestTwitterActionType[]
}> = ({ actions }) => {
  const onConnect = async () => {
    signIn('twitter')
  }
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  const TwitterConnectBox: FunctionComponent = () => {
    if (user.services?.twitter) {
      return <></>
    }

    return (
      <ConnectBox>
        <SocialBtn btnType={ButtonSocialType.TWITTER} onClick={onConnect}>
          <Image
            width={30}
            height={30}
            src={StorageConst.TWITTER_DIR.src}
            alt={StorageConst.TWITTER_DIR.alt}
          />
          {'Connect Twitter'}
        </SocialBtn>
        <NormalText>
          {'You need to connect Twitter to access this quest'}
        </NormalText>
      </ConnectBox>
    )
  }

  return (
    <WrapBtn>
      <TwitterConnectBox />
      <QuestTwitterAction actions={actions} />
    </WrapBtn>
  )
}

export const QuestVisitLink: FunctionComponent<{ link: string }> = ({
  link,
}) => {
  const setVisitLink = ActiveQuestStore.useStoreActions(
    (action) => action.setVisitLink
  )

  return (
    <VerticalFullWidth onClick={() => setVisitLink(true)}>
      <Link href={link} target='_blank' className='w-full'>
        <SocialBtn btnType={ButtonSocialType.VISIT_LINK} isFull>
          {'Visit link'}
        </SocialBtn>
      </Link>
    </VerticalFullWidth>
  )
}

export const QuestTelegram: FunctionComponent<{ link: string }> = ({
  link,
}) => {
  const router = useRouter()
  return (
    <SocialBtn
      onClick={() => router.push(link)}
      btnType={ButtonSocialType.TELEGRAM}
    >
      <Image
        width={30}
        height={30}
        src={StorageConst.TELEGRAM_DIR.src}
        alt={StorageConst.TELEGRAM_DIR.alt}
      />
      {'Join Telegram'}
    </SocialBtn>
  )
}
