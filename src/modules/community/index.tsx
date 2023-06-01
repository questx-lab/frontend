import { Quests } from '@/modules/community/quests'
import { CommunityStore } from '@/store/local/community'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { Gap } from '@/styles/common.style'
import { ControlPanelTab } from '@/types/community'
import { emptyQuest } from '@/types/quest'
import { NegativeButton, PositiveButton } from '@/widgets/buttons/button'
import { Horizontal, HorizontalBetweenCenter } from '@/widgets/orientation'
import { Large3xlText } from '@/widgets/text'
import { FunctionComponent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

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

const MHeader = tw(HorizontalBetweenCenter)`
  w-full
`

const ButtonAlignment = tw(Horizontal)`
  items-center
  justify-end
`

export const Index: FunctionComponent = () => {
  const setActiveControlPanelTab = CommunityStore.useStoreActions(
    (action) => action.setActiveControlPanelTab
  )

  const setQuest = NewQuestStore.useStoreActions((actions) => actions.setQuest)

  // hook
  const navigate = useNavigate()

  useEffect(() => {
    setActiveControlPanelTab(ControlPanelTab.QUESTS)
  }, [setActiveControlPanelTab])

  return (
    <OuterBoxPadding>
      <FullWidthHeight>
        <Padding16>
          <MHeader>
            <Large3xlText>Quest</Large3xlText>
            <ButtonAlignment>
              <NegativeButton
                onClick={() => {
                  // TODO: Open Use Template here
                }}
              >
                {'Use Template'}
              </NegativeButton>
              <Gap width={4} />
              <PositiveButton
                onClick={() => {
                  setQuest(emptyQuest())
                  navigate('./create')
                }}
              >
                {'+  Create Quest'}
              </PositiveButton>
            </ButtonAlignment>
          </MHeader>
        </Padding16>

        <Gap height={6} />
        <Quests show={true} />
      </FullWidthHeight>
    </OuterBoxPadding>
  )
}
