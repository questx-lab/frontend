'use client'

import { Fragment, useRef, useState } from 'react'

import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { DotLoader } from 'react-spinners'

import { newProjectApi } from '@/app/api/client/project'
import Layout from '@/components/layouts/layout'
import { RouterConst } from '@/constants/router.const'
import {
  ConnectTwitterBtn,
  CreateProjectBtn,
  WrapBtn,
} from '@/styles/button.style'
import { Divider, Gap, SpinnerStyle } from '@/styles/common.style'
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
import { ReqNewProject } from '@/types/project.type'
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
  const router = useRouter()

  const nameRef = useRef<HTMLInputElement>(null)
  const introRef = useRef<HTMLInputElement>(null)
  const telRef = useRef<HTMLInputElement>(null)
  const urlRef = useRef<HTMLInputElement>(null)
  const webRef = useRef<HTMLInputElement>(null)
  const discordRef = useRef<HTMLInputElement>(null)

  const listCategory = categories.map((e, i) => (
    <CategoryItem key={i}>{e}</CategoryItem>
  ))

  let [isOpen, setIsOpen] = useState<boolean>(false)

  const handleSubmit = async () => {
    setIsOpen(true)
    try {
      const payload: ReqNewProject = {
        name: nameRef.current?.value ?? '',
        telegram: telRef.current?.value ?? '',
        discord: discordRef.current?.value ?? '',
      }
      const data = await newProjectApi(payload)
      if (data.data) {
        router.push(RouterConst.COMMUNITIES + '/all/' + data.data?.id)
      }
      if (data.error) {
        setIsOpen(false)
        toast.error(data.error)
      }
    } catch (error) {
      setIsOpen(false)
      toast.error('Error while create project')
    }
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
              <InputBox ref={nameRef} placeholder='Enter Project Name' />
              <Gap height={9} />
              <LabelInput>
                {'Project Introduction (You can change it later)'}
              </LabelInput>
              <Gap height={1} />
              <InputBox
                ref={introRef}
                placeholder='Enter Project Introduction'
              />
              <Gap height={9} />
              <LabelInput>{'Telegram (You can change it later)'}</LabelInput>
              <Gap height={1} />
              <InputBox ref={telRef} placeholder='Enter Telegram URL' />
              <Gap height={9} />
              <LabelInput>
                {'Project Category* (It cannot be changed after creation)'}
              </LabelInput>
              <Gap height={2} />
              <CategoryBox>{listCategory}</CategoryBox>
            </WrapElementBox>
          </ElementBox>
          <Gap height={9} width={0} />
          <ElementBox position={1}>
            <WrapElementBox>
              <LabelInput>
                {'Project URL* (It cannot be changed after creation)'}
              </LabelInput>
              <Gap height={1} />
              <InputBox ref={urlRef} placeholder='Enter Project URL' />
              <Gap height={9} />
              <LabelInput>{'Website (You can change it later)'}</LabelInput>
              <Gap height={1} />
              <InputBox ref={webRef} placeholder='Enter Website URL' />
              <Gap height={9} />
              <LabelInput>{'Discord (You can change it later)'}</LabelInput>
              <Gap height={1} />
              <InputBox ref={discordRef} placeholder='Enter Discord URL' />
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
          <CreateProjectBtn isBlock={false} onClick={handleSubmit}>
            {'create project'.toUpperCase()}
          </CreateProjectBtn>
        </WrapBtn>
      </Wrap>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={() => {}}>
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
                    <DotLoader
                      color={'#000'}
                      loading={true}
                      cssOverride={SpinnerStyle}
                      size={150}
                      aria-label='Loading Spinner'
                      data-testid='loader'
                    />
                  </WrapProgressBar>
                  <Gap height={6} />
                  <TitleModal>{'Hang in there'}</TitleModal>
                  <Gap height={6} />
                  <DesModal>{"We're creating project,"}</DesModal>
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
