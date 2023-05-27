import { RouterConst } from '@/constants/router.const'
import { CommunityStore } from '@/store/local/community'
import { Gap } from '@/styles/common.style'
import { ControlPanelTab } from '@/types/community'
import { CommunityType } from '@/utils/type'
import { NegativeButton, PositiveButton } from '@/widgets/button'
import { Horizontal, HorizontalBetweenCenter } from '@/widgets/orientation'
import { Large3xlText } from '@/widgets/text'
import { FunctionComponent, useEffect } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

const CCBox = tw(Horizontal)`
  w-full
  justify-center
  pl-80
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
  // loader data
  let data = useLoaderData() as {
    community: CommunityType
  }

  const setActiveControlPanelTab = CommunityStore.useStoreActions(
    (action) => action.setActiveControlPanelTab
  )

  // hook
  useEffect(() => {
    setActiveControlPanelTab(ControlPanelTab.QUESTS)
  }, [setActiveControlPanelTab])

  // hook
  const navigate = useNavigate()

  return (
    <CCBox>
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
                onClick={() => navigate(RouterConst.PROJECT + data.community.id + '/create')}
              >
                {'+  Create Quest'}
              </PositiveButton>
            </ButtonAlignment>
          </MHeader>
        </Padding16>
      </FullWidthHeight>
    </CCBox>
  )
}
