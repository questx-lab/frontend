import { ButtonSocialType } from '@/constants/common.const'
import { ActiveQuestStore } from '@/store/local/active-quest'
import { SocialButton } from '@/widgets/button-social'
import { VerticalFullWidth } from '@/widgets/orientation'
import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

export const QuestVisitLink: FunctionComponent<{ link: string }> = ({ link }) => {
  const setVisitLink = ActiveQuestStore.useStoreActions((action) => action.setVisitLink)

  return (
    <VerticalFullWidth onClick={() => setVisitLink(true)}>
      <Link to={link} target='_blank' className='w-full'>
        <SocialButton btnType={ButtonSocialType.VISIT_LINK} isFull>
          {'Visit link'}
        </SocialButton>
      </Link>
    </VerticalFullWidth>
  )
}
