import moment from 'moment'

export const ONE_SECOND_MILLIS = 1000
export const ONE_MINUTE_MILLIS = 1000 * 60
export const ONE_MONTH_MILLIS = ONE_MINUTE_MILLIS * 60 * 24 * 30

export const FormatTime = (time: Date): string => {
  return moment(time).format('YYYY-MM-DDTHH:mm:ssZ')
}

export const calculateTimeRemaining = (targetDate: Date) => {
  const difference = targetDate.getTime() - new Date().getTime()

  if (difference <= 0) {
    // target date has passed, stop the countdown
    return { days: '000', hours: '00', minutes: '00', seconds: '00' }
  }

  const hours = Math.floor(difference / (1000 * 60 * 60)).toString()
  const minutes = padNumberWithZero(Math.floor((difference / 1000 / 60) % 60))
  const seconds = padNumberWithZero(Math.floor((difference / 1000) % 60))

  return { hours, minutes, seconds }
}

export const calculateDayRemaining = (targetDate: Date) => {
  const difference = targetDate.getTime() - new Date().getTime()

  if (difference <= 0) {
    // target date has passed, stop the countdown
    return { days: '00', hours: '00', minutes: '00', seconds: '00' }
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24)).toString()
  const hours = padNumberWithZero(Math.floor((difference / (1000 * 60 * 60)) % 24))
  const minutes = padNumberWithZero(Math.floor((difference / 1000 / 60) % 60))
  const seconds = padNumberWithZero(Math.floor((difference / 1000) % 60))

  return { days, hours, minutes, seconds }
}

export const padNumberWithZero = (num: number, length: number = 2) => {
  return num.toString().padStart(length, '0')
}

export const convertTimeToShow = (time: string | undefined): string => {
  if (!time) {
    return ''
  }
  return moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss')
}
