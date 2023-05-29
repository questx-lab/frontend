import { ButtonSocialType } from '@/constants/common.const'
import { SocialButton } from '@/widgets/buttons/button-social'
import { VerticalFullWidth } from '@/widgets/orientation'
import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

export const QuestVisitLink: FunctionComponent<{ link: string }> = ({ link }) => {
  return (
    <VerticalFullWidth>
      <Link to={link} target='_blank' className='w-full'>
        <SocialButton btnType={ButtonSocialType.VISIT_LINK} isFull>
          {'Visit Link'}
        </SocialButton>
      </Link>
    </VerticalFullWidth>
  )
}
