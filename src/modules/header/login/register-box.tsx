import { FunctionComponent } from 'react'

import { useStoreActions } from 'easy-peasy'

import { AuthEnum } from '@/constants/common.const'
import { StorageConst } from '@/constants/storage.const'
import { Description, PaddingVertical, PolicyText, SocialBox, Title } from '@/modules/header/login'
import { GlobalStoreModel } from '@/store/store'
import { Image } from '@/widgets/image'
import { PrimaryText } from '@/widgets/text'

const RegisterBox: FunctionComponent = () => {
  // action
  const setAuthBox = useStoreActions<GlobalStoreModel>((action) => action.setAuthBox)

  return (
    <PaddingVertical>
      <Title>{'Create your XQuest account'}</Title>
      <SocialBox>
        <Image
          width={40}
          height={40}
          src={StorageConst.GOOGLE_DIR.src}
          alt={StorageConst.GOOGLE_DIR.alt}
        />
        {'Log in with Google'}
      </SocialBox>
      <SocialBox>
        <Image
          width={40}
          height={40}
          src={StorageConst.METAMASK_DIR.src}
          alt={StorageConst.METAMASK_DIR.alt}
        />
        {'Log in with MetaMask'}
      </SocialBox>
      <Description>
        {'Already have an account?'}
        <PrimaryText isHover onClick={() => setAuthBox(AuthEnum.LOGIN)}>
          {'Login'}
        </PrimaryText>
      </Description>
      <PolicyText>
        {'By continuing, you agree to the'} <PrimaryText isHover>{'Terms of Service'}</PrimaryText>{' '}
        & <PrimaryText isHover>{'Privacy policy'}</PrimaryText>
      </PolicyText>
    </PaddingVertical>
  )
}

export default RegisterBox
