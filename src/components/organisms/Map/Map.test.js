import React from 'react'
import { shallow } from 'enzyme'
import Map from '.'

const wrap = (props = {}) => shallow(<Map {...props} />)

describe('Map', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({
      entityClick: jest.fn(),
      selectEntity: jest.fn(),
      deselectEntity: jest.fn(),
      selectedEntities: [],
      viewport: {},
      changeViewport: jest.fn(),
      popupInfo: {},
      fetchQuest: jest.fn(),
      closePopup: jest.fn(),
      userLocation: { latitude: 0, longitude: 0 },
      pois: [],
    })
    expect(wrapper).toMatchSnapshot()
  })
})
