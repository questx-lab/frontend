import { FC } from 'react'

import { useStoreState } from 'easy-peasy'
import Dropzone from 'react-dropzone'
import styled from 'styled-components'
import tw from 'twin.macro'

import { StorageConst } from '@/constants/storage.const'
import AccountSettingsStore from '@/store/local/account-settings'
import { GlobalStoreModel } from '@/store/store'
import { UserType } from '@/types'
import { Image } from '@/widgets/image'

const SectionUploadImg = tw.section`
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

const Container = styled.div<{ dimension: number }>(({ dimension }) => {
  return `
    width: ${dimension}px
    height: ${dimension}px
  `
})

const PlaceHolderImage: FC<{ avatar: File | undefined; imageSize: number }> = ({
  avatar,
  imageSize,
}) => {
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  const hasLogoOrFile: boolean = avatar !== undefined || user.avatar_url !== ''
  if (hasLogoOrFile) {
    return (
      <>
        <Image
          width={imageSize}
          height={imageSize}
          src={
            (avatar && (avatar as any).preview) || user.avatar_url || StorageConst.USER_DEFAULT.src
          }
          alt={StorageConst.USER_DEFAULT.alt}
          className=' object-cover rounded-lg'
        />
      </>
    )
  }

  return (
    <Image
      width={imageSize}
      height={imageSize}
      src={(avatar && (avatar as any).preview) || StorageConst.UPLOAD_IMG.src}
      alt={StorageConst.UPLOAD_IMG.alt}
      className=' object-cover '
    />
  )
}

export const AvatarUpload: FC<{ imageSize: number }> = ({ imageSize }) => {
  // data
  const avatar = AccountSettingsStore.useStoreState((state) => state.avatar)

  // action
  const setAvatar = AccountSettingsStore.useStoreActions((action) => action.setAvatar)

  return (
    <Container dimension={imageSize}>
      <Dropzone
        onDrop={(acceptedFiles) => {
          const upFile = acceptedFiles[0]
          setAvatar(
            Object.assign(upFile, {
              preview: URL.createObjectURL(upFile),
            })
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
            <PlaceHolderImage avatar={avatar} imageSize={imageSize} />
          </SectionUploadImg>
        )}
      </Dropzone>
    </Container>
  )
}
