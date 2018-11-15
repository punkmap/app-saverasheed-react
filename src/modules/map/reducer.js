import {
  assoc,
  uniq,
  concat,
  evolve,
  merge,
  mergeDeepRight,
  pipe,
  symmetricDifference,
  toUpper,
  path,
  __,
} from 'ramda'
import { createReducer } from 'redux-awesome-sauce'
import quadTools from 'quadkeytools'
import { saveState } from '../../util/localStorage'

import {
  CHANGE_VIEWPORT,
  SELECT_ENTITY,
  DESELECT_ENTITY,
  ENTITY_CLICK,
  CLOSE_POPUP,
  UPDATE_LOCATION_PERMISSION,
  UPDATE_USER_LOCATION,
  CENTER_MAP,
  OPEN_POPUP,
} from './actions'
import { castArray, isArray } from '../../util/ramda-extra'

export const initialState = {
  selectedEntities: [],
  viewport: {
    // latitude: 32.7157,
    // longitude: -117.1611,
    // zoom: 16.14044,
    // bearing: 0,
    // pitch: 60,
    width: 500,
    height: 500,
    zoom: 14.57,
    bearing: 0.0,
    pitch: 49.5,
    longitude: -117.1595375,
    latitude: 32.7138595,
  },
  userLocation: {
    longitude: -117.1595375,
    latitude: 32.7138595,
  },
  isMapCentered: true,
  popupInfo: null,
  popupOpen: false,
  // locationPermission: null, // enum: GRANTED or DENIED or PROMPT
}

export const handleChangeViewport = (
  state,
  { payload: { viewport, keepCentered = false } },
) =>
  evolve({
    viewport: merge(__, viewport),
    isMapCentered: () => {
      const isInitialRender =
        // has width/height, does not have lat/lng
        (viewport.width && viewport.height && !viewport.longitude) ||
        // OR, has width/height, but is compensating for changing dimensions
        path('height', viewport) !== path(['viewport', 'height'], viewport)
      return Boolean(isInitialRender || keepCentered)
    },
  })(state)

export const handleSelectEntity = (state, { payload: { entityId } }) =>
  evolve(
    {
      selectedEntities: pipe(
        concat(__, castArray(entityId)),
        uniq,
      ),
    },
    state,
  )

export const handleDeselectEntity = (state, { payload: { entityId } }) =>
  evolve(
    {
      selectedEntities: symmetricDifference(__, castArray(entityId)),
    },
    state,
  )

export const handleEntityClick = (
  state,
  {
    payload: {
      entity: { object },
    },
  },
) => {
  const { selected, quadKey, center, name, description, hint } = object

  if (selected) {
    return handleDeselectEntity(state, { payload: { entityId: quadKey } })
  }

  let lat, lng

  if (center && isArray(center)) {
    ;[lng, lat] = center
  } else {
    const x = center || quadTools.origin(quadKey)
    lat = x.lat
    lng = x.lng
  }

  const { selectedEntities } = state
  return pipe(
    handleDeselectEntity(__, { payload: { entityId: selectedEntities } }),
    handleSelectEntity(__, { payload: { entityId: quadKey } }),
    assoc('popupInfo', {
      name,
      description,
      hint,
    }),
    handleChangeViewport(__, {
      payload: {
        viewport: {
          latitude: lat,
          longitude: lng,
          transitionDuration: 500,
          zoom: 18,
        },
        keepCentered: false,
      },
    }),
    assoc('popupOpen', true),
  )(state)
}

export const handleClosePopup = state => {
  const { selectedEntities } = state
  return pipe(
    assoc('popupInfo', null),
    assoc('popupOpen', false),
    handleDeselectEntity(__, { payload: { entityId: selectedEntities } }),
  )(state)
}

export const handleUpdateLocationPermission = (
  state,
  { payload: { value } },
) => {
  saveState('locationPermission', value)
  return assoc('locationPermission', toUpper(value), state)
}
export const handleUpdateUserLocation = (state, { payload: { location } }) =>
  pipe(
    mergeDeepRight(__, { userLocation: location }),
    s =>
      s.isMapCentered
        ? handleChangeViewport(s, {
            payload: { viewport: s.userLocation, keepCentered: true },
          })
        : s,
  )(state)

export const handleCenterMap = state =>
  pipe(
    s =>
      handleChangeViewport(s, {
        payload: { viewport: state.userLocation, keepCentered: true },
      }),
    assoc('isMapCentered', true),
  )(state)

export const handleOpenPopup = assoc('popupOpen', true)

const handlers = {
  [CHANGE_VIEWPORT]: handleChangeViewport,
  [SELECT_ENTITY]: handleSelectEntity,
  [DESELECT_ENTITY]: handleDeselectEntity,
  [ENTITY_CLICK]: handleEntityClick,
  [CLOSE_POPUP]: handleClosePopup,
  [UPDATE_LOCATION_PERMISSION]: handleUpdateLocationPermission,
  [UPDATE_USER_LOCATION]: handleUpdateUserLocation,
  [CENTER_MAP]: handleCenterMap,
  [OPEN_POPUP]: handleOpenPopup,
}

export default createReducer(initialState, handlers)
