import React from 'react'
import { shallow } from 'enzyme'
import ModalBasic from '.'

const wrap = (props = {}) => shallow(<ModalBasic {...props} />)

describe('ModalBasic', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({
      children: 'children',
    })
    expect(wrapper).toMatchSnapshot()
  })
})
