import React, { useState } from 'react'

import { WifiOutlined } from '@ant-design/icons'

import { WifiType } from '../store/types'

const styles = {
  tiled: {
    width: '100%',
    height: '100%',
    background: 'blue',
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
  backBtn: {
    background: '#373737',
    textAlign: 'center',
    padding: '5px',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  } as React.CSSProperties,
  iconStyle: {
    marginRight: '4px',
    position: 'relative',
    bottom: '5px',
  } as React.CSSProperties,
}

type PhoneWifiType = {
  onCancel: Function
  position: number[]
  wifiKnow?: string[]
  onConfirm?: Function
  data: WifiType[]
}
type PhoneWifiTiledType = {
  onClick: Function
}

function PhoneWifi(props: PhoneWifiType) {
  const [step, setStep] = useState('listWifi')
  const [tryWifi, setTryWifi] = useState<WifiType | null>(null)
  const [successWifi, setSuccessWifi] = useState(false)
  const [errorWifi, setErrorWifi] = useState(false)
  const [pwdValue, setPwdValue] = useState('')

  const handleReset = () => {
    setStep('listWifi')
    setSuccessWifi(false)
    setErrorWifi(false)
    setPwdValue('')
  }

  const handleChooseWifi = (item: WifiType) => {
    if (props.wifiKnow && props.wifiKnow.indexOf(item.name) !== -1) {
      setStep('wifiKnow')
    } else {
      setTryWifi(item)
      setStep('password')
    }
  }

  const handleConfirm = () => {
    if (tryWifi && tryWifi.pwd === pwdValue) {
      setSuccessWifi(true)
      setPwdValue('')
      if (props.onConfirm)
        setTimeout(() => {
          if (props.onConfirm) props.onConfirm(tryWifi.name)
          handleReset()
        }, 3000)
    } else {
      setErrorWifi(true)
    }
  }

  return <div></div>
}

export const PhoneWifiTiled = (props: PhoneWifiTiledType) => {
  return (
    <div onClick={() => props.onClick()} style={styles.tiled}>
      <WifiOutlined style={{ fontSize: '35px', marginBottom: '2px' }} />
      <p>WIFI</p>
    </div>
  )
}

export default PhoneWifi
