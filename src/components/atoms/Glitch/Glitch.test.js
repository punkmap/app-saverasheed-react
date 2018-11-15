import React from 'react'
import { shallow } from 'enzyme'
import Glitch from '.'

const wrap = (props = {}) => shallow(<Glitch {...props} />)

describe('Glitch', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'Glitch' })
    expect(wrapper).toMatchSnapshot()
  })
})
