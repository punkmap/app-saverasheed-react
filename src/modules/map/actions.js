import { createActions} from 'redux-awesome-sauce'

const { types, creators } = createActions(
  {
    changeViewport: ['viewport', 'keepCentered'],
    selectEntity: ['entityId'],
    deselectEntity: ['entityId'],
    entityClick: ['entity'],
    closePopup: null,
    openPopup: null,
    allowLocation: null,
    updateLocationPermission: ['value'],
    updateUserLocation: ['location'],
    centerMap: null,
    nextStep: ['step']
  },
  { prefix: 'map/' },
)

export const {
  CHANGE_VIEWPORT,
  SELECT_ENTITY,
  DESELECT_ENTITY,
  ENTITY_CLICK,
  CLOSE_POPUP,
  OPEN_POPUP,
  ALLOW_LOCATION,
  UPDATE_LOCATION_PERMISSION,
  UPDATE_USER_LOCATION,
  CENTER_MAP,
} = types
export const {
  changeViewport,
  selectEntity,
  deselectEntity,
  entityClick,
  closePopup,
  openPopup,
  allowLocation,
  updateLocationPermission,
  updateUserLocation,
  centerMap,
} = creators
