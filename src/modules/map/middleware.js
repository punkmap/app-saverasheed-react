import { eqByProps, roundTo } from '../../util/ramda-extra'
import {
  ALLOW_LOCATION,
  updateUserLocation,
  updateLocationPermission,
} from './actions'
import { getIsLocationAllowed, getUserLocation } from './selectors'

const watchPosition = store => pos => {
  store.dispatch(updateLocationPermission('granted'))
  const { coords } = pos
  const { latitude, longitude } = coords
  const latLng = { latitude, longitude }
  const userLocation = getUserLocation(store.getState())
  // TODO: change precision
  if (!eqByProps(['latitude', 'longitude'], roundTo(6), latLng, userLocation)) {
    store.dispatch(updateUserLocation(latLng))
  }
}

const geolocationError = ({ code, message }) => alert(`${code} ${message}`)

let id

const middleware = xya => store => {
  window.addEventListener('deviceorientation', event => {
    const alpha = event.webkitCompassHeading || event.alpha
    const location = { bearing: 180 - alpha }
    const userLocation = getUserLocation(store.getState())
    if (!eqByProps(['bearing'], roundTo(5), location, userLocation)) {
      // console.log({ alpha, webkitAlpha })
      store.dispatch(updateUserLocation(location))
    }
  })

  if (navigator.permissions) {
    navigator.permissions
             .query({ name: 'geolocation' })
             .then(permissionStatus => {
               console.log('geolocation permission state is', permissionStatus.state)
               store.dispatch(updateLocationPermission(permissionStatus.state))
               if (!('geolocation' in navigator)) {
                 alert(
                   'Your browser does not seem to be supported. Please use a browser like Chrome or Safari.',
                 )
               }

               if (getIsLocationAllowed(store.getState())) {
                 if (id) {
                   navigator.geolocation.clearWatch(id)
                 }
                 id = navigator.geolocation.watchPosition(
                   watchPosition(store),
                   geolocationError,
                 )
               }
               permissionStatus.onchange = function () {
                 console.log('geolocation permission state has changed to', this.state)
                 store.dispatch(updateLocationPermission(this.state))
               }
             })
  }

  return next => action => {
    switch (action.type) {
      case ALLOW_LOCATION:
        next(action)
        if (id) {
          navigator.geolocation.clearWatch(id)
        }
        id = navigator.geolocation.watchPosition(
          watchPosition(store),
          geolocationError,
        )
        break
      default:
        return next(action)
    }
  }
}

export default middleware
