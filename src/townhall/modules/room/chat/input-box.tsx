import { FC, useState } from 'react'

import tw from 'twin.macro'

const InputBoxBorder = tw.input`
  w-full
  border
  border-[1px]
  border-solid
  border-gray-300
  p-3
  rounded-lg
  ring-0
  outline-0
`

const InputBox: FC<{ onNewMessagedEntered: (s: string) => void }> = ({ onNewMessagedEntered }) => {
  const [inputMessage, setInputMessage] = useState<string>('')
  const [enterdTime, setEnterTime] = useState<number>(0)

  const handleKeyboardEvent = (event: React.KeyboardEvent) => {
    const now = Date.now()
    // Prevent unikey from triggering enter twice.
    if (event.key === 'Enter' && now - enterdTime > 300) {
      onNewMessagedEntered(inputMessage)

      setInputMessage('')
      setEnterTime(now)
    }
  }

  return (
    <InputBoxBorder
      value={inputMessage}
      onKeyDown={handleKeyboardEvent}
      onChange={(e) => {
        setInputMessage(e.target.value)
        e.stopPropagation()
      }}
    />
  )
}

export default InputBox
