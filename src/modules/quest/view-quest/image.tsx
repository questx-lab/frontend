import { FC } from 'react'

import Dropzone from 'react-dropzone'
import styled from 'styled-components'
import tw from 'twin.macro'

import { CommunityRoleEnum } from '@/constants/common.const'
import ActiveQuestStore from '@/store/local/active-quest'
import CommunityStore from '@/store/local/community'
import { DangerButton as DangerousButton } from '@/widgets/buttons'
import { Image } from '@/widgets/image'
import { VerticalCenter, VerticalFullWidth } from '@/widgets/orientation'

const UploadImageFrame = tw(VerticalFullWidth)`
  justify-center
  items-center
  gap-3
`

const ShowImg = styled(Image)(tw`
  rounded-lg
  w-full
  h-80
`)

const SectionUploadImg = tw.section`
  border-2
  border-dotted
  rounded-lg
  justify-center
  items-center
  outline-0
  w-full
`

const UploadInput = tw.input`
  outline-0
  ring-0
  outline-offset-0
  w-full
  h-full
`

export const AddFileButton = tw.button`
  bg-primary-100
  text-sm
  font-medium
  text-primary-700
  px-6
  py-2
  rounded-lg
  outline-0
`

const CenteredFrame = tw(VerticalCenter)`
  w-full
  h-32
  text-sm
  font-normal
  text-gray-700
  gap-3
  outline-0
`

const ShowImage: FC = () => {
  const fileUpload = ActiveQuestStore.useStoreState((state) => state.fileUpload)
  const setFileUpload = ActiveQuestStore.useStoreActions((action) => action.setFileUpload)

  // handler
  const onRemoveImg = () => {
    setFileUpload([])
  }

  if (fileUpload.length > 0) {
    return (
      <UploadImageFrame>
        <ShowImg height={100} width={100} alt='img' src={(fileUpload[0] as any).preview} />
        <DangerousButton onClick={onRemoveImg}>{'Remove image'}</DangerousButton>
      </UploadImageFrame>
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
          <CenteredFrame>
            <AddFileButton> {'Add files'}</AddFileButton>
            {'Accepts .gif, .jpg, and .png'}
          </CenteredFrame>
        </SectionUploadImg>
      )}
    </Dropzone>
  )
}

const QuestImage: FC = () => {
  // data
  const role = CommunityStore.useStoreState((state) => state.role)

  if (role === CommunityRoleEnum.GUEST) {
    return <ShowImage />
  }

  return <></>
}

export default QuestImage
