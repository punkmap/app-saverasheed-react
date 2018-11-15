import React from 'react'
import { shallow } from 'enzyme'
import Profile from '.'
import { user1 } from '../../../fixtures/users'

const wrap = (props = {}) => shallow(<Profile {...props} />)

describe('Profile', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({
      logout: jest.fn(),
      user: user1,
      pendingQuests: [],
      completedQuests: [],
    })
    expect(wrapper).toMatchSnapshot()
  })
})
