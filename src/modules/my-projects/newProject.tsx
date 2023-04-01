import {
  ConnectTwitterBtn,
  CreateProjectBtn,
  WrapBtn,
} from '@/styles/button.style'
import { Divider, Gap } from '@/styles/common.style'
import { InputBox } from '@/styles/input.style'
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

export default function NewProjectModule() {
  const listCategory = categories.map((e, i) => (
    <CategoryItem key={i}>{e}</CategoryItem>
  ))

  return (
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
            <LabelInput>{'Project Name* (You can change it later)'}</LabelInput>
            <Gap height={1} />
            <InputBox placeholder='Enter Project Name' />
            <Gap height={9} />
            <LabelInput>{'Project Name* (You can change it later)'}</LabelInput>
            <Gap height={1} />
            <InputBox placeholder='Enter Project Name' />
            <Gap height={9} />
            <LabelInput>{'Project Name* (You can change it later)'}</LabelInput>
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
            <LabelInput>{'Project Name* (You can change it later)'}</LabelInput>
            <Gap height={1} />
            <InputBox placeholder='Enter Project Name' />
            <Gap height={9} />
            <LabelInput>{'Project Name* (You can change it later)'}</LabelInput>
            <Gap height={1} />
            <InputBox placeholder='Enter Project Name' />
            <Gap height={9} />
            <LabelInput>{'Project Name* (You can change it later)'}</LabelInput>
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
        <CreateProjectBtn isBlock={false}>
          {'create project'.toUpperCase()}
        </CreateProjectBtn>
      </WrapBtn>
    </Wrap>
  )
}
