import React from 'react'
import { shallow } from 'enzyme'
import AllowLocation from '.'

const wrap = (props = {}) => shallow(<AllowLocation {...props} />)

describe('AllowLocation', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({
      allowLocation: jest.fn(),
      isLocationAllowed: true,
    })
    expect(wrapper).toMatchSnapshot()
  })
})
