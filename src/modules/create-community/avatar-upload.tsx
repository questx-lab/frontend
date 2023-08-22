import { FC } from 'react'

import Dropzone from 'react-dropzone'
import { toast } from 'react-hot-toast'
import styled from 'styled-components'
import tw from 'twin.macro'

import StorageConst from '@/constants/storage.const'
import NewCommunityStore from '@/store/local/new-community'
import { Image } from '@/widgets/image'
import { Gap } from '@/widgets/separator'

const SectionUploadImg = tw.section`
  justify-center
  items-center
  outline-0
  relative
`

const UploadInput = tw.input`
  outline-0
  ring-0
  outline-offset-0
  w-full
  h-full
`

const RemoveButton = tw.button`
  bg-white
  text-primary
  font-bold
  text-sm
  w-full
`
const Container = styled.div<{ dimension: number }>(({ dimension }) => {
  return `
    width: ${dimension}px
    height: ${dimension}px
  `
})

export const PlaceHolderImage: FC<{
  avatar: File | undefined
  logoUrl: string
  imageSize: number
}> = ({ avatar, logoUrl, imageSize }) => {
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
          if (acceptedFiles.length) {
            const upFile = acceptedFiles[0]
            setAvatar(
              Object.assign(upFile, {
                preview: URL.createObjectURL(upFile),
              })
            )
          }
        }}
        maxFiles={1}
        maxSize={2 * 1024 * 1024}
        onDropRejected={(e) => {
          console.log(e)
          if (e.length && e[0].errors.length) {
            toast.error(e[0].errors[0].message)
          }
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
      {avatar && (
        <>
          <Gap height={5} />
          <RemoveButton onClick={() => setAvatar(undefined)}> Remove Image </RemoveButton>
        </>
      )}
    </Container>
  )
}
