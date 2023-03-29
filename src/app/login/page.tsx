'use client'

import React from 'react'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { EnvVariables } from '@/constants/env.const'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import { handleMetamask } from '@/handler/auth/metamask'
import {
  Box,
  Description,
  LeftSession,
  ListLogos,
  Main,
  RightSession,
  SkipText,
  Title,
  Wrap,
} from '@/styles/login.style'

const LoginPage = () => {
  const router = useRouter()

  const handleLoginGoogle = () => {
    try {
      router.push(
        EnvVariables.NEXT_PUBLIC_API_URL + '/oauth2/login?type=google'
      )
    } catch (error) {
      toast.error('Error while login')
    }
  }

  const handleSignInTwitter = async (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault()
    await signIn('discord')
  }

  const handleSignInDiscord = async (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault()
    await signIn('discord')
  }

  return (
    <Main>
      <header>
        <title>{'Login'}</title>
      </header>
      <LeftSession />
      <RightSession>
        <Wrap>
          <Box>
            <Title>{'Welcome to QuestX'}</Title>
            <Description>
              {'Lorem ipsum dolor sit amet, consectetur'}
            </Description>
            <Description>{'adipiscing elit. Suspendisse sem eros'}</Description>
            <Description>{'Lscelerisque sed ultricies at'}</Description>
            <Description>{'egestas quis dolor'}</Description>
            <ListLogos>
              <Image
                className={'cursor-pointer'}
                onClick={handleLoginGoogle}
                width={50}
                height={50}
                src={StorageConst.GOOGLE_DIR.src}
                alt={StorageConst.GOOGLE_DIR.alt}
              />
              <Image
                className={'cursor-pointer'}
                onClick={handleSignInTwitter}
                width={50}
                height={50}
                src={StorageConst.TWITTER_DIR.src}
                alt={StorageConst.TWITTER_DIR.alt}
              />
              <Image
                className={'cursor-pointer'}
                onClick={handleSignInDiscord}
                width={50}
                height={50}
                src={StorageConst.DISCORD_DIR.src}
                alt={StorageConst.DISCORD_DIR.alt}
              />
              <Image
                className={'cursor-pointer'}
                onClick={handleMetamask}
                width={50}
                height={50}
                src={StorageConst.METAMASK_DIR.src}
                alt={StorageConst.METAMASK_DIR.alt}
              />
            </ListLogos>
          </Box>
        </Wrap>
        <SkipText href={RouterConst.HOME}>{'Skip For now'}</SkipText>
      </RightSession>
    </Main>
  )
}

export default LoginPage
