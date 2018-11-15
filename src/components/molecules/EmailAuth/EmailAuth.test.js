import React from 'react'
import { shallow } from 'enzyme'

import EmailAuth from '.'

const wrap = (props = {}) => shallow(<EmailAuth {...props} />)

describe('EmailAuth', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({
      match: { url: '/main/login', params: { authType: 'login' } },
      submit: jest.fn(),
    })
    expect(wrapper).toMatchSnapshot()
  })
})
