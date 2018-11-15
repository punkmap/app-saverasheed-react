import React from 'react'
import { shallow } from 'enzyme'
import UserBadges from '.'

const wrap = (props = {}) => shallow(<UserBadges {...props} />)

describe('UserBadges', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'UserBadges' })
    expect(wrapper).toMatchSnapshot()
  })
})
