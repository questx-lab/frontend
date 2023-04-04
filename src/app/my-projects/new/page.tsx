'use client'

import { Fragment, useState } from 'react'

import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'

import Layout from '@/components/layouts/layout'
import {
  ConnectTwitterBtn,
  CreateProjectBtn,
  WrapBtn,
} from '@/styles/button.style'
import { Divider, Gap } from '@/styles/common.style'
import { InputBox } from '@/styles/input.style'
import {
  DesModal,
  DialogPannel,
  ModalBg,
  ModalContent,
  ModalWrap,
  TitleModal,
  WrapProgressBar,
} from '@/styles/modal.style'
import {
  CategoryBox,
  CategoryItem,
  DescriptionCreatedProject,
  DivBox,
  ElementBox,
  FormBox,
  LabelInput,
  TitleCreatedProject,
  Wrap,
  WrapElementBox,
} from '@/styles/myProjects.style'
import { Dialog, Transition } from '@headlessui/react'

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

export default function NewProject() {
  const listCategory = categories.map((e, i) => (
    <CategoryItem key={i}>{e}</CategoryItem>
  ))

  let [isOpen, setIsOpen] = useState<boolean>(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <Layout>
      <header>
        <title>{'New Project'}</title>
      </header>
      <Wrap>
        <Gap />
        <TitleCreatedProject>{'Create New Project'}</TitleCreatedProject>
        <Gap />
        <DescriptionCreatedProject>
          {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sem eros, scelerisque' +
            ' sed ultricies at, egestas quis dolor'}
        </DescriptionCreatedProject>
        <Gap height={9} />
        <FormBox>
          <ElementBox>
            <WrapElementBox>
              <LabelInput>
                {'Project Name* (You can change it later)'}
              </LabelInput>
              <Gap height={1} />
              <InputBox placeholder='Enter Project Name' />
              <Gap height={9} />
              <LabelInput>
                {'Project Name* (You can change it later)'}
              </LabelInput>
              <Gap height={1} />
              <InputBox placeholder='Enter Project Name' />
              <Gap height={9} />
              <LabelInput>
                {'Project Name* (You can change it later)'}
              </LabelInput>
              <Gap height={1} />
              <InputBox placeholder='Enter Project Name' />
              <Gap height={9} />
              <LabelInput>
                {'Project Category* (It cannot be changed after creation)'}
              </LabelInput>
              <Gap height={2} />
              <CategoryBox>{listCategory}</CategoryBox>
            </WrapElementBox>
          </ElementBox>
          <ElementBox position={1}>
            <WrapElementBox>
              <LabelInput>
                {'Project Name* (You can change it later)'}
              </LabelInput>
              <Gap height={1} />
              <InputBox placeholder='Enter Project Name' />
              <Gap height={9} />
              <LabelInput>
                {'Project Name* (You can change it later)'}
              </LabelInput>
              <Gap height={1} />
              <InputBox placeholder='Enter Project Name' />
              <Gap height={9} />
              <LabelInput>
                {'Project Name* (You can change it later)'}
              </LabelInput>
              <Gap height={1} />
              <InputBox placeholder='Enter Project Name' />
              <Gap height={9} />
              <DivBox>
                <ElementBox>
                  <WrapElementBox>
                    <LabelInput>{'Twitter*'}</LabelInput>
                    <Gap height={1} />
                    <ConnectTwitterBtn onClick={() => {}}>
                      {'connect with twitter'.toUpperCase()}
                    </ConnectTwitterBtn>
                    <Gap height={8} width={0} />
                  </WrapElementBox>
                </ElementBox>
                <ElementBox position={1}>
                  <WrapElementBox>
                    <LabelInput>{'What you use QuestX for?'}</LabelInput>
                    <Gap height={1} />
                    <InputBox placeholder='This is a place holder' />
                  </WrapElementBox>
                </ElementBox>
              </DivBox>
            </WrapElementBox>
          </ElementBox>
        </FormBox>
        <Gap height={9} />
        <Divider />
        <Gap height={9} />
        <WrapBtn>
          <CreateProjectBtn isBlock={false} onClick={openModal}>
            {'create project'.toUpperCase()}
          </CreateProjectBtn>
        </WrapBtn>
      </Wrap>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
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
                <DialogPannel>
                  <WrapProgressBar>
                    <CircularProgressbar
                      styles={buildStyles({
                        rotation: 0.75,
                        strokeLinecap: 'butt',
                        textSize: '16px',
                        pathTransitionDuration: 0.5,
                        pathColor: `#000`,
                        textColor: '#000',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7',
                      })}
                      text='30%'
                      value={30}
                    />
                  </WrapProgressBar>
                  <Gap height={6} />
                  <TitleModal>{'Hang in there'}</TitleModal>
                  <Gap height={6} />
                  <DesModal>{"We're creating [Project Name],"}</DesModal>
                  <DesModal>{'It might take some minutes.'}</DesModal>
                </DialogPannel>
              </Transition.Child>
            </ModalContent>
          </ModalWrap>
        </Dialog>
      </Transition>
    </Layout>
  )
}
