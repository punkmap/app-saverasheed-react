import { merge } from 'ramda'
import {
  getCenter,
  getIsCentered,
  getSelectedEntities,
  getUserLocation,
  getViewport,
} from './selectors'

const defaultState = { map: {} }
const createState = merge(defaultState)

describe('getSelectedEntities', () => {
  it('with no selectedEntities prop set', () => {
    const state = createState()
    expect(getSelectedEntities(state)).toEqual([])
  })

  it('with selectedEntities prop set', () => {
    const state = createState({
      map: {
        selectedEntities: ['1'],
      },
    })

    expect(getSelectedEntities(state)).toEqual(['1'])
  })
})

describe('getViewport', () => {
  it('with no viewport prop set', () => {
    const state = createState()
    expect(getViewport(state)).toEqual({})
  })

  it('with viewport prop set', () => {
    const state = createState({
      map: {
        viewport: {
          height: 1000,
        },
      },
    })
    expect(getViewport(state)).toEqual({
      height: 1000,
    })
  })
})

describe('getCenter', () => {
  it('gets center correctly', () => {
    const state = createState({
      map: {
        viewport: {
          latitude: 32.713859,
          longitude: -117.159537,
          height: 1000,
        },
      },
    })
    expect(getCenter(state)).toEqual({
      latitude: 32.713859,
      longitude: -117.159537,
    })
  })
})

describe('getUserLocation', () => {
  it('gets center correctly', () => {
    const state = createState({
      map: {
        viewport: {
          latitude: 32.713859,
          longitude: -117.159537,
          height: 1000,
        },
        userLocation: {
          latitude: 32.71385,
          longitude: -117.15957,
        },
      },
    })
    expect(getUserLocation(state)).toEqual({
      latitude: 32.71385,
      longitude: -117.15957,
    })
  })
})

// TODO: rewrite
xdescribe('getIsCentered', () => {
  it('compares wrong values correctly', () => {
    const state = createState({
      map: {
        viewport: {
          latitude: 33.713859,
          longitude: -117.159537,
          height: 1000,
        },
        userLocation: {
          latitude: 32.71385,
          longitude: -116.15957,
        },
      },
    })
    expect(getIsCentered(state)).toBe(false)
  })

  it('gets exact center correctly', () => {
    const state = createState({
      map: {
        viewport: {
          latitude: 32.7138595,
          longitude: -117.1595375,
          height: 1000,
        },
        userLocation: {
          longitude: -117.1595375,
          latitude: 32.7138595,
        },
      },
    })
    expect(getIsCentered(state)).toBe(true)
  })

  it('gets rounded center correctly', () => {
    const state = createState({
      map: {
        viewport: {
          longitude: -117.1595375,
          latitude: 32.7138595,
          height: 1000,
        },
        userLocation: {
          longitude: -117.1595376,
          latitude: 32.7138596,
        },
      },
    })
    expect(getIsCentered(state)).toBe(true)
  })
})
