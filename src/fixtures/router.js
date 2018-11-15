import PropTypes from 'prop-types'

const { shape, string } = PropTypes

export const sampleLocation = {
  pathname: '/',
}

export const sampleMatch = {
  params: {},
}

export const locationPropTypes = shape({
  pathname: string,
})
