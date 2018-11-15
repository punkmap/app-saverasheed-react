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

const { types: loaderApiTypes, creators: loaderApiCreators } = createApiActions(
  {
    authenticate: {
      request: ['type', 'authType', 'email', 'password'],
      success: ['user'],
      failure: ['error'],
    },

    completeQuest: {
      request: ['hash'],
      success: ['completionData'],
      failure: ['error'],
    },

    confirmCheckin: {
      request: ['poi', 'userQuadkey'],
      success: ['checkins'],
    },
    linkAccount: {
      request: ['providerId'],
      success: ['providerData'],
      failure: ['error'],
    },
    linkEmail: {
      request: [null, null, 'email', 'password'],
      success: ['user'],
      failure: ['error'],
    },
    linkExistingAccount: {
      request: ['method', 'pendingCred', 'email'],
      success: ['user'],
      failure: ['error'],
    },
    logout: {},
    fetchUserData: {
      success: ['userData'],
      failure: ['error'],
    },
    shownIntro: {},

    unlinkAccount: {
      request: ['providerId'],
      success: ['providerData'],
      failure: ['error'],
    },
  },
  {
    prefix: 'auth/',
    useLoader: true,
  },
)

export const {
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  COMPLETE_QUEST_REQUEST,
  COMPLETE_QUEST_SUCCESS,
  COMPLETE_QUEST_FAILURE,

  CONFIRM_CHECKIN_REQUEST,
  CONFIRM_CHECKIN_SUCCESS,
  CONFIRM_CHECKIN_FAILURE,
  FETCH_USER_DATA_REQUEST,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_FAILURE,
  LINK_ACCOUNT_REQUEST,
  LINK_ACCOUNT_SUCCESS,
  LINK_ACCOUNT_FAILURE,

  LINK_EMAIL_REQUEST,
  LINK_EMAIL_SUCCESS,
  LINK_EMAIL_FAILURE,
  LINK_EXISTING_ACCOUNT_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SHOWN_INTRO_REQUEST,
  SHOWN_INTRO_SUCCESS,
  SHOWN_INTRO_FAILURE,
  UNLINK_ACCOUNT_REQUEST,
  UNLINK_ACCOUNT_SUCCESS,
  UNLINK_ACCOUNT_FAILURE,
} = loaderApiTypes
export const {
  authenticateRequest,
  authenticateSuccess,
  authenticateFailure,
  completeQuestRequest,
  completeQuestSuccess,
  completeQuestFailure,

  confirmCheckinRequest,
  confirmCheckinSuccess,
  confirmCheckinFailure,
  fetchUserDataRequest,
  fetchUserDataSuccess,
  fetchUserDataFailure,
  linkAccountRequest,
  linkAccountSuccess,
  linkAccountFailure,

  linkEmailRequest,
  linkEmailSuccess,
  linkEmailFailure,
  linkExistingAccountRequest,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  shownIntroRequest,
  shownIntroSuccess,
  shownIntroFailure,
  unlinkAccountRequest,
  unlinkAccountSuccess,
  unlinkAccountFailure,
} = loaderApiCreators
