import React from 'react'
import { shallow } from 'enzyme'
import Button from '.'

const wrap = (props = {}) => shallow(<Button {...props} />)

describe('Button', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'Button', onClick: jest.fn() })
    expect(wrapper).toMatchSnapshot()
  })
})
