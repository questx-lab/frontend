import { FC } from 'react'

import Dropzone from 'react-dropzone'
import toast from 'react-hot-toast'
import styled from 'styled-components'
import tw from 'twin.macro'

import { PlaceHolderImage } from '@/modules/create-community/avatar-upload'
import CommunityStore from '@/store/local/community'
import { Gap } from '@/widgets/separator'

const Container = styled.div<{ dimension: number }>(({ dimension }) => {
  return `
    width: ${dimension}px
    height: ${dimension}px
  `
})

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

export const NftUpload: FC<{ imageSize: number }> = ({ imageSize }) => {
  // data
  const nftImage = CommunityStore.useStoreState((state) => state.nftImage)

  // action
  const setNftImage = CommunityStore.useStoreActions((action) => action.setNftImage)

  return (
    <Container dimension={imageSize}>
      <Dropzone
        onDrop={(acceptedFiles) => {
          if (acceptedFiles.length) {
            const upFile = acceptedFiles[0]
            setNftImage(
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

            <PlaceHolderImage avatar={nftImage} logoUrl={''} imageSize={imageSize} />
          </SectionUploadImg>
        )}
      </Dropzone>
      {nftImage && (
        <>
          <Gap height={5} />
          <RemoveButton onClick={() => setNftImage(undefined)}> Remove Image </RemoveButton>
        </>
      )}
    </Container>
  )
}
