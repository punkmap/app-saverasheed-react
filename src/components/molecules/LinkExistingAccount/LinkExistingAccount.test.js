import React from 'react'
import { shallow } from 'enzyme'

import LinkExistingAccount from '.'

const wrap = (props = {}) => shallow(<LinkExistingAccount {...props} />)

describe('LinkExistingAccount', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({
      method: 'facebook.com',
      pendingCredId: 'google.com',
      email: 'rasheed.bustamam@gmail.com',
      linkAccount: jest.fn(),
    })
    expect(wrapper).toMatchSnapshot()
  })
})
