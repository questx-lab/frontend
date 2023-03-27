import { FullWidthBtn } from '@/components/buttons/custom-btn.cpn';
import { Gap } from '@/styles/common.style';
import {
  Description,
  FilterBox,
  LeaderBoardBox,
  ProjectBox,
  Title,
  Wrap,
  WrapProjects,
} from '@/styles/explore.style';

export default function ExploreMod() {

  const listProject = [0,1,2,3,4,5,6,7,8].map(e=>(
    <ProjectBox key={e}>
      <div className="h-1/2 bg-gray-200"/>
      <div className="p-5 flex flex-col justify-between h-1/2">
        <p className="text-black font-bold text-2xl">{"project card".toUpperCase()}</p>
        <div className="h-[10px] w-1/2 rounded-full bg-gray-200"/>
        <div className="h-[10px] w-full rounded-full bg-gray-200"/>
        <FullWidthBtn text={"button".toUpperCase()} onClick={()=>{}}/>
      </div>
    </ProjectBox>
  ))

  return (
    <Wrap>
      <Title>{"Explore (Show all Projects)"}</Title>
      <Gap />
      <Description>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sem eros, scelerisque" +
        " sed ultricies at, egestas quis dolor"}</Description>
      <Gap/>
      <LeaderBoardBox>{"Leaderboard (for Projects)"}</LeaderBoardBox>
      <Gap/>
      <Gap/>
      <FilterBox>{"Filter / Sort"}</FilterBox>
      <Gap/>
      <WrapProjects>
        {listProject}
      </WrapProjects>
    </Wrap>
  )
}
