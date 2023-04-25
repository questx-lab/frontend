import { Fragment, useState } from 'react'

import Image from 'next/image'

import SidebarCustom from '@/components/layouts/sidebar'
import { StorageConst } from '@/constants/storage.const'
import { useStoreState } from '@/store/store'
import { PFollow, PSave } from '@/styles/button.style'
import {
  CloseIcon,
  Divider,
  EndWrap,
  Gap,
  LargeText,
  MediumText,
  NormalText,
  RowBWrap,
} from '@/styles/common.style'
import { MDialog } from '@/styles/home.style'
import {
  LHBox,
  LHDes,
  LHeader,
  LHInfoA,
  LHLogo,
  LHTitle,
  LHTitleBox,
  LLbox,
  LogoP,
  LUImg,
  LUWrap2,
  Main,
  QTCard,
  QTWrapC,
  TabBox,
  TabList,
  TabPannel,
  TabWrap,
  Wrap,
} from '@/styles/leaderboard.style'
import {
  LDDP,
  ModalBg,
  ModalContent,
  ModalWrap,
  TitleModal,
} from '@/styles/modal.style'
import { CardBox, QuestText, SCardBox } from '@/styles/questboard.style'
import { Tab, Transition } from '@headlessui/react'

import QuestBoardTab from './questboard/page'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
export default function Leaderboard() {
  const [tab, setTab] = useState<number>(0)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const projectState = useStoreState((state) => state.project.curProject)

  const onClose = () => setIsOpen(false)
  const onOpen = () => {
    setIsOpen(true)
  }
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

  return (
    <Wrap>
      <SidebarCustom />
      <Main>
        {projectState && (
          <LHeader>
            <LogoP
              width={250}
              height={250}
              src={StorageConst.MANTA_LOGO.src}
              alt={StorageConst.MANTA_LOGO.alt}
            />
            <Gap width={8} />
            <LHInfoA>
              <LHBox>
                <LHTitle>{projectState.name}</LHTitle>
                <Gap height={1} />
                <LHDes>
                  {
                    'Manta Network is the zk layer 1 blockchain with the fastest prover speed and most decentralized trusted setup that brings programmable privacy to web3. Its suite of core products and technologies, including zkNFTs and MantaPay, offers user-friendly access to powerful ZK-enabled use cases.'
                  }
                </LHDes>
                <Gap height={3} />
                <LHLogo>
                  <Image
                    width={30}
                    height={30}
                    src={StorageConst.TWITTER_DIR.src}
                    alt={StorageConst.TWITTER_DIR.alt}
                  />
                  <Gap width={4} height={0} />
                  <Image
                    width={30}
                    height={30}
                    src={StorageConst.DISCORD_DIR.src}
                    alt={StorageConst.DISCORD_DIR.alt}
                  />
                  <Gap width={4} height={0} />
                  <Image
                    width={30}
                    height={30}
                    src={StorageConst.METAMASK_DIR.src}
                    alt={StorageConst.METAMASK_DIR.alt}
                  />
                  <Gap width={4} height={0} />
                  <Image
                    width={30}
                    height={30}
                    src={StorageConst.METAMASK_DIR.src}
                    alt={StorageConst.METAMASK_DIR.alt}
                  />
                </LHLogo>
                <Gap height={5} />
                <LHTitleBox>
                  <SCardBox>
                    <PSave isBlock={false}>{'Join Townhall'}</PSave>
                    <Gap width={4} height={0} />
                    <QuestText>{'with 287.6K questers 👋'}</QuestText>
                  </SCardBox>
                  <CardBox>
                    <PFollow>
                      <Image
                        width={20}
                        height={20}
                        src={StorageConst.CHECK_ICON.src}
                        alt={StorageConst.CHECK_ICON.alt}
                      />
                      <Gap width={1} />
                      {'Following'}
                    </PFollow>
                    <Gap height={8} />
                    <PFollow>
                      <Image
                        width={20}
                        height={20}
                        src={StorageConst.SHARE_ICON.src}
                        alt={StorageConst.SHARE_ICON.alt}
                      />
                    </PFollow>
                  </CardBox>
                </LHTitleBox>
              </LHBox>
            </LHInfoA>
            {/* <Gap height={4} />
            <LHInfoC>
              <PFollow>
                {' '}
                <Image
                  width={20}
                  height={20}
                  src={StorageConst.CHECK_ICON.src}
                  alt={StorageConst.CHECK_ICON.alt}
                />
                {' Following'}
              </PFollow>
              <Gap height={8} />
              <PFollow>
                <Image
                  width={20}
                  height={20}
                  src={StorageConst.SHARE_ICON.src}
                  alt={StorageConst.SHARE_ICON.alt}
                />
              </PFollow>
            </LHInfoC> */}
          </LHeader>
        )}
        <Divider />
        <QuestBoardTab />
      </Main>
      <TabWrap>
        <RowBWrap>
          <MediumText>{'Leaderboard'}</MediumText>
          <Image
            onClick={onOpen}
            src={StorageConst.ARROW_ICON.src}
            alt={StorageConst.ARROW_ICON.alt}
            width={28}
            height={28}
            className='cursor-pointer'
          />
        </RowBWrap>
        <TabBox>
          <Tab.Group>
            <TabList>
              {['This Week', 'This Month', 'All Time'].map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      'rounded-full w-full p-2 text-sm leading-5 text-black',
                      selected
                        ? 'bg-gray-200 shadow font-bold'
                        : 'text-blue-100 font-medium hover:text-black'
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </TabList>
            <Tab.Panels className='mt-2 '>
              {[0, 1, 2].map((posts, idx) => (
                <TabPannel key={idx}>
                  <ul>
                    {[0, 1, 2, 3, 4, 5].map((post) => (
                      <li
                        key={post}
                        className='relative rounded-lg p-3 bg-gray-200 flex flex-row justify-between items-center my-4'
                      >
                        <div className='w-[50px] h-[50px] bg-gray-700 rounded-full'></div>
                        <div className='w-36 bg-white rounded-full h-4' />
                        <p className='font-bold text-md text-black'>
                          {'267 quests'}
                        </p>
                      </li>
                    ))}
                  </ul>
                </TabPannel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </TabBox>
      </TabWrap>
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
    </Wrap>
  )
}
