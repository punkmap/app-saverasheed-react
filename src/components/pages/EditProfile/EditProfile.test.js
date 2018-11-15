import React from 'react'
import { shallow } from 'enzyme'
import EditProfile from '.'

const wrap = (props = {}) => shallow(<EditProfile {...props} />)

describe('EditProfile', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ linkAccount: jest.fn(), unlinkAccount: jest.fn() })
    expect(wrapper).toMatchSnapshot()
  })
})
