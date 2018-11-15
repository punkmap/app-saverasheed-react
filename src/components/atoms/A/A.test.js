import React from 'react'
import { shallow } from 'enzyme'
import A from '.'

const wrap = (props = {}) => shallow(<A {...props} />)

describe('A', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'A', href: 'https://google.com' })
    expect(wrapper).toMatchSnapshot()
  })
})
