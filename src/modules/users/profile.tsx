import { FunctionComponent } from 'react'

import { useStoreState } from 'easy-peasy'
import Image from 'next/image'
import tw from 'twin.macro'

import { StorageConst } from '@/constants/storage.const'
import { GlobalStoreModel } from '@/store/store'
import { Divider } from '@/styles/common.style'
import { ImageQuestBox } from '@/styles/questboard.style'
import { Badge, InfoText } from '@/styles/settings.style'
import { UserType } from '@/types/account.type'

const Wrap = tw.div`
  w-full
  h-full
  py-8
`

const Aside = tw.div`
  border
  border-solid
  border-gray-300
  rounded-lg
  fixed
  w-[calc(21%)]
`

const Main = tw.div`
  w-[calc(75%)]
  h-full
  ml-[calc(25%)]
  flex
  flex-col
  gap-6
`

const AssideInfo = tw.div`
  flex
  flex-col
  w-full
  justify-center
  items-center
  py-8
  gap-3
`

const AssideBadge = tw.div`
  w-full
  px-3
  py-6
  flex
  flex-col
  gap-4
`

const NameText = tw.span`
  text-xl
  font-medium
  text-gray-900
`

const LevelBox = tw.div`
  bg-teal
  rounded-full
  px-3
  py-1
  text-xs
  text-white
`

const NormalText = tw.span`
  font-normal
  text-lg
  text-gray-500
`

const RowBox = tw.div`
  flex
  flex-row
  justify-center
  items-center
  gap-2
`

const ColBox = tw.div`
  flex
  flex-col
  justify-center
  items-start
  text-lg
  font-medium
  text-gray-900
  gap-1
`

const WarningText = tw.span`
  text-warning
  font-normal
  text-lg
`

const SuccessText = tw.span`
  text-success
  font-normal
  text-lg
`

const Session = tw.div`
  divide-y
  divide-gray-300
  border
  border-solid
  border-gray-300
  rounded-lg
`

const TitleBox = tw.div`
  py-6
  px-6
  gap-3
  text-xl
  font-medium
  text-gray-900
  flex
  flex-row
  justify-start
  items-center
`

const BadgeGrid = tw.div`
  p-6
  grid
  grid-cols-6
  gap-6
`

const BadgeBox = tw.div`
  p-8
  border
  border-solid
  border-gray-300
  rounded-lg
  cursor-pointer
`

const RankWrap = tw.div`
  flex
  flex-row
  justify-between
  items-center
  p-6
`

const UserProfile: FunctionComponent<{ userId: string }> = ({ userId }) => {
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  return (
    <Wrap>
      <Aside>
        <AssideInfo>
          <ImageQuestBox
            width={96}
            height={96}
            src={StorageConst.MANTA_LOGO.src}
            alt={StorageConst.MANTA_LOGO.alt}
          />
          <NameText>{user && user.name}</NameText>
          <LevelBox>{'lvl.3'}</LevelBox>
        </AssideInfo>
        <Divider />
        <AssideBadge>
          <InfoText>
            <NormalText>{'Gems'}</NormalText>
            <RowBox>
              <Image
                width={24}
                height={24}
                src={StorageConst.POINT_ICON.src}
                alt={StorageConst.POINT_ICON.alt}
              />
              <WarningText> {'56.7K'} </WarningText>
            </RowBox>
          </InfoText>
          <InfoText>
            <NormalText>{'XP'}</NormalText>
            <RowBox>
              <Image
                width={24}
                height={24}
                src={StorageConst.XP_ICON.src}
                alt={StorageConst.XP_ICON.alt}
              />
              <SuccessText> {'3500'} </SuccessText>
            </RowBox>
          </InfoText>
          <InfoText>
            <NormalText>{'Quest Completed'}</NormalText>
            <NormalText>{'257'}</NormalText>
          </InfoText>
          <InfoText>
            <NormalText>{'Community Joined'}</NormalText>
            <NormalText>{'36'}</NormalText>
          </InfoText>
        </AssideBadge>
      </Aside>
      <Main>
        <Session>
          <TitleBox>
            {'🎉 Badge Achievements'}
            <Badge>{'12'}</Badge>
          </TitleBox>
          <BadgeGrid>
            {[...Array.from({ length: 12 }, (x: any, i: any) => i)].map(
              (idx) => (
                <BadgeBox key={idx}>
                  <Image
                    width={180}
                    height={180}
                    src={'/images/dummy/badge.svg'}
                    alt={'Badge'}
                  />
                </BadgeBox>
              )
            )}
          </BadgeGrid>
        </Session>
        <Session>
          <TitleBox>{'👑 Community Ranking'}</TitleBox>
          {[...Array.from({ length: 10 }, (x: any, i: any) => i)].map((idx) => (
            <RankWrap key={idx}>
              <RowBox>
                <ImageQuestBox
                  width={64}
                  height={64}
                  src={StorageConst.MANTA_LOGO.src}
                  alt={StorageConst.MANTA_LOGO.alt}
                />
                <ColBox>
                  {'Manta Network'}
                  <RowBox>
                    <Badge>{'🔥 Top 5'}</Badge>
                    <Badge>{'32 Quest Completed'}</Badge>
                  </RowBox>
                </ColBox>
              </RowBox>
              <RowBox>
                <Image
                  width={24}
                  height={24}
                  src={StorageConst.POINT_ICON.src}
                  alt={StorageConst.POINT_ICON.alt}
                />
                <WarningText> {'56.7K'} </WarningText>
              </RowBox>
            </RankWrap>
          ))}
        </Session>
      </Main>
    </Wrap>
  )
}

export default UserProfile
