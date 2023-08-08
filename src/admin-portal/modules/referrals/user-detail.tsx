import { FC } from 'react'

import {
  Content,
  FieldText,
  HorizontalFullWidthCenter,
  InfoText,
  MarginVertical,
} from '@/admin-portal/modules/referrals/mini-widget'
import StorageConst from '@/constants/storage.const'
import { UserType } from '@/types'
import { CircularImage } from '@/widgets/circular-image'
import BasicModal from '@/widgets/modal/basic'
import { Vertical, VerticalFullWidth } from '@/widgets/orientation'
import { Divider } from '@/widgets/separator'
import { TextXl } from '@/widgets/text'

const UserDetailModal: FC<{
  openModal: boolean
  onCloseModel: () => void
  owner?: UserType | undefined
}> = ({ openModal, onCloseModel, owner }) => {
  console.log('Owner is empty')
  if (!owner) {
    return <></>
  }

  return (
    <BasicModal
      isOpen={openModal}
      onClose={onCloseModel}
      styled={'flex flex-col !justify-start !items-start !w-[500px] !h-[600px]'}
    >
      <Content>
        <TextXl>{'From User'}</TextXl>
        <MarginVertical>
          <HorizontalFullWidthCenter>
            <CircularImage
              width={80}
              height={80}
              src={owner.avatar_url || StorageConst.USER_DEFAULT.src}
            />
            <Vertical>
              <TextXl>{owner.name}</TextXl>
            </Vertical>
          </HorizontalFullWidthCenter>
          <Divider />
          <VerticalFullWidth>
            <HorizontalFullWidthCenter>
              <FieldText>{'Email:'}</FieldText>
              <InfoText
                highlight={owner.services?.google !== undefined && owner.services?.google !== ''}
              >
                {owner.services?.google || 'not connect'}
              </InfoText>
            </HorizontalFullWidthCenter>
            <HorizontalFullWidthCenter>
              <FieldText>{'Discord:'}</FieldText>
              <InfoText
                highlight={owner.services?.discord !== undefined && owner.services?.discord !== ''}
              >
                {owner.services?.discord || 'not connect'}
              </InfoText>
            </HorizontalFullWidthCenter>
            <HorizontalFullWidthCenter>
              <FieldText>{'Twitter:'}</FieldText>
              <InfoText
                highlight={owner.services?.twitter !== undefined && owner.services?.twitter !== ''}
              >
                {owner.services?.twitter || 'not connect'}
              </InfoText>
            </HorizontalFullWidthCenter>
            <HorizontalFullWidthCenter>
              <FieldText>{'Metamask:'}</FieldText>
              <InfoText highlight={owner.wallet_address !== ''}>
                {owner.wallet_address || 'not connect'}
              </InfoText>
            </HorizontalFullWidthCenter>
          </VerticalFullWidth>
        </MarginVertical>
      </Content>
    </BasicModal>
  )
}

export default UserDetailModal
