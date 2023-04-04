'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { FullWidthBtn } from '@/components/buttons/custom-btn.cpn'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import { Gap } from '@/styles/common.style'
import {
  ContentCreatedProjectBox,
  CreatedProjectBox,
  DescriptionCreatedProject,
  ImageCreatedProjectBox,
  SkeletonFirst,
  SkeletonSecond,
  TitleCreatedProject,
  TitleCreatedProjectBox,
  WrapCreatedProject,
  WrapCreatedProjectBox,
} from '@/styles/myProjects.style'

export default function CreatedProject() {
  const router = useRouter()

  const AddNewBox = () => {
    return (
      <CreatedProjectBox
        key={0}
        isCenter
        isDash
        onClick={() => router.push(RouterConst.CREATE_PROJECTS)}
      >
        <ContentCreatedProjectBox isCenter>
          <SkeletonFirst />
          <SkeletonSecond />
          <Image
            width={120}
            height={120}
            src={StorageConst.ADD_ICON.src}
            alt={StorageConst.ADD_ICON.alt}
          />
          <TitleCreatedProjectBox>
            {'add new project'.toUpperCase()}
          </TitleCreatedProjectBox>
        </ContentCreatedProjectBox>
      </CreatedProjectBox>
    )
  }

  const listProject = [
    ...[AddNewBox()],
    ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((e) => (
      <CreatedProjectBox isCenter={false} isDash={false} key={e}>
        <ImageCreatedProjectBox />
        <ContentCreatedProjectBox>
          <TitleCreatedProjectBox>
            {'project card'.toUpperCase()}
          </TitleCreatedProjectBox>
          <SkeletonFirst />
          <SkeletonSecond />
          <FullWidthBtn text={'button'.toUpperCase()} onClick={() => {}} />
        </ContentCreatedProjectBox>
      </CreatedProjectBox>
    )),
  ]

  return (
    <WrapCreatedProject>
      <TitleCreatedProject>{'My projects'}</TitleCreatedProject>
      <Gap />
      <DescriptionCreatedProject>
        {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sem eros, scelerisque' +
          ' sed ultricies at, egestas quis dolor'}
      </DescriptionCreatedProject>
      <Gap />
      <WrapCreatedProjectBox>{listProject}</WrapCreatedProjectBox>
    </WrapCreatedProject>
  )
}
