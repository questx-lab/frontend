import { Fragment, useState } from 'react'

import {
  CloseIcon,
  Divider,
  EndWrap,
  Gap,
  LargeText,
  MediumText,
  NormalText,
  RowBSWrap,
  VDevider,
} from '@/styles/common.style'
import {
  CateTitle,
  HeaderText,
  MDialog,
  QuestWrapCat,
} from '@/styles/home.style'
import {
  LLbox,
  LTInvite,
  LUImg,
  LUWrap,
  LUWrap2,
  QTCard,
  QTLbBox,
  QTWrap,
  QTWrapC,
  QTWrapD,
  QTWrapL,
} from '@/styles/leaderboard.style'
import {
  LDDP,
  ModalBg,
  ModalContent,
  ModalWrap,
  TitleModal,
} from '@/styles/modal.style'
import {
  CategoryBox,
  CategoryItem,
  SkeletonFirst,
  SkeletonSecond,
} from '@/styles/myProjects.style'
import {
  ContentQuestBox,
  ImageQuestBox,
  QuestboardBox,
  TitleQuestBox,
  WrapQuestboard,
} from '@/styles/questboard.style'
import { Transition } from '@headlessui/react'

const categories = [
  'NFT',
  'GameFi',
  'DeFi',
  'DAO',
  'SocialFi',
  'Metaverse',
  'Tools',
  'Ecosystem',
  'Others',
]

export default function QuestBoardTab() {
  const [tab, setTab] = useState<number>(0)
  let [isOpen, setIsOpen] = useState<boolean>(false)

  const onClose = () => setIsOpen(false)
  const onOpen = () => {
    setIsOpen(true)
  }

  const listCategory = categories.map((e, i) => (
    <CategoryItem key={i}>{e}</CategoryItem>
  ))

  const listLD = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
    <div key={e}>
      <LUWrap2>
        <div className='flex flex-row justify-center items-center'>
          <LargeText>{e + 1}</LargeText>
          <Gap width={2} />
          <LUImg />
          <Gap width={2} />
          <NormalText>Username</NormalText>
        </div>
        <NormalText>56 Questx</NormalText>
        <NormalText>75 XP</NormalText>
      </LUWrap2>
      <Divider />
    </div>
  ))

  const listQuests = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
    <QuestboardBox key={e}>
      <ImageQuestBox />
      <ContentQuestBox>
        <TitleQuestBox>{'quest card'.toUpperCase()}</TitleQuestBox>
        <SkeletonFirst />
        <SkeletonSecond />
      </ContentQuestBox>
    </QuestboardBox>
  ))

  return (
    <QTWrap>
      <QTLbBox>
        <RowBSWrap>
          <QTWrapC>
            <LargeText>{'Project Leaderboard'}</LargeText>
            <Gap width={12} />
            <QTWrapD>
              <QTCard active={!tab} onClick={() => setTab(0)}>
                {'Weekly'}
              </QTCard>
              <Gap width={4} />
              <QTCard active={tab === 1} onClick={() => setTab(1)}>
                {'Montly'}
              </QTCard>
              <Gap width={4} />
              <QTCard active={tab === 2} onClick={() => setTab(2)}>
                {'All Time'}
              </QTCard>
            </QTWrapD>
          </QTWrapC>
          <Gap height={4} />
          <QTWrapL>
            <LTInvite onClick={onOpen}>{'View More'}</LTInvite>
          </QTWrapL>
        </RowBSWrap>
        <Gap height={8} />
        <RowBSWrap>
          <LUWrap>
            <LargeText>1</LargeText>
            <Gap width={2} />
            <LUImg />
            <Gap width={2} />
            <MediumText>Username</MediumText>
            <Gap width={2} />
            <NormalText>56 Questx</NormalText>
            <Gap width={2} />
            <NormalText>75 XP</NormalText>
          </LUWrap>
          <VDevider />
          <LUWrap>
            <LargeText>1</LargeText>
            <Gap width={2} />
            <LUImg />
            <Gap width={2} />
            <MediumText>Username</MediumText>
            <Gap width={2} />
            <NormalText>56 Questx</NormalText>
            <Gap width={2} />
            <NormalText>75 XP</NormalText>
          </LUWrap>
          <VDevider />
          <LUWrap>
            <LargeText>1</LargeText>
            <Gap width={2} />
            <LUImg />
            <Gap width={2} />
            <MediumText>Username</MediumText>
            <Gap width={2} />
            <NormalText>56 Questx</NormalText>
            <Gap width={2} />
            <NormalText>75 XP</NormalText>
          </LUWrap>
        </RowBSWrap>
      </QTLbBox>
      <Gap height={8} />
      <QuestWrapCat>
        <CateTitle>{'View Category'}</CateTitle>
        <Gap height={2} width={0} />
        <CategoryBox>{listCategory}</CategoryBox>
      </QuestWrapCat>
      <Gap height={4} />
      <HeaderText>{'Ready to Claim (Quests that are approved)'}</HeaderText>
      <Divider />
      <WrapQuestboard>{listQuests}</WrapQuestboard>
      <Transition appear show={isOpen} as={Fragment}>
        <MDialog onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <ModalBg />
          </Transition.Child>
          <ModalWrap>
            <ModalContent>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <LDDP>
                  <EndWrap>
                    <CloseIcon
                      onClick={onClose}
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </CloseIcon>
                  </EndWrap>
                  <TitleModal>{'Project Leaderboard'}</TitleModal>
                  <Gap height={4} />
                  <QTWrapC>
                    <QTCard active={!tab} onClick={() => setTab(0)}>
                      {'Weekly'}
                    </QTCard>
                    <Gap width={4} />
                    <QTCard active={tab === 1} onClick={() => setTab(1)}>
                      {'Montly'}
                    </QTCard>
                    <Gap width={4} />
                    <QTCard active={tab === 2} onClick={() => setTab(2)}>
                      {'All Time'}
                    </QTCard>
                  </QTWrapC>
                  <Gap height={4} />
                  <LLbox>{listLD}</LLbox>
                </LDDP>
              </Transition.Child>
            </ModalContent>
          </ModalWrap>
        </MDialog>
      </Transition>
    </QTWrap>
  )
}
