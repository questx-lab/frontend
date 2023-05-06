import { FunctionComponent, useState, useRef, ChangeEvent } from 'react'
import Image from 'next/image'
import { StorageConst } from '@/constants/storage.const'
import { FullWidthBtn } from '@/styles/button.style'
import {
  Title,
  Description,
  HeaderBox,
  PointText,
  ContentContainer,
} from './quest-detail-styles'
import { uploadImageApi } from '@/app/api/client/upload'
import { claimRewardApi } from '@/app/api/client/reward'
import { Gap } from '@/styles/common.style'
import { QuestType } from '@/types/project.type'
import { toast } from 'react-hot-toast'
import { InputBox } from '@/styles/input.style'

const claimType = {
  TEXT: 'text',
  IMAGE: 'image',
  URL: 'url',
}

export const QuestDetail: FunctionComponent<{
  quest: QuestType | null
  onClose: () => void
}> = ({ quest, onClose }) => {
  const [file, setFile] = useState<Blob>()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleUploadClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }

    setFile(e.target.files[0])
  }

  const submit = async () => {
    let input = inputRef.current?.value ?? ''
    if (quest?.type === claimType.IMAGE) {
      var formData = new FormData()
      formData.append('image', file || '')
      try {
        const data = await uploadImageApi(formData)
        input = data?.data?.url || ''
      } catch (error) {
        toast.error('Error while upload file')
        return
      }
    }
    try {
      const data = await claimRewardApi({
        quest_id: quest?.id,
        input: input,
      })
      if (data.error) {
        toast.error(data.error)
        return
      }
      toast.success('Claim reward successfully')
      onClose()
    } catch (error) {
      toast.error('Error while claim')
    }
  }

  return (
    <div className='grid gap-2 grid-cols-2 overscroll-none h-max'>
      <ContentContainer>
        <Title>Mission</Title>
        <Gap height={2} />
        <Description>Join the community Weekly event.</Description>
        <Gap height={4} />
        <Title>Guild</Title>
        <Gap height={2} />
        <Description>Join in the community weekly event.</Description>
        <Gap height={4} />
        <Title>Submission</Title>
        <Gap height={2} />
        <Description>
          Type “YES” if you participate in the event in the text area.
        </Description>
        <Gap height={4} />
        {quest?.type === claimType.IMAGE && (
          <div>
            <div>Upload a file:</div>

            <FullWidthBtn onClick={handleUploadClick}>
              Click to select
            </FullWidthBtn>
            {file ? `${file.name}` : <></>}

            <InputBox
              type='file'
              ref={inputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        )}

        {quest?.type === claimType.TEXT && (
          <InputBox ref={inputRef} placeholder='YES' />
        )}

        {quest?.type === claimType.URL && (
          <InputBox ref={inputRef} placeholder='https://twitter.com/' />
        )}
      </ContentContainer>
      <div>
        <ContentContainer>
          <Title>Reward</Title>
          <Gap height={4} />
          <HeaderBox>
            <Image
              width={40}
              height={40}
              src={StorageConst.POINT_ICON.src}
              alt={StorageConst.POINT_ICON.alt}
            />
            <Gap width={2} />
            <PointText>{'300 Points'}</PointText>
          </HeaderBox>
        </ContentContainer>
        <div className='p-6 pt-2'>
          <FullWidthBtn onClick={submit} className='h-10'>
            Claim Reward
          </FullWidthBtn>
        </div>
      </div>
    </div>
  )
}
