import { useState, useRef, ChangeEvent, FunctionComponent } from 'react'
import { QuestType } from '@/types/project.type'
import { Gap } from '@/styles/common.style'
import { FullWidthBtn } from '@/styles/button.style'
import { InputBox } from '@/styles/input.style'
import { claimRewardApi } from '@/app/api/client/reward'
import { uploadImageApi } from '@/app/api/client/upload'

import { toast } from 'react-hot-toast'

const claimType = {
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
  LINK: 'LINK',
}

export const ClaimReward: FunctionComponent<{
  quest: QuestType | null
  onClose: () => void
}> = ({ quest, onClose }) => {
  const [type, setType] = useState<string>(claimType.TEXT)
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

  const onChangeValue = (event: any) => {
    setType(event.target.value)
  }

  const submit = async () => {
    let input = inputRef.current?.value ?? ''
    if (type === claimType.IMAGE) {
      var formData = new FormData()
      formData.append('image', file || '')
      const data = await uploadImageApi(formData)
      input = data?.data?.url || ''
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
    <div>
      <div className='text-left p-6'>
        <input
          className='mr-2'
          type='radio'
          name='type'
          value={claimType.TEXT}
          id='text'
          checked={type == claimType.TEXT}
          onChange={onChangeValue}
        />
        <label htmlFor='text'>Text</label>
        <Gap height={2} />
        <input
          className='mr-2'
          type='radio'
          name='type'
          value={claimType.LINK}
          id='text'
          checked={type == claimType.LINK}
          onChange={onChangeValue}
        />
        <label htmlFor='link'>Link</label>
        <Gap height={2} />
        <input
          className='mr-2'
          type='radio'
          name='type'
          value={claimType.IMAGE}
          id='image'
          checked={type == claimType.IMAGE}
          onChange={onChangeValue}
        />
        <label htmlFor='image'>Image</label>
      </div>
      <div className='mb-6'>
        {type === claimType.IMAGE && (
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

        {type === claimType.TEXT && (
          <InputBox ref={inputRef} placeholder='any' />
        )}

        {type === claimType.LINK && (
          <InputBox ref={inputRef} placeholder='https://twitter.com/' />
        )}
      </div>
      <FullWidthBtn onClick={() => submit()}> Claim </FullWidthBtn>
    </div>
  )
}
