import { FC } from 'react'

import Dropzone from 'react-dropzone'
import styled from 'styled-components'
import tw from 'twin.macro'

import StorageConst from '@/constants/storage.const'
import NewCommunityStore from '@/store/local/new-community'
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

const Overlay = styled.div<{ dimension: number }>(({ dimension }) => {
  return `
    width: ${dimension}px;
    height: ${dimension}px;
    background: white;
    opacity: 0.4;
    display: flex;
    justify-content: center;
    align-items: center;
  `
})

const PlaceHolderImage: FC<{ avatar: File | undefined; logoUrl: string; imageSize: number }> = ({
  avatar,
  logoUrl,
  imageSize,
}) => {
  const hasLogoOrFile: boolean = avatar !== undefined || logoUrl !== ''
  if (hasLogoOrFile) {
    return (
      <>
        <Image
          width={imageSize}
          height={imageSize}
          src={
            (avatar && (avatar as any).preview) ||
            (logoUrl && logoUrl) ||
            StorageConst.UPLOAD_IMG.src
          }
          alt={StorageConst.UPLOAD_IMG.alt}
          className=' object-cover rounded-lg'
        />
      </>
    )
  }

  return (
    <Image
      width={imageSize}
      height={imageSize}
      src={
        (avatar && (avatar as any).preview) || (logoUrl && logoUrl) || StorageConst.UPLOAD_IMG.src
      }
      alt={StorageConst.UPLOAD_IMG.alt}
      className=' object-cover '
    />
  )
}

export const AvatarUpload: FC<{ imageSize: number }> = ({ imageSize }) => {
  // data
  const avatar = NewCommunityStore.useStoreState((state) => state.avatar)
  const logoUrl = NewCommunityStore.useStoreState((state) => state.logoUrl)

  // action
  const setAvatar = NewCommunityStore.useStoreActions((action) => action.setAvatar)

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
            <PlaceHolderImage avatar={avatar} logoUrl={logoUrl} imageSize={imageSize} />
          </SectionUploadImg>
        )}
      </Dropzone>
    </Container>
  )
}
