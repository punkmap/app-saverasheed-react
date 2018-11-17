import { propOr, prop } from 'ramda'
import screenfull from 'screenfull'
import queryString from 'query-string'

import { derive } from '../../util/reselect'

const rootSelector = propOr({}, 'common')
const routerSelector = propOr({}, 'router')

export const getIsFullScreen = derive(
  rootSelector,
  propOr(screenfull.isFullscreen, 'fullScreen'),
)

export const getIntroStep = derive(rootSelector, propOr(0, 'introStep'))
export const getShowingSplash = derive(
  rootSelector,
  propOr(false, 'showingSplash'),
)
export const getAppLoading = derive(rootSelector, prop('appLoading'))
export const getLocation = derive(routerSelector, propOr({}, 'location'))
export const getPathname = derive(getLocation, propOr('', 'pathname'))
export const getSearch = derive(getLocation, propOr('', 'search'))
export const getQuery = derive(getSearch, queryString.parse)
