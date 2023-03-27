import styled from 'styled-components';
import tw from 'twin.macro';

type GapProps = {
  width?: number
  height?: number
}

export const Gap = styled.div<GapProps>(
  () => tw`h-4`
)
