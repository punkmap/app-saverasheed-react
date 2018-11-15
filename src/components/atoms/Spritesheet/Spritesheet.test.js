import React from 'react'
import { shallow } from 'enzyme'
import Spritesheet from '.'
import sleepwalkerData from '../../../assets/sleepwalk'
import sleepwalkerImg from '../../../assets/sleepwalk.png'

const wrap = (props = {}) => shallow(<Spritesheet {...props} />)

describe('Spritesheet', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({
      src: sleepwalkerImg,
      data: sleepwalkerData,
    })
    expect(wrapper).toMatchSnapshot()
  })
})
