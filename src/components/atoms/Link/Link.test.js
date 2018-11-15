import React from 'react'
import { shallow } from 'enzyme'
import Link from '.'

const wrap = (props = {}) => shallow(<Link {...props} />)

describe('Link', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'Link', to: 'foo' })
    expect(wrapper).toMatchSnapshot()
  })
})
