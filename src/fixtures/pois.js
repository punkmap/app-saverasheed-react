import PropTypes from 'prop-types'

const { shape, arrayOf, number, string } = PropTypes

export const poi1 = {
  id: 'poi.2362169',
  name: 'Broadway Pier',
  hint: 'Take a stroll down the boardwalk',
  description:
    'Look out over beautiful San Diego harbor, do you see Jason Mraz or Nick Cannon?',
  quadkeys: [
    '0230132212123123023',
    '0230132212123123201',
    '0230132212123123023',
  ],
  image: 'QmXAgZMDo9JdTkG6L3t7aKGgV2eNEFUSvx5cm38wEYLUzD',
  geometry: {
    type: 'Point',
    coordinates: [],
  },
  center: [],
}

export const poi2 = {
  id: 'poi.2360370',
  name: 'Santa Fe Depot',
  hint: 'Look at it from across the street to get that picture.',
  description:
    'Rasheed once fell asleep on the train and woke up in La Jolla, true story...',
  quadkeys: [
    '0230132212123123131',
    '0230132212123123113',
    '0230132212123132002',
    '0230132212123132020',
  ],
  image: 'QmZ6M2EYpyG54oFgjvHfP91j5gZs7Vuo9Gn12noA7p7TZA',
  geometry: {
    type: 'Point',
    coordinates: [-117.1695327758789, 32.71653282824708],
  },
  center: [-117.1695327758789, 32.71653282824708],
}

export const pois = [poi1, poi2]

export const poiPropTypes = shape({
  id: string,
  name: string,
  hint: string,
  description: string,
  quadkeys: arrayOf(string),
  image: string,
  geometry: shape({
    type: string,
    coordinates: arrayOf(number),
  }),
  center: arrayOf(number),
})
