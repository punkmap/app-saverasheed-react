import React from 'react'
import { shallow } from 'enzyme'
import Splash from '.'

const wrap = (props = {}) => shallow(<Splash {...props} />)

describe('Splash', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'Splash' })
    expect(wrapper).toMatchSnapshot()
  })
})
