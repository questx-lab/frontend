import {
  FunctionComponent,
  useEffect,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import { CommunityRoleEnum } from '@/constants/common.const';
import { Quests } from '@/modules/community/quests';
import Templates from '@/modules/community/templates';
import { CommunityStore } from '@/store/local/community';
import { NewQuestStore } from '@/store/local/new-quest.store';
import { Gap } from '@/styles/common.style';
import { ControlPanelTab } from '@/types/community';
import { emptyQuest } from '@/types/quest';
import {
  NegativeButton,
  PositiveButton,
} from '@/widgets/buttons/button';
import { BasicModal } from '@/widgets/modal';
import {
  Horizontal,
  HorizontalBetweenCenter,
} from '@/widgets/orientation';
import { Large3xlText } from '@/widgets/text';

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
  const role = CommunityStore.useStoreState((action) => action.role)

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

  const isOwner = role === CommunityRoleEnum.OWNER

  return (
    <OuterBoxPadding>
      <FullWidthHeight>
        <Padding16>
          <FullWidthCenter>
            <Large3xlText>Quest</Large3xlText>
            <ButtonAlignment>
              {isOwner && (
                <NegativeButton
                  onClick={() => {
                    setShowTemplateModal(true)
                  }}
                >
                  {'Use Template'}
                </NegativeButton>
              )}
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
          </FullWidthCenter>
        </Padding16>

        <Gap height={6} />
        {isOwner && <Templates />}

        <Gap height={6} />
        <Quests show={true} />
      </FullWidthHeight>

      <BasicModal
        title={`🎉 Template`}
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
      >
        AAAA
      </BasicModal>
    </OuterBoxPadding>
  )
}
