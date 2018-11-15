import React from 'react'
import { shallow } from 'enzyme'

import AuthButtons from '.'

const wrap = (props = {}) => shallow(<AuthButtons {...props} />)

describe('AuthButtons', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({
      match: { url: '/main/login', params: { authType: 'login' } },
      signIn: jest.fn(),
    })
    expect(wrapper).toMatchSnapshot()
  })
})
