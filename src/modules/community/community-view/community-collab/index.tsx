import { FC, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { newQuestRoute } from '@/constants/router.const'
import QuestsByCategory from '@/modules/community/community-view/quests-by-category'
import { BorderBottom, ButtonAlignment, FullWidthCenter } from '@/modules/community/mini-widget'
import Templates from '@/modules/community/templates'
import { CreateOrEditQuest } from '@/modules/create-quest'
import CommunityStore from '@/store/local/community'
import NewQuestStore from '@/store/local/new-quest'
import { emptyQuest } from '@/types/quest'
import { NegativeButton, PositiveButton } from '@/widgets/buttons'
import BasicModal from '@/widgets/modal/basic'
import { VerticalFullWidthCenter } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { Text2xl } from '@/widgets/text'

const CommunityCollab: FC = () => {
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
      <VerticalFullWidthCenter>
        <BorderBottom>
          <FullWidthCenter>
            <Text2xl>{'Quests'}</Text2xl>
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
        </BorderBottom>

        {canEdit && <Templates communityHandle={community.handle} />}
        <QuestsByCategory />
      </VerticalFullWidthCenter>
      <BasicModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        styled={'flex flex-col !justify-start !items-start !w-[1180px] max-h-full '}
        hasHeader={false}
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
