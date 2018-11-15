import React from 'react'
import { shallow } from 'enzyme'
import SignInButton from '.'
import { googleAuth } from '../../../fixtures/authProviders'

const wrap = (props = {}) => shallow(<SignInButton {...props} />)

describe('SignInButton', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ auth: googleAuth })
    expect(wrapper).toMatchSnapshot()
  })
})
