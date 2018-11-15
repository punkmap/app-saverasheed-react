import React from 'react'
import { shallow } from 'enzyme'
import Modal from '.'

const wrap = (props = {}) => shallow(<Modal {...props} />)

describe('Modal', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({
      allowLocation: jest.fn(),
      isLocationAllowed: true,
      on: true,
    })
    expect(wrapper).toMatchSnapshot()
  })
})
