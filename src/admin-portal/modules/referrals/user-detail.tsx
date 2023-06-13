import { FC } from 'react'

import StorageConst from '@/constants/storage.const'
import { UserType } from '@/types'
import { CircularImage } from '@/widgets/circular-image'
import BasicModal from '@/widgets/modal/basic'
import { Vertical, VerticalFullWidth } from '@/widgets/orientation'
import { Divider } from '@/widgets/separator'
import { TextXl } from '@/widgets/text'

import {
  Content,
  FieldText,
  HorizontalFullWidthCenter,
  InfoText,
  MarginVertical,
} from './mini-widget'

const UserDetailModal: FC<{
  openModal: boolean
  onCloseModel: () => void
  user: UserType | undefined
}> = ({ openModal, onCloseModel, user }) => {
  if (!user) {
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
              src={user.avatar_url || StorageConst.USER_DEFAULT.src}
            />
            <Vertical>
              <TextXl>{user.name}</TextXl>
            </Vertical>
          </HorizontalFullWidthCenter>
          <Divider />
          <VerticalFullWidth>
            <HorizontalFullWidthCenter>
              <FieldText>{'Email:'}</FieldText>
              <InfoText
                highlight={user.services?.google !== undefined && user.services?.google !== ''}
              >
                {user.services?.google || 'not connect'}
              </InfoText>
            </HorizontalFullWidthCenter>
            <HorizontalFullWidthCenter>
              <FieldText>{'Discord:'}</FieldText>
              <InfoText
                highlight={user.services?.discord !== undefined && user.services?.discord !== ''}
              >
                {user.services?.discord || 'not connect'}
              </InfoText>
            </HorizontalFullWidthCenter>
            <HorizontalFullWidthCenter>
              <FieldText>{'Twitter:'}</FieldText>
              <InfoText
                highlight={user.services?.twitter !== undefined && user.services?.twitter !== ''}
              >
                {user.services?.twitter || 'not connect'}
              </InfoText>
            </HorizontalFullWidthCenter>
            <HorizontalFullWidthCenter>
              <FieldText>{'Metamask:'}</FieldText>
              <InfoText highlight={user.wallet_address !== ''}>
                {user.wallet_address || 'not connect'}
              </InfoText>
            </HorizontalFullWidthCenter>
          </VerticalFullWidth>
        </MarginVertical>
      </Content>
    </BasicModal>
  )
}

export default UserDetailModal
