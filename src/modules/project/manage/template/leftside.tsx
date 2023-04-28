import Image from 'next/image'

import { StorageConst } from '@/constants/storage.const'
import { Gap } from '@/styles/common.style'
import {
  Card,
  CardBox,
  DesQ,
  DisclosureBtn,
  DisclosurePanel,
  DisclosureTitle,
  EndBoarding,
  HeaderBox,
  PointText,
  StartBoarding,
  TBoardingCard,
  TitleQuestBox,
  TLSide,
} from '@/styles/questboard.style'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

const listPanel = [0, 1, 2, 3, 4].map((e) => (
  <DisclosurePanel key={e}>
    <TBoardingCard key={e}>
      <StartBoarding>
        <TitleQuestBox>{'Join Discord 👾'}</TitleQuestBox>
        <Gap height={4} />
        <DesQ>
          {'Get a Discord Role and introduce yourself to the community.'}
        </DesQ>
      </StartBoarding>
      <EndBoarding>
        <HeaderBox>
          <Image
            width={25}
            height={25}
            src={StorageConst.POINT_ICON.src}
            alt={StorageConst.POINT_ICON.alt}
          />
          <Gap width={2} />
          <PointText>{'300 Gems'}</PointText>
        </HeaderBox>
        <CardBox>
          <Card>{'DAILY'}</Card>
          <Gap width={2} />
        </CardBox>
      </EndBoarding>
    </TBoardingCard>
  </DisclosurePanel>
))

const listClosure = ['COMMUNITY', 'SOCIAL NETWORK'].map((e, i) => (
  <Disclosure key={i} as='div'>
    {({ open }) => (
      <>
        <DisclosureBtn>
          <DisclosureTitle>{e}</DisclosureTitle>
          <ChevronUpIcon
            className={`${
              open ? 'rotate-180 transform' : ''
            } h-5 w-5 text-primary`}
          />
        </DisclosureBtn>
        {listPanel}
      </>
    )}
  </Disclosure>
))

export default function LeftSide() {
  return <TLSide>{listClosure}</TLSide>
}
