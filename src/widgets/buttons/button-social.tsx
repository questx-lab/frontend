import styled from 'styled-components'
import tw from 'twin.macro'

import { ButtonSocialType } from '@/constants/common.const'

export const SocialButton = styled.button<{ btnType?: number; isFull?: boolean }>(
  ({ btnType = ButtonSocialType.DISCORD, isFull = true }) => {
    const style = [
      tw`
        border
        border-solid
        text-lg
        font-medium
        bg-white
        py-2
        rounded-lg
        flex
        flex-row
        justify-center
        items-center
        outline-0
        gap-3
        px-3
      `,
    ]

    switch (btnType) {
      case ButtonSocialType.DISCORD:
        style.push(tw`
          border-primary
          hover:bg-primary-100
          text-primary
        `)
        break
      case ButtonSocialType.TWITTER:
        style.push(tw`
          border-info
          hover:bg-info-100
          text-info
        `)
        break
      case ButtonSocialType.VISIT_LINK:
        style.push(tw`
          border-warning
          hover:bg-warning-100
          text-warning
        `)
        break
    }

    if (isFull) {
      style.push(tw`w-full`)
    }

    return style
  }
)
