import { Fragment, useRef, useState } from 'react'

import { toast } from 'react-hot-toast'

import { addRoleProjectApi } from '@/app/api/client/project'
import { NewProjectStore } from '@/store/local/project.store'
import { AddRoleBtn, FullWidthBtn, SubmitBtn } from '@/styles/button.style'
import { CloseIcon, ColSWrap, EndWrap, Gap } from '@/styles/common.style'
import {
  MBoxBtn,
  MBtn,
  MDialog,
  MLbox,
  MSpanIcon,
  MSpanName,
  MWrapBtn,
  NotifyBox,
  NotifyText,
  PTable,
  PTableWrap,
  PTd,
  PTh,
  PThead,
  PTr,
  QuestWrap,
} from '@/styles/home.style'
import { InputBox } from '@/styles/input.style'
import {
  DialogPannel,
  ModalBg,
  ModalContent,
  ModalWrap,
  TitleModal,
} from '@/styles/modal.style'
import {
  LabelInput,
  ListBoxWrap,
  ListOps,
  SpanIcon,
  SpanList,
} from '@/styles/myProjects.style'
import { ReqNewRoleProject } from '@/types/project.type'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const Role = [{ name: 'reviewer' }, { name: 'editor' }]

export default function PManageMod() {
  let [isOpen, setIsOpen] = useState<boolean>(false)
  const [selected, setSelected] = useState(Role[0])
  const emailRef = useRef<HTMLInputElement>(null)
  const metaRef = useRef<HTMLInputElement>(null)
  const projectState = NewProjectStore.useStoreState((state) => state.project)

  const onClose = () => setIsOpen(false)
  const onOpen = () => {
    setIsOpen(true)
    setSelected(Role[0])
  }

  const handleAdRole = async () => {
    try {
      const payload: ReqNewRoleProject = {
        project_id: projectState.id ?? '',
        user_id: emailRef.current?.value ?? '',
        name: selected.name,
      }

      const data = await addRoleProjectApi(payload)

      if (data.error) {
        toast.error(data.error)
        return
      }
      toast.success('Use is added successfully')
      onClose()
    } catch (error) {
      toast.error('Error while adding')
    }
  }

  return (
    <QuestWrap>
      <Gap height={8} />
      <NotifyBox>
        <NotifyText>{'You have 0 pending submission'}</NotifyText>
        <SubmitBtn>{'review submittions'.toUpperCase()}</SubmitBtn>
      </NotifyBox>
      <Gap height={8} />
      <MWrapBtn>
        <MBtn>{'1 Flowwers'}</MBtn>
        <MBtn>{'1 New followers in 7days'}</MBtn>
        <MBtn>{'0 Quests'}</MBtn>
      </MWrapBtn>
      <Gap height={8} />
      <AddRoleBtn onClick={onOpen}>{'add new role'.toUpperCase()}</AddRoleBtn>
      <Gap height={8} />
      <PTableWrap>
        <PTable>
          <PThead>
            <tr>
              <PTh scope='col'>Usernam</PTh>
              <PTh scope='col'>Email</PTh>
              <PTh scope='col'>MetaMask</PTh>
              <PTh scope='col'>Discord</PTh>
              <PTh scope='col'>Telegram</PTh>
              <PTh scope='col'>Role</PTh>
            </tr>
          </PThead>
          <tbody>
            <PTr>
              <PTd>{'username'}</PTd>
              <PTd>{'abc'}</PTd>
              <PTd>{'from acc info'}</PTd>
              <PTd>{'from acc info'}</PTd>
              <PTd>{'from acc info'}</PTd>
              <PTd>{'admin'}</PTd>
            </PTr>
            <PTr>
              <PTd>{'username'}</PTd>
              <PTd>{'abc'}</PTd>
              <PTd>{'from acc info'}</PTd>
              <PTd>{'from acc info'}</PTd>
              <PTd>{'from acc info'}</PTd>
              <PTd>{'admin'}</PTd>
            </PTr>
            <PTr>
              <PTd>{'username'}</PTd>
              <PTd>{'abc'}</PTd>
              <PTd>{'from acc info'}</PTd>
              <PTd>{'from acc info'}</PTd>
              <PTd>{'from acc info'}</PTd>
              <PTd>{'admin'}</PTd>
            </PTr>
            <PTr>
              <PTd>{'username'}</PTd>
              <PTd>{'abc'}</PTd>
              <PTd>{'from acc info'}</PTd>
              <PTd>{'from acc info'}</PTd>
              <PTd>{'from acc info'}</PTd>
              <PTd>{'admin'}</PTd>
            </PTr>
          </tbody>
        </PTable>
      </PTableWrap>
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
                <DialogPannel>
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
                  <TitleModal>{'Add New Role'}</TitleModal>
                  <Gap height={6} />
                  <ColSWrap>
                    <LabelInput>{'Email Address*'}</LabelInput>
                    <Gap height={2} />
                    <InputBox ref={emailRef} placeholder='Enter' />
                    <Gap height={6} />
                    <LabelInput>{'MetaMask Wallet'}</LabelInput>
                    <Gap height={2} />
                    <InputBox ref={metaRef} placeholder='Enter' />
                    <Gap height={6} />
                    <LabelInput>{'Role'}</LabelInput>
                    <Gap height={2} />
                    <Listbox value={selected} onChange={setSelected}>
                      <MLbox>
                        <MBoxBtn>
                          <MSpanName>{selected.name}</MSpanName>
                          <MSpanIcon>
                            <ChevronUpDownIcon
                              className='h-5 w-5 text-gray-400'
                              aria-hidden='true'
                            />
                          </MSpanIcon>
                        </MBoxBtn>
                        <Transition
                          as={Fragment}
                          leave='transition ease-in duration-100'
                          leaveFrom='opacity-100'
                          leaveTo='opacity-0'
                        >
                          <ListBoxWrap>
                            {Role.map((r, personIdx) => (
                              <ListOps key={personIdx} value={r}>
                                {({ selected }) => (
                                  <>
                                    <SpanList isSelect={selected}>
                                      {r.name}
                                    </SpanList>
                                    {selected ? (
                                      <SpanIcon>
                                        <CheckIcon
                                          className='h-5 w-5'
                                          aria-hidden='true'
                                        />
                                      </SpanIcon>
                                    ) : null}
                                  </>
                                )}
                              </ListOps>
                            ))}
                          </ListBoxWrap>
                        </Transition>
                      </MLbox>
                      <Gap height={9} />
                      <FullWidthBtn onClick={handleAdRole}>
                        {'ADD ROLE'}
                      </FullWidthBtn>
                      <Gap height={4} />
                    </Listbox>
                  </ColSWrap>
                </DialogPannel>
              </Transition.Child>
            </ModalContent>
          </ModalWrap>
        </MDialog>
      </Transition>
    </QuestWrap>
  )
}
