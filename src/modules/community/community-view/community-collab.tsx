import { FunctionComponent, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { newQuestRoute } from '@/constants/router.const'
import { ButtonAlignment, FullWidthCenter } from '@/modules/community/mini-widget'
import { Quests } from '@/modules/community/quests'
import Templates from '@/modules/community/templates'
import { CreateOrEditQuest } from '@/modules/create-quest'
import CommunityStore from '@/store/local/community'
import NewQuestStore from '@/store/local/new-quest'
import { emptyQuest } from '@/types/quest'
import { NegativeButton, PositiveButton } from '@/widgets/buttons'
import BasicModal from '@/widgets/modal/basic'
import { VerticalFullWidth } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { Large3xlText } from '@/widgets/text'

const CommunityCollab: FunctionComponent = () => {
  // hook
  const [showTemplateModal, setShowTemplateModal] = useState<boolean>(false)
  const navigate = useNavigate()

  // data
  const community = CommunityStore.useStoreState((action) => action.selectedCommunity)
  const canEdit = CommunityStore.useStoreState((action) => action.canEdit)

  // action
  const setQuest = NewQuestStore.useStoreActions((actions) => actions.setQuest)

  return (
    <>
      <VerticalFullWidth>
        <FullWidthCenter>
          <Large3xlText>{'Quests'}</Large3xlText>
          {canEdit && (
            // Only shown for owner
            <ButtonAlignment>
              <NegativeButton
                onClick={() => {
                  setShowTemplateModal(true)
                }}
              >
                {'Use Template'}
              </NegativeButton>
              <Gap width={4} />
              <PositiveButton
                onClick={() => {
                  setQuest(emptyQuest())
                  navigate(newQuestRoute(community.handle))
                }}
              >
                {'+  Create Quest'}
              </PositiveButton>
            </ButtonAlignment>
          )}
        </FullWidthCenter>
        {canEdit && <Templates communityHandle={community.handle} />}
        <Quests show={true} categoryTitle={''} />
      </VerticalFullWidth>
      <BasicModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        styled={'flex flex-col !justify-start !items-start !w-[1180px]'}
      >
        <CreateOrEditQuest
          isTemplate
          onQuestCreated={() => {
            setShowTemplateModal(false)
          }}
        />
      </BasicModal>
    </>
  )
}

export default CommunityCollab
