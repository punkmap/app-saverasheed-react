import React from 'react'
import { shallow } from 'enzyme'
import ButtonLink from '.'

const wrap = (props = {}) => shallow(<ButtonLink {...props} />)

describe('ButtonLink', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'ButtonLink', onClick: jest.fn() })
    expect(wrapper).toMatchSnapshot()
  })
})
