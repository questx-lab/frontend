import { FunctionComponent } from 'react'
import { QuestType } from '@/types/project.type'
import { useState, useRef, ChangeEvent } from 'react'
import { Gap } from '@/styles/common.style'
import { FullWidthBtn } from '@/styles/button.style'
import { InputBox } from '@/styles/input.style'

const claimType = {
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
  LINK: 'LINK',
}

export const ClaimReward: FunctionComponent<{
  quest: QuestType | null
}> = ({ quest }) => {
  const [type, setType] = useState<string>(claimType.TEXT)
  const [file, setFile] = useState<File>()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleUploadClick = () => {
    // 👇 We redirect the click event onto the hidden input element
    inputRef.current?.click()
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }

    setFile(e.target.files[0])

    // 🚩 do the file upload here normally...
  }

  const onChangeValue = (event: any) => {
    console.log('event.target.value', event.target.value)
    setType(event.target.value)
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

        {type === claimType.TEXT && <InputBox />}

        {type === claimType.LINK && <InputBox />}
      </div>
      <FullWidthBtn> Claim Reward </FullWidthBtn>
    </div>
  )
}
