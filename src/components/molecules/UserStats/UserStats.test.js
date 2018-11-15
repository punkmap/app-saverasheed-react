import React from 'react'
import { shallow } from 'enzyme'
import UserStats from '.'

const wrap = (props = {}) => shallow(<UserStats {...props} />)

describe('UserStats', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'UserStats' })
    expect(wrapper).toMatchSnapshot()
  })
})
