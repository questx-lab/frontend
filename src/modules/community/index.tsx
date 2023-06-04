import { FunctionComponent, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

import { newQuestRoute } from '@/constants/router.const'
import { Quests } from '@/modules/community/quests'
import Templates from '@/modules/community/templates'
import { CreateOrEditQuest } from '@/modules/create-quest'
import { CommunityStore } from '@/store/local/community'
import NewQuestStore from '@/store/local/new-quest.store'
import { Gap } from '@/styles/common.style'
import { ControlPanelTab } from '@/types/community'
import { emptyQuest } from '@/types/quest'
import { NegativeButton, PositiveButton } from '@/widgets/buttons/button'
import { BasicModal } from '@/widgets/modal'
import { Horizontal, HorizontalBetweenCenter } from '@/widgets/orientation'
import { Large3xlText } from '@/widgets/text'

const OuterBoxPadding = tw(Horizontal)`
  w-full
  justify-center
  pl-10
`

const FullWidthHeight = tw.div`
  w-full
  h-full
  bg-white
  py-8
`

const Padding16 = tw.div`
  w-full
  px-16
`

const FullWidthCenter = tw(HorizontalBetweenCenter)`
  w-full
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
        <Padding16>
          <FullWidthCenter>
            <Large3xlText>Quest</Large3xlText>
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
        </Padding16>

        <Gap height={6} />
        {canEdit && <Templates communityHandle={community.handle} />}

        <Gap height={6} />
        <Quests show={true} categoryTitle={'All Quests'} />
      </FullWidthHeight>

      <BasicModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        styled={'flex flex-col !justify-start !items-start !w-5/6'}
      >
        <CreateOrEditQuest
          communityHandle={community?.handle}
          isTemplate
          onQuestCreated={() => {
            setShowTemplateModal(false)
          }}
        />
      </BasicModal>
    </OuterBoxPadding>
  )
}
