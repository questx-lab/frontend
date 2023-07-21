import { FC } from 'react'

import { useStoreState } from 'easy-peasy'
import Dropzone from 'react-dropzone'
import styled from 'styled-components'
import tw from 'twin.macro'

import StorageConst from '@/constants/storage.const'
import AccountSettingsStore from '@/store/local/account-settings'
import { GlobalStoreModel } from '@/store/store'
import { UserType } from '@/types'
import { Image } from '@/widgets/image'
import { VerticalFullWidthCenter } from '@/widgets/orientation'
import { LightTextXs } from '@/widgets/text'

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

const ImageFrame = styled(Image)<{ isCircle: boolean }>(({ isCircle }) => {
  const styles = [
    tw`
    object-cover
    aspect-square
  `,
  ]

  if (isCircle) {
    styles.push(tw`rounded-full`)
  } else {
    styles.push(tw`rounded-lg`)
  }

  return styles
})

const Container = styled.div<{ dimension: number }>(
  ({ dimension }) => `
    width:${dimension}px
    height:${dimension}px
  `
)

const GapVertical = tw(VerticalFullWidthCenter)`gap-3`

const PlaceHolderImage: FC<{ avatar: File | undefined; imageSize: number; isCircle: boolean }> = ({
  avatar,
  imageSize,
  isCircle,
}) => {
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  const hasLogoOrFile: boolean = avatar !== undefined || user.avatar_url !== ''
  if (hasLogoOrFile) {
    return (
      <ImageFrame
        width={imageSize}
        height={imageSize}
        src={
          (avatar && (avatar as any).preview) || user.avatar_url || StorageConst.USER_DEFAULT.src
        }
        alt={StorageConst.USER_DEFAULT.alt}
        isCircle={isCircle}
      />
    )
  }

  return (
    <GapVertical>
      <ImageFrame
        width={imageSize}
        height={imageSize}
        src={(avatar && (avatar as any).preview) || StorageConst.UPLOAD_IMG.src}
        alt={StorageConst.UPLOAD_IMG.alt}
        isCircle={isCircle}
        className=' border border-dashed border-gray'
      />
      <LightTextXs>{'Upload your image'}</LightTextXs>
    </GapVertical>
  )
}

const AvatarUpload: FC<{ imageSize: number; isCircle?: boolean }> = ({
  imageSize,
  isCircle = false,
}) => {
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
            <PlaceHolderImage isCircle={isCircle} avatar={avatar} imageSize={imageSize} />
          </SectionUploadImg>
        )}
      </Dropzone>
    </Container>
  )
}

export default AvatarUpload
