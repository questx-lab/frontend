import { FunctionComponent } from 'react'

import { useStoreState } from 'easy-peasy'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Dropzone from 'react-dropzone'
import tw from 'twin.macro'

import {
  ButtonSocialType,
  ProjectRoleEnum,
  TwitterEnum,
} from '@/constants/project.const'
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
import { QuestTwitterActionType } from '@/types/project.type'
import { getUserLocal } from '@/utils/helper'
import { PositiveButton } from '@/widgets/button'
import { TextField } from '@/widgets/form'
import {
  HorizontalBetweenCenter,
  HorizontalStartCenter,
  VerticalBetween,
  VerticalCenter,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { NormalText } from '@/widgets/text'
import {
  ArrowPathIcon,
  ChatBubbleBottomCenterIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
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
      <a href={link} target='_blank' className='w-full'>
        <SocialBtn btnType={ButtonSocialType.DISCORD}>
          {'Go to Discord'}
        </SocialBtn>
      </a>
    </WrapBtn>
  )
}

export const QuestTwitterAction: FunctionComponent<{
  actions: QuestTwitterActionType[]
}> = ({ actions }) => {
  const router = useRouter()
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  const renderActions = actions.map((e) => {
    switch (e.action) {
      case TwitterEnum.FOLLOW:
        return (
          <ActionTwitterBox>
            <HorizontalStartCenter>
              <LinkIcon className='h-5 w-5' />
              <NormalText>{e.link}</NormalText>
            </HorizontalStartCenter>
            <PositiveButton
              block={!user.services?.twitter}
              onClick={() => router.push(e.link)}
            >
              {e.action}
            </PositiveButton>
          </ActionTwitterBox>
        )
      case TwitterEnum.TWEET:
        return (
          <VerticalFullWidth>
            <HorizontalStartCenter>
              <NormalText>
                {'Be sure to include the following words :'}
              </NormalText>
            </HorizontalStartCenter>
            <PositiveButton
              block={!user.services?.twitter}
              onClick={() => router.push(e.link)}
              isFull
            >
              {'Tweet about us'}
            </PositiveButton>
          </VerticalFullWidth>
        )
      case TwitterEnum.LIKE:
        return (
          <ActionTwitterBox>
            <HorizontalStartCenter>
              <HandThumbUpIcon className='h-5 w-5' />
              <NormalText>{'Like this post'}</NormalText>
            </HorizontalStartCenter>
            <PositiveButton
              block={!user.services?.twitter}
              onClick={() => router.push(e.link)}
            >
              {e.action}
            </PositiveButton>
          </ActionTwitterBox>
        )
      case TwitterEnum.REPLY:
        return (
          <ActionTwitterBox>
            <HorizontalStartCenter>
              <ChatBubbleBottomCenterIcon className='h-5 w-5' />
              <NormalText>{'Replay to this post'}</NormalText>
            </HorizontalStartCenter>

            <PositiveButton
              block={!user.services?.twitter}
              onClick={() => router.push(e.link)}
            >
              {e.action}
            </PositiveButton>
          </ActionTwitterBox>
        )
      case TwitterEnum.RETWEET:
        return (
          <ActionTwitterBox>
            <HorizontalStartCenter>
              <ArrowPathIcon className='h-5 w-5' />
              <NormalText>{'Retweet this post'}</NormalText>
            </HorizontalStartCenter>
            <PositiveButton
              block={!user.services?.twitter}
              onClick={() => router.push(e.link)}
            >
              {e.action}
            </PositiveButton>
          </ActionTwitterBox>
        )
      default:
        return (
          <ActionTwitterBox>
            <HorizontalStartCenter>
              <HandThumbDownIcon className='h-5 w-5' />
              <NormalText>{'join space'}</NormalText>
            </HorizontalStartCenter>
            <PositiveButton
              block={!user.services?.twitter}
              onClick={() => router.push(e.link)}
            >
              {e.action}
            </PositiveButton>
          </ActionTwitterBox>
        )
    }
  })

  return <>{renderActions}</>
}

export const QuestTwitter: FunctionComponent<{
  actions: QuestTwitterActionType[]
}> = ({ actions }) => {
  const onConnect = async () => {
    signIn('twitter')
  }
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  return (
    <WrapBtn>
      {!user.services?.twitter && (
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
      )}

      <QuestTwitterAction actions={actions} />
    </WrapBtn>
  )
}

export const QuestVisitLink: FunctionComponent<{ link: string }> = ({
  link,
}) => {
  return (
    <a href={link} target='_blank'>
      <SocialBtn btnType={ButtonSocialType.VISIT_LINK}>
        {'Visit link'}
      </SocialBtn>
    </a>
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
