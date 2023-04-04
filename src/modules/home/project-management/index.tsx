import { AddRoleBtn, SubmitBtn } from '@/styles/button.style'
import { Gap } from '@/styles/common.style'
import {
  MBtn,
  MWrapBtn,
  NotifyBox,
  NotifyText,
  QuestWrap,
} from '@/styles/home.style'

export default function PManageMod() {
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
      <AddRoleBtn>{'add new role'.toUpperCase()}</AddRoleBtn>
      <Gap height={8} />
      <div className='w-full relative overflow-x-auto'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3 rounded-l-lg'>
                Usernam
              </th>
              <th scope='col' className='px-6 py-3'>
                Email
              </th>
              <th scope='col' className='px-6 py-3 rounded-r-lg'>
                MetaMask
              </th>
              <th scope='col' className='px-6 py-3 rounded-r-lg'>
                Discord
              </th>
              <th scope='col' className='px-6 py-3 rounded-r-lg'>
                Telegram
              </th>
              <th scope='col' className='px-6 py-3 rounded-r-lg'>
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-white  dark:bg-gray-800'>
              <td className='px-6 py-4'>{'username'}</td>
              <td className='px-6 py-4'>{'abc'}</td>
              <td className='px-6 py-4'>{'from acc info'}</td>
              <td className='px-6 py-4'>{'from acc info'}</td>
              <td className='px-6 py-4'>{'from acc info'}</td>
              <td className='px-6 py-4'>{'admin'}</td>
            </tr>
            <tr className='bg-white  dark:bg-gray-800'>
              <td className='px-6 py-4'>{'username'}</td>
              <td className='px-6 py-4'>{'abc'}</td>
              <td className='px-6 py-4'>{'from acc info'}</td>
              <td className='px-6 py-4'>{'from acc info'}</td>
              <td className='px-6 py-4'>{'from acc info'}</td>
              <td className='px-6 py-4'>{'admin'}</td>
            </tr>
            <tr className='bg-white  dark:bg-gray-800'>
              <td className='px-6 py-4'>{'username'}</td>
              <td className='px-6 py-4'>{'abc'}</td>
              <td className='px-6 py-4'>{'from acc info'}</td>
              <td className='px-6 py-4'>{'from acc info'}</td>
              <td className='px-6 py-4'>{'from acc info'}</td>
              <td className='px-6 py-4'>{'admin'}</td>
            </tr>
            <tr className='bg-white  dark:bg-gray-800'>
              <td className='px-6 py-4'>{'username'}</td>
              <td className='px-6 py-4'>{'abc'}</td>
              <td className='px-6 py-4'>{'from acc info'}</td>
              <td className='px-6 py-4'>{'from acc info'}</td>
              <td className='px-6 py-4'>{'from acc info'}</td>
              <td className='px-6 py-4'>{'admin'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </QuestWrap>
  )
}
