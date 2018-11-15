import { createReducer } from 'redux-awesome-sauce'
import { assoc, evolve, not, pipe } from 'ramda'

import { loadState } from '../../util/localStorage'
import { toggleOrSet } from '../../util/ramda-extra'

import {
  EXIT_FULL_SCREEN,
  REQUEST_FULL_SCREEN,
  TOGGLE_APP_LOADING,
  TOGGLE_FULL_SCREEN,
  TOGGLE_SPLASH,
  INIT_APP_REQUEST,
  INIT_APP_SUCCESS,
  INIT_APP_FAILURE,
} from './actions'

export const initialState = {
  fullScreen: false,
  // if splash shown, don't show splash
  // default to not showing splash
  showingSplash: !loadState('splashShown'),
  appLoading: true,
}

export const handleToggleFullScreen = evolve({ fullScreen: not })
export const handleRequestFullScreen = assoc('fullScreen', true)
export const handleExitFullScreen = assoc('fullScreen', false)
export const handleToggleSplash = (state, { payload: { val } }) =>
  toggleOrSet('showingSplash', val, state)

export const handleToggleAppLoading = (state, { payload: { val } }) =>
  toggleOrSet('appLoading', val, state)

export const handleInitAppRequest = assoc('appLoading', true)
export const handleInitAppSuccess = assoc('appLoading', false)
export const handleInitAppFailure = (state, { payload: { error } }) =>
  pipe(
    assoc('appLoading', false),
    assoc('error', error),
  )(state)

const handlers = {
  [TOGGLE_FULL_SCREEN]: handleToggleFullScreen,
  [REQUEST_FULL_SCREEN]: handleRequestFullScreen,
  [EXIT_FULL_SCREEN]: handleExitFullScreen,
  [TOGGLE_SPLASH]: handleToggleSplash,
  [TOGGLE_APP_LOADING]: handleToggleAppLoading,
  [INIT_APP_REQUEST]: handleInitAppRequest,
  [INIT_APP_SUCCESS]: handleInitAppSuccess,
  [INIT_APP_FAILURE]: handleInitAppFailure,
}

export default createReducer(initialState, handlers)
