'use client'

import { useRef, useState } from 'react'

import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import styled from 'styled-components'
import tw from 'twin.macro'

import { newCommunityApi } from '@/app/api/client/community'
import { Layout } from '@/components/layout'
import { RouterConst } from '@/constants/router.const'
import {
  ConnectTwitterBtn,
  CreateProjectBtn,
  WrapBtn,
} from '@/styles/button.style'
import { Divider, Gap } from '@/styles/common.style'
import { InputBox } from '@/styles/input.style'
import { ReqNewCommunity } from '@/utils/type'
import { ProgressModal } from '@/widgets/modal'
import { Horizontal, Vertical } from '@/widgets/orientation'

type DirectType = {
  position?: number
}

const Wrap = tw(Vertical)`
  min-h-screen
  px-[80px]
  pt-[80px]
  pb-[30px]
  max-lg:px-[20px]
`

// ========== Created project style ==========

const DescriptionCreatedProject = tw.p`
  text-sm
  text-black
  font-light
`

// ========== New project style ==========
const FormBox = tw.form`
  w-full
  flex
  flex-row
  max-sm:flex-col
`

const DivBox = tw(Horizontal)`
  w-full
  max-sm:flex-col
`

const ElementBox = styled.div<DirectType>(({ position = 0 }) => [
  position
    ? tw`
  w-full
  flex
  flex-col
  justify-start
  items-end
  max-sm:items-start
  `
    : tw`
  w-full
  flex
  flex-col
  justify-start
  items-start
`,
])

const WrapElementBox = tw(Vertical)`
  w-[calc(97%)]
  justify-center
  max-sm:items-start
  max-sm:w-full
`

const LabelInput = tw.label`
  text-black
  font-normal
  text-sm
`

const CategoryBox = tw.div`
  w-full
  flex
  flex-wrap
  justify-start
  items-start
`

const CategoryItem = tw.div`
  border
  border-[1.5px]
  rounded-full
  mr-3
  mb-3
  border-black
  bg-white
  flex
  justify-center
  items-center
  px-5
  py-0.5
  text-lg
  text-black
  font-light
  cursor-pointer
  hover:bg-gray-700
  hover:text-white
`

const TitleCreatedProject = tw.p`
  text-3xl
  text-black
  font-bold
  max-sm:text-2xl
`
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
      const payload: ReqNewCommunity = {
        display_name: nameRef.current?.value ?? '',
        telegram: telRef.current?.value ?? '',
        introduction: introRef.current?.value ?? '',
      }

      const data = await newCommunityApi(payload)
      if (data.data) {
        router.push(RouterConst.PROJECT + data.data?.handle + '/create')
      }
      if (data.error) {
        setIsOpen(false)
        toast.error(data.error)
      }
    } catch (error) {
      setIsOpen(false)
      toast.error('Error while create community')
    }
  }

  return (
    <Layout>
      <header>
        <title>{'New Community'}</title>
      </header>
      <Wrap>
        <Gap />
        <TitleCreatedProject>{'Create New Community'}</TitleCreatedProject>
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
                {'Community Name* (You can change it later)'}
              </LabelInput>
              <Gap height={1} />
              <InputBox ref={nameRef} placeholder='Enter Community Name' />
              <Gap height={9} />
              <LabelInput>
                {'Community Introduction (You can change it later)'}
              </LabelInput>
              <Gap height={1} />
              <InputBox
                ref={introRef}
                placeholder='Enter Community Introduction'
              />
              <Gap height={9} />
              <LabelInput>{'Telegram (You can change it later)'}</LabelInput>
              <Gap height={1} />
              <InputBox ref={telRef} placeholder='Enter Telegram URL' />
              <Gap height={9} />
              <LabelInput>
                {'Community Category* (It cannot be changed after creation)'}
              </LabelInput>
              <Gap height={2} />
              <CategoryBox>{listCategory}</CategoryBox>
            </WrapElementBox>
          </ElementBox>
          <Gap height={9} width={0} />
          <ElementBox position={1}>
            <WrapElementBox>
              <LabelInput>
                {'Community URL* (It cannot be changed after creation)'}
              </LabelInput>
              <Gap height={1} />
              <InputBox ref={urlRef} placeholder='Enter Community URL' />
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
            {'create Community'.toUpperCase()}
          </CreateProjectBtn>
        </WrapBtn>
      </Wrap>

      <ProgressModal
        isOpen={isOpen}
        title={`Hang in there!`}
        lines={[
          `We're creating Community.`,
          'This might take a few seconds...',
        ]}
      />
    </Layout>
  )
}
