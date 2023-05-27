import { CheckBox } from '@/modules/community/review-submission/mini-widget'
import { NewClaimReviewStore } from '@/store/local/claim-review'
import { Horizontal } from '@/widgets/orientation'
import { BarsArrowDownIcon } from '@heroicons/react/24/outline'
import { ChangeEvent, FunctionComponent } from 'react'
import tw from 'twin.macro'

const FullWidth = tw(Horizontal)`
  w-full
  border-solid
  border-gray-200
  border-b
`

const TitleFrame = tw(Horizontal)`
  w-full
  justify-start
  items-center
  text-lg
  font-medium
  text-black
  py-3
  px-4
`

const SortFrame = tw(Horizontal)`
  w-48
  border-l
  border-solid
  border-gray-200
  justify-center
  items-center
  text-lg
  font-normal
  text-black
  py-3
  cursor-pointer
`

export const SubmissionsHeader: FunctionComponent<{
  title: string
  onCheckAll: (e: ChangeEvent<HTMLInputElement>) => void
  checked: boolean
}> = ({ title, onCheckAll, checked }) => {
  return (
    <FullWidth>
      <TitleFrame>
        <CheckBox
          id='inline-checked-checkbox'
          type='checkbox'
          onChange={onCheckAll}
          checked={checked}
        />
        {title}
      </TitleFrame>

      <SortFrame>
        <BarsArrowDownIcon className='w-4 h-4 mr-1' />
        {'Sort by'}
      </SortFrame>
    </FullWidth>
  )
}
