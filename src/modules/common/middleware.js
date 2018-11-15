import screenfull from 'screenfull'
import { contains } from 'ramda'

import { AsyncHome, AsyncMain } from '../../App'
import { saveState } from '../../util/localStorage'
import { getIsFullScreen, getShowingSplash } from './selectors'

import {
  exitFullScreen,
  requestFullScreen,
  EXIT_FULL_SCREEN,
  REQUEST_FULL_SCREEN,
  TOGGLE_FULL_SCREEN,
  toggleSplash,
  TOGGLE_SPLASH,
} from './actions'

const fullScreenAxns = [
  EXIT_FULL_SCREEN,
  REQUEST_FULL_SCREEN,
  TOGGLE_FULL_SCREEN,
]

const middleware = xya => store => {
  if (screenfull.enabled) {
    screenfull.onchange(() => {
      const action = screenfull.isFullscreen
        ? requestFullScreen
        : exitFullScreen
      store.dispatch(action())
    })
  }

  const showingSplash = getShowingSplash(store.getState())
  if (showingSplash) {
    setTimeout(() => {
      AsyncMain.preload()
      AsyncHome.preload()
      setTimeout(() => {
        store.dispatch(toggleSplash(false))
      }, 1000)
    }, 9000)
  }

  return next => action => {
    if (contains(action.type, fullScreenAxns)) {
      const wasFullScreen = getIsFullScreen(store.getState())
      next(action)
      const fullScreen = getIsFullScreen(store.getState())

      if (wasFullScreen && !fullScreen) {
        // exit fullscreen
        screenfull.exit()
      }
      if (!wasFullScreen && fullScreen) {
        // enter fullscreen
        screenfull.request()
      }
    } else if (action.type === TOGGLE_SPLASH) {
      next(action)
      const showingSplash = getShowingSplash(store.getState())
      saveState('splashShown', !showingSplash)
    } else {
      return next(action)
    }
  }
}

export default middleware
