import { propOr, prop, isNil, map } from 'ramda'
import { opposite } from '../../util/ramda-extra'
import { derive } from '../../util/reselect'

const rootSelector = propOr({}, 'auth')

export const getUser = derive(rootSelector, prop('user'))
export const getIsLoading = derive(rootSelector, propOr(false, 'loading'))
export const getIsLoggedIn = derive(getUser, opposite(isNil))
export const getPendingCred = derive(rootSelector, propOr({}, 'pendingCred'))
export const getPendingCredId = derive(getPendingCred, prop('providerId'))
export const getEmail = derive(rootSelector, prop('email'))
export const getMethod = derive(rootSelector, prop('method'))
export const getShowingIntro = derive(rootSelector, prop('showingIntro'))
export const getHasUserSeenIntro = derive(getUser, prop('shownIntro'))
export const getHideIntro = derive(rootSelector, prop('hideIntro'))
export const getShowIntro = derive(
  [getIsLoading, getHideIntro, getHasUserSeenIntro, getShowingIntro],
  (isLoading, hideIntro, hasUserSeenIntro, showingIntro) =>
    !isLoading && !hideIntro && (showingIntro || !hasUserSeenIntro),
)
export const getCheckingIn = derive(rootSelector, prop('checkingIn'))
export const getUserCheckinData = derive(getUser, propOr({}, 'checkins'))
export const getActiveQuest = derive(getUser, propOr('', 'activeQuest'))
export const getUserCheckins = derive(
  [getActiveQuest, getUserCheckinData],
  propOr([]),
)
export const getCheckinHash = derive(getUser, prop('checkinHash'))
export const getUserCheckinIds = derive(getUserCheckins, map(prop('id')))
export const getLinkingProvider = derive(rootSelector, prop('linking'))
export const getUserAddress = derive(getUser, prop('address'))
export const getCompletedQuests = derive(getUser, propOr([], 'completedQuests'))
export const getProviderData = derive(getUser, prop('providerData'))
