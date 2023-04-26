import { StorageConst } from '@/constants/storage.const'
import { Gap } from '@/styles/common.style'
import {
  ActionBox,
  Avatar,
  Description,
  FollowBtn,
  HeaderBox,
  InfoBox,
  Title,
  Wrap,
} from '@/styles/project.style'

export default function Project() {
  return (
    <Wrap>
      <HeaderBox>
        <InfoBox>
          <Avatar
            width={100}
            height={100}
            src={StorageConst.MANTA_LOGO.src}
            alt={StorageConst.MANTA_LOGO.alt}
          />
          <Gap height={6} />
          <Title>{'Manta Network'}</Title>
          <Gap height={4} />
          <Description>
            {
              'Manta Network is the zk layer 1 blockchain with the fastest prover speed and most decentralized trusted setup that brings programmable privacy to web3. Its suite of core products and technologies, including zkNFTs and MantaPay, offers user-friendly access to powerful ZK-enabled use cases.'
            }
          </Description>
        </InfoBox>
        <ActionBox>
          <FollowBtn>{'Following'}</FollowBtn>
        </ActionBox>
      </HeaderBox>
    </Wrap>
  )
}
