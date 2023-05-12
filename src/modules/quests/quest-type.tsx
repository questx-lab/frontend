import { FunctionComponent } from 'react'
import Dropzone from 'react-dropzone'
import { ButtonSocialType, ProjectRoleEnum } from '@/constants/project.const'
import { ActiveQuestStore } from '@/store/local/active-quest.store'
import { NewProjectStore } from '@/store/local/project.store'
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
  WrapBtn,
} from '@/styles/quest-detail.style'
import { TextField } from '@/widgets/form'
import { signIn } from 'next-auth/react'
import { getUserLocal } from '@/utils/helper'

export const QuestText: FunctionComponent = () => {
  // data
  const role = NewProjectStore.useStoreState((state) => state.role)
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
        onChange={setTextSubmit}
        value={textSubmit}
      />
    )
  }

  return <UrlBox>{'Text input'}</UrlBox>
}

export const QuestUrl: FunctionComponent = () => {
  // data
  const role = NewProjectStore.useStoreState((state) => state.role)
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
        onChange={setUrlSubmit}
        value={urlSutmit}
      />
    )
  }

  return <UrlBox>{'https://sample-link.com'}</UrlBox>
}

export const QuestImage: FunctionComponent = () => {
  // data
  const role = NewProjectStore.useStoreState((state) => state.role)
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
      {!user.services.discord && (
        <SocialBtn btnType={ButtonSocialType.DISCORD} onClick={onConnect}>
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

export const QuestTwitter: FunctionComponent<{
  link: string
  text: string
}> = ({ link, text }) => {
  const onConnect = async () => {
    signIn('twitter', undefined, 'project_id=123')
  }
  const user = getUserLocal()

  return (
    <WrapBtn>
      {!user.services.twitter && (
        <SocialBtn btnType={ButtonSocialType.TWITTER} onClick={onConnect}>
          {'Connect Twitter'}
        </SocialBtn>
      )}
      <a href={link} target='_blank' className='w-full'>
        <SocialBtn btnType={ButtonSocialType.TWITTER}>{text}</SocialBtn>
      </a>
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
  return (
    <a href={link} target='_blank'>
      <SocialBtn btnType={ButtonSocialType.TELEGRAM}>
        {'Join Telegram'}
      </SocialBtn>
    </a>
  )
}
