import React from 'react'
import { shallow } from 'enzyme'
import Loader from '.'

const wrap = (props = {}) => shallow(<Loader {...props} />)

describe('Loader', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ percentage: 50 })
    expect(wrapper).toMatchSnapshot()
  })
})
