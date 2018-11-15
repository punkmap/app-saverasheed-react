import { createReducer } from 'redux-awesome-sauce'
import {
  merge,
  mergeDeepRight,
  concat,
  assoc,
  assocPath,
  isNil,
  evolve,
  not,
  filter,
  dissoc,
  pipe,
  append,
} from 'ramda'
import { toast } from 'react-toastify'
import { loadState } from '../../util/localStorage'

import { containsBy, opposite } from '../../util/ramda-extra'

import {
  UPDATE_LINKED_ACCOUNT,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  SHOWN_INTRO_SUCCESS,
  CONFIRM_CHECKIN_SUCCESS,
  // SHOWN_INTRO_FAILURE,
  FETCH_USER_DATA_SUCCESS,
  AUTHENTICATE_REQUEST,
  FETCH_USER_DATA_REQUEST,
  LINK_ACCOUNT_SUCCESS,
  UNLINK_ACCOUNT_SUCCESS,
  LINK_ACCOUNT_REQUEST,
  UNLINK_ACCOUNT_REQUEST,
  TOGGLE_INTRO,
  CONFIRM_CHECKIN_REQUEST,
  FETCH_USER_DATA_FAILURE,
  COMPLETE_QUEST_FAILURE,
  COMPLETE_QUEST_SUCCESS,
} from './actions'

export const initialState = {
  loading: false,
  user: { shownIntro: false },
  showingIntro: false,
  hideIntro: true,
}

export const handleSetLoading = assoc('loading', true)

export const handleAuthenticateSuccess = (state, { payload: { user } }) =>
  mergeDeepRight(state, { user, loading: false, hideIntro: false })

let errorToastId

export const handleAuthenticateFailure = (state, { payload: { error } }) => {
  if (errorToastId) toast.dismiss(errorToastId)
  errorToastId = toast.error(error)
  return assoc('error', error, state)
}

export const handleUpdateLinkedAccount = (state, { payload }) =>
  merge(state, { ...payload, loading: false })

export const handleShownIntroSuccess = pipe(
  assoc('showingIntro', false),
  evolve({
    user: assoc('shownIntro', true),
  }),
)

export const handleConfirmCheckinRequest = (
  state,
  {
    payload: {
      poi: { id },
    },
  },
) => assoc('checkingIn', id, state)

export const handleConfirmCheckinSuccess = (
  state,
  { payload: { checkins } },
) => {
  let {
    user: { activeQuest },
  } = state
  if (!activeQuest) {
    activeQuest = loadState('activeQuest')
  }
  return pipe(
    assocPath(['user', 'checkins', activeQuest], checkins),
    assoc('checkingIn', null),
  )(state)
}

export const handleFetchUserDataFailure = (state, { payload: { error } }) =>
  pipe(
    assoc('loading', false),
    assoc('error', error),
  )(state)

export const handleFetchUserDataSuccess = (
  state,
  { payload: { userData } },
) => {
  const { address } = userData
  const { providerData, email } = state.user
  if (!address) {
    const user = pipe(
      dissoc('address'),
      dissoc('token'),
    )(userData)
    return mergeDeepRight(state, { user, loading: false })
  }

  const newProviderData = concat(providerData, [
    {
      displayName: null,
      email,
      phoneNumber: null,
      photoURL: null,
      providerId: 'portis',
      uid: address,
    },
  ])
  const user = mergeDeepRight(userData, { providerData: newProviderData })
  return mergeDeepRight(state, { user, loading: false })
}

export const handleLinkAccountRequest = (state, { payload: { providerId } }) =>
  assoc('linking', providerId, state)

export const handleUnlinkAccountRequest = (
  state,
  { payload: { providerId } },
) => assoc('linking', providerId, state)

export const handleLinkAccountSuccess = (
  state,
  { payload: { providerData } },
) => {
  const portisAuth = filter(x => x.providerId === 'portis', providerData)[0]
  if (portisAuth) {
    const { uid: address } = portisAuth
    return mergeDeepRight(state, {
      user: { providerData, address },
      linking: null,
    })
  }
  return mergeDeepRight(state, { user: { providerData }, linking: null })
}

export const handleUnlinkAccountSuccess = (
  state,
  { payload: { providerData } },
) => {
  const { user } = state

  console.log({ user, providerData })

  if (!containsBy(x => x.providerId === 'portis', providerData)) {
    const userData = pipe(
      dissoc('address'),
      dissoc('token'),
      assoc('providerData', providerData),
    )(user)
    return pipe(
      assoc('user', userData),
      dissoc('linking'),
    )(state)
  }

  return mergeDeepRight(state, { user: { providerData }, linking: null })
}

export const handleToggleIntro = (state, { payload: { value } }) =>
  opposite(isNil(value))
    ? assoc('showingIntro', value, state)
    : evolve({ showingIntro: not }, state)

export const handleCompleteQuestSuccess = (
  state,
  { payload: { completionData } },
) =>
  evolve({
    user: evolve({
      completedQuests: append(completionData),
    }),
  })(state)

const handleCompleteQuestFailure = (state, { payload: { error } }) => {
  if (errorToastId) toast.dismiss(errorToastId)
  errorToastId = toast.error(error)
  // no need to mutate state
  return state
}

const handlers = {
  [AUTHENTICATE_REQUEST]: handleSetLoading,
  [AUTHENTICATE_SUCCESS]: handleAuthenticateSuccess,
  [AUTHENTICATE_FAILURE]: handleAuthenticateFailure,
  [UPDATE_LINKED_ACCOUNT]: handleUpdateLinkedAccount,
  [SHOWN_INTRO_SUCCESS]: handleShownIntroSuccess,
  [CONFIRM_CHECKIN_REQUEST]: handleConfirmCheckinRequest,
  [CONFIRM_CHECKIN_SUCCESS]: handleConfirmCheckinSuccess,
  [FETCH_USER_DATA_REQUEST]: handleSetLoading,
  [FETCH_USER_DATA_FAILURE]: handleFetchUserDataFailure,
  [FETCH_USER_DATA_SUCCESS]: handleFetchUserDataSuccess,
  [LINK_ACCOUNT_REQUEST]: handleLinkAccountRequest,
  [UNLINK_ACCOUNT_REQUEST]: handleUnlinkAccountRequest,
  [LINK_ACCOUNT_SUCCESS]: handleLinkAccountSuccess,
  [UNLINK_ACCOUNT_SUCCESS]: handleUnlinkAccountSuccess,
  [TOGGLE_INTRO]: handleToggleIntro,
  [COMPLETE_QUEST_SUCCESS]: handleCompleteQuestSuccess,
  [COMPLETE_QUEST_FAILURE]: handleCompleteQuestFailure,
}

export default createReducer(initialState, handlers)
