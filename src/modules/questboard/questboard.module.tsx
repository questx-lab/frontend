import SidebarCustom from '@/components/layouts/sidebar'
import { Gap } from '@/styles/common.style'
import {
  Description,
  FilterBox,
  Main,
  QuestboardBox,
  Title,
  Wrap,
  WrapQuestboard,
} from '@/styles/questboard.style'

export default function QuestboardModule() {
  const listQuestboards = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
    <QuestboardBox key={e}>
      <div className='h-1/2 bg-gray-200' />
      <div className='p-5 flex flex-col justify-between h-1/2'>
        <p className='text-black font-bold text-2xl'>
          {'quest card'.toUpperCase()}
        </p>
        <div className='h-[10px] w-1/2 rounded-full bg-gray-200' />
        <div className='h-[10px] w-full rounded-full bg-gray-200' />
      </div>
    </QuestboardBox>
  ))

  return (
    <Wrap>
      <SidebarCustom />
      <Main>
        <Title>{'Questboard (Show all Quests)'}</Title>
        <Gap />
        <Description>
          {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sem eros, scelerisque' +
            ' sed ultricies at, egestas quis dolor'}
        </Description>
        <Gap />
        <FilterBox>{'Filter / Sort'}</FilterBox>
        <Gap />
        <WrapQuestboard>{listQuestboards}</WrapQuestboard>
      </Main>
    </Wrap>
  )
}
