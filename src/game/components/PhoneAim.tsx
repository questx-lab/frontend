import React, { useEffect, useState } from 'react'

import { AimOutlined } from '@ant-design/icons'

import { Device } from '../store/types'

const styles = {
  tiled: {
    width: '100%',
    height: '100%',
    background: 'blue',
    display: 'flex',
    flexDirection: 'column',
  } as React.CSSProperties,
  tiledInactif: {
    width: '100%',
    height: '100%',
    background: 'grey',
    display: 'flex',
    flexDirection: 'column',
  } as React.CSSProperties,
  content: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'auto',
    justifyContent: 'center',
    fontFamily: 'Roboto, sans-serif',
    color: 'white',
  } as React.CSSProperties,
  contentChild: {
    maxHeight: 'calc(100% - 120px)',
    overflowY: 'scroll',
  } as React.CSSProperties,
  backBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    background: '#373737',
    textAlign: 'center',
    padding: '5px',
  } as React.CSSProperties,
  fullWidth: {
    width: '100%',
  },
}

type PhoneAimType = {
  wifiName: string
  devices: Device[]
  onCancel: Function
  onConfirm?: Function
  onDdos: Function
}
type PhoneAimTiledType = {
  onClick: Function
  actif: boolean
}
type NetworkData = {
  dest: string
  text: string
}

const networkListen = {
  randomText: [
    'Transmission Control Protocol, Src Port: 46952',
    'Simple Service Discovery Protocol',
    'BOOTID, UDPN.ORG: 152549',
    'Router Solicitation from 1.1.1.1',
    'Standard query response 0x09875',
    'TCP Keep-Alive',
    'NOTIFIY * HTTP/1.1',
    'Ping to 250.230.10.20',
  ],
  randomDest: 254,
}

const dataTools = [
  { name: 'Scan devices', action: 'scan' },
  { name: 'Man in the middle', action: 'mim' },
  { name: 'DDoS', action: 'ddos' },
]

function PhoneAim(props: PhoneAimType) {
  const [step, setStep] = useState('listAttack')
  const [loading, setLoading] = useState(false)
  const [successChoiceIP, setSuccessChoiceIP] = useState(false)
  const [errorChoiceIP, setErrorChoiceIP] = useState(false)
  const [choiceIP, setChoiceIP] = useState('')
  const [dataNetwork, setDataNetwork] = useState<NetworkData[]>([])
  const [filterNetwork, setFilterNetwork] = useState(false)
  const [devicesNetwork, setDevicesNetwork] = useState(
    props.devices.filter(
      (elt) => elt.proba <= parseInt('' + Math.random() * 10)
    )
  )
  const [device, setDevice] = useState<Device | null>(null)

  // scan loader
  useEffect(() => {
    let timerFunc: ReturnType<typeof setTimeout>
    if (loading) {
      timerFunc = setTimeout(() => {
        if (step === 'scan')
          setDevicesNetwork(
            props.devices.filter(
              (elt) => elt.proba <= parseInt('' + Math.random() * 10)
            )
          )
        else if (step === 'ddos') {
          if (props.onDdos) props.onDdos(props.wifiName)
          handleReset()
          props.onCancel()
        }

        setLoading(false)
      }, 3000)
    }
    return () => clearTimeout(timerFunc)
  }, [loading, props.devices])

  const buildRandomNavigation = () => {
    const buildOne = () => {
      const dest = [
        parseInt('' + Math.random() * networkListen.randomDest),
        parseInt('' + Math.random() * networkListen.randomDest),
        parseInt('' + Math.random() * networkListen.randomDest),
        parseInt('' + Math.random() * networkListen.randomDest),
      ].join('.')
      const text =
        networkListen.randomText[
          parseInt('' + Math.random() * networkListen.randomText.length)
        ]
      return { dest, text }
    }
    if (!filterNetwork)
      setDataNetwork([buildOne(), buildOne(), buildOne(), buildOne()])
    else if (dataNetwork.length !== 1) {
      const navigation = []
      const device = props.devices.filter((elt) => elt.ip === choiceIP)[0]
      if (device && device.credentials && device.probaCredential) {
        const rand = Math.random() * 10
        const isCredentialsTime = device.probaCredential <= rand

        if (isCredentialsTime)
          navigation.push({
            dest: 'photogram.art',
            text: 'Logged with ' + device.credentials,
          })
      }
      setDataNetwork(navigation)
    }
  }

  // listen mim
  useEffect(() => {
    let timerFunc: ReturnType<typeof setTimeout>
    if (successChoiceIP) {
      timerFunc = setTimeout(buildRandomNavigation, 1000)
    }
    return () => clearTimeout(timerFunc)
  }, [dataNetwork])

  const handleReset = () => {
    setStep('listAttack')
    setErrorChoiceIP(false)
    setSuccessChoiceIP(false)
    setFilterNetwork(false)
    setDevice(null)
    setChoiceIP('')
  }

  const handleConfirmDDOS = () => {
    setLoading(true)
  }

  const handleConfirmMiM = () => {
    console.log('confirmMiM')
    setErrorChoiceIP(false)
    setSuccessChoiceIP(false)
    if (props.devices.map((elt) => elt.ip).indexOf(choiceIP) === -1)
      setErrorChoiceIP(true)
    else {
      const device = props.devices.filter((elt) => elt.ip === choiceIP)[0]
      setDevice(device)
      setSuccessChoiceIP(true)
      setStep('mimListen_' + device.type)
      if (device.type === 'navigation' && device.actif) buildRandomNavigation()
    }
  }

  return <div></div>
}

export const PhoneAimTiled = (props: PhoneAimTiledType) => {
  return (
    <div
      onClick={props.actif ? () => props.onClick() : () => {}}
      style={props.actif ? styles.tiled : styles.tiledInactif}
    >
      <AimOutlined style={{ fontSize: '35px', marginBottom: '2px' }} />
      <p>Tools</p>
    </div>
  )
}

export default PhoneAim
