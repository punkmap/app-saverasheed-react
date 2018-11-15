import { propOr, prop, equals, pick, pipe, toUpper } from 'ramda'
import quadTools from 'quadkeytools'

import { derive } from '../../util/reselect'

const rootSelector = propOr({}, 'map')

export const getSelectedEntities = derive(
  rootSelector,
  propOr([], 'selectedEntities'),
)
export const getViewport = derive(rootSelector, propOr({}, 'viewport'))
export const getViewportHeight = derive(getViewport, propOr(0, 'height'))
export const getCenter = derive(getViewport, pick(['latitude', 'longitude']))
export const getUserLocation = derive(rootSelector, propOr({}, 'userLocation'))
export const getUserQuadkey = derive(
  getUserLocation,
  ({ latitude, longitude }) =>
    quadTools.locationToQuadkey({ lat: latitude, lng: longitude }, 22),
)

export const getIsCentered = derive(
  rootSelector,
  propOr(false, 'isMapCentered'),
)

export const getPopupInfo = derive(rootSelector, prop('popupInfo'))
export const getPopupOpen = derive(rootSelector, prop('popupOpen'))
export const getLocationPermission = derive(
  rootSelector,
  pipe(
    propOr('', 'locationPermission'),
    toUpper,
  ),
)
export const getIsLocationAllowed = derive(
  getLocationPermission,
  equals('GRANTED'),
)
