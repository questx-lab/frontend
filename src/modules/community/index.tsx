import { FunctionComponent, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

import { newQuestRoute } from '@/constants/router.const'
import { Quests } from '@/modules/community/quests'
import Templates from '@/modules/community/templates'
import { CreateOrEditQuest } from '@/modules/create-quest'
import CommunityStore from '@/store/local/community'
import NewQuestStore from '@/store/local/new-quest'
import { ControlPanelTab } from '@/types/community'
import { emptyQuest } from '@/types/quest'
import { NegativeButton, PositiveButton } from '@/widgets/buttons'
import BasicModal from '@/widgets/modal/basic'
import { Horizontal, HorizontalBetweenCenter } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { Large3xlText } from '@/widgets/text'

const OuterBoxPadding = tw(Horizontal)`
  w-full
  justify-center
  px-8
`

const FullWidthHeight = tw.div`
  w-full
  h-full
  bg-white
  py-8
`

const FullWidthCenter = tw(HorizontalBetweenCenter)`
  w-full
  mb-4
`

const ButtonAlignment = tw(Horizontal)`
  items-center
  justify-end
`

export const Index: FunctionComponent = () => {
  // data
  const community = CommunityStore.useStoreState((action) => action.selectedCommunity)
  const canEdit = CommunityStore.useStoreState((action) => action.canEdit)

  // action
  const setActiveControlPanelTab = CommunityStore.useStoreActions(
    (action) => action.setActiveControlPanelTab
  )
  const setQuest = NewQuestStore.useStoreActions((actions) => actions.setQuest)

  // hook
  const navigate = useNavigate()

  // local state
  const [showTemplateModal, setShowTemplateModal] = useState<boolean>(false)

  useEffect(() => {
    setActiveControlPanelTab(ControlPanelTab.QUESTS)
  }, [setActiveControlPanelTab])

  if (!community) {
    return <></>
  }

  return (
    <OuterBoxPadding>
      <FullWidthHeight>
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
      </FullWidthHeight>

      <BasicModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        styled={'flex flex-col !justify-start !items-start !w-5/6'}
      >
        <CreateOrEditQuest
          isTemplate
          onQuestCreated={() => {
            setShowTemplateModal(false)
          }}
        />
      </BasicModal>
    </OuterBoxPadding>
  )
}
