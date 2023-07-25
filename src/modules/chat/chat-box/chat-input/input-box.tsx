import { FC, useState } from 'react'

import tw from 'twin.macro'

const InputBoxBorder = tw.textarea`
  w-full
  outline-0
  bg-gray-200
  resize-none
`

const InputBox: FC<{ onNewMessagedEntered: (s: string) => void }> = ({ onNewMessagedEntered }) => {
  const [inputMessage, setInputMessage] = useState<string>('')
  const [enterdTime, setEnterTime] = useState<number>(0)

  const handleKeyboardEvent = (event: React.KeyboardEvent) => {
    const now = Date.now()
    // Prevent unikey from triggering enter twice.
    if (event.key === 'Enter' && now - enterdTime > 300 && !event.shiftKey) {
      event.preventDefault()
      onNewMessagedEntered(inputMessage)
      setInputMessage('')
      setEnterTime(now)
    }
  }

  return (
    <InputBoxBorder
      rows={1}
      value={inputMessage}
      onKeyDown={handleKeyboardEvent}
      onChange={(e) => {
        setInputMessage(e.target.value)
      }}
    />
  )
}

export default InputBox