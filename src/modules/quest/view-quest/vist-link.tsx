import { FunctionComponent } from 'react'

import { Link } from 'react-router-dom'

import { ButtonSocialType } from '@/constants/common.const'
import ActiveQuestStore from '@/store/local/active-quest'
import { SocialButton } from '@/widgets/buttons/button-social'
import { VerticalFullWidth } from '@/widgets/orientation'

export const QuestVisitLink: FunctionComponent<{ link: string }> = ({ link }) => {
  const setVisitLink = ActiveQuestStore.useStoreActions((action) => action.setVisitLink)

  const onClick = () => {
    setVisitLink(true)
  }

  return (
    <VerticalFullWidth>
      <Link onClick={onClick} to={link} target='_blank' className='w-full'>
        <SocialButton btnType={ButtonSocialType.VISIT_LINK} isFull>
          {'Visit Link'}
        </SocialButton>
      </Link>
    </VerticalFullWidth>
  )
}
