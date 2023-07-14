import { FC, useEffect, useState } from 'react'

import { useReactMediaRecorder } from 'react-media-recorder-2'
import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import { HorizontalBetweenCenterFullWidth } from '@/widgets/orientation'
import { TextXs } from '@/widgets/text'
import { PaperAirplaneIcon } from '@heroicons/react/20/solid'
import { PauseIcon, PlayIcon, StopIcon, XMarkIcon } from '@heroicons/react/24/outline'

const Frame = tw(HorizontalFullWidthCenter)`
  gap-2
`

const Border = tw(HorizontalBetweenCenterFullWidth)`
  rounded-full
  w-full
  bg-primary
  h-full
  p-2
`

const CircleBorder = tw.div`
  p-1
  rounded-full
  bg-primary-200
`

const AudioRecord: FC<{ onChangeRecord: (isRecord: boolean) => void }> = ({ onChangeRecord }) => {
  const [isActive, setIsActive] = useState<boolean>(true)
  const [second, setSecond] = useState<string>('00')
  const [minute, setMinute] = useState<string>('00')
  const [counter, setCounter] = useState(0)
  const [playAudio, setPlayAudio] = useState<boolean>(false)
  const [microphonePermission, setMicrophonePermission] = useState<'granted' | 'denied' | 'prompt'>(
    'prompt'
  )

  const { startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } = useReactMediaRecorder({
    video: false,
    audio: true,
    stopStreamsOnStop: true,
  })

  useEffect(() => {
    let intervalId: any

    if (isActive && microphonePermission === 'granted') {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60
        const minuteCounter = Math.floor(counter / 60)

        let computedSecond =
          String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter
        let computedMinute =
          String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter

        setSecond(`${computedSecond}`)
        setMinute(`${computedMinute}`)

        setCounter((counter) => counter + 1)
      }, 1000)
    }

    return () => clearInterval(intervalId)
  }, [isActive, counter, microphonePermission])

  useEffect(() => {
    const checkMicrophonePermission = async () => {
      const { state } = await navigator.permissions.query({
        name: 'microphone' as PermissionName,
      })
      setMicrophonePermission(state)
    }
    checkMicrophonePermission()
    startRecording()
  }, [])

  const onStopRecord = () => {
    stopRecording()
    setIsActive(false)
  }

  const IconAudio: FC = () => {
    if (isActive) {
      return <StopIcon onClick={onStopRecord} className='w-4 h-4 text-white cursor-pointer' />
    }

    if (!playAudio) {
      return (
        <PlayIcon
          onClick={() => setPlayAudio(true)}
          className='w-4 h-4 text-white cursor-pointer'
        />
      )
    }

    return (
      <>
        <PauseIcon
          onClick={() => setPlayAudio(true)}
          className='w-4 h-4 text-white cursor-pointer'
        />
        <audio
          onEnded={() => {
            setPlayAudio(false)
          }}
          autoPlay
          src={mediaBlobUrl}
        />
      </>
    )
  }

  return (
    <Frame>
      <XMarkIcon
        className='w-8 h-8 text-danger-600 cursor-pointer'
        onClick={() => {
          onChangeRecord(false)
          onStopRecord()
          setCounter(0)
          setSecond('00')
          setMinute('00')
          clearBlobUrl()
        }}
      />
      <Border>
        <CircleBorder>
          <IconAudio />
        </CircleBorder>
        <CircleBorder>
          <TextXs>{`${minute}:${second}`}</TextXs>
        </CircleBorder>
      </Border>
      <PaperAirplaneIcon
        className='w-8 h-8 text-primary cursor-pointer'
        onClick={() => {
          onChangeRecord(false)
          onStopRecord()
        }}
      />
    </Frame>
  )
}

export default AudioRecord
