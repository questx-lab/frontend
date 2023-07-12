import ReactGA from 'react-ga4'

export enum HitType {
  PAGE_VIEW = 'pageview',
}

export enum ActionEvent {
  CLICK_COMMUNITY = 'click-community',
  CLICK_QUEST = 'click-quest',
  USER_JOIN_TOWNHALL = 'user-join-townhall',
  OWNER_JOIN_TOWNHALL = 'owner-join-townhall',
}

export enum CategoryEvent {
  COMMUNITY = 'community',
  QUEST = 'quest',
  TOWNHALL = 'townhall',
}

export const AnalyticPage = ({
  hitType = HitType.PAGE_VIEW,
  path,
  title,
}: {
  hitType?: string
  path: string
  title: string
}) => {
  ReactGA.send({
    hitType,
    path,
    title,
  })
}

export const AnalyticEvent = ({
  category,
  action,
  label,
}: {
  category: string
  action: string
  label?: string
}) => {
  ReactGA.event({
    category,
    action,
    label, // optional
  })
}
