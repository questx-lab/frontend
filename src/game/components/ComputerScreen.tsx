import React, { useEffect, useState } from 'react'

import { levelDisplay } from '../store/utils'

const catcherData = [
  {
    name: 'SMS',
    color: 'rgba(255, 99, 132, 0.5)',
    coef: 6,
  },
  {
    name: 'Credentials',
    color: 'rgba(54, 162, 235, 0.5)',
    coef: 1,
    max: 1,
  },
  {
    name: 'Pictures',
    color: 'rgba(255, 206, 86, 0.5)',
    coef: 3,
  },
  {
    name: 'Calls',
    color: 'rgba(75, 192, 192, 0.5)',
    coef: 4,
  },
  {
    name: 'Videos',
    color: 'rgba(153, 102, 255, 0.5)',
    coef: 2,
  },
  {
    name: 'Others',
    color: 'rgba(255, 159, 64, 0.5)',
    coef: 5,
  },
]

const styles = {
  screenContainer: {
    width: '100vw',
    maxWidth: '100%',
    height: '87vh',
    maxHeight: '100%',
  } as React.CSSProperties,
  AppContain: {
    height: '100%',
  } as React.CSSProperties,
  navBar: {
    minHeight: '35px',
    background: '#5936ff',
    color: 'white',
    textShadow: '1px 1px 1px black',
    borderBottom: '1px solid black',
  } as React.CSSProperties,
  logo: {
    position: 'relative',
    top: '5px',
    left: '5px',
  } as React.CSSProperties,
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    maxWidth: '500px',
    width: '100%',
    height: '100%',
    margin: 'auto',
  } as React.CSSProperties,
  fail: {} as React.CSSProperties,
  name: {} as React.CSSProperties,
  password: {} as React.CSSProperties,
  submit: {} as React.CSSProperties,
  profil: {
    float: 'right',
  } as React.CSSProperties,
  content: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'scroll',
    maxHeight: '90%',
    alignItems: 'center',
    marginTop: '15px',
    marginBottom: '15px',
  } as React.CSSProperties,
  card: {
    width: '300px',
    margin: '5px',
  } as React.CSSProperties,
}

type ComputerScreenType = {
  children?: any
  mode?: string
  started?: number
}

function ComputerScreen(props: ComputerScreenType) {
  const enumStep = {
    login: 0,
    dashboard: 1,
    profil: 2,
    creditCard: 3,
    credentialIMSIPage: 4,
  }
  const [step, setStep] = useState(enumStep.login)
  const [loading, setLoading] = useState(false)
  const enumLogged = { success: 2, fail: 1, init: 0 }
  const [logged, setLogged] = useState(enumLogged.init)
  const [name, setName] = useState('SARA')
  const [password, setPassword] = useState('')

  useEffect(() => {
    let timerFunc: ReturnType<typeof setTimeout>
    if (loading) {
      timerFunc = setTimeout(() => {
        setLoading(false)
      }, 750)
    }
    return () => clearTimeout(timerFunc)
  }, [loading])

  const buildDataIMSI = () => {
    return {
      labels: catcherData.map((elt) => elt.name),
      datasets: [
        {
          label: '# of Data Catched',
          data: catcherData.map((elt) =>
            levelDisplay(diffDate(), elt.coef, elt.max)
          ),
          backgroundColor: catcherData.map((elt) => elt.color),
          borderWidth: 1,
        },
      ],
    }
  }

  const tryLogin = () => {
    if (name === 'SARA' && password === 'AOKZC3O2') {
      setLogged(enumLogged.success)
      handleChgmtPage(enumStep.dashboard)
    } else setLogged(enumLogged.fail)
  }

  const handleChgmtPage = (page: number) => {
    if (page !== step) {
      setLoading(true)
      setStep(page)
    }
  }

  const getCredentialsFound = () => {
    const data = catcherData.filter((elt) => elt.name === 'Credentials')[0]
    return data ? levelDisplay(diffDate(), data.coef, data.max) : 0
  }

  const diffDate = () => {
    const d = new Date()
    if (props.started) {
      const diff = d.getTime() - props.started
      const minutes = Math.floor(diff / 60000)
      //const seconds = ((diff % 60000) / 1000).toFixed(0);
      return minutes
    }
    return 0
  }

  return <div></div>
}

export default ComputerScreen
