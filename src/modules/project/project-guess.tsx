import { Fragment, FunctionComponent, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { MoonLoader } from 'react-spinners'

import { newFollowProjectApi } from '@/app/api/client/project'
import ProjectSide from '@/components/sidebar'
import { StorageConst } from '@/constants/storage.const'
import { CommunityStore } from '@/store/local/community.store'
import { LeaderboardStore } from '@/store/local/leaderboard.store'
import { GlobalStoreModel } from '@/store/store'
import { PFollow, PSave, PShare } from '@/styles/button.style'
import {
  CloseIcon,
  Divider,
  EndWrap,
  Gap,
  LargeText,
  NormalText,
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
import { ProjectType } from '@/types/project.type'
import { Transition } from '@headlessui/react'

import Leaderboard from './leaderboard'
import QuestBoardTab from './questboard'

const FollowBtn: FunctionComponent<{
  project: ProjectType
}> = ({ project }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const projects: ProjectType[] = useStoreState<GlobalStoreModel>(
    (state) => state.projectsFollowing
  )
  const setProjectsFollowing = useStoreActions<GlobalStoreModel>(
    (action) => action.setProjectsFollowing
  )
  const projectExist = projects && projects.filter((e) => e.id === project.id)
  const handleFollow = async () => {
    setLoading(true)
    try {
      const data = await newFollowProjectApi(project.id)
      if (data.error) {
        toast.error(data.error)
      } else {
        if (projects) {
          setProjectsFollowing([...projects, project])
        }
      }
    } catch (error) {
      toast.error('Server error')
    }
  }

  if (projectExist && projectExist.length) {
    return (
      <PFollow isFollow={true}>
        <Image
          width={20}
          height={20}
          src={StorageConst.CHECK_ICON.src}
          alt={StorageConst.CHECK_ICON.alt}
        />
        <Gap width={1} />
        {'Following'}
      </PFollow>
    )
  }

  const ContentBtn = () => {
    if (loading) {
      return (
        <MoonLoader
          color='hsla(168, 0%, 100%, 1)'
          loading
          speedMultiplier={0.8}
          size={20}
        />
      )
    }

    return <span>{'Follow'}</span>
  }

  return (
    <PFollow onClick={handleFollow} isFollow={false}>
      <ContentBtn />
    </PFollow>
  )
}

export default function ProjectGuess() {
  const [tab, setTab] = useState<number>(0)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const projectState = CommunityStore.useStoreState((state) => state.project)
  const userState = useStoreState<GlobalStoreModel>((state) => state.user)

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
      <ProjectSide projectId={projectState.id} />
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
                  {projectState.introduction ??
                    'Manta Network is the zk layer 1 blockchain with the fastest prover speed and most decentralized trusted setup that brings programmable privacy to web3. Its suite of core products and technologies, including zkNFTs and MantaPay, offers user-friendly access to powerful ZK-enabled use cases.'}
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
                {userState && projectState && (
                  <LHTitleBox>
                    <SCardBox>
                      <PSave isBlock={false}>{'Join Townhall'}</PSave>
                      <Gap width={4} height={0} />
                      <QuestText>{'with 287.6K questers 👋'}</QuestText>
                    </SCardBox>
                    <CardBox>
                      <FollowBtn project={projectState} />
                      <Gap height={8} />
                      <PShare>
                        <Image
                          width={20}
                          height={20}
                          src={StorageConst.SHARE_ICON.src}
                          alt={StorageConst.SHARE_ICON.alt}
                        />
                      </PShare>
                    </CardBox>
                  </LHTitleBox>
                )}
              </LHBox>
            </LHInfoA>
          </LHeader>
        )}
        <Divider />
        <QuestBoardTab />
      </Main>
      <LeaderboardStore.Provider>
        <Leaderboard />
      </LeaderboardStore.Provider>
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
