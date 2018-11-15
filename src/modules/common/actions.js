import { createActions, createApiActions } from 'redux-awesome-sauce'

const { types, creators } = createActions(
  {
    toggleFullScreen: null,
    requestFullScreen: null,
    exitFullScreen: null,
    toggleSplash: ['val'],
    toggleAppLoading: ['val'],
  },
  { prefix: 'common/' },
)

export const {
  TOGGLE_FULL_SCREEN,
  REQUEST_FULL_SCREEN,
  EXIT_FULL_SCREEN,
  TOGGLE_SPLASH,
  TOGGLE_APP_LOADING,
} = types

export const {
  toggleFullScreen,
  requestFullScreen,
  exitFullScreen,
  toggleSplash,
  toggleAppLoading,
} = creators

const { types: apiTypes, creators: apiCreators } = createApiActions(
  {
    initApp: {
      failure: ['error'],
    },
  },
  { prefix: 'common/', useLoader: true },
)

export const { INIT_APP_REQUEST, INIT_APP_SUCCESS, INIT_APP_FAILURE } = apiTypes

export const { initAppRequest, initAppSuccess, initAppFailure } = apiCreators
