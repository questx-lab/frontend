import { FC } from 'react'

import {
  Content,
  FieldText,
  HorizontalFullWidthCenter,
  InfoText,
  MarginVertical,
} from '@/admin-portal/modules/referrals/mini-widget'
import StorageConst from '@/constants/storage.const'
import { CommunityType } from '@/types/community'
import { CircularImage } from '@/widgets/circular-image'
import BasicModal from '@/widgets/modal/basic'
import { Vertical, VerticalFullWidth } from '@/widgets/orientation'
import { Divider } from '@/widgets/separator'
import { TextXl } from '@/widgets/text'

const CommunityDetailModal: FC<{
  openModal: boolean
  onCloseModel: () => void
  community: CommunityType | undefined
}> = ({ community, openModal, onCloseModel }) => {
  if (!community) {
    return <></>
  }

  return (
    <BasicModal
      isOpen={openModal}
      onClose={onCloseModel}
      styled={'flex flex-col !justify-start !items-start !w-[500px] !h-[600px]'}
    >
      <Content>
        <TextXl>{'Community'}</TextXl>
        <MarginVertical>
          <HorizontalFullWidthCenter>
            <CircularImage
              width={80}
              height={80}
              src={community.logo_url || StorageConst.COMMUNITY_DEFAULT.src}
            />
            <Vertical>
              <TextXl>{community.display_name}</TextXl>
            </Vertical>
          </HorizontalFullWidthCenter>
          <Divider />
          <VerticalFullWidth>
            <HorizontalFullWidthCenter>
              <FieldText>{'Discord:'}</FieldText>
              <InfoText highlight={community.discord !== ''}>
                {community.discord || 'not connect'}
              </InfoText>
            </HorizontalFullWidthCenter>
            <HorizontalFullWidthCenter>
              <FieldText>{'Twitter:'}</FieldText>
              <InfoText highlight={community.twitter !== ''}>
                {community.twitter || 'not connect'}
              </InfoText>
            </HorizontalFullWidthCenter>
            <HorizontalFullWidthCenter>
              <FieldText>{'Quests:'}</FieldText>
              <InfoText highlight>{community.number_of_quests}</InfoText>
            </HorizontalFullWidthCenter>
          </VerticalFullWidth>
        </MarginVertical>
      </Content>
    </BasicModal>
  )
}

export default CommunityDetailModal
