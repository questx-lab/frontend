import { FunctionComponent } from 'react'

import Dropzone from 'react-dropzone'
import tw from 'twin.macro'

import { StorageConst } from '@/constants/storage.const'
import NewCommunityStore from '@/store/local/new-community.store'
import { Image } from '@/widgets/image'
import { Horizontal } from '@/widgets/orientation'

const SectionUploadImg = tw.section`
  border-2
  border-dotted
  rounded-lg
  justify-center
  items-center
  outline-0
`

const UploadInput = tw.input`
  outline-0
  ring-0
  outline-offset-0
  w-full
  h-full
`

const UploadImgBox = tw(Horizontal)`
  items-end
  gap-3
`

const RemoveAvt = tw.button`
  text-sm
  text-danger-700
  py-1
  rounded-lg
  border
  border-solid
  border
  border-danger-400
  bg-danger-100
  hover:bg-danger-700
  hover:text-white
  outline-0
  px-4
`

export const AvatarUpload: FunctionComponent = () => {
  // data
  const avatar = NewCommunityStore.useStoreState((state) => state.avatar)

  // action
  const setAvatar = NewCommunityStore.useStoreActions((action) => action.setAvatar)

  // handler
  const onRemoveImg = () => {
    setAvatar([])
  }

  if (avatar.length) {
    return (
      <UploadImgBox>
        <Image width={100} height={100} src={(avatar[0] as any).preview} alt={'Community avatar'} />
        <RemoveAvt onClick={onRemoveImg}>{'Remove'}</RemoveAvt>
      </UploadImgBox>
    )
  }

  return (
    <Dropzone
      onDrop={(acceptedFiles) => {
        setAvatar(
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
          <Image
            width={100}
            height={100}
            src={StorageConst.UPLOAD_IMG.src}
            alt={StorageConst.UPLOAD_IMG.alt}
          />
        </SectionUploadImg>
      )}
    </Dropzone>
  )
}
