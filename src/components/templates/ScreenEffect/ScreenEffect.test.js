import React from 'react'
import { shallow } from 'enzyme'
import ScreenEffect from '.'

const wrap = (props = {}) => shallow(<ScreenEffect {...props} />)

describe('ScreenEffect', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'ScreenEffect', on: false })
    expect(wrapper).toMatchSnapshot()
  })
})
