import { FunctionComponent, useEffect, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import Image from 'next/image'
import tw from 'twin.macro'

import { StorageConst } from '@/constants/storage.const'
import { GlobalStoreModel } from '@/store/store'
import { Divider } from '@/styles/common.style'
import { ImageQuestBox } from '@/styles/questboard.style'
import { Badge, InfoText } from '@/styles/settings.style'
import { UserType, FollowerType, BadgeType } from '@/utils/type'
import {
  Horizontal,
  HorizontalBetweenCenter,
  Vertical,
} from '@/widgets/orientation'
import {
  getMyBadgesApi,
  getMyFollowersInfoApi,
  getUserApi,
} from '@/app/api/client/user'
import { toast } from 'react-hot-toast'

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

const Main = tw(Vertical)`
  w-[calc(75%)]
  h-full
  ml-[calc(25%)]
  gap-6
`

const AssideInfo = tw(Vertical)`
  w-full
  justify-center
  items-center
  py-8
  gap-3
`

const AssideBadge = tw(Vertical)`
  w-full
  px-3
  py-6
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

const RowBox = tw(Horizontal)`
  justify-center
  items-center
  gap-2
`

const ColBox = tw(Vertical)`
  justify-center
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
  w-full
`

const TitleBox = tw(Horizontal)`
  py-6
  px-6
  gap-3
  text-xl
  font-medium
  text-gray-900
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

const RankWrap = tw(HorizontalBetweenCenter)`
  w-full
  p-6
`

const UserProfile: FunctionComponent<{ userId: string }> = ({ userId }) => {
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  const [badges, setBadges] = useState<BadgeType[]>([])
  const [communityFollowers, setCommunityFollowers] = useState<FollowerType[]>(
    []
  )
  const fetchBadges = async () => {
    try {
      const resp = await getMyBadgesApi()
      if (!resp.data) {
        toast.error('Can not get my profile')
        return
      }
      if (resp.error) {
        toast.error(resp.error)
      }
      setBadges(resp.data.badges)
    } catch (error) {
      toast.error(error as string)
    }
  }

  const fetchCommunityFollowers = async () => {
    try {
      const resp = await getMyFollowersInfoApi()
      if (!resp.data) {
        toast.error('Can not get my profile')
        return
      }
      if (resp.error) {
        toast.error(resp.error)
      }
      setCommunityFollowers(resp.data.followers)
    } catch (error) {
      toast.error(error as string)
    }
  }

  useEffect(() => {
    fetchBadges()
    fetchCommunityFollowers()
  }, [])

  return (
    <Wrap>
      <Aside>
        <AssideInfo>
          <ImageQuestBox
            width={96}
            height={96}
            src={user.avatar_url || ''}
            alt={user.name || ''}
          />
          <NameText>{user && user.name}</NameText>
          <LevelBox>{user.level}</LevelBox>
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
              <WarningText> {user.gems} </WarningText>
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
              <SuccessText> {user.points} </SuccessText>
            </RowBox>
          </InfoText>
          <InfoText>
            <NormalText>{'Quest Completed'}</NormalText>
            <NormalText>{user.quest_completed}</NormalText>
          </InfoText>
          <InfoText>
            <NormalText>{'Community Joined'}</NormalText>
            <NormalText>{user.community_joined}</NormalText>
          </InfoText>
        </AssideBadge>
      </Aside>
      <Main>
        <Session>
          <TitleBox>
            {'🎉 Badge Achievements'}
            <Badge>{badges.length}</Badge>
          </TitleBox>
          <BadgeGrid>
            {badges &&
              badges.map((badge, idx) => (
                <BadgeBox key={idx}>
                  <Image
                    width={180}
                    height={180}
                    src={badge.community.logo_url || ''}
                    alt={badge.community.name || ''}
                  />
                </BadgeBox>
              ))}
          </BadgeGrid>
        </Session>
        <Session>
          <TitleBox>{'👑 Community Ranking'}</TitleBox>
          {communityFollowers.map((community, idx) => (
            <RankWrap key={idx}>
              <RowBox>
                <ImageQuestBox
                  width={64}
                  height={64}
                  src={community.avatar_url || ''}
                  alt={community.community_name || ''}
                />
                <ColBox>
                  {community.community_name}
                  <RowBox>
                    {community.tags &&
                      community.tags.map((tag, idx) => (
                        <Badge key={`key-${idx}`}>{tag}</Badge>
                      ))}
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
                <WarningText> {community.points} </WarningText>
              </RowBox>
            </RankWrap>
          ))}
        </Session>
      </Main>
    </Wrap>
  )
}

export default UserProfile
