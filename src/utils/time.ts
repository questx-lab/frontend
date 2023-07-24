import moment from 'moment'

export const ONE_SECOND_MILLIS = 1000
export const ONE_MINUTE_MILLIS = 1000 * 60
export const ONE_MONTH_MILLIS = ONE_MINUTE_MILLIS * 60 * 24 * 30

export const FormatTime = (time: Date): string => {
  return moment(time).format('YYYY-MM-DDTHH:mm:ssZ')
}
