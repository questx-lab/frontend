import { FunctionComponent } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

const Border = styled.label<{ checked: boolean }>(({ checked }) => {
  const style = [
    tw`
      md:w-12 md:h-7 w-12 h-6 flex items-center bg-gray-200 rounded-full p-1
      cursor-pointer shadow-md transform duration-300 ease-in-out
    `,
  ]

  if (checked) {
    style.push(tw`bg-primary`)
  }

  return style
})

const Switch = styled.div<{ checked: boolean }>(({ checked }) => {
  const style = [
    tw`bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out`,
  ]

  if (checked) {
    style.push(tw`transform translate-x-5 `)
  }

  return style
})

const Toggle: FunctionComponent<{ checked: boolean; onClicked: (value: boolean) => void }> = ({
  checked,
  onClicked,
}) => {
  return (
    <Border
      checked={checked}
      onClick={() => {
        onClicked(!checked)
      }}
    >
      {/* Switch */}
      <Switch checked={checked} />
    </Border>
  )
}

export default Toggle
