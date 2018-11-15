import React from 'react'
import { shallow } from 'enzyme'
import LocationMap from '.'

const wrap = (props = {}) => shallow(<LocationMap {...props} />)

describe('LocationMap', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({
      poisForQuest: [],
      push: jest.fn(),
      entityClick: jest.fn(),
    })
    expect(wrapper).toMatchSnapshot()
  })
})
