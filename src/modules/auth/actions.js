import { createActions, createApiActions } from 'redux-awesome-sauce'

const { types, creators } = createActions(
  {
    updateLinkedAccount: ['method', 'pendingCred', 'email'],
    toggleIntro: ['value'],
  },
  { prefix: 'auth/' },
)

export const { UPDATE_LINKED_ACCOUNT, TOGGLE_INTRO } = types
export const { updateLinkedAccount, toggleIntro } = creators

const { types: apiTypes, creators: apiCreators } = createApiActions(
  {
    logout: {},
    authenticate: {
      request: ['type', 'authType', 'email', 'password'],
      success: ['user'],
      failure: ['error'],
    },
    linkExistingAccount: {
      request: ['method', 'pendingCred', 'email'],
      success: ['user'],
      failure: ['error'],
    },
    linkEmail: {
      request: [null, null, 'email', 'password'],
      success: ['user'],
      failure: ['error'],
    },
    linkAccount: {
      request: ['providerId'],
      success: ['providerData'],
      failure: ['error'],
    },
    unlinkAccount: {
      request: ['providerId'],
      success: ['providerData'],
      failure: ['error'],
    },
    shownIntro: {},
    confirmCheckin: {
      request: ['poi', 'userQuadkey'],
      success: ['checkins'],
    },
  },
  { prefix: 'auth/' },
)

export const {
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  LINK_EXISTING_ACCOUNT_REQUEST,
  UNLINK_ACCOUNT_REQUEST,
  UNLINK_ACCOUNT_SUCCESS,
  UNLINK_ACCOUNT_FAILURE,
  LINK_ACCOUNT_REQUEST,
  LINK_ACCOUNT_SUCCESS,
  LINK_ACCOUNT_FAILURE,
  SHOWN_INTRO_REQUEST,
  SHOWN_INTRO_SUCCESS,
  SHOWN_INTRO_FAILURE,
  CONFIRM_CHECKIN_REQUEST,
  CONFIRM_CHECKIN_SUCCESS,
  CONFIRM_CHECKIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LINK_EMAIL_REQUEST,
  LINK_EMAIL_SUCCESS,
  LINK_EMAIL_FAILURE,
} = apiTypes

export const {
  authenticateRequest,
  authenticateSuccess,
  authenticateFailure,
  linkExistingAccountRequest,
  unlinkAccountRequest,
  unlinkAccountSuccess,
  unlinkAccountFailure,
  linkAccountRequest,
  linkAccountSuccess,
  linkAccountFailure,
  shownIntroRequest,
  shownIntroSuccess,
  shownIntroFailure,
  confirmCheckinRequest,
  confirmCheckinSuccess,
  confirmCheckinFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  linkEmailRequest,
  linkEmailSuccess,
  linkEmailFailure,
} = apiCreators

const { types: loaderApiTypes, creators: loaderApiCreators } = createApiActions(
  {
    fetchUserData: {
      success: ['userData'],
      failure: ['error'],
    },
    completeQuest: {
      request: ['hash'],
      success: ['completionData'],
      failure: ['error'],
    },
  },
  {
    prefix: 'auth/',
    useLoader: true,
  },
)

export const {
  FETCH_USER_DATA_REQUEST,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_FAILURE,
  COMPLETE_QUEST_REQUEST,
  COMPLETE_QUEST_SUCCESS,
  COMPLETE_QUEST_FAILURE,
} = loaderApiTypes
export const {
  fetchUserDataRequest,
  fetchUserDataSuccess,
  fetchUserDataFailure,
  completeQuestRequest,
  completeQuestSuccess,
  completeQuestFailure,
} = loaderApiCreators
