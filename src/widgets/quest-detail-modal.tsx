import { FunctionComponent, ReactNode, Fragment } from 'react'
import Image from 'next/image'
import { CloseIcon, EndWrap, Gap } from '@/styles/common.style'
import { LDDP2, ModalBg, ModalContent, ModalWrap } from '@/styles/modal.style'
import { MDialog } from '@/styles/home.style'
import { Transition } from '@headlessui/react'
import { StorageConst } from '@/constants/storage.const'
import tw from 'twin.macro'
import { QuestType } from '@/types/project.type'
import { FullWidthBtn } from '@/styles/button.style'
import { Card } from '@/styles/questboard.style'

const Title = tw.div`
  text-xs	 
  font-medium
  font-semibold	
  uppercase
`

const Description = tw.div`
  text-xs	 
  font-normal
  text-gray-500
`

const HeaderBox = tw.div`
  flex
  flex-row
  justify-start
  items-center
`

const PointText = tw.span`
  text-[#FF7B05]
  text-lg
  font-medium
`

const CardBox = tw.div`
  flex
  flex-row
  items-center
`

export const QuestDetailModal: FunctionComponent<{
  isOpen: boolean
  onClose: () => void
  children?: ReactNode
  quest: QuestType | null
}> = ({ isOpen, onClose, children, quest }) => {
  return (
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
              <LDDP2 className='items-left'>
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
                <div className='pl-6 pb-6 border-b-2'>
                  <CardBox>
                    <HeaderBox>{quest?.title}</HeaderBox>
                    <Gap width={2} />
                    <Card type={1}>{'ONCE'}</Card>
                  </CardBox>
                </div>
                <div className='grid gap-2 grid-cols-2 overscroll-none divide-x-2 h-max'>
                  <div className='text-left p-6'>
                    <Title>Mission</Title>
                    <Gap height={2} />
                    <Description>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nulla ac leo dui. Sed porttitor augue erat, a hendrerit
                      neque viverra et.
                    </Description>
                    <Gap height={4} />
                    <Title>Guild</Title>
                    <Gap height={2} />
                    <Description>
                      Nulla ut nibh a metus sollicitudin fermentum. Mauris in
                      sollicitudin nisl, eget semper justo. Cras convallis
                      tempus ex nec euismod.
                    </Description>
                    <Gap height={4} />
                    <Image
                      width={400}
                      height={200}
                      src={StorageConst.EMPTY.src}
                      alt={StorageConst.EMPTY.alt}
                    />
                    <Gap height={4} />
                    <Description>
                      Proin pretium metus mauris, ut vulputate sem suscipit et.
                      Vivamus sodales egestas lectus vel tempor. Quisque
                      laoreet, ipsum vitae volutpat pellentesque, felis sapien
                      ullamcorper augue, vulputate sagittis lacus nisi id
                      libero.
                    </Description>
                    <Gap height={4} />
                    <Title>Submission</Title>
                    <Gap height={2} />
                    <Description>
                      Curabitur velit ante, facilisis in sapien sed, tristique
                      ultricies risus. Quisque dignissim odio a lorem varius
                      porttitor. Pellentesque molestie ex ex.
                    </Description>
                    <Gap height={6} />
                    <FullWidthBtn> Claim Reward </FullWidthBtn>
                  </div>
                  <div className='text-left'>
                    <div className='border-b-2 p-6'>
                      <Title>Reward</Title>
                      <Gap height={4} />
                      <HeaderBox>
                        <Image
                          width={40}
                          height={40}
                          src={StorageConst.POINT_ICON.src}
                          alt={StorageConst.POINT_ICON.alt}
                        />
                        <Gap width={2} />
                        <PointText>{`300 Gems`}</PointText>
                      </HeaderBox>
                    </div>
                  </div>
                </div>
              </LDDP2>
            </Transition.Child>
          </ModalContent>
        </ModalWrap>
      </MDialog>
    </Transition>
  )
}
