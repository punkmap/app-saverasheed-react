import PropTypes from 'prop-types'
import { prop, __ } from 'ramda'

import Email from '../components/icons/Email'
import Facebook from '../components/icons/Facebook'
import Google from '../components/icons/Google'
import PortisPixel from '../components/icons/PortisPixel'
import { mapObjAsArray } from '../util/ramda-extra'

const { oneOf } = PropTypes

export const googleAuth = {
  name: 'Google',
  id: 'google.com',
  method: 'signInWithGoogle',
  Icon: Google,
}

export const facebookAuth = {
  name: 'Facebook',
  id: 'facebook.com',
  method: 'signInWithFacebook',
  Icon: Facebook,
}

export const passwordAuth = {
  name: 'Email and password',
  id: 'password',
  method: 'signIn',
  Icon: Email,
}

export const portisAuth = {
  name: 'Portis wallet',
  id: 'portis',
  method: '',
  Icon: PortisPixel,
}

const authProviders = {
  'google.com': googleAuth,
  'facebook.com': facebookAuth,
  password: passwordAuth,
  portis: portisAuth,
}

export const getProviderById = prop(__, authProviders)

export default authProviders

export const authNamePropTypes = oneOf(
  mapObjAsArray(prop('name'), authProviders),
)
export const authIdPropTypes = oneOf(mapObjAsArray(prop('id'), authProviders))
